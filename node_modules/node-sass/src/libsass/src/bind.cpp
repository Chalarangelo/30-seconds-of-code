#include "sass.hpp"
#include "bind.hpp"
#include "ast.hpp"
#include "context.hpp"
#include "expand.hpp"
#include "eval.hpp"
#include <map>
#include <iostream>
#include <sstream>

namespace Sass {

  void bind(std::string type, std::string name, Parameters_Obj ps, Arguments_Obj as, Context* ctx, Env* env, Eval* eval)
  {
    std::string callee(type + " " + name);

    std::map<std::string, Parameter_Obj> param_map;
    List_Obj varargs = SASS_MEMORY_NEW(List, as->pstate());
    varargs->is_arglist(true); // enable keyword size handling

    for (size_t i = 0, L = as->length(); i < L; ++i) {
      if (auto str = Cast<String_Quoted>((*as)[i]->value())) {
        // force optional quotes (only if needed)
        if (str->quote_mark()) {
          str->quote_mark('*');
        }
      }
    }

    // Set up a map to ensure named arguments refer to actual parameters. Also
    // eval each default value left-to-right, wrt env, populating env as we go.
    for (size_t i = 0, L = ps->length(); i < L; ++i) {
      Parameter_Obj  p = ps->at(i);
      param_map[p->name()] = p;
      // if (p->default_value()) {
      //   env->local_frame()[p->name()] = p->default_value()->perform(eval->with(env));
      // }
    }

    // plug in all args; if we have leftover params, deal with it later
    size_t ip = 0, LP = ps->length();
    size_t ia = 0, LA = as->length();
    while (ia < LA) {
      Argument_Obj a = as->at(ia);
      if (ip >= LP) {
        // skip empty rest arguments
        if (a->is_rest_argument()) {
          if (List_Obj l = Cast<List>(a->value())) {
            if (l->length() == 0) {
              ++ ia; continue;
            }
          }
        }
        std::stringstream msg;
        msg << "wrong number of arguments (" << LA << " for " << LP << ")";
        msg << " for `" << name << "'";
        return error(msg.str(), as->pstate(), eval->exp.traces);
      }
      Parameter_Obj p = ps->at(ip);

      // If the current parameter is the rest parameter, process and break the loop
      if (p->is_rest_parameter()) {
        // The next argument by coincidence provides a rest argument
        if (a->is_rest_argument()) {

          // We should always get a list for rest arguments
          if (List_Obj rest = Cast<List>(a->value())) {
              // create a new list object for wrapped items
              List_Ptr arglist = SASS_MEMORY_NEW(List,
                                              p->pstate(),
                                              0,
                                              rest->separator(),
                                              true);
              // wrap each item from list as an argument
              for (Expression_Obj item : rest->elements()) {
                if (Argument_Obj arg = Cast<Argument>(item)) {
                  arglist->append(SASS_MEMORY_COPY(arg)); // copy
                } else {
                  arglist->append(SASS_MEMORY_NEW(Argument,
                                                  item->pstate(),
                                                  item,
                                                  "",
                                                  false,
                                                  false));
                }
              }
              // assign new arglist to environment
              env->local_frame()[p->name()] = arglist;
            }
          // invalid state
          else {
            throw std::runtime_error("invalid state");
          }
        } else if (a->is_keyword_argument()) {

          // expand keyword arguments into their parameters
          List_Ptr arglist = SASS_MEMORY_NEW(List, p->pstate(), 0, SASS_COMMA, true);
          env->local_frame()[p->name()] = arglist;
          Map_Obj argmap = Cast<Map>(a->value());
          for (auto key : argmap->keys()) {
            if (String_Constant_Obj str = Cast<String_Constant>(key)) {
              std::string param = unquote(str->value());
              arglist->append(SASS_MEMORY_NEW(Argument,
                                              key->pstate(),
                                              argmap->at(key),
                                              "$" + param,
                                              false,
                                              false));
            } else {
              eval->exp.traces.push_back(Backtrace(key->pstate()));
              throw Exception::InvalidVarKwdType(key->pstate(), eval->exp.traces, key->inspect(), a);
            }
          }

        } else {

          // create a new list object for wrapped items
          List_Obj arglist = SASS_MEMORY_NEW(List,
                                          p->pstate(),
                                          0,
                                          SASS_COMMA,
                                          true);
          // consume the next args
          while (ia < LA) {
            // get and post inc
            a = (*as)[ia++];
            // maybe we have another list as argument
            List_Obj ls = Cast<List>(a->value());
            // skip any list completely if empty
            if (ls && ls->empty() && a->is_rest_argument()) continue;

            Expression_Obj value = a->value();
            if (Argument_Obj arg = Cast<Argument>(value)) {
              arglist->append(arg);
            }
            // check if we have rest argument
            else if (a->is_rest_argument()) {
              // preserve the list separator from rest args
              if (List_Obj rest = Cast<List>(a->value())) {
                arglist->separator(rest->separator());

                for (size_t i = 0, L = rest->length(); i < L; ++i) {
                  Expression_Obj obj = rest->value_at_index(i);
                  arglist->append(SASS_MEMORY_NEW(Argument,
                                                obj->pstate(),
                                                obj,
                                                "",
                                                false,
                                                false));
                }
              }
              // no more arguments
              break;
            }
            // wrap all other value types into Argument
            else {
              arglist->append(SASS_MEMORY_NEW(Argument,
                                            a->pstate(),
                                            a->value(),
                                            a->name(),
                                            false,
                                            false));
            }
          }
          // assign new arglist to environment
          env->local_frame()[p->name()] = arglist;
        }
        // consumed parameter
        ++ip;
        // no more paramaters
        break;
      }

      // If the current argument is the rest argument, extract a value for processing
      else if (a->is_rest_argument()) {
        // normal param and rest arg
        List_Obj arglist = Cast<List>(a->value());
        if (!arglist) {
          if (Expression_Obj arg = Cast<Expression>(a->value())) {
            arglist = SASS_MEMORY_NEW(List, a->pstate(), 1);
            arglist->append(arg);
          }
        }

        // empty rest arg - treat all args as default values
        if (!arglist || !arglist->length()) {
          break;
        } else {
          if (arglist->length() > LP - ip && !ps->has_rest_parameter()) {
            size_t arg_count = (arglist->length() + LA - 1);
            std::stringstream msg;
            msg << callee << " takes " << LP;
            msg << (LP == 1 ? " argument" : " arguments");
            msg << " but " << arg_count;
            msg << (arg_count == 1 ? " was passed" : " were passed.");
            deprecated_bind(msg.str(), as->pstate());

            while (arglist->length() > LP - ip) {
              arglist->elements().erase(arglist->elements().end() - 1);
            }
          }
        }
        // otherwise move one of the rest args into the param, converting to argument if necessary
        Expression_Obj obj = arglist->at(0);
        if (!(a = Cast<Argument>(obj))) {
          Expression_Ptr a_to_convert = obj;
          a = SASS_MEMORY_NEW(Argument,
                              a_to_convert->pstate(),
                              a_to_convert,
                              "",
                              false,
                              false);
        }
        arglist->elements().erase(arglist->elements().begin());
        if (!arglist->length() || (!arglist->is_arglist() && ip + 1 == LP)) {
          ++ia;
        }

      } else if (a->is_keyword_argument()) {
        Map_Obj argmap = Cast<Map>(a->value());

        for (auto key : argmap->keys()) {
          String_Constant_Ptr val = Cast<String_Constant>(key);
          if (val == NULL) {
            eval->exp.traces.push_back(Backtrace(key->pstate()));
            throw Exception::InvalidVarKwdType(key->pstate(), eval->exp.traces, key->inspect(), a);
          }
          std::string param = "$" + unquote(val->value());

          if (!param_map.count(param)) {
            std::stringstream msg;
            msg << callee << " has no parameter named " << param;
            error(msg.str(), a->pstate(), eval->exp.traces);
          }
          env->local_frame()[param] = argmap->at(key);
        }
        ++ia;
        continue;
      } else {
        ++ia;
      }

      if (a->name().empty()) {
        if (env->has_local(p->name())) {
          std::stringstream msg;
          msg << "parameter " << p->name()
          << " provided more than once in call to " << callee;
          error(msg.str(), a->pstate(), eval->exp.traces);
        }
        // ordinal arg -- bind it to the next param
        env->local_frame()[p->name()] = a->value();
        ++ip;
      }
      else {
        // named arg -- bind it to the appropriately named param
        if (!param_map.count(a->name())) {
          if (ps->has_rest_parameter()) {
            varargs->append(a);
          } else {
            std::stringstream msg;
            msg << callee << " has no parameter named " << a->name();
            error(msg.str(), a->pstate(), eval->exp.traces);
          }
        }
        if (param_map[a->name()]) {
          if (param_map[a->name()]->is_rest_parameter()) {
            std::stringstream msg;
            msg << "argument " << a->name() << " of " << callee
                << "cannot be used as named argument";
            error(msg.str(), a->pstate(), eval->exp.traces);
          }
        }
        if (env->has_local(a->name())) {
          std::stringstream msg;
          msg << "parameter " << p->name()
              << "provided more than once in call to " << callee;
          error(msg.str(), a->pstate(), eval->exp.traces);
        }
        env->local_frame()[a->name()] = a->value();
      }
    }
    // EO while ia

    // If we make it here, we're out of args but may have leftover params.
    // That's only okay if they have default values, or were already bound by
    // named arguments, or if it's a single rest-param.
    for (size_t i = ip; i < LP; ++i) {
      Parameter_Obj leftover = ps->at(i);
      // cerr << "env for default params:" << endl;
      // env->print();
      // cerr << "********" << endl;
      if (!env->has_local(leftover->name())) {
        if (leftover->is_rest_parameter()) {
          env->local_frame()[leftover->name()] = varargs;
        }
        else if (leftover->default_value()) {
          Expression_Ptr dv = leftover->default_value()->perform(eval);
          env->local_frame()[leftover->name()] = dv;
        }
        else {
          // param is unbound and has no default value -- error
          throw Exception::MissingArgument(as->pstate(), eval->exp.traces, name, leftover->name(), type);
        }
      }
    }

    return;
  }


}
