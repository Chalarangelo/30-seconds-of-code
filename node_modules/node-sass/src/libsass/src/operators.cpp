#include "sass.hpp"
#include "operators.hpp"

namespace Sass {

  namespace Operators {

    inline double add(double x, double y) { return x + y; }
    inline double sub(double x, double y) { return x - y; }
    inline double mul(double x, double y) { return x * y; }
    inline double div(double x, double y) { return x / y; } // x/0 checked by caller

    inline double mod(double x, double y) { // x/0 checked by caller
      if ((x > 0 && y < 0) || (x < 0 && y > 0)) {
        double ret = std::fmod(x, y);
        return ret ? ret + y : ret;
      } else {
        return std::fmod(x, y);
      }
    }

    typedef double (*bop)(double, double);
    bop ops[Sass_OP::NUM_OPS] = {
      0, 0, // and, or
      0, 0, 0, 0, 0, 0, // eq, neq, gt, gte, lt, lte
      add, sub, mul, div, mod
    };

    /* static function, has no pstate or traces */
    bool eq(Expression_Obj lhs, Expression_Obj rhs)
    {
      // operation is undefined if one is not a number
      if (!lhs || !rhs) throw Exception::UndefinedOperation(lhs, rhs, Sass_OP::EQ);
      // use compare operator from ast node
      return *lhs == *rhs;
    }

    /* static function, throws OperationError, has no pstate or traces */
    bool cmp(Expression_Obj lhs, Expression_Obj rhs, const Sass_OP op)
    {
      // can only compare numbers!?
      Number_Obj l = Cast<Number>(lhs);
      Number_Obj r = Cast<Number>(rhs);
      // operation is undefined if one is not a number
      if (!l || !r) throw Exception::UndefinedOperation(lhs, rhs, op);
      // use compare operator from ast node
      return *l < *r;
    }

    /* static functions, throws OperationError, has no pstate or traces */
    bool lt(Expression_Obj lhs, Expression_Obj rhs) { return cmp(lhs, rhs, Sass_OP::LT); }
    bool neq(Expression_Obj lhs, Expression_Obj rhs) { return eq(lhs, rhs) == false; }
    bool gt(Expression_Obj lhs, Expression_Obj rhs) { return !cmp(lhs, rhs, Sass_OP::GT) && neq(lhs, rhs); }
    bool lte(Expression_Obj lhs, Expression_Obj rhs) { return cmp(lhs, rhs, Sass_OP::LTE) || eq(lhs, rhs); }
    bool gte(Expression_Obj lhs, Expression_Obj rhs) { return !cmp(lhs, rhs, Sass_OP::GTE) || eq(lhs, rhs); }

    /* colour math deprecation warning */
    void op_color_deprecation(enum Sass_OP op, std::string lsh, std::string rhs, const ParserState& pstate)
    {
      std::string op_str(
        op == Sass_OP::ADD ? "plus" :
          op == Sass_OP::DIV ? "div" :
            op == Sass_OP::SUB ? "minus" :
              op == Sass_OP::MUL ? "times" : ""
      );

      std::string msg("The operation `" + lsh + " " + op_str + " " + rhs + "` is deprecated and will be an error in future versions.");
      std::string tail("Consider using Sass's color functions instead.\nhttp://sass-lang.com/documentation/Sass/Script/Functions.html#other_color_functions");

      deprecated(msg, tail, false, pstate);
    }

    /* static function, throws OperationError, has no traces but optional pstate for returned value */
    Value_Ptr op_strings(Sass::Operand operand, Value& lhs, Value& rhs, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed)
    {
      enum Sass_OP op = operand.operand;

      String_Quoted_Ptr lqstr = Cast<String_Quoted>(&lhs);
      String_Quoted_Ptr rqstr = Cast<String_Quoted>(&rhs);

      std::string lstr(lqstr ? lqstr->value() : lhs.to_string(opt));
      std::string rstr(rqstr ? rqstr->value() : rhs.to_string(opt));

      if (Cast<Null>(&lhs)) throw Exception::InvalidNullOperation(&lhs, &rhs, op);
      if (Cast<Null>(&rhs)) throw Exception::InvalidNullOperation(&lhs, &rhs, op);

      std::string sep;
      switch (op) {
        case Sass_OP::ADD: sep = "";   break;
        case Sass_OP::SUB: sep = "-";  break;
        case Sass_OP::DIV: sep = "/";  break;
        case Sass_OP::EQ:  sep = "=="; break;
        case Sass_OP::NEQ: sep = "!="; break;
        case Sass_OP::LT:  sep = "<";  break;
        case Sass_OP::GT:  sep = ">";  break;
        case Sass_OP::LTE: sep = "<="; break;
        case Sass_OP::GTE: sep = ">="; break;
        default:
          throw Exception::UndefinedOperation(&lhs, &rhs, op);
        break;
      }

      if (op == Sass_OP::ADD) {
        // create string that might be quoted on output (but do not unquote what we pass)
        return SASS_MEMORY_NEW(String_Quoted, pstate, lstr + rstr, 0, false, true);
      }

      // add whitespace around operator
      // but only if result is not delayed
      if (sep != "" && delayed == false) {
        if (operand.ws_before) sep = " " + sep;
        if (operand.ws_after) sep = sep + " ";
      }

      if (op == Sass_OP::SUB || op == Sass_OP::DIV) {
        if (lqstr && lqstr->quote_mark()) lstr = quote(lstr);
        if (rqstr && rqstr->quote_mark()) rstr = quote(rstr);
      }

      return SASS_MEMORY_NEW(String_Constant, pstate, lstr + sep + rstr);
    }

    /* static function, throws OperationError, has no traces but optional pstate for returned value */
    Value_Ptr op_colors(enum Sass_OP op, const Color& lhs, const Color& rhs, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed)
    {

      if (lhs.a() != rhs.a()) {
        throw Exception::AlphaChannelsNotEqual(&lhs, &rhs, op);
      }
      if ((op == Sass_OP::DIV || op == Sass_OP::MOD) && (!rhs.r() || !rhs.g() || !rhs.b())) {
        throw Exception::ZeroDivisionError(lhs, rhs);
      }

      op_color_deprecation(op, lhs.to_string(), rhs.to_string(), pstate);

      return SASS_MEMORY_NEW(Color,
                             pstate,
                             ops[op](lhs.r(), rhs.r()),
                             ops[op](lhs.g(), rhs.g()),
                             ops[op](lhs.b(), rhs.b()),
                             lhs.a());
    }

    /* static function, throws OperationError, has no traces but optional pstate for returned value */
    Value_Ptr op_numbers(enum Sass_OP op, const Number& lhs, const Number& rhs, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed)
    {
      double lval = lhs.value();
      double rval = rhs.value();

      if (op == Sass_OP::MOD && rval == 0) {
        return SASS_MEMORY_NEW(String_Quoted, pstate, "NaN");
      }

      if (op == Sass_OP::DIV && rval == 0) {
        std::string result(lval ? "Infinity" : "NaN");
        return SASS_MEMORY_NEW(String_Quoted, pstate, result);
      }

      size_t l_n_units = lhs.numerators.size();
      size_t l_d_units = lhs.numerators.size();
      size_t r_n_units = rhs.denominators.size();
      size_t r_d_units = rhs.denominators.size();
      // optimize out the most common and simplest case
      if (l_n_units == r_n_units && l_d_units == r_d_units) {
        if (l_n_units + l_d_units <= 1 && r_n_units + r_d_units <= 1) {
          if (lhs.numerators == rhs.numerators) {
            if (lhs.denominators == rhs.denominators) {
              Number_Ptr v = SASS_MEMORY_COPY(&lhs);
              v->value(ops[op](lval, rval));
              return v;
            }
          }
        }
      }

      Number_Obj v = SASS_MEMORY_COPY(&lhs);

      if (lhs.is_unitless() && (op == Sass_OP::ADD || op == Sass_OP::SUB || op == Sass_OP::MOD)) {
        v->numerators = rhs.numerators;
        v->denominators = rhs.denominators;
      }

      if (op == Sass_OP::MUL) {
        v->value(ops[op](lval, rval));
        v->numerators.insert(v->numerators.end(),
          rhs.numerators.begin(), rhs.numerators.end()
        );
        v->denominators.insert(v->denominators.end(),
          rhs.denominators.begin(), rhs.denominators.end()
        );
        v->reduce();
      }
      else if (op == Sass_OP::DIV) {
        v->value(ops[op](lval, rval));
        v->numerators.insert(v->numerators.end(),
          rhs.denominators.begin(), rhs.denominators.end()
        );
        v->denominators.insert(v->denominators.end(),
          rhs.numerators.begin(), rhs.numerators.end()
        );
        v->reduce();
      }
      else {
        Number ln(lhs), rn(rhs);
        ln.reduce(); rn.reduce();
        double f(rn.convert_factor(ln));
        v->value(ops[op](lval, rn.value() * f));
      }

      v->pstate(pstate);
      return v.detach();
    }

    /* static function, throws OperationError, has no traces but optional pstate for returned value */
    Value_Ptr op_number_color(enum Sass_OP op, const Number& lhs, const Color& rhs, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed)
    {
      double lval = lhs.value();

      switch (op) {
        case Sass_OP::ADD:
        case Sass_OP::MUL: {
          op_color_deprecation(op, lhs.to_string(), rhs.to_string(opt), pstate);
          return SASS_MEMORY_NEW(Color,
                                pstate,
                                ops[op](lval, rhs.r()),
                                ops[op](lval, rhs.g()),
                                ops[op](lval, rhs.b()),
                                rhs.a());
        }
        case Sass_OP::SUB:
        case Sass_OP::DIV: {
          std::string color(rhs.to_string(opt));
          op_color_deprecation(op, lhs.to_string(), color, pstate);
          return SASS_MEMORY_NEW(String_Quoted,
                                pstate,
                                lhs.to_string(opt)
                                + sass_op_separator(op)
                                + color);
        }
        default: break;
      }
      throw Exception::UndefinedOperation(&lhs, &rhs, op);
    }

    /* static function, throws OperationError, has no traces but optional pstate for returned value */
    Value_Ptr op_color_number(enum Sass_OP op, const Color& lhs, const Number& rhs, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed)
    {
      double rval = rhs.value();

      if ((op == Sass_OP::DIV || op == Sass_OP::DIV) && rval == 0) {
        // comparison of Fixnum with Float failed?
        throw Exception::ZeroDivisionError(lhs, rhs);
      }

      op_color_deprecation(op, lhs.to_string(), rhs.to_string(), pstate);

      return SASS_MEMORY_NEW(Color,
                            pstate,
                            ops[op](lhs.r(), rval),
                            ops[op](lhs.g(), rval),
                            ops[op](lhs.b(), rval),
                            lhs.a());
    }

  }

}
