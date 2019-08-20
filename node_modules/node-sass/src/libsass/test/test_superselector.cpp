#include "../ast.hpp"
#include "../context.hpp"
#include "../parser.hpp"
#include <string>

using namespace Sass;

Context ctx = Context(Context::Data());

Compound_Selector* compound_selector(std::string src)
{ return Parser::from_c_str(src.c_str(), ctx, "", Position()).parse_compound_selector(); }

Complex_Selector* complex_selector(std::string src)
{ return Parser::from_c_str(src.c_str(), ctx, "", Position()).parse_complex_selector(false); }

void check_compound(std::string s1, std::string s2)
{
  std::cout << "Is "
       << s1
       << " a superselector of "
       << s2
       << "?\t"
       << compound_selector(s1 + ";")->is_superselector_of(compound_selector(s2 + ";"))
       << std::endl;
}

void check_complex(std::string s1, std::string s2)
{
  std::cout << "Is "
       << s1
       << " a superselector of "
       << s2
       << "?\t"
       << complex_selector(s1 + ";")->is_superselector_of(complex_selector(s2 + ";"))
       << std::endl;
}

int main()
{
  check_compound(".foo", ".foo.bar");
  check_compound(".foo.bar", ".foo");
  check_compound(".foo.bar", "div.foo");
  check_compound(".foo", "div.foo");
  check_compound("div.foo", ".foo");
  check_compound("div.foo", "div.bar.foo");
  check_compound("p.foo", "div.bar.foo");
  check_compound(".hux", ".mumble");

  std::cout << std::endl;

  check_complex(".foo ~ .bar", ".foo + .bar");
  check_complex(".foo .bar", ".foo + .bar");
  check_complex(".foo .bar", ".foo > .bar");
  check_complex(".foo .bar > .hux", ".foo.a .bar.b > .hux");
  check_complex(".foo ~ .bar .hux", ".foo.a + .bar.b > .hux");
  check_complex(".foo", ".bar .foo");
  check_complex(".foo", ".foo.a");
  check_complex(".foo.bar", ".foo");
  check_complex(".foo .bar .hux", ".bar .hux");
  check_complex(".foo ~ .bar .hux.x", ".foo.a + .bar.b > .hux.y");
  check_complex(".foo ~ .bar .hux", ".foo.a + .bar.b > .mumble");
  check_complex(".foo + .bar", ".foo ~ .bar");
  check_complex("a c e", "a b c d e");
  check_complex("c a e", "a b c d e");

  return 0;
}


