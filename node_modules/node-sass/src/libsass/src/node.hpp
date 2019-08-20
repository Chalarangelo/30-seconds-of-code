#ifndef SASS_NODE_H
#define SASS_NODE_H

#include <deque>
#include <memory>

#include "ast.hpp"


namespace Sass {




  class Context;

  /*
   There are a lot of stumbling blocks when trying to port the ruby extend code to C++. The biggest is the choice of
   data type. The ruby code will pretty seamlessly switch types between an Array<SimpleSequence or Op> (libsass'
   equivalent is the Complex_Selector) to a Sequence, which contains more metadata about the sequence than just the
   selector info. They also have the ability to have arbitrary nestings of arrays like [1, [2]], which is hard to
   implement using Array equivalents in C++ (like the deque or vector). They also have the ability to include nil
   in the arrays, like [1, nil, 3], which has potential semantic differences than an empty array [1, [], 3]. To be
   able to represent all of these as unique cases, we need to create a tree of variant objects. The tree nature allows
   the inconsistent nesting levels. The variant nature (while making some of the C++ code uglier) allows the code to
   more closely match the ruby code, which is a huge benefit when attempting to implement an complex algorithm like
   the Extend operator.

   Note that the current libsass data model also pairs the combinator with the Complex_Selector that follows it, but
   ruby sass has no such restriction, so we attempt to create a data structure that can handle them split apart.
   */

  class Node;
  typedef std::deque<Node> NodeDeque;
  typedef std::shared_ptr<NodeDeque> NodeDequePtr;

  class Node {
  public:
    enum TYPE {
      SELECTOR,
      COMBINATOR,
      COLLECTION,
      NIL
    };

    TYPE type() const { return mType; }
    bool isCombinator() const { return mType == COMBINATOR; }
    bool isSelector() const { return mType == SELECTOR; }
    bool isCollection() const { return mType == COLLECTION; }
    bool isNil() const { return mType == NIL; }
    bool got_line_feed;

    Complex_Selector::Combinator combinator() const { return mCombinator; }

    Complex_Selector_Obj selector() { return mpSelector; }
    Complex_Selector_Obj selector() const { return mpSelector; }

    NodeDequePtr collection() { return mpCollection; }
    const NodeDequePtr collection() const { return mpCollection; }

    static Node createCombinator(const Complex_Selector::Combinator& combinator);

    // This method will klone the selector, stripping off the tail and combinator
    static Node createSelector(const Complex_Selector& pSelector);

    static Node createCollection();
    static Node createCollection(const NodeDeque& values);

    static Node createNil();
    static Node naiveTrim(Node& seqses);

    Node klone() const;

    bool operator==(const Node& rhs) const;
    inline bool operator!=(const Node& rhs) const { return !(*this == rhs); }


    /*
    COLLECTION FUNCTIONS

    Most types don't need any helper methods (nil and combinator due to their simplicity and
    selector due to the fact that we leverage the non-node selector code on the Complex_Selector
    whereever possible). The following methods are intended to be called on Node objects whose
    type is COLLECTION only.
    */

    // rhs and this must be node collections. Shallow copy the nodes from rhs to the end of this.
    // This function DOES NOT remove the nodes from rhs.
    void plus(Node& rhs);

    // potentialChild must be a node collection of selectors/combinators. this must be a collection
    // of collections of nodes/combinators. This method checks if potentialChild is a child of this
    // Node.
    bool contains(const Node& potentialChild) const;

  private:
    // Private constructor; Use the static methods (like createCombinator and createSelector)
    // to instantiate this object. This is more expressive, and it allows us to break apart each
    // case into separate functions.
    Node(const TYPE& type, Complex_Selector::Combinator combinator, Complex_Selector_Ptr pSelector, NodeDequePtr& pCollection);

    TYPE mType;

    // TODO: can we union these to save on memory?
    Complex_Selector::Combinator mCombinator;
    Complex_Selector_Obj mpSelector;
    NodeDequePtr mpCollection;
  };

#ifdef DEBUG
  std::ostream& operator<<(std::ostream& os, const Node& node);
#endif
  Node complexSelectorToNode(Complex_Selector_Ptr pToConvert);
  Complex_Selector_Ptr nodeToComplexSelector(const Node& toConvert);

}

#endif
