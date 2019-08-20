This document is mainly intended for developers!

# Documenting some of the source map internals

Since source maps are somewhat a black box to all LibSass maintainers, [I](@mgreter) will try to document my findings with source maps in LibSass, as I come across them. This document will also brievely explain how LibSass parses the source and how it outputs the result.

The main storage for SourceMap mappings is the `mappings` vector:

```
# in source_map.hpp
vector<Mapping> mappings
# in mappings.hpp
struct Mapping ...
  Position original_position;
  Position generated_position;
```

## Every parsed token has its source associated

LibSass uses a lexical parser. Whenever LibSass finds a token of interest, it creates a specific `AST_Node`, which will hold a reference to the input source with line/column information. `AST_Node` is the base class for all parsed items. They are declared in `ast.hpp` and are used in `parser.hpp`. Here a simple example:

```
if (lex< custom_property_name >()) {
  Sass::String* prop = new (ctx.mem) String_Constant(path, source_position, lexed);
  return new (ctx.mem) Declaration(path, prop->position(), prop, ...);
}
```

## How is the `source_position` calculated

This is automatically done with `lex` in `parser.hpp`. Whenever something is lexed, the `source_position` is updated. But be aware that `source_position` points to the begining of the parsed text. If you need a mapping for the position where the parsing ended, you need to add another call to `lex` (to match nothing)!

```
lex< exactly < empty_str > >();
end = new (ctx.mem) String_Constant(path, source_position, lexed);
```

## How are mappings for the output created

So far we have collected all needed data for all tokens in the input stream. We can now use this information to create mappings when we put things into the output stream. Mappings are created via the `add_mappings` method:

```
# in source_map.hpp
void add_mapping(AST_Node* node);
```

This method is called in two places:
- `Inspect::append_to_buffer`
- `Output_[Nested|Compressed]::append_to_buffer`

Mappings can only be created for things that have been parsed into a `AST_Node`. Otherwise we do not have the information to create the mappings, which is the reason why LibSass currently only maps the most important tokens in source maps.
