import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

class Dev404Page extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    custom404: PropTypes.element,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const { data } = this.props
    const pagePaths = data.allSitePage.nodes.map(node => node.path)
    this.state = {
      showCustom404: false,
      initPagePaths: pagePaths,
      pagePaths: pagePaths,
      pagePathSearchTerms: ``,
    }
    this.showCustom404 = this.showCustom404.bind(this)
    this.handlePagePathSearch = this.handlePagePathSearch.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  showCustom404() {
    this.setState({ showCustom404: true })
  }

  handleSearchTermChange(event) {
    this.setState({
      pagePathSearchTerms: event.target.value,
    })
  }

  handlePagePathSearch(event) {
    event.preventDefault()
    const tempPagePaths = [...this.state.initPagePaths]
    const searchTerm = new RegExp(`${this.state.pagePathSearchTerms}`)
    this.setState({
      pagePaths: tempPagePaths.filter(pagePath => searchTerm.test(pagePath)),
    })
  }

  render() {
    const { pathname } = this.props.location
    let newFilePath
    if (pathname === `/`) {
      newFilePath = `src/pages/index.js`
    } else if (pathname.slice(-1) === `/`) {
      newFilePath = `src/pages${pathname.slice(0, -1)}.js`
    } else {
      newFilePath = `src/pages${pathname}.js`
    }

    return this.state.showCustom404 ? (
      this.props.custom404
    ) : (
      <div>
        <h1>Gatsby.js development 404 page</h1>
        <p>
          {`There's not a page yet at `}
          <code>{pathname}</code>
        </p>
        {this.props.custom404 ? (
          <p>
            <button onClick={this.showCustom404}>
              Preview custom 404 page
            </button>
          </p>
        ) : (
          <p>
            {`A custom 404 page wasn't detected - if you would like to add one, create a component in your site directory at `}
            <code>src/pages/404.js</code>.
          </p>
        )}
        <p>
          Create a React.js component in your site directory at
          {` `}
          <code>{newFilePath}</code>
          {` `}
          and this page will automatically refresh to show the new page
          component you created.
        </p>
        {this.state.initPagePaths.length > 0 && (
          <div>
            <p>
              If you were trying to reach another page, perhaps you can find it
              below.
            </p>
            <h2>
              Pages (
              {this.state.pagePaths.length != this.state.initPagePaths.length
                ? `${this.state.pagePaths.length}/${
                    this.state.initPagePaths.length
                  }`
                : this.state.initPagePaths.length}
              )
            </h2>

            <form onSubmit={this.handlePagePathSearch}>
              <label>
                Search:
                <input
                  type="text"
                  id="search"
                  placeholder="Search pages..."
                  value={this.state.pageSearchTerm}
                  onChange={this.handleSearchTermChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <ul>
              {this.state.pagePaths.map(
                (pagePath, index) =>
                  index < 100 && (
                    <li key={pagePath}>
                      <Link to={pagePath}>{pagePath}</Link>
                    </li>
                  )
              )}
              {this.state.pagePaths.length > 100 && (
                <p style={{ fontWeight: `bold` }}>
                  ... and {this.state.pagePaths.length - 100} more.
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Dev404Page

export const pagesQuery = graphql`
  query PagesQuery {
    allSitePage(filter: { path: { ne: "/dev-404-page/" } }) {
      nodes {
        path
      }
    }
  }
`
