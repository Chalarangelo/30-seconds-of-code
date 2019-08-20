'use strict';

const Assert = require('@hapi/hoek/lib/assert');


const internals = {};


module.exports = class Topo {

    constructor() {

        this._items = [];
        this.nodes = [];
    }

    add(nodes, options) {

        options = options || {};

        // Validate rules

        const before = [].concat(options.before || []);
        const after = [].concat(options.after || []);
        const group = options.group || '?';
        const sort = options.sort || 0;                   // Used for merging only

        Assert(!before.includes(group), `Item cannot come before itself: ${group}`);
        Assert(!before.includes('?'), 'Item cannot come before unassociated items');
        Assert(!after.includes(group), `Item cannot come after itself: ${group}`);
        Assert(!after.includes('?'), 'Item cannot come after unassociated items');

        ([].concat(nodes)).forEach((node, i) => {

            const item = {
                seq: this._items.length,
                sort,
                before,
                after,
                group,
                node
            };

            this._items.push(item);
        });

        // Insert event

        const error = this._sort();
        Assert(!error, 'item', (group !== '?' ? `added into group ${group}` : ''), 'created a dependencies error');

        return this.nodes;
    }

    merge(others) {

        others = [].concat(others);
        for (let i = 0; i < others.length; ++i) {
            const other = others[i];
            if (other) {
                for (let j = 0; j < other._items.length; ++j) {
                    const item = Object.assign({}, other._items[j]);        // Shallow cloned
                    this._items.push(item);
                }
            }
        }

        // Sort items

        this._items.sort(internals.mergeSort);
        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].seq = i;
        }

        const error = this._sort();
        Assert(!error, 'merge created a dependencies error');

        return this.nodes;
    }

    _sort() {

        // Construct graph

        const graph = {};
        const graphAfters = Object.create(null); // A prototype can bungle lookups w/ false positives
        const groups = Object.create(null);

        for (let i = 0; i < this._items.length; ++i) {
            const item = this._items[i];
            const seq = item.seq;                         // Unique across all items
            const group = item.group;

            // Determine Groups

            groups[group] = groups[group] || [];
            groups[group].push(seq);

            // Build intermediary graph using 'before'

            graph[seq] = item.before;

            // Build second intermediary graph with 'after'

            const after = item.after;
            for (let j = 0; j < after.length; ++j) {
                graphAfters[after[j]] = (graphAfters[after[j]] || []).concat(seq);
            }
        }

        // Expand intermediary graph

        let graphNodes = Object.keys(graph);
        for (let i = 0; i < graphNodes.length; ++i) {
            const node = graphNodes[i];
            const expandedGroups = [];

            const graphNodeItems = Object.keys(graph[node]);
            for (let j = 0; j < graphNodeItems.length; ++j) {
                const group = graph[node][graphNodeItems[j]];
                groups[group] = groups[group] || [];

                for (let k = 0; k < groups[group].length; ++k) {
                    expandedGroups.push(groups[group][k]);
                }
            }

            graph[node] = expandedGroups;
        }

        // Merge intermediary graph using graphAfters into final graph

        const afterNodes = Object.keys(graphAfters);
        for (let i = 0; i < afterNodes.length; ++i) {
            const group = afterNodes[i];

            if (groups[group]) {
                for (let j = 0; j < groups[group].length; ++j) {
                    const node = groups[group][j];
                    graph[node] = graph[node].concat(graphAfters[group]);
                }
            }
        }

        // Compile ancestors

        let children;
        const ancestors = {};
        graphNodes = Object.keys(graph);
        for (let i = 0; i < graphNodes.length; ++i) {
            const node = graphNodes[i];
            children = graph[node];

            for (let j = 0; j < children.length; ++j) {
                ancestors[children[j]] = (ancestors[children[j]] || []).concat(node);
            }
        }

        // Topo sort

        const visited = {};
        const sorted = [];

        for (let i = 0; i < this._items.length; ++i) {          // Really looping thru item.seq values out of order
            let next = i;

            if (ancestors[i]) {
                next = null;
                for (let j = 0; j < this._items.length; ++j) {  // As above, these are item.seq values
                    if (visited[j] === true) {
                        continue;
                    }

                    if (!ancestors[j]) {
                        ancestors[j] = [];
                    }

                    const shouldSeeCount = ancestors[j].length;
                    let seenCount = 0;
                    for (let k = 0; k < shouldSeeCount; ++k) {
                        if (visited[ancestors[j][k]]) {
                            ++seenCount;
                        }
                    }

                    if (seenCount === shouldSeeCount) {
                        next = j;
                        break;
                    }
                }
            }

            if (next !== null) {
                visited[next] = true;
                sorted.push(next);
            }
        }

        if (sorted.length !== this._items.length) {
            return new Error('Invalid dependencies');
        }

        const seqIndex = {};
        for (let i = 0; i < this._items.length; ++i) {
            const item = this._items[i];
            seqIndex[item.seq] = item;
        }

        const sortedNodes = [];
        this._items = sorted.map((value) => {

            const sortedItem = seqIndex[value];
            sortedNodes.push(sortedItem.node);
            return sortedItem;
        });

        this.nodes = sortedNodes;
    }
};

internals.mergeSort = (a, b) => {

    return a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1);
};
