/** Symbol.observable addition */
declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}
/** Symbol.observable or a string "@@observable". Used for interop */
export declare const observable: string | symbol;
