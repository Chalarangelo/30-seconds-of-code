import * as React from "react"
import { NavigateFn, LinkProps } from "@reach/router"

export interface GatsbyLinkProps<TState> extends LinkProps<TState> {
  /** A class to apply when this Link is active */
  activeClassName?: string
  /** Inline styles for when this Link is active */
  activeStyle?: object
  innerRef?: Function
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  /** Class the link as highlighted if there is a partial match via a the `to` being prefixed to the current url */
  partiallyActive?: boolean
  /** Used to declare that this link replaces the current URL in history with the target */
  replace?: boolean
  /** The URL you want to link to */
  to: string
}

/**
 * This component is intended _only_ for links to pages handled by Gatsby. For links to pages on other
 * domains or pages on the same domain not handled by the current Gatsby site, use the normal `<a>` element.
 */
export default class GatsbyLink<TState> extends React.Component<
  GatsbyLinkProps<TState>,
  any
> {}

/**
 * Sometimes you need to navigate to pages programmatically, such as during form submissions. In these
 * cases, `Link` won’t work.
 */
export const navigate: NavigateFn

/**
 * It is common to host sites in a sub-directory of a site. Gatsby lets you set the path prefix for your site.
 * After doing so, Gatsby's `<Link>` component will automatically handle constructing the correct URL in
 * development and production
 */
export const withPrefix: (path: string) => string
export const withAssetPrefix: (path: string) => string

/**
 * @deprecated
 * TODO: Remove for Gatsby v3
 */
export const push: (to: string) => void

/**
 * @deprecated
 * TODO: Remove for Gatsby v3
 */
export const replace: (to: string) => void

/**
 * @deprecated
 * TODO: Remove for Gatsby v3
 */
export const navigateTo: (to: string) => void
