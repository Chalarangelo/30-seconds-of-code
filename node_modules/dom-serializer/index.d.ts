export interface DomSerializerOptions {
  xmlMode?: boolean | 'foreign';
  decodeEntities?: boolean;
}

/**
 * Renders a DOM node or an array of DOM nodes to a string.
 *
 * Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
 *
 * @param nodes Nodes to be rendered.
 * @param options Changes serialization behavior
 */
export default function render(
  nodes: {} | {}[],
  options?: DomSerializerOptions
): string;
