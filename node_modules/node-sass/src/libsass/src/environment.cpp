#include "sass.hpp"
#include "ast.hpp"
#include "environment.hpp"

namespace Sass {

  template <typename T>
  Environment<T>::Environment(bool is_shadow)
  : local_frame_(environment_map<std::string, T>()),
    parent_(0), is_shadow_(false)
  { }
  template <typename T>
  Environment<T>::Environment(Environment<T>* env, bool is_shadow)
  : local_frame_(environment_map<std::string, T>()),
    parent_(env), is_shadow_(is_shadow)
  { }
  template <typename T>
  Environment<T>::Environment(Environment<T>& env, bool is_shadow)
  : local_frame_(environment_map<std::string, T>()),
    parent_(&env), is_shadow_(is_shadow)
  { }

  // link parent to create a stack
  template <typename T>
  void Environment<T>::link(Environment& env) { parent_ = &env; }
  template <typename T>
  void Environment<T>::link(Environment* env) { parent_ = env; }

  // this is used to find the global frame
  // which is the second last on the stack
  template <typename T>
  bool Environment<T>::is_lexical() const
  {
    return !! parent_ && parent_->parent_;
  }

  // only match the real root scope
  // there is still a parent around
  // not sure what it is actually use for
  // I guess we store functions etc. there
  template <typename T>
  bool Environment<T>::is_global() const
  {
    return parent_ && ! parent_->parent_;
  }

  template <typename T>
  environment_map<std::string, T>& Environment<T>::local_frame() {
    return local_frame_;
  }

  template <typename T>
  bool Environment<T>::has_local(const std::string& key) const
  { return local_frame_.find(key) != local_frame_.end(); }

  template <typename T> EnvResult
  Environment<T>::find_local(const std::string& key)
  {
    auto end = local_frame_.end();
    auto it = local_frame_.find(key);
    return EnvResult(it, it != end);
  }

  template <typename T>
  T& Environment<T>::get_local(const std::string& key)
  { return local_frame_[key]; }

  template <typename T>
  void Environment<T>::set_local(const std::string& key, const T& val)
  {
    local_frame_[key] = val;
  }
  template <typename T>
  void Environment<T>::set_local(const std::string& key, T&& val)
  {
    local_frame_[key] = val;
  }

  template <typename T>
  void Environment<T>::del_local(const std::string& key)
  { local_frame_.erase(key); }

  template <typename T>
  Environment<T>* Environment<T>::global_env()
  {
    Environment* cur = this;
    while (cur->is_lexical()) {
      cur = cur->parent_;
    }
    return cur;
  }

  template <typename T>
  bool Environment<T>::has_global(const std::string& key)
  { return global_env()->has(key); }

  template <typename T>
  T& Environment<T>::get_global(const std::string& key)
  { return (*global_env())[key]; }

  template <typename T>
  void Environment<T>::set_global(const std::string& key, const T& val)
  {
    global_env()->local_frame_[key] = val;
  }
  template <typename T>
  void Environment<T>::set_global(const std::string& key, T&& val)
  {
    global_env()->local_frame_[key] = val;
  }

  template <typename T>
  void Environment<T>::del_global(const std::string& key)
  { global_env()->local_frame_.erase(key); }

  template <typename T>
  Environment<T>* Environment<T>::lexical_env(const std::string& key)
  {
    Environment* cur = this;
    while (cur) {
      if (cur->has_local(key)) {
        return cur;
      }
      cur = cur->parent_;
    }
    return this;
  }

  // see if we have a lexical variable
  // move down the stack but stop before we
  // reach the global frame (is not included)
  template <typename T>
  bool Environment<T>::has_lexical(const std::string& key) const
  {
    auto cur = this;
    while (cur->is_lexical()) {
      if (cur->has_local(key)) return true;
      cur = cur->parent_;
    }
    return false;
  }

  // see if we have a lexical we could update
  // either update already existing lexical value
  // or if flag is set, we create one if no lexical found
  template <typename T>
  void Environment<T>::set_lexical(const std::string& key, const T& val)
  {
    Environment<T>* cur = this;
    bool shadow = false;
    while ((cur && cur->is_lexical()) || shadow) {
      EnvResult rv(cur->find_local(key));
      if (rv.found) {
        rv.it->second = val;
        return;
      }
      shadow = cur->is_shadow();
      cur = cur->parent_;
    }
    set_local(key, val);
  }
  // this one moves the value
  template <typename T>
  void Environment<T>::set_lexical(const std::string& key, T&& val)
  {
    Environment<T>* cur = this;
    bool shadow = false;
    while ((cur && cur->is_lexical()) || shadow) {
      EnvResult rv(cur->find_local(key));
      if (rv.found) {
        rv.it->second = val;
        return;
      }
      shadow = cur->is_shadow();
      cur = cur->parent_;
    }
    set_local(key, val);
  }

  // look on the full stack for key
  // include all scopes available
  template <typename T>
  bool Environment<T>::has(const std::string& key) const
  {
    auto cur = this;
    while (cur) {
      if (cur->has_local(key)) {
        return true;
      }
      cur = cur->parent_;
    }
    return false;
  }

  // look on the full stack for key
  // include all scopes available
  template <typename T> EnvResult
  Environment<T>::find(const std::string& key)
  {
    auto cur = this;
    while (true) {
      EnvResult rv(cur->find_local(key));
      if (rv.found) return rv;
      cur = cur->parent_;
      if (!cur) return rv;
    }
  };

  // use array access for getter and setter functions
  template <typename T>
  T& Environment<T>::operator[](const std::string& key)
  {
    auto cur = this;
    while (cur) {
      if (cur->has_local(key)) {
        return cur->get_local(key);
      }
      cur = cur->parent_;
    }
    return get_local(key);
  }
/*
  #ifdef DEBUG
  template <typename T>
  size_t Environment<T>::print(std::string prefix)
  {
    size_t indent = 0;
    if (parent_) indent = parent_->print(prefix) + 1;
    std::cerr << prefix << std::string(indent, ' ') << "== " << this << std::endl;
    for (typename environment_map<std::string, T>::iterator i = local_frame_.begin(); i != local_frame_.end(); ++i) {
      if (!ends_with(i->first, "[f]") && !ends_with(i->first, "[f]4") && !ends_with(i->first, "[f]2")) {
        std::cerr << prefix << std::string(indent, ' ') << i->first << " " << i->second;
        if (Value_Ptr val = Cast<Value>(i->second))
        { std::cerr << " : " << val->to_string(); }
        std::cerr << std::endl;
      }
    }
    return indent ;
  }
  #endif
*/
  // compile implementation for AST_Node
  template class Environment<AST_Node_Obj>;

}

