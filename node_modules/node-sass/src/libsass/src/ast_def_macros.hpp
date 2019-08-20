#ifndef SASS_AST_DEF_MACROS_H
#define SASS_AST_DEF_MACROS_H

// Helper class to switch a flag and revert once we go out of scope
template <class T>
class LocalOption {
  private:
    T* var; // pointer to original variable
    T orig; // copy of the original option
  public:
    LocalOption(T& var)
    {
      this->var = &var;
      this->orig = var;
    }
    LocalOption(T& var, T orig)
    {
      this->var = &var;
      this->orig = var;
      *(this->var) = orig;
    }
    void reset()
    {
      *(this->var) = this->orig;
    }
    ~LocalOption() {
      *(this->var) = this->orig;
    }
};

#define LOCAL_FLAG(name,opt) LocalOption<bool> flag_##name(name, opt)
#define LOCAL_COUNT(name,opt) LocalOption<size_t> cnt_##name(name, opt)

#define NESTING_GUARD(name) \
  LocalOption<size_t> cnt_##name(name, name + 1); \
  if (name > MAX_NESTING) throw Exception::NestingLimitError(pstate, traces); \

#define ATTACH_OPERATIONS()\
virtual void perform(Operation<void>* op) { (*op)(this); }\
virtual AST_Node_Ptr perform(Operation<AST_Node_Ptr>* op) { return (*op)(this); }\
virtual Statement_Ptr perform(Operation<Statement_Ptr>* op) { return (*op)(this); }\
virtual Expression_Ptr perform(Operation<Expression_Ptr>* op) { return (*op)(this); }\
virtual Selector_Ptr perform(Operation<Selector_Ptr>* op) { return (*op)(this); }\
virtual std::string perform(Operation<std::string>* op) { return (*op)(this); }\
virtual union Sass_Value* perform(Operation<union Sass_Value*>* op) { return (*op)(this); }\
virtual Value_Ptr perform(Operation<Value_Ptr>* op) { return (*op)(this); }

#define ADD_PROPERTY(type, name)\
protected:\
  type name##_;\
public:\
  type name() const        { return name##_; }\
  type name(type name##__) { return name##_ = name##__; }\
private:

#define HASH_PROPERTY(type, name)\
protected:\
  type name##_;\
public:\
  type name() const        { return name##_; }\
  type name(type name##__) { hash_ = 0; return name##_ = name##__; }\
private:

#define ADD_CONSTREF(type, name) \
protected: \
  type name##_; \
public: \
  const type& name() const { return name##_; } \
  void name(type name##__) { name##_ = name##__; } \
private:

#define HASH_CONSTREF(type, name) \
protected: \
  type name##_; \
public: \
  const type& name() const { return name##_; } \
  void name(type name##__) { hash_ = 0; name##_ = name##__; } \
private:

#endif
