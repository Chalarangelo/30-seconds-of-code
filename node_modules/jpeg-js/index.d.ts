export interface RawImageData<T> {
  width: number,
  height: number,
  data: T
}

type BufferRet = RawImageData<Buffer>;
type UintArrRet = RawImageData<Uint8Array>;

type ImageData = BufferRet | UintArrRet;
type BufferLike = Buffer | Uint8Array | ArrayLike<number> | Iterable<number> | ArrayBuffer;

export declare function encode(imgData: RawImageData<BufferLike>, quality?: number): BufferRet;

/**
 * @deprecated - decode takes an object since 0.3.5
 */
export declare function decode(jpegData: BufferLike, opts: true): UintArrRet;
export declare function decode(jpegData: BufferLike, opts?: false): BufferRet;

export declare function decode(jpegData: BufferLike, opts: {
  useTArray: true,
  colorTransform?: boolean
}): UintArrRet;
export declare function decode(jpegData: BufferLike, opts?: {
  useTArray?: false,
  colorTransform?: boolean
}): BufferRet;
