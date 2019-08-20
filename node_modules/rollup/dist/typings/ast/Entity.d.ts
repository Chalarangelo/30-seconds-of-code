import ExecutionPathOptions from './ExecutionPathOptions';
import { ObjectPath } from './values';
export interface Entity {
    toString: () => string;
}
export interface WritableEntity extends Entity {
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    /**
     * Reassign a given path of an object.
     * E.g., node.reassignPath(['x', 'y']) is called when something
     * is assigned to node.x.y.
     * The default noop implementation is ok as long as hasEffectsWhenAssignedAtPath
     * always returns true for this node. Otherwise it should be overridden.
     */
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
}
