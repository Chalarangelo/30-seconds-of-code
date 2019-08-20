'use strict'

const walk = ( node, parent, cb ) => {
  cb( node, parent )

  if( Array.isArray( node.children ) )
    node.children.forEach( child => walk( child, node, cb ) )
}

const data = {
  name: 'div',
  attribs: {
    id: 'container',
    class: 'message'
  },
  children: [
    {
      name: 'strong',
      attribs: {
        class: 'message'
      },
      children: [
        { text: 'Hello' }
      ]
    },
    { text: ', World!' }
  ]
}

walk( data, null, ( node, parent ) => {
  if( parent ) node.parent = parent
})

module.exports = [ data ]
