#ifndef SASS_MEMORY_SHARED_PTR_H
#define SASS_MEMORY_SHARED_PTR_H

#include "sass/base.h"

#include <vector>

namespace Sass {

  class SharedPtr;

  ///////////////////////////////////////////////////////////////////////////////
  // Use macros for the allocation task, since overloading operator `new`
  // has been proven to be flaky under certain compilers (see comment below).
  ///////////////////////////////////////////////////////////////////////////////

  #ifdef DEBUG_SHARED_PTR

    #define SASS_MEMORY_NEW(Class, ...) \
      ((Class*)(new Class(__VA_ARGS__))->trace(__FILE__, __LINE__)) \

    #define SASS_MEMORY_COPY(obj) \
      ((obj)->copy(__FILE__, __LINE__)) \

    #define SASS_MEMORY_CLONE(obj) \
      ((obj)->clone(__FILE__, __LINE__)) \

  #else

    #define SASS_MEMORY_NEW(Class, ...) \
      new Class(__VA_ARGS__) \

    #define SASS_MEMORY_COPY(obj) \
      ((obj)->copy()) \

    #define SASS_MEMORY_CLONE(obj) \
      ((obj)->clone()) \

  #endif

  class SharedObj {
  protected:
  friend class SharedPtr;
  friend class Memory_Manager;
    #ifdef DEBUG_SHARED_PTR
      static std::vector<SharedObj*> all;
      std::string file;
      size_t line;
    #endif
    static bool taint;
    long refcounter;
    // long refcount;
    bool detached;
    #ifdef DEBUG_SHARED_PTR
      bool dbg;
    #endif
  public:
    #ifdef DEBUG_SHARED_PTR
      static void dumpMemLeaks();
      SharedObj* trace(std::string file, size_t line) {
        this->file = file;
        this->line = line;
        return this;
      }
    #endif
    SharedObj();
    #ifdef DEBUG_SHARED_PTR
      std::string getDbgFile() {
        return file;
      }
      size_t getDbgLine() {
        return line;
      }
      void setDbg(bool dbg) {
        this->dbg = dbg;
      }
    #endif
    static void setTaint(bool val) {
      taint = val;
    }
    virtual ~SharedObj();
    long getRefCount() {
      return refcounter;
    }
  };


  class SharedPtr {
  protected:
    SharedObj* node;
  protected:
    void decRefCount();
    void incRefCount();
  public:
    // the empty constructor
    SharedPtr()
    : node(NULL) {};
    // the create constructor
    SharedPtr(SharedObj* ptr);
    // the copy constructor
    SharedPtr(const SharedPtr& obj);
    // the move constructor
    SharedPtr(SharedPtr&& obj);
    // copy assignment operator
    SharedPtr& operator=(const SharedPtr& obj);
    // move assignment operator
    SharedPtr& operator=(SharedPtr&& obj);
    // pure virtual destructor
    virtual ~SharedPtr() = 0;
  public:
    SharedObj* obj () const {
      return node;
    };
    SharedObj* operator-> () const {
      return node;
    };
    bool isNull () {
      return node == NULL;
    };
    bool isNull () const {
      return node == NULL;
    };
    SharedObj* detach() const {
      if (node) {
        node->detached = true;
      }
      return node;
    };
    operator bool() const {
      return node != NULL;
    };

  };

  template < class T >
  class SharedImpl : private SharedPtr {
  public:
    SharedImpl()
    : SharedPtr(NULL) {};
    SharedImpl(T* node)
    : SharedPtr(node) {};
    template < class U >
    SharedImpl(SharedImpl<U> obj)
    : SharedPtr(static_cast<T*>(obj.ptr())) {}
    SharedImpl(T&& node)
    : SharedPtr(node) {};
    SharedImpl(const T& node)
    : SharedPtr(node) {};
    // the copy constructor
    SharedImpl(const SharedImpl<T>& impl)
    : SharedPtr(impl.node) {};
    // the move constructor
    SharedImpl(SharedImpl<T>&& impl)
    : SharedPtr(impl.node) {};
    // copy assignment operator
    SharedImpl<T>& operator=(const SharedImpl<T>& rhs) {
      if (node) decRefCount();
      node = rhs.node;
      incRefCount();
      return *this;
    }
    // move assignment operator
    SharedImpl<T>& operator=(SharedImpl<T>&& rhs) {
      // don't move our self
      if (this != &rhs) {
        if (node) decRefCount();
        node = std::move(rhs.node);
        rhs.node = NULL;
      }
      return *this;
    }
    ~SharedImpl() {};
  public:
    operator T*() const {
      return static_cast<T*>(this->obj());
    }
    operator T&() const {
      return *static_cast<T*>(this->obj());
    }
    T& operator* () const {
      return *static_cast<T*>(this->obj());
    };
    T* operator-> () const {
      return static_cast<T*>(this->obj());
    };
    T* ptr () const {
      return static_cast<T*>(this->obj());
    };
    T* detach() const {
      if (this->obj() == NULL) return NULL;
      return static_cast<T*>(SharedPtr::detach());
    }
    bool isNull() const {
      return this->obj() == NULL;
    }
    bool operator<(const T& rhs) const {
      return *this->ptr() < rhs;
    };
    operator bool() const {
      return this->obj() != NULL;
    };
  };

}

#endif