import * as React from "react"

import GatsbyImage, { GatsbyImageProps } from "../index"

interface GatsbyImageWithIEPolyfillProps extends GatsbyImageProps {
  objectFit?: `fill` | `contain` | `cover` | `none` | `scale-down`
  objectPosition?: string
}

export default class GatsbyImageWithIEPolyfill extends React.Component<
  GatsbyImageWithIEPolyfillProps
> {}
