#include "sass.hpp"
#include "remove_placeholders.hpp"
#include "context.hpp"
#include "inspect.hpp"
#include <iostream>

namespace Sass {

    Remove_Placeholders::Remove_Placeholders()
    { }

    void Remove_Placeholders::operator()(Block_Ptr b) {
        for (size_t i = 0, L = b->length(); i < L; ++i) {
            Statement_Ptr st = b->at(i);
            st->perform(this);
        }
    }

    Selector_List_Ptr Remove_Placeholders::remove_placeholders(Selector_List_Ptr sl)
    {
      Selector_List_Ptr new_sl = SASS_MEMORY_NEW(Selector_List, sl->pstate());

      for (size_t i = 0, L = sl->length(); i < L; ++i) {
          if (!sl->at(i)->contains_placeholder()) {
              new_sl->append(sl->at(i));
          }
      }

      return new_sl;

    }


    void Remove_Placeholders::operator()(Ruleset_Ptr r) {
        // Create a new selector group without placeholders
        Selector_List_Obj sl = Cast<Selector_List>(r->selector());

        if (sl) {
          // Set the new placeholder selector list
          r->selector(remove_placeholders(sl));
          // Remove placeholders in wrapped selectors
          for (Complex_Selector_Obj cs : sl->elements()) {
            while (cs) {
              if (cs->head()) {
                for (Simple_Selector_Obj& ss : cs->head()->elements()) {
                  if (Wrapped_Selector_Ptr ws = Cast<Wrapped_Selector>(ss)) {
                    if (Selector_List_Ptr wsl = Cast<Selector_List>(ws->selector())) {
                      Selector_List_Ptr clean = remove_placeholders(wsl);
                      // also clean superflous parent selectors
                      // probably not really the correct place
                      clean->remove_parent_selectors();
                      ws->selector(clean);
                    }
                  }
                }
              }
              cs = cs->tail();
            }
          }
        }

        // Iterate into child blocks
        Block_Obj b = r->block();

        for (size_t i = 0, L = b->length(); i < L; ++i) {
            if (b->at(i)) {
                Statement_Obj st = b->at(i);
                st->perform(this);
            }
        }
    }

    void Remove_Placeholders::operator()(Media_Block_Ptr m) {
        operator()(m->block());
    }
    void Remove_Placeholders::operator()(Supports_Block_Ptr m) {
        operator()(m->block());
    }

    void Remove_Placeholders::operator()(Directive_Ptr a) {
        if (a->block()) a->block()->perform(this);
    }

}
