[![Build Status](https://travis-ci.org/A11yance/aria-query.svg?branch=master)](https://travis-ci.org/A11yance/aria-query)

CDN URL: https://npm-cdn.com/pkg/aria-query/

# ARIA Query

Programmatic access to the [WAI-ARIA 1.1 Roles Model](https://www.w3.org/TR/wai-aria-1.1/#roles).

## Utilities

### Roles

```
import { roles } from 'aria-query';
```

A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of
role names to the role definition. For example:

```
let alertRole = roles.get('alert');
/**
 * Value of alertRole
 * {
 *   "requiredProps": [],
 *   "props": [
 *     "aria-expanded",
 *     "aria-atomic",
 *     "aria-busy",
 *     "aria-controls",
 *     "aria-describedby",
 *     "aria-disabled",
 *     "aria-dropeffect",
 *     "aria-flowto",
 *     "aria-grabbed",
 *     "aria-haspopup",
 *     "aria-hidden",
 *     "aria-invalid",
 *     "aria-label",
 *     "aria-labelledby",
 *     "aria-live",
 *     "aria-owns",
 *     "aria-relevant"
 *   ],
 *   "abstract": false,
 *   "interactive": false,
 *   "childrenPresentational": false,
 *   "baseConcepts": [],
 *   "relatedConcepts": [ {
 *     "module": "XForms",
 *     "concept": {
 *       "name": "alert"
 *     }
 *   }]
 * }
```

### Elements to Roles

```
import { elementRoles } from 'aria-query';
```

HTML Elements with inherent roles are mapped to those roles. In the case of an element like `<input>`, the element often requires a `type` attribute to map to an ARIA role.

```
Map {
  '{"name": "article"}' => Set { 'article' },
  '{"name": "button"}' => Set { 'button' },
  '{"name": "td"}' => Set { 'cell', 'gridcell' },
  '{"name": "input", "attributes": [ {"name": "type", "value": "checkbox"}] }' => Set { 'checkbox' },
  '{"name": "th"}' => Set { 'columnheader' },
  '{"name": "select"}' => Set { 'combobox', 'listbox' },
  '{"name": "menuitem"}' => Set { 'command', 'menuitem' },
  '{"name": "dd"}' => Set { 'definition' },
  '{"name": "dfn"}' => Set { 'definition' },
  '{"name": "figure"}' => Set { 'figure' },
  '{"name": "form"}' => Set { 'form' },
  '{"name": "table"}' => Set { 'grid', 'table' },
  '{"name": "fieldset"}' => Set { 'group' },
  '{"name": "h1"}' => Set { 'heading' },
  '{"name": "h2"}' => Set { 'heading' },
  '{"name": "h3"}' => Set { 'heading' },
  '{"name": "h4"}' => Set { 'heading' },
  '{"name": "h5"}' => Set { 'heading' },
  '{"name": "h6"}' => Set { 'heading' },
  '{"name": "img"}' => Set { 'img' },
  '{"name": "a"}' => Set { 'link' },
  '{"name": "link"}' => Set { 'link' },
  '{"name": "ol"}' => Set { 'list' },
  '{"name": "ul"}' => Set { 'list' },
  '{"name": "li"}' => Set { 'listitem' },
  '{"name": "nav"}' => Set { 'navigation' },
  '{"name": "option"}' => Set { 'option' },
  '{"name": "input", "attributes": [ {"name": "type", "value": "radio"}] }' => Set { 'radio' },
  '{"name": "frame"}' => Set { 'region' },
  '{"name": "rel"}' => Set { 'roletype' },
  '{"name": "tr"}' => Set { 'row' },
  '{"name": "tbody"}' => Set { 'rowgroup' },
  '{"name": "tfoot"}' => Set { 'rowgroup' },
  '{"name": "thead"}' => Set { 'rowgroup' },
  '{"name": "th", "attributes": [ {"name": "scope", "value": "row"}] }' => Set { 'rowheader' },
  '{"name": "input", "attributes": [ {"name": "type", "value": "search"}] }' => Set { 'searchbox' },
  '{"name": "hr"}' => Set { 'separator' },
  '{"name": "dt"}' => Set { 'term' },
  '{"name": "textarea"}' => Set { 'textbox' },
  '{"name": "input", "attributes": [ {"name": "type", "value": "text"}] }' => Set { 'textbox' }
}
```

The map of elements to roles is keyed by an HTML concept. An HTML concept corresponds to the `baseConcepts` and `relatedConcepts` of an ARIA role. Concepts exist in the context of a `module`: HTML, XForms, Dublin Core, for example.  The concept representation is an object literal with a name property (the element name) and an optional attributes array.

The roles are provided in a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

### Role to element

```
import { roleElements } from 'aria-query';
```

ARIA roles are mapped to the HTML Elements with the same inherent role. Some roles, such as `columnheader` are only mapped to an HMTL element that expresses specific attributes. In the case of `<input>`, the element often requires a `type` attribute to map to an ARIA role.

```
Map {
  'article' => Set { '{"name": "article"}' },
  'button' => Set { '{"name": "button"}' },
  'cell' => Set { '{"name": "td"}' },
  'checkbox' => Set { '{"name": "input", "attributes": [ {"name": "type", "value": "checkbox"}] }' },
  'columnheader' => Set { '{"name": "th"}' },
  'combobox' => Set { '{"name": "select"}' },
  'command' => Set { '{"name": "menuitem"}' },
  'definition' => Set { '{"name": "dd"}', '{"name": "dfn"}' },
  'figure' => Set { '{"name": "figure"}' },
  'form' => Set { '{"name": "form"}' },
  'grid' => Set { '{"name": "table"}' },
  'gridcell' => Set { '{"name": "td"}' },
  'group' => Set { '{"name": "fieldset"}' },
  'heading' => Set { '{"name": "h1"}', '{"name": "h2"}', '{"name": "h3"}', '{"name": "h4"}',  '{"name": "h5"}', '{"name": "h6"}' },
  'img' => Set { '{"name": "img"}' },
  'link' => Set { '{"name": "a"}', '{"name": "link"}' },
  'list' => Set { '{"name": "ol"}', '{"name": "ul"}' },
  'listbox' => Set { '{"name": "select"}' },
  'listitem' => Set { '{"name": "li"}' },
  'menuitem' => Set { '{"name": "menuitem"}' },
  'navigation' => Set { '{"name": "nav"}' },
  'option' => Set { '{"name": "option"}' },
  'radio' => Set { '{"name": "input", "attributes": [ {"name": "type", "value": "radio"}] }' },
  'region' => Set { '{"name": "frame"}' },
  'roletype' => Set { '{"name": "rel"}' },
  'row' => Set { '{"name": "tr"}' },
  'rowgroup' => Set { '{"name": "tbody"}', '{"name": "tfoot"}', '{"name": "thead"}' },
  'rowheader' => Set { '{"name": "th", "attributes": [ {"name": "scope", "value": "row"}] }' },
  'searchbox' => Set { '{"name": "input", "attributes": [ {"name": "type", "value": "search"}] }' },
  'separator' => Set { '{"name": "hr"}' },
  'table' => Set { '{"name": "table"}' },
  'term' => Set { '{"name": "dt"}' },
  'textbox' => Set { '{"name": "textarea"}', '{"name": "input", "attributes": [ {"name": "type", "value": "text"}] }' }
}
```

The HTML concept values are provided in a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).
