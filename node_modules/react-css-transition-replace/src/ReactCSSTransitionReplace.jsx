import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import chain from 'chain-function'
import warning from 'warning'

import raf from 'dom-helpers/util/requestAnimationFrame'

import ReactCSSTransitionReplaceChild from './ReactCSSTransitionReplaceChild'
import { nameShape, transitionTimeout } from './utils/PropTypes'

const reactCSSTransitionReplaceChild = React.createFactory(ReactCSSTransitionReplaceChild)


export default class ReactCSSTransitionReplace extends React.Component {

  static displayName = 'ReactCSSTransitionReplace'

  static propTypes = {
    transitionName: nameShape.isRequired,

    transitionAppear: PropTypes.bool,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    transitionAppearTimeout: transitionTimeout('Appear'),
    transitionEnterTimeout: transitionTimeout('Enter'),
    transitionLeaveTimeout: transitionTimeout('Leave'),
    overflowHidden: PropTypes.bool,
    changeWidth: PropTypes.bool,
    notifyLeaving: PropTypes.bool,
  }

  static defaultProps = {
    transitionAppear: false,
    transitionEnter: true,
    transitionLeave: true,
    overflowHidden: true,
    changeWidth: false,
    notifyLeaving: false,
    component: 'div',
    childComponent: 'span',
  }

  constructor(props, context) {
    super(props, context)

    this.childRefs = Object.create(null)

    this.state = {
      currentKey: '1',
      currentChild: this.props.children ? React.Children.only(this.props.children) : undefined,
      prevChildren: {},
      height: null,
      width: null,
    }
  }

  componentWillMount() {
    this.shouldEnterCurrent = false
    this.keysToLeave = []
    this.transitioningKeys = {}
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.state.currentChild) {
      this.performAppear(this.state.currentKey)
    }
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  componentWillReceiveProps(nextProps) {
    const nextChild = nextProps.children ? React.Children.only(nextProps.children) : undefined
    const {currentChild} = this.state

    if (currentChild && nextChild && nextChild.key === currentChild.key && !this.state.nextChild) {
      // This is the same child, but receiving new props means the child itself has re-rendered
      return this.setState({
        currentChild: nextChild,
      })
    }

    const {currentKey, prevChildren} = this.state

    const nextState = {
      currentKey: String(Number(currentKey) + 1),
      currentChild: nextChild,
      height: 0,
      width: this.props.changeWidth ? 0 : null,
    }

    if (nextChild) {
      this.shouldEnterCurrent = true
    }

    if (currentChild) {
      const currentChildNode = findDOMNode(this.childRefs[currentKey])
      nextState.height = currentChildNode ? currentChildNode.offsetHeight : 0
      nextState.width = this.props.changeWidth
        ? (currentChildNode ? currentChildNode.offsetWidth : 0)
        : null
      nextState.prevChildren = {
        ...prevChildren,
        [currentKey]: currentChild,
      }
      if (!this.transitioningKeys[currentKey]) {
        this.keysToLeave.push(currentKey)
      }
    }

    this.setState(nextState)
  }

  componentDidUpdate() {
    if (this.shouldEnterCurrent) {
      this.shouldEnterCurrent = false
      // If the current child renders null there is nothing to enter
      if (findDOMNode(this.childRefs[this.state.currentKey])) {
        this.performEnter(this.state.currentKey)
      }
    }

    const keysToLeave = this.keysToLeave
    this.keysToLeave = []
    keysToLeave.forEach(this.performLeave)
  }

  performAppear(key) {
    this.transitioningKeys[key] = true
    this.childRefs[key].componentWillAppear(this.handleDoneAppearing.bind(this, key))
  }

  handleDoneAppearing = (key) => {
    delete this.transitioningKeys[key]
    if (key !== this.state.currentKey) {
      // This child was removed before it had fully appeared. Remove it.
      this.performLeave(key)
    }
  }

  performEnter(key) {
    this.transitioningKeys[key] = true
    this.childRefs[key].componentWillEnter(this.handleDoneEntering.bind(this, key))
    this.enqueueHeightTransition()
  }

  handleDoneEntering(key) {
    delete this.transitioningKeys[key]
    if (key === this.state.currentKey) {
      // The current child has finished entering so the height transition is also cleared.
      this.setState({height: null})
    } else {
      // This child was removed before it had fully appeared. Remove it.
      this.performLeave(key)
    }
  }

  performLeave = (key) => {
    this.transitioningKeys[key] = true
    this.childRefs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key))
    if (!this.state.currentChild || !findDOMNode(this.childRefs[this.state.currentKey])) {
      // The enter transition dominates, but if there is no entering
      // component or it renders null the height is set to zero.
      this.enqueueHeightTransition()
    }
  }

  handleDoneLeaving(key) {
    delete this.transitioningKeys[key]

    const nextState = {prevChildren: {...this.state.prevChildren}}
    delete nextState.prevChildren[key]
    delete this.childRefs[key]

    if (!this.state.currentChild || !findDOMNode(this.childRefs[this.state.currentKey])) {
      nextState.height = null
    }

    this.setState(nextState)
  }

  enqueueHeightTransition() {
    if (!this.rafHandle) {
      this.rafHandle = raf(this.performHeightTransition)
    }
  }

  performHeightTransition = () => {
    if (!this.unmounted) {
      const {state} = this
      const currentChildNode = state.currentChild ? findDOMNode(this.childRefs[state.currentKey]) : null
      this.setState({
        height: currentChildNode ? currentChildNode.offsetHeight : 0,
        width: this.props.changeWidth
          ? (currentChildNode ? currentChildNode.offsetWidth : 0)
          : null,
      })
    }
    this.rafHandle = null
  }

  wrapChild(child, moreProps) {
    let transitionName = this.props.transitionName

    if (typeof transitionName === 'object' && transitionName !== null) {
      transitionName = {...transitionName}
      delete transitionName.height
    }

    // We need to provide this childFactory so that
    // ReactCSSTransitionReplaceChild can receive updates to name,
    // enter, and leave while it is leaving.
    return reactCSSTransitionReplaceChild({
      name: transitionName,
      appear: this.props.transitionAppear,
      enter: this.props.transitionEnter,
      leave: this.props.transitionLeave,
      appearTimeout: this.props.transitionAppearTimeout,
      enterTimeout: this.props.transitionEnterTimeout,
      leaveTimeout: this.props.transitionLeaveTimeout,
      ...moreProps,
    }, child)
  }

  storeChildRef(child, key) {
    const isCallbackRef = typeof child.ref !== 'string'
    warning(isCallbackRef,
      'string refs are not supported on children of ReactCSSTransitionReplace and will be ignored. ' +
      'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute')

    return chain(
      isCallbackRef ? child.ref : null,
      (r) => {this.childRefs[key] = r}
    )
  }

  render() {
    const {currentKey, currentChild, prevChildren, height, width} = this.state
    const childrenToRender = []

    const {
      overflowHidden, transitionName, component, childComponent, notifyLeaving,
      transitionAppear, transitionEnter, transitionLeave, changeWidth,
      transitionAppearTimeout, transitionEnterTimeout, transitionLeaveTimeout,
      ...containerProps
    } = this.props

    const transitioning = this.shouldEnterCurrent || this.keysToLeave.length || Object.keys(this.transitioningKeys).length

    containerProps.style = {
      ...containerProps.style,
    }

    if (transitioning) {
      containerProps.style.position = 'relative'
      if (overflowHidden) {
        containerProps.style.overflow = 'hidden'
      }
    }

    if (height !== null) {
      const heightClassName = typeof transitionName === 'string'
        ? `${transitionName}-height`
        : (transitionName && transitionName.height) || ''

      containerProps.className = `${containerProps.className || ''} ${heightClassName}`
      containerProps.style.height = height
    }

    if (width !== null) {
      containerProps.style.width = width
    }

    const positionAbsolute = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // In Chrome a selection on a child due to multiple clicks often transfers to the final child after
      // the transitions completes. This prevents selection of the child without other side-effects.
      userSelect: 'none',
    }

    Object.keys(prevChildren).forEach(key => {
      const child = prevChildren[key]
      childrenToRender.push(
        React.createElement(childComponent,
          {key, style: positionAbsolute},
          this.wrapChild(
            notifyLeaving && typeof child.type !== 'string'
              ? React.cloneElement(child, {isLeaving: true})
              : child,
            {ref: this.storeChildRef(child, key)}
          )
        )
      )
    })

    if (currentChild) {
      childrenToRender.push(
        React.createElement(childComponent,
          {
            key: currentKey,
            // While there are leaving children positioning must always be specified to keep the current
            // child on top; the current child can switch to relative positioning after entering though.
            style: this.transitioningKeys[currentKey]
              ? positionAbsolute
              : (transitioning ? {position: 'relative'} : null),
          },
          this.wrapChild(
            currentChild,
            {ref: this.storeChildRef(currentChild, currentKey)}
          )
        )
      )
    }

    return React.createElement(component, containerProps, childrenToRender)
  }
}
