#include <assert.h>
#include <sstream>

#include "node.hpp"
#include "parser.hpp"


#define STATIC_ARRAY_SIZE(array) (sizeof((array))/sizeof((array[0])))


namespace Sass {

  Context ctx = Context::Data();

  const char* const ROUNDTRIP_TESTS[] = {
    NULL,
    "~",
    "CMPD",
    "~ CMPD",
    "CMPD >",
    "> > CMPD",
    "CMPD ~ ~",
    "> + CMPD1.CMPD2 > ~",
    "> + CMPD1.CMPD2 CMPD3.CMPD4 > ~",
    "+ CMPD1 CMPD2 ~ CMPD3 + CMPD4 > CMPD5 > ~"
  };



  static Complex_Selector* createComplexSelector(std::string src) {
    std::string temp(src);
    temp += ";";
    return (*Parser::from_c_str(temp.c_str(), ctx, "", Position()).parse_selector_list())[0];
  }


  void roundtripTest(const char* toTest) {

    // Create the initial selector

    Complex_Selector* pOrigSelector = NULL;
    if (toTest) {
      pOrigSelector = createComplexSelector(toTest);
    }

    std::string expected(pOrigSelector ? pOrigSelector->to_string() : "NULL");


    // Roundtrip the selector into a node and back

    Node node = complexSelectorToNode(pOrigSelector, ctx);

    std::stringstream nodeStringStream;
    nodeStringStream << node;
    std::string nodeString = nodeStringStream.str();
    cout << "ASNODE: " << node << endl;

    Complex_Selector* pNewSelector = nodeToComplexSelector(node, ctx);

    // Show the result

    std::string result(pNewSelector ? pNewSelector->to_string() : "NULL");

    cout << "SELECTOR: " << expected << endl;
    cout << "NEW SELECTOR:   " << result << endl;


    // Test that they are equal using the equality operator

    assert( (!pOrigSelector && !pNewSelector ) || (pOrigSelector && pNewSelector) );
    if (pOrigSelector) {
      assert( *pOrigSelector == *pNewSelector );
    }


    // Test that they are equal by comparing the string versions of the selectors

    assert(expected == result);

  }


  int main() {
    for (int index = 0; index < STATIC_ARRAY_SIZE(ROUNDTRIP_TESTS); index++) {
      const char* const toTest = ROUNDTRIP_TESTS[index];
      cout << "\nINPUT STRING: " << (toTest ? toTest : "NULL") << endl;
      roundtripTest(toTest);
    }

    cout << "\nTesting Done.\n";
  }


}
