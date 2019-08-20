declare const Jimp: Jimp;
export = Jimp;

interface Jimp {
  // Constructors
  new (path: string, cb?: ImageCallback): Jimp;
  new (urlOptions: URLOptions, cb?: ImageCallback): Jimp;
  new (image: Jimp, cb?: ImageCallback): Jimp;
  new (data: Buffer, cb?: ImageCallback): Jimp;
  new (data: Bitmap, cb?: ImageCallback): Jimp;
  new (w: number, h: number, cb?: ImageCallback): Jimp;
  new (
    w: number,
    h: number,
    background?: number | string,
    cb?: ImageCallback
  ): Jimp;
  // For custom constructors when using Jimp.appendConstructorOption
  new (...args: any[]): Jimp;
  prototype: Jimp;

  // Constants
  AUTO: -1;

  // supported mime types
  MIME_PNG: 'image/png';
  MIME_TIFF: 'image/tiff';
  MIME_JPEG: 'image/jpeg';
  MIME_JGD: 'image/jgd';
  MIME_BMP: 'image/bmp';
  MIME_X_MS_BMP: 'image/x-ms-bmp';
  MIME_GIF: 'image/gif';
  // PNG filter types
  PNG_FILTER_AUTO: -1;
  PNG_FILTER_NONE: 0;
  PNG_FILTER_SUB: 1;
  PNG_FILTER_UP: 2;
  PNG_FILTER_AVERAGE: 3;
  PNG_FILTER_PATH: 4;

  // resize methods
  RESIZE_NEAREST_NEIGHBOR: 'nearestNeighbor';
  RESIZE_BILINEAR: 'bilinearInterpolation';
  RESIZE_BICUBIC: 'bicubicInterpolation';
  RESIZE_HERMITE: 'hermiteInterpolation';
  RESIZE_BEZIER: 'bezierInterpolation';

  // blend modes
  BLEND_SOURCE_OVER: string;
  BLEND_DESTINATION_OVER: string;
  BLEND_MULTIPLY: string;
  BLEND_SCREEN: string;
  BLEND_OVERLAY: string;
  BLEND_DARKEN: string;
  BLEND_LIGHTEN: string;
  BLEND_HARDLIGHT: string;
  BLEND_DIFFERENCE: string;
  BLEND_EXCLUSION: string;

  // Align modes for cover, contain, bit masks
  HORIZONTAL_ALIGN_LEFT: 1;
  HORIZONTAL_ALIGN_CENTER: 2;
  HORIZONTAL_ALIGN_RIGHT: 4;

  VERTICAL_ALIGN_TOP: 8;
  VERTICAL_ALIGN_MIDDLE: 16;
  VERTICAL_ALIGN_BOTTOM: 32;

  // Font locations
  FONT_SANS_8_BLACK: string;
  FONT_SANS_10_BLACK: string;
  FONT_SANS_12_BLACK: string;
  FONT_SANS_14_BLACK: string;
  FONT_SANS_16_BLACK: string;
  FONT_SANS_32_BLACK: string;
  FONT_SANS_64_BLACK: string;
  FONT_SANS_128_BLACK: string;

  FONT_SANS_8_WHITE: string;
  FONT_SANS_16_WHITE: string;
  FONT_SANS_32_WHITE: string;
  FONT_SANS_64_WHITE: string;
  FONT_SANS_128_WHITE: string;

  // Edge Handling
  EDGE_EXTEND: 1;
  EDGE_WRAP: 2;
  EDGE_CROP: 3;

  // Properties
  bitmap: Bitmap;

  _quality: number;
  _deflateLevel: number;
  _deflateStrategy: number;
  _filterType: number;
  _rgba: boolean;
  _background: number;
  _originalMime: string;

  // Methods
  on<T extends ListenableName>(
    event: T,
    cb: (data: ListenerData<T>) => any
  ): any;
  parseBitmap(
    data: Buffer,
    path: string | null | undefined,
    cb?: ImageCallback
  ): void;
  hasAlpha(): boolean;
  getHeight(): number;
  getWidth(): number;
  inspect(): string;
  toString(): string;
  getMIME(): string;
  getExtension(): string;
  distanceFromHash(hash: string): number;
  write(path: string, cb?: ImageCallback): this;
  writeAsync(path: string): Promise<Jimp>;
  deflateLevel(l: number, cb?: ImageCallback): this;
  deflateStrategy(s: number, cb?: ImageCallback): this;
  colorType(s: number, cb?: ImageCallback): this;
  filterType(f: number, cb?: ImageCallback): this;
  rgba(bool: boolean, cb?: ImageCallback): this;
  quality(n: number, cb?: ImageCallback): this;
  getBase64(mime: string, cb: GenericCallback<string, any, this>): this;
  getBase64Async(mime: string): Promise<string>;
  hash(cb?: GenericCallback<string, any, this>): this;
  hash(
    base: number | null | undefined,
    cb?: GenericCallback<string, any, this>
  ): this;
  getBuffer(mime: string, cb: GenericCallback<Buffer>): this;
  getBufferAsync(mime: string): Promise<Buffer>;
  getPixelIndex(
    x: number,
    y: number,
    cb?: GenericCallback<number, any, this>
  ): number;
  getPixelIndex(
    x: number,
    y: number,
    edgeHandling: string,
    cb?: GenericCallback<number, any, this>
  ): number;
  getPixelColor(
    x: number,
    y: number,
    cb?: GenericCallback<number, any, this>
  ): number;
  getPixelColour(
    x: number,
    y: number,
    cb?: GenericCallback<number, any, this>
  ): number;
  setPixelColor(hex: number, x: number, y: number, cb?: ImageCallback): this;
  setPixelColour(hex: number, x: number, y: number, cb?: ImageCallback): this;
  clone(cb?: ImageCallback): this;
  cloneQuiet(cb?: ImageCallback): this;
  background(hex: number, cb?: ImageCallback): this;
  backgroundQuiet(hex: number, cb?: ImageCallback): this;
  scan(
    x: number,
    y: number,
    w: number,
    h: number,
    f: (this: this, x: number, y: number, idx: number) => any,
    cb?: ImageCallback
  ): this;
  scanQuiet(
    x: number,
    y: number,
    w: number,
    h: number,
    f: (this: this, x: number, y: number, idx: number) => any,
    cb?: ImageCallback
  ): this;
  crop(x: number, y: number, w: number, h: number, cb?: ImageCallback): this;
  cropQuiet(
    x: number,
    y: number,
    w: number,
    h: number,
    cb?: ImageCallback
  ): this;

  // Color methods
  brightness(val: number, cb?: ImageCallback): this;
  contrast(val: number, cb?: ImageCallback): this;
  posterize(n: number, cb?: ImageCallback): this;
  greyscale(cb?: ImageCallback): this;
  grayscale(cb?: ImageCallback): this;
  opacity(f: number, cb?: ImageCallback): this;
  sepia(cb?: ImageCallback): this;
  fade(f: number, cb?: ImageCallback): this;
  convolution(kernel: number[][], cb?: ImageCallback): this;
  convolution<T>(
    kernel: number[][],
    edgeHandling: string,
    cb?: ImageCallback
  ): this;
  opaque(cb?: ImageCallback): this;
  pixelate(size: number, cb?: ImageCallback): this;
  pixelate(
    size: number,
    x: number,
    y: number,
    w: number,
    h: number,
    cb?: ImageCallback
  ): this;
  convolute(kernel: number[][], cb?: ImageCallback): this;
  convolute(
    kernel: number[][],
    x: number,
    y: number,
    w: number,
    h: number,
    cb?: ImageCallback
  ): this;
  color(actions: ColorAction[], cb?: ImageCallback): this;
  colour(actions: ColorAction[], cb?: ImageCallback): this;

  // Shape methods
  rotate(deg: number, cb?: ImageCallback): this;
  rotate(deg: number, mode: string | boolean, cb?: ImageCallback): this;
  flip(horizontal: boolean, vertical: boolean, cb?: ImageCallback): this;
  mirror(horizontal: boolean, vertical: boolean, cb?: ImageCallback): this;
  resize(w: number, h: number, cb?: ImageCallback): this;
  resize(w: number, h: number, mode?: string, cb?: ImageCallback): this;
  cover(w: number, h: number, cb?: ImageCallback): this;
  cover(w: number, h: number, alignBits?: number, cb?: ImageCallback): this;
  cover(
    w: number,
    h: number,
    alignBits?: number,
    mode?: string,
    cb?: ImageCallback
  ): this;
  contain(w: number, h: number, cb?: ImageCallback): this;
  contain(w: number, h: number, mode?: string, cb?: ImageCallback): this;
  contain(w: number, h: number, alignBits?: number, cb?: ImageCallback): this;
  contain(
    w: number,
    h: number,
    alignBits?: number,
    mode?: string,
    cb?: ImageCallback
  ): this;
  scale(f: number, cb?: ImageCallback): this;
  scale(f: number, mode?: string, cb?: ImageCallback): this;
  scaleToFit(w: number, h: number, cb?: ImageCallback): this;
  scaleToFit(w: number, h: number, mode?: string, cb?: ImageCallback): this;
  displace(map: Jimp, offset: number, cb?: ImageCallback): this;
  autocrop(tolerance?: number, cb?: ImageCallback): this;
  autocrop(cropOnlyFrames?: boolean, cb?: ImageCallback): this;
  autocrop(
    tolerance?: number,
    cropOnlyFrames?: boolean,
    cb?: ImageCallback
  ): this;
  autocrop(
    options: {
      tolerance?: number;
      cropOnlyFrames?: boolean;
      cropSymmetric?: boolean;
      leaveBorder?: number;
    },
    cb?: ImageCallback
  ): this;

  // Text methods
  print(
    font: Font,
    x: number,
    y: number,
    text: PrintableText,
    cb?: ImageCallback
  ): this;
  print(
    font: Font,
    x: number,
    y: number,
    text: PrintableText,
    maxWidth?: number,
    cb?: ImageCallback
  ): this;
  print(
    font: Font,
    x: number,
    y: number,
    text: PrintableText,
    maxWidth?: number,
    maxHeight?: number,
    cb?: ImageCallback
  ): this;

  // Effect methods
  blur(r: number, cb?: ImageCallback): this;
  dither565(cb?: ImageCallback): this;
  dither16(cb?: ImageCallback): this;
  histogram(): {
    r: number[];
    g: number[];
    b: number[];
  };
  normalize(cb?: ImageCallback): this;
  invert(cb?: ImageCallback): this;
  gaussian(r: number, cb?: ImageCallback): this;
  composite(
    src: Jimp,
    x: number,
    y: number,
    options?: BlendMode,
    cb?: ImageCallback
  ): this;
  blit(src: Jimp, x: number, y: number, cb?: ImageCallback): this;
  blit(
    src: Jimp,
    x: number,
    y: number,
    srcx: number,
    srcy: number,
    srcw: number,
    srch: number,
    cb?: ImageCallback
  ): this;
  mask(src: Jimp, x: number, y: number, cb?: ImageCallback): this;

  // Functions
  appendConstructorOption<T extends any[]>(
    name: string,
    test: (...args: T[]) => boolean,
    run: (
      this: Jimp,
      resolve: (jimp: Jimp) => any,
      reject: (reason: Error) => any,
      ...args: T[]
    ) => any
  ): void;
  read(path: string): Promise<Jimp>;
  read(image: Jimp): Promise<Jimp>;
  read(data: Buffer): Promise<Jimp>;
  read(w: number, h: number, background?: number | string): Promise<Jimp>;
  create(path: string): Promise<Jimp>;
  create(image: Jimp): Promise<Jimp>;
  create(data: Buffer): Promise<Jimp>;
  create(w: number, h: number, background?: number | string): Promise<Jimp>;
  rgbaToInt(
    r: number,
    g: number,
    b: number,
    a: number,
    cb: GenericCallback<number, any, Jimp>
  ): number;
  intToRGBA(i: number, cb?: GenericCallback<RGBA>): RGBA;
  cssColorToHex(cssColor: string): number;
  limit255(n: number): number;
  diff(
    img1: Jimp,
    img2: Jimp,
    threshold?: number
  ): {
    percent: number;
    image: Jimp;
  };
  distance(img1: Jimp, img2: Jimp): number;
  compareHashes(hash1: string, hash2: string): number;
  colorDiff(rgba1: RGB, rgba2: RGB): number;
  colorDiff(rgba1: RGBA, rgba2: RGBA): number;
  loadFont(file: string): Promise<Font>;
  loadFont(file: string, cb: GenericCallback<Font, any, any>): Promise<never>;
  measureText(font: Font, text: PrintableText): number;
  measureTextHeight(font: Font, text: PrintableText, maxWidth: number): number;
}

type GenericCallback<T, U = any, TThis = any> = (
  this: TThis,
  err: Error | null,
  value: T
) => U;

type ImageCallback<U = any> = (
  this: Jimp,
  err: Error | null,
  value: Jimp,
  coords: {
    x: number;
    y: number;
  }
) => U;

type ColorActionName =
  | 'mix'
  | 'tint'
  | 'shade'
  | 'xor'
  | 'red'
  | 'green'
  | 'blue'
  | 'hue';

type ColorAction = {
  apply: ColorActionName;
  params: any;
};

type BlendMode = {
  mode: string;
  opacitySource: number;
  opacityDest: number;
};

type ChangeName = 'background' | 'scan' | 'crop';

type ListenableName =
  | 'any'
  | 'initialized'
  | 'before-change'
  | 'changed'
  | 'before-clone'
  | 'cloned'
  | ChangeName;

type ListenerData<T extends ListenableName> = T extends 'any'
  ? any
  : T extends ChangeName
    ? {
        eventName: 'before-change' | 'changed';
        methodName: T;
        [key: string]: any;
      }
    : {
        eventName: T;
        methodName: T extends 'initialized'
          ? 'constructor'
          : T extends 'before-change' | 'changed'
            ? ChangeName
            : T extends 'before-clone' | 'cloned' ? 'clone' : any;
      };

type PrintableText =
  | any
  | {
      text: string;
      alignmentX: number;
      alignmentY: number;
    };

type URLOptions = {
  url: string;
  compression?: boolean;
  headers: {
    [key: string]: any;
  };
};

interface Bitmap {
  data: Buffer;
  width: number;
  height: number;
}
interface RGB {
  r: number;
  g: number;
  b: number;
}
interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FontChar {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  xoffset: number;
  yoffset: number;
  xadvance: number;
  page: number;
  chnl: number;
}

interface FontInfo {
  face: string;
  size: number;
  bold: number;
  italic: number;
  charset: string;
  unicode: number;
  stretchH: number;
  smooth: number;
  aa: number;
  padding: [number, number, number, number];
  spacing: [number, number];
}

interface FontCommon {
  lineHeight: number;
  base: number;
  scaleW: number;
  scaleH: number;
  pages: number;
  packed: number;
  alphaChnl: number;
  redChnl: number;
  greenChnl: number;
  blueChnl: number;
}

interface Font {
  chars: {
    [char: string]: FontChar;
  };
  kernings: {
    [firstString: string]: {
      [secondString: string]: number;
    };
  };
  pages: string[];
  common: FontCommon;
  info: FontInfo;
}
