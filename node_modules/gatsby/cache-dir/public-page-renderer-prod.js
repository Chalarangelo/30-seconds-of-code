import React from "react"
import PropTypes from "prop-types"

import InternalPageRenderer from "./page-renderer"

const ProdPageRenderer = ({ location, pageResources }) => {
  if (!pageResources) {
    return null
  }
  return React.createElement(InternalPageRenderer, {
    location,
    pageResources,
    ...pageResources.json,
  })
}

ProdPageRenderer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProdPageRenderer
