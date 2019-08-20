'use strict'

const assert = require( 'assert' )
const data = require( './data' )
const implementation = require( './implementation' )
const baseAdapter = require( '../' )

const adapter = baseAdapter( implementation )

const getById = id => adapter.findOne( 
  node => adapter.getAttributeValue( node, 'id' ) === id,
  data 
) 

const getByName = name => adapter.findAll( 
  node => adapter.getName( node ) === name,
  data 
)

const getByClass = className => adapter.findAll( 
  node => adapter.getAttributeValue( node, 'class' ) === className,
  data 
) 

const existsName = name => adapter.existsOne(
  node => adapter.getName( node ) === name,
  data
)

const container = getById( 'container' ) 
const strong = getByName( 'strong' )[ 0 ]
const hello = strong.children[ 0 ]
const world = container.children[ 1 ]

describe( 'css-select-base-adapter', () => {
  it( 'getAttributeValue', () => {
    assert( container )
  })

  it( 'getName', () => {
    assert( strong )
  })

  it( 'findOne', () => {
    assert( container )
  })

  it( 'findAll', () => {
    const messages = getByClass( 'message' )
    
    assert.equal( messages.length, 2 )
    assert.equal( messages[ 0 ], container )
    assert.equal( messages[ 1 ], strong )
  })

  it( 'getParent', () => {
    const parent = adapter.getParent( strong )

    assert.equal( parent, container )
  })

  it( 'getSiblings', () => {
    const siblings = adapter.getSiblings( strong )

    assert.equal( siblings[ 0 ], strong )
    assert.equal( siblings[ 1 ], world )
  })

  it( 'getChildren', () => {
    const children = adapter.getChildren( container )

    assert.equal( children[ 0 ], strong )
  })

  it( 'getText', () => {
    const text = adapter.getText( container )

    assert.equal( text, 'Hello, World!' )
  })

  it( 'isTag', () => {
    assert( adapter.isTag( container ) )
    assert( adapter.isTag( strong ) )
    assert( !adapter.isTag( hello ) )
  })

  it( 'hasAttrib', () => {
    assert( adapter.hasAttrib( container, 'id' ) )
    assert( !adapter.hasAttrib( strong, 'id' ) )
  })

  it( 'existsOne', () => {
    assert( existsName( 'strong' ) )
    assert( !existsName( 'blink' ) )
  })

  it( 'removeSubsets', () => {
    const removed = adapter.removeSubsets([ container, strong, container ])

    assert.equal( removed.length, 1 )
    assert.equal( removed[ 0 ], container )
  })
})
