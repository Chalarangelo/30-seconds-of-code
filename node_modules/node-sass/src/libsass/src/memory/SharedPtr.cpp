#include "../sass.hpp"
#include <iostream>
#include <typeinfo>

#include "SharedPtr.hpp"
#include "../ast_fwd_decl.hpp"

#ifdef DEBUG_SHARED_PTR
#include "../debugger.hpp"
#endif

namespace Sass {

  #ifdef DEBUG_SHARED_PTR
  void SharedObj::dumpMemLeaks() {
    if (!all.empty()) {
      std::cerr << "###################################\n";
      std::cerr << "# REPORTING MISSING DEALLOCATIONS #\n";
      std::cerr << "###################################\n";
      for (SharedObj* var : all) {
        if (AST_Node_Ptr ast = dynamic_cast<AST_Node*>(var)) {
          debug_ast(ast);
        } else {
          std::cerr << "LEAKED " << var << "\n";
        }
      }
    }
  }
  std::vector<SharedObj*> SharedObj::all;
  #endif

  bool SharedObj::taint = false;

  SharedObj::SharedObj()
  : detached(false)
    #ifdef DEBUG_SHARED_PTR
    , dbg(false)
    #endif
  {
    refcounter = 0;
    #ifdef DEBUG_SHARED_PTR
      if (taint) all.push_back(this);
    #endif
  };

  SharedObj::~SharedObj() {
    #ifdef DEBUG_SHARED_PTR
      if (dbg) std::cerr << "Destruct " << this << "\n";
      if(!all.empty()) { // check needed for MSVC (no clue why?)
        all.erase(std::remove(all.begin(), all.end(), this), all.end());
      }
    #endif
  };

  void SharedPtr::decRefCount() {
    if (node) {
      -- node->refcounter;
      #ifdef DEBUG_SHARED_PTR
        if (node->dbg)  std::cerr << "- " << node << " X " << node->refcounter << " (" << this << ") " << "\n";
      #endif
      if (node->refcounter == 0) {
        #ifdef DEBUG_SHARED_PTR
          // AST_Node_Ptr ast = dynamic_cast<AST_Node*>(node);
          if (node->dbg) std::cerr << "DELETE NODE " << node << "\n";
        #endif
        if (!node->detached) {
          delete(node);
        }
      }
    }
  }

  void SharedPtr::incRefCount() {
    if (node) {
      ++ node->refcounter;
      node->detached = false;
      #ifdef DEBUG_SHARED_PTR
        if (node->dbg) {
          std::cerr << "+ " << node << " X " << node->refcounter << " (" << this << ") " << "\n";
        }
      #endif
    }
  }

  SharedPtr::~SharedPtr() {
    decRefCount();
  }


  // the create constructor
  SharedPtr::SharedPtr(SharedObj* ptr)
  : node(ptr) {
    incRefCount();
  }
  // copy assignment operator
  SharedPtr& SharedPtr::operator=(const SharedPtr& rhs) {
    void* cur_ptr = (void*) node;
    void* rhs_ptr = (void*) rhs.node;
    if (cur_ptr == rhs_ptr) {
      return *this;
    }
    decRefCount();
    node = rhs.node;
    incRefCount();
    return *this;
  }

  // the copy constructor
  SharedPtr::SharedPtr(const SharedPtr& obj)
  : node(obj.node) {
    incRefCount();
  }

}