import React from "react"

import PageRenderer from "./page-renderer"
import normalizePagePath from "./normalize-page-path"
import { StaticQueryContext } from "gatsby"
import {
  getStaticQueryData,
  getPageQueryData,
  registerPath as socketRegisterPath,
  unregisterPath as socketUnregisterPath,
} from "./socketIo"

if (process.env.NODE_ENV === `production`) {
  throw new Error(
    `It appears like Gatsby is misconfigured. JSONStore is Gatsby internal ` +
      `development-only component and should never be used in production.\n\n` +
      `Unless your site has a complex or custom webpack/Gatsby ` +
      `configuration this is likely a bug in Gatsby. ` +
      `Please report this at https://github.com/gatsbyjs/gatsby/issues ` +
      `with steps to reproduce this error.`
  )
}

const getPathFromProps = props =>
  props.pageResources && props.pageResources.page
    ? normalizePagePath(props.pageResources.page.path)
    : undefined

class JSONStore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      staticQueryData: getStaticQueryData(),
      pageQueryData: getPageQueryData(),
      path: null,
    }
  }

  handleMittEvent = (type, event) => {
    this.setState({
      staticQueryData: getStaticQueryData(),
      pageQueryData: getPageQueryData(),
    })
  }

  componentDidMount() {
    socketRegisterPath(getPathFromProps(this.props))
    ___emitter.on(`*`, this.handleMittEvent)
  }

  componentWillUnmount() {
    socketUnregisterPath(this.state.path)
    ___emitter.off(`*`, this.handleMittEvent)
  }

  static getDerivedStateFromProps(props, state) {
    const newPath = getPathFromProps(props)
    if (newPath !== state.path) {
      socketUnregisterPath(state.path)
      socketRegisterPath(newPath)
      return {
        path: newPath,
      }
    }

    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We want to update this component when:
    // - location changed
    // - page data for path changed
    // - static query results changed

    return (
      this.props.location !== nextProps.location ||
      this.state.path !== nextState.path ||
      this.state.pageQueryData[normalizePagePath(nextState.path)] !==
        nextState.pageQueryData[normalizePagePath(nextState.path)] ||
      this.state.staticQueryData !== nextState.staticQueryData
    )
  }

  render() {
    const data = this.state.pageQueryData[getPathFromProps(this.props)]
    // eslint-disable-next-line
    if (!data) {
      return <div />
    }

    return (
      <StaticQueryContext.Provider value={this.state.staticQueryData}>
        <PageRenderer {...this.props} {...data} />
      </StaticQueryContext.Provider>
    )
  }
}

export default JSONStore
