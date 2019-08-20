#ifndef SASS_REMOVE_PLACEHOLDERS_H
#define SASS_REMOVE_PLACEHOLDERS_H

#pragma once

#include "ast.hpp"
#include "operation.hpp"

namespace Sass {


    class Remove_Placeholders : public Operation_CRTP<void, Remove_Placeholders> {

        void fallback_impl(AST_Node_Ptr n) {}

    public:
      Selector_List_Ptr remove_placeholders(Selector_List_Ptr);

    public:
        Remove_Placeholders();
        ~Remove_Placeholders() { }

        void operator()(Block_Ptr);
        void operator()(Ruleset_Ptr);
        void operator()(Media_Block_Ptr);
        void operator()(Supports_Block_Ptr);
        void operator()(Directive_Ptr);

        template <typename U>
        void fallback(U x) { return fallback_impl(x); }
    };

}

#endif
