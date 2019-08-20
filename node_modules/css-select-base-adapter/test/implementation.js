'use strict'

const implementation = {
  isTag: node => node !== undefined && 'name' in node,
  getAttributeValue: ( elem, name ) => {
    if( implementation.isTag( elem ) && elem.attribs ) return elem.attribs[ name ]
  },
  getChildren: node => node.children,
  getName: elem => {
    if( implementation.isTag( elem ) ) return elem.name
  },
  getParent: node => node.parent,
  getText: node => node.children.map( child => {
    if( child.text ) return child.text

    if( implementation.isTag( child ) ) return implementation.getText( child )

    return ''
  }).join( '' )
}

module.exports = implementation
