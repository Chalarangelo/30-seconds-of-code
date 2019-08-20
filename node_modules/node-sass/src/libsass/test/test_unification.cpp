#include "../ast.hpp"
#include "../context.hpp"
#include "../parser.hpp"
#include <string>

using namespace Sass;

Context ctx = Context(Context::Data());

Compound_Selector* selector(std::string src)
{ return Parser::from_c_str(src.c_str(), ctx, "", Position()).parse_compound_selector(); }

void unify(std::string lhs, std::string rhs)
{
  Compound_Selector* unified = selector(lhs + ";")->unify_with(selector(rhs + ";"), ctx);
  std::cout << lhs << " UNIFIED WITH " << rhs << " =\t" << (unified ? unified->to_string() : "NOTHING") << std::endl;
}

int main()
{
  unify(".foo", ".foo.bar");
  unify("div:nth-of-type(odd)", "div:first-child");
  unify("div", "span:whatever");
  unify("div", "span");
  unify("foo:bar::after", "foo:bar::first-letter");
  unify(".foo#bar.hux", ".hux.foo#bar");
  unify(".foo#bar.hux", ".hux.foo#baz");
  unify("*:blah:fudge", "p:fudge:blah");

  return 0;
}
