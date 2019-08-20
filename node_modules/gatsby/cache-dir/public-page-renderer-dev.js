import React from "react"
import PropTypes from "prop-types"

import loader from "./loader"
import JSONStore from "./json-store"

const DevPageRenderer = ({ location }) => {
  const pageResources = loader.loadPageSync(location.pathname)
  return React.createElement(JSONStore, {
    location,
    pageResources,
  })
}

DevPageRenderer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default DevPageRenderer
