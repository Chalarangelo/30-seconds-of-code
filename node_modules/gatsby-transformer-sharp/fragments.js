"use strict";

exports.__esModule = true;
exports.gatsbyImageSharpSizesPreferWebpNoBase64 = exports.gatsbyImageSharpSizesNoBase64 = exports.gatsbyImageSharpSizesPreferWebpTracedSVG = exports.gatsbyImageSharpSizesPreferWebp = exports.gatsbyImageSharpSizesTracedSVG = exports.gatsbyImageSharpSizes = exports.gatsbyImageSharpResolutionsPreferWebpNoBase64 = exports.gatsbyImageSharpResolutionsNoBase64 = exports.gatsbyImageSharpResolutionsPreferWebpTracedSVG = exports.gatsbyImageSharpResolutionsPreferWebp = exports.gatsbyImageSharpResolutionsTracedSVG = exports.gatsbyImageSharpResolutions = exports.gatsbyImageSharpFluidPreferWebpNoBase64 = exports.gatsbyImageSharpFluidNoBase64 = exports.gatsbyImageSharpFluidPreferWebpTracedSVG = exports.gatsbyImageSharpFluidPreferWebp = exports.gatsbyImageSharpFluidTracedSVG = exports.gatsbyImageSharpFluid = exports.gatsbyImageSharpFixedPreferWebpNoBase64 = exports.gatsbyImageSharpFixedNoBase64 = exports.gatsbyImageSharpFixedPreferWebpTracedSVG = exports.gatsbyImageSharpFixedPreferWebp = exports.gatsbyImageSharpFixedTracedSVG = exports.gatsbyImageSharpFixed = void 0;

var _gatsby = require("gatsby");

/* eslint-disable */
const gatsbyImageSharpFixed = _gatsby.graphql`
  fragment GatsbyImageSharpFixed on ImageSharpFixed {
    base64
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpFixed = gatsbyImageSharpFixed;
const gatsbyImageSharpFixedTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpFixed_tracedSVG on ImageSharpFixed {
    tracedSVG
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpFixedTracedSVG = gatsbyImageSharpFixedTracedSVG;
const gatsbyImageSharpFixedPreferWebp = _gatsby.graphql`
  fragment GatsbyImageSharpFixed_withWebp on ImageSharpFixed {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpFixedPreferWebp = gatsbyImageSharpFixedPreferWebp;
const gatsbyImageSharpFixedPreferWebpTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpFixed_withWebp_tracedSVG on ImageSharpFixed {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpFixedPreferWebpTracedSVG = gatsbyImageSharpFixedPreferWebpTracedSVG;
const gatsbyImageSharpFixedNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpFixed_noBase64 on ImageSharpFixed {
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpFixedNoBase64 = gatsbyImageSharpFixedNoBase64;
const gatsbyImageSharpFixedPreferWebpNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpFixed_withWebp_noBase64 on ImageSharpFixed {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpFixedPreferWebpNoBase64 = gatsbyImageSharpFixedPreferWebpNoBase64;
const gatsbyImageSharpFluid = _gatsby.graphql`
  fragment GatsbyImageSharpFluid on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpFluid = gatsbyImageSharpFluid;
const gatsbyImageSharpFluidTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpFluid_tracedSVG on ImageSharpFluid {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpFluidTracedSVG = gatsbyImageSharpFluidTracedSVG;
const gatsbyImageSharpFluidPreferWebp = _gatsby.graphql`
  fragment GatsbyImageSharpFluid_withWebp on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
exports.gatsbyImageSharpFluidPreferWebp = gatsbyImageSharpFluidPreferWebp;
const gatsbyImageSharpFluidPreferWebpTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpFluid_withWebp_tracedSVG on ImageSharpFluid {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
exports.gatsbyImageSharpFluidPreferWebpTracedSVG = gatsbyImageSharpFluidPreferWebpTracedSVG;
const gatsbyImageSharpFluidNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpFluid_noBase64 on ImageSharpFluid {
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpFluidNoBase64 = gatsbyImageSharpFluidNoBase64;
const gatsbyImageSharpFluidPreferWebpNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpFluid_withWebp_noBase64 on ImageSharpFluid {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`; // TODO: in v3 remove these legacy fragments

exports.gatsbyImageSharpFluidPreferWebpNoBase64 = gatsbyImageSharpFluidPreferWebpNoBase64;
const gatsbyImageSharpResolutions = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpResolutions = gatsbyImageSharpResolutions;
const gatsbyImageSharpResolutionsTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpResolutionsTracedSVG = gatsbyImageSharpResolutionsTracedSVG;
const gatsbyImageSharpResolutionsPreferWebp = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions_withWebp on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpResolutionsPreferWebp = gatsbyImageSharpResolutionsPreferWebp;
const gatsbyImageSharpResolutionsPreferWebpTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions_withWebp_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpResolutionsPreferWebpTracedSVG = gatsbyImageSharpResolutionsPreferWebpTracedSVG;
const gatsbyImageSharpResolutionsNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
  }
`;
exports.gatsbyImageSharpResolutionsNoBase64 = gatsbyImageSharpResolutionsNoBase64;
const gatsbyImageSharpResolutionsPreferWebpNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpResolutions_withWebp_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
exports.gatsbyImageSharpResolutionsPreferWebpNoBase64 = gatsbyImageSharpResolutionsPreferWebpNoBase64;
const gatsbyImageSharpSizes = _gatsby.graphql`
  fragment GatsbyImageSharpSizes on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpSizes = gatsbyImageSharpSizes;
const gatsbyImageSharpSizesTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpSizes_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpSizesTracedSVG = gatsbyImageSharpSizesTracedSVG;
const gatsbyImageSharpSizesPreferWebp = _gatsby.graphql`
  fragment GatsbyImageSharpSizes_withWebp on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
exports.gatsbyImageSharpSizesPreferWebp = gatsbyImageSharpSizesPreferWebp;
const gatsbyImageSharpSizesPreferWebpTracedSVG = _gatsby.graphql`
  fragment GatsbyImageSharpSizes_withWebp_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
exports.gatsbyImageSharpSizesPreferWebpTracedSVG = gatsbyImageSharpSizesPreferWebpTracedSVG;
const gatsbyImageSharpSizesNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpSizes_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    sizes
  }
`;
exports.gatsbyImageSharpSizesNoBase64 = gatsbyImageSharpSizesNoBase64;
const gatsbyImageSharpSizesPreferWebpNoBase64 = _gatsby.graphql`
  fragment GatsbyImageSharpSizes_withWebp_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
exports.gatsbyImageSharpSizesPreferWebpNoBase64 = gatsbyImageSharpSizesPreferWebpNoBase64;