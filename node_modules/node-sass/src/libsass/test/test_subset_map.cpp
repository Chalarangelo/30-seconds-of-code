#include <string>
#include <iostream>
#include <assert.h>
#include "../subset_map.hpp"

Subset_Map<std::string, std::string> ssm;

string toString(std::vector<std::string> v);
string toString(std::vector<std::pair<std::string, std::vector<std::string>>> v);
void assertEqual(string std::sExpected, std::string sResult);

void setup() {
  ssm.clear();

  //@ssm[Set[1, 2]] = "Foo"
  std::vector<std::string> s1;
  s1.push_back("1");
  s1.push_back("2");
  ssm.put(s1, "Foo");

  //@ssm[Set["fizz", "fazz"]] = "Bar"
  std::vector<std::string> s2;
  s2.push_back("fizz");
  s2.push_back("fazz");
  ssm.put(s2, "Bar");

  //@ssm[Set[:foo, :bar]] = "Baz"
  std::vector<std::string> s3;
  s3.push_back(":foo");
  s3.push_back(":bar");
  ssm.put(s3, "Baz");

  //@ssm[Set[:foo, :bar, :baz]] = "Bang"
  std::vector<std::string> s4;
  s4.push_back(":foo");
  s4.push_back(":bar");
  s4.push_back(":baz");
  ssm.put(s4, "Bang");

  //@ssm[Set[:bip, :bop, :blip]] = "Qux"
  std::vector<std::string> s5;
  s5.push_back(":bip");
  s5.push_back(":bop");
  s5.push_back(":blip");
  ssm.put(s5, "Qux");

  //@ssm[Set[:bip, :bop]] = "Thram"
  std::vector<std::string> s6;
  s6.push_back(":bip");
  s6.push_back(":bop");
  ssm.put(s6, "Thram");
}

void testEqualKeys() {
  std::cout << "testEqualKeys" << std::endl;

  //assert_equal [["Foo", Set[1, 2]]], @ssm.get(Set[1, 2])
  std::vector<std::string> k1;
  k1.push_back("1");
  k1.push_back("2");
  assertEqual("[[Foo, Set[1, 2]]]", toString(ssm.get_kv(k1)));

  //assert_equal [["Bar", Set["fizz", "fazz"]]], @ssm.get(Set["fizz", "fazz"])
  std::vector<std::string> k2;
  k2.push_back("fizz");
  k2.push_back("fazz");
  assertEqual("[[Bar, Set[fizz, fazz]]]", toString(ssm.get_kv(k2)));

  std::cout << std::endl;
}

void testSubsetKeys() {
  std::cout << "testSubsetKeys" << std::endl;

  //assert_equal [["Foo", Set[1, 2]]], @ssm.get(Set[1, 2, "fuzz"])
  std::vector<std::string> k1;
  k1.push_back("1");
  k1.push_back("2");
  k1.push_back("fuzz");
  assertEqual("[[Foo, Set[1, 2]]]", toString(ssm.get_kv(k1)));

  //assert_equal [["Bar", Set["fizz", "fazz"]]], @ssm.get(Set["fizz", "fazz", 3])
  std::vector<std::string> k2;
  k2.push_back("fizz");
  k2.push_back("fazz");
  k2.push_back("3");
  assertEqual("[[Bar, Set[fizz, fazz]]]", toString(ssm.get_kv(k2)));

  std::cout << std::endl;
}

void testSupersetKeys() {
  std::cout << "testSupersetKeys" << std::endl;

  //assert_equal [], @ssm.get(Set[1])
  std::vector<std::string> k1;
  k1.push_back("1");
  assertEqual("[]", toString(ssm.get_kv(k1)));

  //assert_equal [], @ssm.get(Set[2])
  std::vector<std::string> k2;
  k2.push_back("2");
  assertEqual("[]", toString(ssm.get_kv(k2)));

  //assert_equal [], @ssm.get(Set["fizz"])
  std::vector<std::string> k3;
  k3.push_back("fizz");
  assertEqual("[]", toString(ssm.get_kv(k3)));

  //assert_equal [], @ssm.get(Set["fazz"])
  std::vector<std::string> k4;
  k4.push_back("fazz");
  assertEqual("[]", toString(ssm.get_kv(k4)));

  std::cout << std::endl;
}

void testDisjointKeys() {
  std::cout << "testDisjointKeys" << std::endl;

  //assert_equal [], @ssm.get(Set[3, 4])
  std::vector<std::string> k1;
  k1.push_back("3");
  k1.push_back("4");
  assertEqual("[]", toString(ssm.get_kv(k1)));

  //assert_equal [], @ssm.get(Set["fuzz", "frizz"])
  std::vector<std::string> k2;
  k2.push_back("fuzz");
  k2.push_back("frizz");
  assertEqual("[]", toString(ssm.get_kv(k2)));

  //assert_equal [], @ssm.get(Set["gran", 15])
  std::vector<std::string> k3;
  k3.push_back("gran");
  k3.push_back("15");
  assertEqual("[]", toString(ssm.get_kv(k3)));

  std::cout << std::endl;
}

void testSemiDisjointKeys() {
  std::cout << "testSemiDisjointKeys" << std::endl;

  //assert_equal [], @ssm.get(Set[2, 3])
  std::vector<std::string> k1;
  k1.push_back("2");
  k1.push_back("3");
  assertEqual("[]", toString(ssm.get_kv(k1)));

  //assert_equal [], @ssm.get(Set["fizz", "fuzz"])
  std::vector<std::string> k2;
  k2.push_back("fizz");
  k2.push_back("fuzz");
  assertEqual("[]", toString(ssm.get_kv(k2)));

  //assert_equal [], @ssm.get(Set[1, "fazz"])
  std::vector<std::string> k3;
  k3.push_back("1");
  k3.push_back("fazz");
  assertEqual("[]", toString(ssm.get_kv(k3)));

  std::cout << std::endl;
}

void testEmptyKeySet() {
  std::cout << "testEmptyKeySet" << std::endl;

  //assert_raises(ArgumentError) {@ssm[Set[]] = "Fail"}
  std::vector<std::string> s1;
  try {
    ssm.put(s1, "Fail");
  }
  catch (const char* &e) {
    assertEqual("internal error: subset map keys may not be empty", e);
  }
}

void testEmptyKeyGet() {
  std::cout << "testEmptyKeyGet" << std::endl;

  //assert_equal [], @ssm.get(Set[])
  std::vector<std::string> k1;
  assertEqual("[]", toString(ssm.get_kv(k1)));

  std::cout << std::endl;
}
void testMultipleSubsets() {
  std::cout << "testMultipleSubsets" << std::endl;

  //assert_equal [["Foo", Set[1, 2]], ["Bar", Set["fizz", "fazz"]]], @ssm.get(Set[1, 2, "fizz", "fazz"])
  std::vector<std::string> k1;
  k1.push_back("1");
  k1.push_back("2");
  k1.push_back("fizz");
  k1.push_back("fazz");
  assertEqual("[[Foo, Set[1, 2]], [Bar, Set[fizz, fazz]]]", toString(ssm.get_kv(k1)));

  //assert_equal [["Foo", Set[1, 2]], ["Bar", Set["fizz", "fazz"]]], @ssm.get(Set[1, 2, 3, "fizz", "fazz", "fuzz"])
  std::vector<std::string> k2;
  k2.push_back("1");
  k2.push_back("2");
  k2.push_back("3");
  k2.push_back("fizz");
  k2.push_back("fazz");
  k2.push_back("fuzz");
  assertEqual("[[Foo, Set[1, 2]], [Bar, Set[fizz, fazz]]]", toString(ssm.get_kv(k2)));

  //assert_equal [["Baz", Set[:foo, :bar]]], @ssm.get(Set[:foo, :bar])
  std::vector<std::string> k3;
  k3.push_back(":foo");
  k3.push_back(":bar");
  assertEqual("[[Baz, Set[:foo, :bar]]]", toString(ssm.get_kv(k3)));

  //assert_equal [["Baz", Set[:foo, :bar]], ["Bang", Set[:foo, :bar, :baz]]], @ssm.get(Set[:foo, :bar, :baz])
  std::vector<std::string> k4;
  k4.push_back(":foo");
  k4.push_back(":bar");
  k4.push_back(":baz");
  assertEqual("[[Baz, Set[:foo, :bar]], [Bang, Set[:foo, :bar, :baz]]]", toString(ssm.get_kv(k4)));

  std::cout << std::endl;
}
void testBracketBracket() {
  std::cout << "testBracketBracket" << std::endl;

  //assert_equal ["Foo"], @ssm[Set[1, 2, "fuzz"]]
  std::vector<std::string> k1;
  k1.push_back("1");
  k1.push_back("2");
  k1.push_back("fuzz");
  assertEqual("[Foo]", toString(ssm.get_v(k1)));

  //assert_equal ["Baz", "Bang"], @ssm[Set[:foo, :bar, :baz]]
  std::vector<std::string> k2;
  k2.push_back(":foo");
  k2.push_back(":bar");
  k2.push_back(":baz");
  assertEqual("[Baz, Bang]", toString(ssm.get_v(k2)));

  std::cout << std::endl;
}

void testKeyOrder() {
  std::cout << "testEqualKeys" << std::endl;

  //assert_equal [["Foo", Set[1, 2]]], @ssm.get(Set[2, 1])
  std::vector<std::string> k1;
  k1.push_back("2");
  k1.push_back("1");
  assertEqual("[[Foo, Set[1, 2]]]", toString(ssm.get_kv(k1)));

  std::cout << std::endl;
}

void testOrderPreserved() {
  std::cout << "testOrderPreserved" << std::endl;
  //@ssm[Set[10, 11, 12]] = 1
  std::vector<std::string> s1;
  s1.push_back("10");
  s1.push_back("11");
  s1.push_back("12");
  ssm.put(s1, "1");

  //@ssm[Set[10, 11]] = 2
  std::vector<std::string> s2;
  s2.push_back("10");
  s2.push_back("11");
  ssm.put(s2, "2");

  //@ssm[Set[11]] = 3
  std::vector<std::string> s3;
  s3.push_back("11");
  ssm.put(s3, "3");

  //@ssm[Set[11, 12]] = 4
  std::vector<std::string> s4;
  s4.push_back("11");
  s4.push_back("12");
  ssm.put(s4, "4");

  //@ssm[Set[9, 10, 11, 12, 13]] = 5
  std::vector<std::string> s5;
  s5.push_back("9");
  s5.push_back("10");
  s5.push_back("11");
  s5.push_back("12");
  s5.push_back("13");
  ssm.put(s5, "5");

  //@ssm[Set[10, 13]] = 6
  std::vector<std::string> s6;
  s6.push_back("10");
  s6.push_back("13");
  ssm.put(s6, "6");

  //assert_equal([[1, Set[10, 11, 12]], [2, Set[10, 11]], [3, Set[11]], [4, Set[11, 12]], [5, Set[9, 10, 11, 12, 13]], [6, Set[10, 13]]], @ssm.get(Set[9, 10, 11, 12, 13]))
  std::vector<std::string> k1;
  k1.push_back("9");
  k1.push_back("10");
  k1.push_back("11");
  k1.push_back("12");
  k1.push_back("13");
  assertEqual("[[1, Set[10, 11, 12]], [2, Set[10, 11]], [3, Set[11]], [4, Set[11, 12]], [5, Set[9, 10, 11, 12, 13]], [6, Set[10, 13]]]", toString(ssm.get_kv(k1)));

  std::cout << std::endl;
}
void testMultipleEqualValues() {
  std::cout << "testMultipleEqualValues" << std::endl;
  //@ssm[Set[11, 12]] = 1
  std::vector<std::string> s1;
  s1.push_back("11");
  s1.push_back("12");
  ssm.put(s1, "1");

  //@ssm[Set[12, 13]] = 2
  std::vector<std::string> s2;
  s2.push_back("12");
  s2.push_back("13");
  ssm.put(s2, "2");

  //@ssm[Set[13, 14]] = 1
  std::vector<std::string> s3;
  s3.push_back("13");
  s3.push_back("14");
  ssm.put(s3, "1");

  //@ssm[Set[14, 15]] = 1
  std::vector<std::string> s4;
  s4.push_back("14");
  s4.push_back("15");
  ssm.put(s4, "1");

  //assert_equal([[1, Set[11, 12]], [2, Set[12, 13]], [1, Set[13, 14]], [1, Set[14, 15]]], @ssm.get(Set[11, 12, 13, 14, 15]))
  std::vector<std::string> k1;
  k1.push_back("11");
  k1.push_back("12");
  k1.push_back("13");
  k1.push_back("14");
  k1.push_back("15");
  assertEqual("[[1, Set[11, 12]], [2, Set[12, 13]], [1, Set[13, 14]], [1, Set[14, 15]]]", toString(ssm.get_kv(k1)));

  std::cout << std::endl;
}

int main()
{
  std::vector<std::string> s1;
  s1.push_back("1");
  s1.push_back("2");

  std::vector<std::string> s2;
  s2.push_back("2");
  s2.push_back("3");

  std::vector<std::string> s3;
  s3.push_back("3");
  s3.push_back("4");

  ssm.put(s1, "value1");
  ssm.put(s2, "value2");
  ssm.put(s3, "value3");

  std::vector<std::string> s4;
  s4.push_back("1");
  s4.push_back("2");
  s4.push_back("3");

  std::vector<std::pair<string, std::vector<std::string> > > fetched(ssm.get_kv(s4));

  std::cout << "PRINTING RESULTS:" << std::endl;
  for (size_t i = 0, S = fetched.size(); i < S; ++i) {
    std::cout << fetched[i].first << std::endl;
  }

  Subset_Map<string, string> ssm2;
  ssm2.put(s1, "foo");
  ssm2.put(s2, "bar");
  ssm2.put(s4, "hux");

  std::vector<std::pair<string, std::vector<std::string> > > fetched2(ssm2.get_kv(s4));

  std::cout << std::endl << "PRINTING RESULTS:" << std::endl;
  for (size_t i = 0, S = fetched2.size(); i < S; ++i) {
    std::cout << fetched2[i].first << std::endl;
  }

  std::cout << "TRYING ON A SELECTOR-LIKE OBJECT" << std::endl;

  Subset_Map<string, string> sel_ssm;
  std::vector<std::string> target;
  target.push_back("desk");
  target.push_back(".wood");

  std::vector<std::string> actual;
  actual.push_back("desk");
  actual.push_back(".wood");
  actual.push_back(".mine");

  sel_ssm.put(target, "has-aquarium");
  std::vector<std::pair<string, std::vector<std::string> > > fetched3(sel_ssm.get_kv(actual));
  std::cout << "RESULTS:" << std::endl;
  for (size_t i = 0, S = fetched3.size(); i < S; ++i) {
    std::cout << fetched3[i].first << std::endl;
  }

  std::cout << std::endl;

  // BEGIN PORTED RUBY TESTS FROM /test/sass/util/subset_map_test.rb

  setup();
  testEqualKeys();
  testSubsetKeys();
  testSupersetKeys();
  testDisjointKeys();
  testSemiDisjointKeys();
  testEmptyKeySet();
  testEmptyKeyGet();
  testMultipleSubsets();
  testBracketBracket();
  testKeyOrder();

  setup();
  testOrderPreserved();

  setup();
  testMultipleEqualValues();

  return 0;
}

string toString(std::vector<std::pair<string, std::vector<std::string>>> v)
{
  std::stringstream buffer;
  buffer << "[";
  for (size_t i = 0, S = v.size(); i < S; ++i) {
    buffer << "[" << v[i].first;
    buffer << ", Set[";
    for (size_t j = 0, S = v[i].second.size(); j < S; ++j) {
      buffer << v[i].second[j];
      if (j < S-1) {
        buffer << ", ";
      }
    }
    buffer << "]]";
    if (i < S-1) {
      buffer << ", ";
    }
  }
  buffer << "]";
  return buffer.str();
}

string toString(std::vector<std::string> v)
{
  std::stringstream buffer;
  buffer << "[";
  for (size_t i = 0, S = v.size(); i < S; ++i) {
    buffer << v[i];
    if (i < S-1) {
      buffer << ", ";
    }
  }
  buffer << "]";
  return buffer.str();
}

void assertEqual(string sExpected, string sResult) {
  std::cout << "Expected: " << sExpected << std::endl;
  std::cout << "Result:   " << sResult << std::endl;
  assert(sExpected == sResult);
}
