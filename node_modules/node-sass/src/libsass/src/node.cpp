#include "sass.hpp"
#include <vector>

#include "node.hpp"
#include "context.hpp"
#include "parser.hpp"

namespace Sass {


  Node Node::createCombinator(const Complex_Selector::Combinator& combinator) {
    NodeDequePtr null;
    return Node(COMBINATOR, combinator, NULL /*pSelector*/, null /*pCollection*/);
  }


  Node Node::createSelector(const Complex_Selector& pSelector) {
    NodeDequePtr null;

    Complex_Selector_Ptr pStripped = SASS_MEMORY_COPY(&pSelector);
    pStripped->tail(NULL);
    pStripped->combinator(Complex_Selector::ANCESTOR_OF);

    Node n(SELECTOR, Complex_Selector::ANCESTOR_OF, pStripped, null /*pCollection*/);
    n.got_line_feed = pSelector.has_line_feed();
    return n;
  }


  Node Node::createCollection() {
    NodeDequePtr pEmptyCollection = std::make_shared<NodeDeque>();
    return Node(COLLECTION, Complex_Selector::ANCESTOR_OF, NULL /*pSelector*/, pEmptyCollection);
  }


  Node Node::createCollection(const NodeDeque& values) {
    NodeDequePtr pShallowCopiedCollection = std::make_shared<NodeDeque>(values);
    return Node(COLLECTION, Complex_Selector::ANCESTOR_OF, NULL /*pSelector*/, pShallowCopiedCollection);
  }


  Node Node::createNil() {
    NodeDequePtr null;
    return Node(NIL, Complex_Selector::ANCESTOR_OF, NULL /*pSelector*/, null /*pCollection*/);
  }


  Node::Node(const TYPE& type, Complex_Selector::Combinator combinator, Complex_Selector_Ptr pSelector, NodeDequePtr& pCollection)
  : got_line_feed(false), mType(type), mCombinator(combinator), mpSelector(pSelector), mpCollection(pCollection)
  { if (pSelector) got_line_feed = pSelector->has_line_feed(); }


  Node Node::klone() const {
    NodeDequePtr pNewCollection = std::make_shared<NodeDeque>();
    if (mpCollection) {
      for (NodeDeque::iterator iter = mpCollection->begin(), iterEnd = mpCollection->end(); iter != iterEnd; iter++) {
        Node& toClone = *iter;
        pNewCollection->push_back(toClone.klone());
      }
    }

    Node n(mType, mCombinator, mpSelector ? SASS_MEMORY_COPY(mpSelector) : NULL, pNewCollection);
    n.got_line_feed = got_line_feed;
    return n;
  }


  bool Node::contains(const Node& potentialChild) const {
    bool found = false;

    for (NodeDeque::iterator iter = mpCollection->begin(), iterEnd = mpCollection->end(); iter != iterEnd; iter++) {
      Node& toTest = *iter;

      if (toTest == potentialChild) {
        found = true;
        break;
      }
    }

    return found;
  }


  bool Node::operator==(const Node& rhs) const {
    if (this->type() != rhs.type()) {
      return false;
    }

    if (this->isCombinator()) {

      return this->combinator() == rhs.combinator();

    } else if (this->isNil()) {

      return true; // no state to check

    } else if (this->isSelector()){

      return *this->selector() == *rhs.selector();

    } else if (this->isCollection()) {

      if (this->collection()->size() != rhs.collection()->size()) {
        return false;
      }

      for (NodeDeque::iterator lhsIter = this->collection()->begin(), lhsIterEnd = this->collection()->end(),
           rhsIter = rhs.collection()->begin(); lhsIter != lhsIterEnd; lhsIter++, rhsIter++) {

        if (*lhsIter != *rhsIter) {
          return false;
        }

      }

      return true;

    }

    // We shouldn't get here.
    throw "Comparing unknown node types. A new type was probably added and this method wasn't implemented for it.";
  }


  void Node::plus(Node& rhs) {
    if (!this->isCollection() || !rhs.isCollection()) {
      throw "Both the current node and rhs must be collections.";
    }
    this->collection()->insert(this->collection()->end(), rhs.collection()->begin(), rhs.collection()->end());
  }

#ifdef DEBUG
  std::ostream& operator<<(std::ostream& os, const Node& node) {

    if (node.isCombinator()) {

      switch (node.combinator()) {
        case Complex_Selector::ANCESTOR_OF: os << "\" \""; break;
        case Complex_Selector::PARENT_OF:   os << "\">\""; break;
        case Complex_Selector::PRECEDES:    os << "\"~\""; break;
        case Complex_Selector::ADJACENT_TO: os << "\"+\""; break;
        case Complex_Selector::REFERENCE: os    << "\"/\""; break;
      }

    } else if (node.isNil()) {

      os << "nil";

    } else if (node.isSelector()){

      os << node.selector()->head()->to_string();

    } else if (node.isCollection()) {

      os << "[";

      for (NodeDeque::iterator iter = node.collection()->begin(), iterBegin = node.collection()->begin(), iterEnd = node.collection()->end(); iter != iterEnd; iter++) {
        if (iter != iterBegin) {
          os << ", ";
        }

        os << (*iter);
      }

      os << "]";

    }

    return os;

  }
#endif


  Node complexSelectorToNode(Complex_Selector_Ptr pToConvert) {
    if (pToConvert == NULL) {
      return Node::createNil();
    }
    Node node = Node::createCollection();
    node.got_line_feed = pToConvert->has_line_feed();
    bool has_lf = pToConvert->has_line_feed();

    // unwrap the selector from parent ref
    if (pToConvert->head() && pToConvert->head()->has_parent_ref()) {
      Complex_Selector_Obj tail = pToConvert->tail();
      if (tail) tail->has_line_feed(pToConvert->has_line_feed());
      pToConvert = tail;
    }

    while (pToConvert) {

      bool empty_parent_ref = pToConvert->head() && pToConvert->head()->is_empty_reference();

      // the first Complex_Selector may contain a dummy head pointer, skip it.
      if (pToConvert->head() && !empty_parent_ref) {
        node.collection()->push_back(Node::createSelector(*pToConvert));
        if (has_lf) node.collection()->back().got_line_feed = has_lf;
        if (pToConvert->head() || empty_parent_ref) {
          if (pToConvert->tail()) {
            pToConvert->tail()->has_line_feed(pToConvert->has_line_feed());
          }
        }
        has_lf = false;
      }

      if (pToConvert->combinator() != Complex_Selector::ANCESTOR_OF) {
        node.collection()->push_back(Node::createCombinator(pToConvert->combinator()));
        if (has_lf) node.collection()->back().got_line_feed = has_lf;
        has_lf = false;
      }

      if (pToConvert && empty_parent_ref && pToConvert->tail()) {
        // pToConvert->tail()->has_line_feed(pToConvert->has_line_feed());
      }

      pToConvert = pToConvert->tail();
    }

    return node;
  }


  Complex_Selector_Ptr nodeToComplexSelector(const Node& toConvert) {
    if (toConvert.isNil()) {
      return NULL;
    }


    if (!toConvert.isCollection()) {
      throw "The node to convert to a Complex_Selector_Ptr must be a collection type or nil.";
    }


    NodeDeque& childNodes = *toConvert.collection();

    std::string noPath("");
    Complex_Selector_Obj pFirst = SASS_MEMORY_NEW(Complex_Selector, ParserState("[NODE]"), Complex_Selector::ANCESTOR_OF, NULL, NULL);

    Complex_Selector_Obj pCurrent = pFirst;

    if (toConvert.isSelector()) pFirst->has_line_feed(toConvert.got_line_feed);
    if (toConvert.isCombinator()) pFirst->has_line_feed(toConvert.got_line_feed);

    for (NodeDeque::iterator childIter = childNodes.begin(), childIterEnd = childNodes.end(); childIter != childIterEnd; childIter++) {

      Node& child = *childIter;

      if (child.isSelector()) {
        // JMA - need to clone the selector, because they can end up getting shared across Node
        // collections, and can result in an infinite loop during the call to parentSuperselector()
        pCurrent->tail(SASS_MEMORY_COPY(child.selector()));
        // if (child.got_line_feed) pCurrent->has_line_feed(child.got_line_feed);
        pCurrent = pCurrent->tail();
      } else if (child.isCombinator()) {
        pCurrent->combinator(child.combinator());
        if (child.got_line_feed) pCurrent->has_line_feed(child.got_line_feed);

        // if the next node is also a combinator, create another Complex_Selector to hold it so it doesn't replace the current combinator
        if (childIter+1 != childIterEnd) {
          Node& nextNode = *(childIter+1);
          if (nextNode.isCombinator()) {
            pCurrent->tail(SASS_MEMORY_NEW(Complex_Selector, ParserState("[NODE]"), Complex_Selector::ANCESTOR_OF, NULL, NULL));
            if (nextNode.got_line_feed) pCurrent->tail()->has_line_feed(nextNode.got_line_feed);
            pCurrent = pCurrent->tail();
          }
        }
      } else {
        throw "The node to convert's children must be only combinators or selectors.";
      }
    }

    // Put the dummy Compound_Selector in the first position, for consistency with the rest of libsass
    Compound_Selector_Ptr fakeHead = SASS_MEMORY_NEW(Compound_Selector, ParserState("[NODE]"), 1);
    Parent_Selector_Ptr selectorRef = SASS_MEMORY_NEW(Parent_Selector, ParserState("[NODE]"));
    fakeHead->elements().push_back(selectorRef);
    if (toConvert.got_line_feed) pFirst->has_line_feed(toConvert.got_line_feed);
    // pFirst->has_line_feed(pFirst->has_line_feed() || pFirst->tail()->has_line_feed() || toConvert.got_line_feed);
    pFirst->head(fakeHead);
    return SASS_MEMORY_COPY(pFirst);
  }

  // A very naive trim function, which removes duplicates in a node
  // This is only used in Complex_Selector::unify_with for now, may need modifications to fit other needs
  Node Node::naiveTrim(Node& seqses) {

    std::vector<Node*> res;
    std::vector<Complex_Selector_Obj> known;

    NodeDeque::reverse_iterator seqsesIter = seqses.collection()->rbegin(),
                                seqsesIterEnd = seqses.collection()->rend();

    for (; seqsesIter != seqsesIterEnd; ++seqsesIter)
    {
      Node& seqs1 = *seqsesIter;
      if( seqs1.isSelector() ) {
        Complex_Selector_Obj sel = seqs1.selector();
        std::vector<Complex_Selector_Obj>::iterator it;
        bool found = false;
        for (it = known.begin(); it != known.end(); ++it) {
          if (**it == *sel) { found = true; break; }
        }
        if( !found ) {
          known.push_back(seqs1.selector());
          res.push_back(&seqs1);
        }
      } else {
        res.push_back(&seqs1);
      }
    }

    Node result = Node::createCollection();

    for (size_t i = res.size() - 1; i != std::string::npos; --i) {
      result.collection()->push_back(*res[i]);
    }

    return result;
  }
}
