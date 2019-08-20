#ifndef SASS_PARSER_H
#define SASS_PARSER_H

#include <string>
#include <vector>

#include "ast.hpp"
#include "position.hpp"
#include "context.hpp"
#include "position.hpp"
#include "prelexer.hpp"

#ifndef MAX_NESTING
// Note that this limit is not an exact science
// it depends on various factors, which some are
// not under our control (compile time or even OS
// dependent settings on the available stack size)
// It should fix most common segfault cases though.
#define MAX_NESTING 512
#endif

struct Lookahead {
  const char* found;
  const char* error;
  const char* position;
  bool parsable;
  bool has_interpolants;
  bool is_custom_property;
};

namespace Sass {

  class Parser : public ParserState {
  public:

    enum Scope { Root, Mixin, Function, Media, Control, Properties, Rules, AtRoot };

    Context& ctx;
    std::vector<Block_Obj> block_stack;
    std::vector<Scope> stack;
    Media_Block_Ptr last_media_block;
    const char* source;
    const char* position;
    const char* end;
    Position before_token;
    Position after_token;
    ParserState pstate;
    Backtraces traces;
    size_t indentation;
    size_t nestings;

    Token lexed;

    Parser(Context& ctx, const ParserState& pstate, Backtraces traces)
    : ParserState(pstate), ctx(ctx), block_stack(), stack(0), last_media_block(),
      source(0), position(0), end(0), before_token(pstate), after_token(pstate),
      pstate(pstate), traces(traces), indentation(0), nestings(0)
    { 
      stack.push_back(Scope::Root);
    }

    // static Parser from_string(const std::string& src, Context& ctx, ParserState pstate = ParserState("[STRING]"));
    static Parser from_c_str(const char* src, Context& ctx, Backtraces, ParserState pstate = ParserState("[CSTRING]"), const char* source = 0);
    static Parser from_c_str(const char* beg, const char* end, Context& ctx, Backtraces, ParserState pstate = ParserState("[CSTRING]"), const char* source = 0);
    static Parser from_token(Token t, Context& ctx, Backtraces, ParserState pstate = ParserState("[TOKEN]"), const char* source = 0);
    // special static parsers to convert strings into certain selectors
    static Selector_List_Obj parse_selector(const char* src, Context& ctx, Backtraces, ParserState pstate = ParserState("[SELECTOR]"), const char* source = 0);

#ifdef __clang__

    // lex and peak uses the template parameter to branch on the action, which
    // triggers clangs tautological comparison on the single-comparison
    // branches. This is not a bug, just a merging of behaviour into
    // one function

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wtautological-compare"

#endif


    // skip current token and next whitespace
    // moves ParserState right before next token
    void advanceToNextToken();

    bool peek_newline(const char* start = 0);

    // skip over spaces, tabs and line comments
    template <Prelexer::prelexer mx>
    const char* sneak(const char* start = 0)
    {
      using namespace Prelexer;

      // maybe use optional start position from arguments?
      const char* it_position = start ? start : position;

      // skip white-space?
      if (mx == spaces ||
          mx == no_spaces ||
          mx == css_comments ||
          mx == css_whitespace ||
          mx == optional_spaces ||
          mx == optional_css_comments ||
          mx == optional_css_whitespace
      ) {
        return it_position;
      }

      // skip over spaces, tabs and sass line comments
      const char* pos = optional_css_whitespace(it_position);
      // always return a valid position
      return pos ? pos : it_position;

    }

    // match will not skip over space, tabs and line comment
    // return the position where the lexer match will occur
    template <Prelexer::prelexer mx>
    const char* match(const char* start = 0)
    {
      // match the given prelexer
      return mx(position);
    }

    // peek will only skip over space, tabs and line comment
    // return the position where the lexer match will occur
    template <Prelexer::prelexer mx>
    const char* peek(const char* start = 0)
    {

      // sneak up to the actual token we want to lex
      // this should skip over white-space if desired
      const char* it_before_token = sneak < mx >(start);

      // match the given prelexer
      const char* match = mx(it_before_token);

      // check if match is in valid range
      return match <= end ? match : 0;

    }

    // white-space handling is built into the lexer
    // this way you do not need to parse it yourself
    // some matchers don't accept certain white-space
    // we do not support start arg, since we manipulate
    // sourcemap offset and we modify the position pointer!
    // lex will only skip over space, tabs and line comment
    template <Prelexer::prelexer mx>
    const char* lex(bool lazy = true, bool force = false)
    {

      if (*position == 0) return 0;

      // position considered before lexed token
      // we can skip whitespace or comments for
      // lazy developers (but we need control)
      const char* it_before_token = position;

      // sneak up to the actual token we want to lex
      // this should skip over white-space if desired
      if (lazy) it_before_token = sneak < mx >(position);

      // now call matcher to get position after token
      const char* it_after_token = mx(it_before_token);

      // check if match is in valid range
      if (it_after_token > end) return 0;

      // maybe we want to update the parser state anyway?
      if (force == false) {
        // assertion that we got a valid match
        if (it_after_token == 0) return 0;
        // assertion that we actually lexed something
        if (it_after_token == it_before_token) return 0;
      }

      // create new lexed token object (holds the parse results)
      lexed = Token(position, it_before_token, it_after_token);

      // advance position (add whitespace before current token)
      before_token = after_token.add(position, it_before_token);

      // update after_token position for current token
      after_token.add(it_before_token, it_after_token);

      // ToDo: could probably do this incremetal on original object (API wants offset?)
      pstate = ParserState(path, source, lexed, before_token, after_token - before_token);

      // advance internal char iterator
      return position = it_after_token;

    }

    // lex_css skips over space, tabs, line and block comment
    // all block comments will be consumed and thrown away
    // source-map position will point to token after the comment
    template <Prelexer::prelexer mx>
    const char* lex_css()
    {
      // copy old token
      Token prev = lexed;
      // store previous pointer
      const char* oldpos = position;
      Position bt = before_token;
      Position at = after_token;
      ParserState op = pstate;
      // throw away comments
      // update srcmap position
      lex < Prelexer::css_comments >();
      // now lex a new token
      const char* pos = lex< mx >();
      // maybe restore prev state
      if (pos == 0) {
        pstate = op;
        lexed = prev;
        position = oldpos;
        after_token = at;
        before_token = bt;
      }
      // return match
      return pos;
    }

    // all block comments will be skipped and thrown away
    template <Prelexer::prelexer mx>
    const char* peek_css(const char* start = 0)
    {
      // now peek a token (skip comments first)
      return peek< mx >(peek < Prelexer::css_comments >(start));
    }

#ifdef __clang__

#pragma clang diagnostic pop

#endif

    void error(std::string msg);
    void error(std::string msg, Position pos);
    // generate message with given and expected sample
    // text before and in the middle are configurable
    void css_error(const std::string& msg,
                   const std::string& prefix = " after ",
                   const std::string& middle = ", was: ",
                   const bool trim = true);
    void read_bom();

    Block_Obj parse();
    Import_Obj parse_import();
    Definition_Obj parse_definition(Definition::Type which_type);
    Parameters_Obj parse_parameters();
    Parameter_Obj parse_parameter();
    Mixin_Call_Obj parse_include_directive();
    Arguments_Obj parse_arguments();
    Argument_Obj parse_argument();
    Assignment_Obj parse_assignment();
    Ruleset_Obj parse_ruleset(Lookahead lookahead);
    Selector_List_Obj parse_selector_list(bool chroot);
    Complex_Selector_Obj parse_complex_selector(bool chroot);
    Selector_Schema_Obj parse_selector_schema(const char* end_of_selector, bool chroot);
    Compound_Selector_Obj parse_compound_selector();
    Simple_Selector_Obj parse_simple_selector();
    Wrapped_Selector_Obj parse_negated_selector();
    Simple_Selector_Obj parse_pseudo_selector();
    Attribute_Selector_Obj parse_attribute_selector();
    Block_Obj parse_block(bool is_root = false);
    Block_Obj parse_css_block(bool is_root = false);
    bool parse_block_nodes(bool is_root = false);
    bool parse_block_node(bool is_root = false);

    bool parse_number_prefix();
    Declaration_Obj parse_declaration();
    Expression_Obj parse_map();
    Expression_Obj parse_bracket_list();
    Expression_Obj parse_list(bool delayed = false);
    Expression_Obj parse_comma_list(bool delayed = false);
    Expression_Obj parse_space_list();
    Expression_Obj parse_disjunction();
    Expression_Obj parse_conjunction();
    Expression_Obj parse_relation();
    Expression_Obj parse_expression();
    Expression_Obj parse_operators();
    Expression_Obj parse_factor();
    Expression_Obj parse_value();
    Function_Call_Obj parse_calc_function();
    Function_Call_Obj parse_function_call();
    Function_Call_Schema_Obj parse_function_call_schema();
    String_Obj parse_url_function_string();
    String_Obj parse_url_function_argument();
    String_Obj parse_interpolated_chunk(Token, bool constant = false, bool css = true);
    String_Obj parse_string();
    Value_Obj parse_static_value();
    String_Schema_Obj parse_css_variable_value(bool top_level = true);
    String_Schema_Obj parse_css_variable_value_token(bool top_level = true);
    String_Obj parse_ie_property();
    String_Obj parse_ie_keyword_arg();
    String_Schema_Obj parse_value_schema(const char* stop);
    String_Obj parse_identifier_schema();
    If_Obj parse_if_directive(bool else_if = false);
    For_Obj parse_for_directive();
    Each_Obj parse_each_directive();
    While_Obj parse_while_directive();
    Return_Obj parse_return_directive();
    Content_Obj parse_content_directive();
    void parse_charset_directive();
    Media_Block_Obj parse_media_block();
    List_Obj parse_media_queries();
    Media_Query_Obj parse_media_query();
    Media_Query_Expression_Obj parse_media_expression();
    Supports_Block_Obj parse_supports_directive();
    Supports_Condition_Obj parse_supports_condition();
    Supports_Condition_Obj parse_supports_negation();
    Supports_Condition_Obj parse_supports_operator();
    Supports_Condition_Obj parse_supports_interpolation();
    Supports_Condition_Obj parse_supports_declaration();
    Supports_Condition_Obj parse_supports_condition_in_parens();
    At_Root_Block_Obj parse_at_root_block();
    At_Root_Query_Obj parse_at_root_query();
    String_Schema_Obj parse_almost_any_value();
    Directive_Obj parse_special_directive();
    Directive_Obj parse_prefixed_directive();
    Directive_Obj parse_directive();
    Warning_Obj parse_warning();
    Error_Obj parse_error();
    Debug_Obj parse_debug();

    Value_Ptr color_or_string(const std::string& lexed) const;

    // be more like ruby sass
    Expression_Obj lex_almost_any_value_token();
    Expression_Obj lex_almost_any_value_chars();
    Expression_Obj lex_interp_string();
    Expression_Obj lex_interp_uri();
    Expression_Obj lex_interpolation();

    // these will throw errors
    Token lex_variable();
    Token lex_identifier();

    void parse_block_comments();

    Lookahead lookahead_for_value(const char* start = 0);
    Lookahead lookahead_for_selector(const char* start = 0);
    Lookahead lookahead_for_include(const char* start = 0);

    Expression_Obj fold_operands(Expression_Obj base, std::vector<Expression_Obj>& operands, Operand op);
    Expression_Obj fold_operands(Expression_Obj base, std::vector<Expression_Obj>& operands, std::vector<Operand>& ops, size_t i = 0);

    void throw_syntax_error(std::string message, size_t ln = 0);
    void throw_read_error(std::string message, size_t ln = 0);


    template <Prelexer::prelexer open, Prelexer::prelexer close>
    Expression_Obj lex_interp()
    {
      if (lex < open >(false)) {
        String_Schema_Obj schema = SASS_MEMORY_NEW(String_Schema, pstate);
        // std::cerr << "LEX [[" << std::string(lexed) << "]]\n";
        schema->append(SASS_MEMORY_NEW(String_Constant, pstate, lexed));
        if (position[0] == '#' && position[1] == '{') {
          Expression_Obj itpl = lex_interpolation();
          if (!itpl.isNull()) schema->append(itpl);
          while (lex < close >(false)) {
            // std::cerr << "LEX [[" << std::string(lexed) << "]]\n";
            schema->append(SASS_MEMORY_NEW(String_Constant, pstate, lexed));
            if (position[0] == '#' && position[1] == '{') {
              Expression_Obj itpl = lex_interpolation();
              if (!itpl.isNull()) schema->append(itpl);
            } else {
              return schema;
            }
          }
        } else {
          return SASS_MEMORY_NEW(String_Constant, pstate, lexed);
        }
      }
      return 0;
    }

  public:
    static Number_Ptr lexed_number(const ParserState& pstate, const std::string& parsed);
    static Number_Ptr lexed_dimension(const ParserState& pstate, const std::string& parsed);
    static Number_Ptr lexed_percentage(const ParserState& pstate, const std::string& parsed);
    static Value_Ptr lexed_hex_color(const ParserState& pstate, const std::string& parsed);
  private:
    Number_Ptr lexed_number(const std::string& parsed) { return lexed_number(pstate, parsed); };
    Number_Ptr lexed_dimension(const std::string& parsed) { return lexed_dimension(pstate, parsed); };
    Number_Ptr lexed_percentage(const std::string& parsed) { return lexed_percentage(pstate, parsed); };
    Value_Ptr lexed_hex_color(const std::string& parsed) { return lexed_hex_color(pstate, parsed); };

    static const char* re_attr_sensitive_close(const char* src);
    static const char* re_attr_insensitive_close(const char* src);

  };

  size_t check_bom_chars(const char* src, const char *end, const unsigned char* bom, size_t len);
}

#endif
