#ifndef SASS_SASS_UTIL_H
#define SASS_SASS_UTIL_H

#include "ast.hpp"
#include "node.hpp"
#include "debug.hpp"

namespace Sass {




  /*
   This is for ports of functions in the Sass:Util module.
   */


  /*
    # Return a Node collection of all possible paths through the given Node collection of Node collections.
    #
    # @param arrs [NodeCollection<NodeCollection<Node>>]
    # @return [NodeCollection<NodeCollection<Node>>]
    #
    # @example
    #   paths([[1, 2], [3, 4], [5]]) #=>
    #     # [[1, 3, 5],
    #     #  [2, 3, 5],
    #     #  [1, 4, 5],
    #     #  [2, 4, 5]]
  */
  Node paths(const Node& arrs);


  /*
  This class is a default implementation of a Node comparator that can be passed to the lcs function below.
  It uses operator== for equality comparision. It then returns one if the Nodes are equal.
  */
  class DefaultLcsComparator {
  public:
    bool operator()(const Node& one, const Node& two, Node& out) const {
      // TODO: Is this the correct C++ interpretation?
      // block ||= proc {|a, b| a == b && a}
      if (one == two) {
        out = one;
        return true;
      }

      return false;
    }
  };


  typedef std::vector<std::vector<int> > LCSTable;


  /*
  This is the equivalent of ruby's Sass::Util.lcs_backtrace.

  # Computes a single longest common subsequence for arrays x and y.
  # Algorithm from http://en.wikipedia.org/wiki/Longest_common_subsequence_problem#Reading_out_an_LCS
  */
  template<typename ComparatorType>
  Node lcs_backtrace(const LCSTable& c, const Node& x, const Node& y, int i, int j, const ComparatorType& comparator) {
    DEBUG_PRINTLN(LCS, "LCSBACK: X=" << x << " Y=" << y << " I=" << i << " J=" << j)

    if (i == 0 || j == 0) {
      DEBUG_PRINTLN(LCS, "RETURNING EMPTY")
      return Node::createCollection();
    }

    NodeDeque& xChildren = *(x.collection());
    NodeDeque& yChildren = *(y.collection());

    Node compareOut = Node::createNil();
    if (comparator(xChildren[i], yChildren[j], compareOut)) {
      DEBUG_PRINTLN(LCS, "RETURNING AFTER ELEM COMPARE")
      Node result = lcs_backtrace(c, x, y, i - 1, j - 1, comparator);
      result.collection()->push_back(compareOut);
      return result;
    }

    if (c[i][j - 1] > c[i - 1][j]) {
      DEBUG_PRINTLN(LCS, "RETURNING AFTER TABLE COMPARE")
      return lcs_backtrace(c, x, y, i, j - 1, comparator);
    }

    DEBUG_PRINTLN(LCS, "FINAL RETURN")
    return lcs_backtrace(c, x, y, i - 1, j, comparator);
  }


  /*
  This is the equivalent of ruby's Sass::Util.lcs_table.

  # Calculates the memoization table for the Least Common Subsequence algorithm.
  # Algorithm from http://en.wikipedia.org/wiki/Longest_common_subsequence_problem#Computing_the_length_of_the_LCS
  */
  template<typename ComparatorType>
  void lcs_table(const Node& x, const Node& y, const ComparatorType& comparator, LCSTable& out) {
    DEBUG_PRINTLN(LCS, "LCSTABLE: X=" << x << " Y=" << y)

    NodeDeque& xChildren = *(x.collection());
    NodeDeque& yChildren = *(y.collection());

    LCSTable c(xChildren.size(), std::vector<int>(yChildren.size()));

    // These shouldn't be necessary since the vector will be initialized to 0 already.
    // x.size.times {|i| c[i][0] = 0}
    // y.size.times {|j| c[0][j] = 0}

    for (size_t i = 1; i < xChildren.size(); i++) {
      for (size_t j = 1; j < yChildren.size(); j++) {
        Node compareOut = Node::createNil();

        if (comparator(xChildren[i], yChildren[j], compareOut)) {
          c[i][j] = c[i - 1][j - 1] + 1;
        } else {
          c[i][j] = std::max(c[i][j - 1], c[i - 1][j]);
        }
      }
    }

    out = c;
  }


  /*
  This is the equivalent of ruby's Sass::Util.lcs.

  # Computes a single longest common subsequence for `x` and `y`.
  # If there are more than one longest common subsequences,
  # the one returned is that which starts first in `x`.

  # @param x [NodeCollection]
  # @param y [NodeCollection]
  # @comparator An equality check between elements of `x` and `y`.
  # @return [NodeCollection] The LCS

  http://en.wikipedia.org/wiki/Longest_common_subsequence_problem
  */
  template<typename ComparatorType>
  Node lcs(Node& x, Node& y, const ComparatorType& comparator) {
    DEBUG_PRINTLN(LCS, "LCS: X=" << x << " Y=" << y)

    Node newX = Node::createCollection();
    newX.collection()->push_back(Node::createNil());
    newX.plus(x);

    Node newY = Node::createCollection();
    newY.collection()->push_back(Node::createNil());
    newY.plus(y);

    LCSTable table;
    lcs_table(newX, newY, comparator, table);

    return lcs_backtrace(table, newX, newY, static_cast<int>(newX.collection()->size()) - 1, static_cast<int>(newY.collection()->size()) - 1, comparator);
  }


  /*
  This is the equivalent of ruby sass' Sass::Util.flatten and [].flatten.
  Sass::Util.flatten requires the number of levels to flatten, while
  [].flatten doesn't and will flatten the entire array. This function
  supports both.

  # Flattens the first `n` nested arrays. If n == -1, all arrays will be flattened
  #
  # @param arr [NodeCollection] The array to flatten
  # @param n [int] The number of levels to flatten
  # @return [NodeCollection] The flattened array
  */
  Node flatten(Node& arr, int n = -1);


  /*
  This is the equivalent of ruby's Sass::Util.group_by_to_a.

  # Performs the equivalent of `enum.group_by.to_a`, but with a guaranteed
  # order. Unlike [#hash_to_a], the resulting order isn't sorted key order;
  # instead, it's the same order as `#group_by` has under Ruby 1.9 (key
  # appearance order).
  #
  # @param enum [Enumerable]
  # @return [Array<[Object, Array]>] An array of pairs.

  TODO: update @param and @return once I know what those are.

  The following is the modified version of the ruby code that was more portable to C++. You
  should be able to drop it into ruby 3.2.19 and get the same results from ruby sass.

    def group_by_to_a(enum, &block)
      order = {}

      arr = []

      grouped = {}

      for e in enum do
        key = block[e]
        unless order.include?(key)
          order[key] = order.size
        end

        if not grouped.has_key?(key) then
          grouped[key] = [e]
        else
          grouped[key].push(e)
        end
      end

      grouped.each do |key, vals|
        arr[order[key]] = [key, vals]
      end

      arr
    end

  */
  template<typename EnumType, typename KeyType, typename KeyFunctorType>
  void group_by_to_a(std::vector<EnumType>& enumeration, KeyFunctorType& keyFunc, std::vector<std::pair<KeyType, std::vector<EnumType> > >& arr /*out*/) {

    std::map<unsigned int, KeyType> order;

    std::map<size_t, std::vector<EnumType> > grouped;

    for (typename std::vector<EnumType>::iterator enumIter = enumeration.begin(), enumIterEnd = enumeration.end(); enumIter != enumIterEnd; enumIter++) {
      EnumType& e = *enumIter;

      KeyType key = keyFunc(e);

      if (grouped.find(key->hash()) == grouped.end()) {
        order.insert(std::make_pair((unsigned int)order.size(), key));

        std::vector<EnumType> newCollection;
        newCollection.push_back(e);
        grouped.insert(std::make_pair(key->hash(), newCollection));
      } else {
        std::vector<EnumType>& collection = grouped.at(key->hash());
        collection.push_back(e);
      }
    }

    for (unsigned int index = 0; index < order.size(); index++) {
      KeyType& key = order.at(index);
      std::vector<EnumType>& values = grouped.at(key->hash());

      std::pair<KeyType, std::vector<EnumType> > grouping = std::make_pair(key, values);

      arr.push_back(grouping);
    }
  }


}

#endif
