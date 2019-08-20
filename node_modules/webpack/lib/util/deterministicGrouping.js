"use strict";

// Simulations show these probabilities for a single change
// 93.1% that one group is invalidated
// 4.8% that two groups are invalidated
// 1.1% that 3 groups are invalidated
// 0.1% that 4 or more groups are invalidated
//
// And these for removing/adding 10 lexically adjacent files
// 64.5% that one group is invalidated
// 24.8% that two groups are invalidated
// 7.8% that 3 groups are invalidated
// 2.7% that 4 or more groups are invalidated
//
// And these for removing/adding 3 random files
// 0% that one group is invalidated
// 3.7% that two groups are invalidated
// 80.8% that 3 groups are invalidated
// 12.3% that 4 groups are invalidated
// 3.2% that 5 or more groups are invalidated

/**
 *
 * @param {string} a key
 * @param {string} b key
 * @returns {number} the similarity as number
 */
const similarity = (a, b) => {
	const l = Math.min(a.length, b.length);
	let dist = 0;
	for (let i = 0; i < l; i++) {
		const ca = a.charCodeAt(i);
		const cb = b.charCodeAt(i);
		dist += Math.max(0, 10 - Math.abs(ca - cb));
	}
	return dist;
};

/**
 * @param {string} a key
 * @param {string} b key
 * @returns {string} the common part and a single char for the difference
 */
const getName = (a, b) => {
	const l = Math.min(a.length, b.length);
	let r = "";
	for (let i = 0; i < l; i++) {
		const ca = a.charAt(i);
		const cb = b.charAt(i);
		r += ca;
		if (ca === cb) {
			continue;
		}
		return r;
	}
	return a;
};

/**
 * @template T
 */
class Node {
	/**
	 * @param {T} item item
	 * @param {string} key key
	 * @param {number} size size
	 */
	constructor(item, key, size) {
		this.item = item;
		this.key = key;
		this.size = size;
	}
}

/**
 * @template T
 */
class Group {
	/**
	 * @param {Node<T>[]} nodes nodes
	 * @param {number[]} similarities similarities between the nodes (length = nodes.length - 1)
	 */
	constructor(nodes, similarities) {
		this.nodes = nodes;
		this.similarities = similarities;
		this.size = nodes.reduce((size, node) => size + node.size, 0);
		/** @type {string} */
		this.key = undefined;
	}
}

/**
 * @template T
 * @typedef {Object} GroupedItems<T>
 * @property {string} key
 * @property {T[]} items
 * @property {number} size
 */

/**
 * @template T
 * @typedef {Object} Options
 * @property {number} maxSize maximum size of a group
 * @property {number} minSize minimum size of a group (preferred over maximum size)
 * @property {Iterable<T>} items a list of items
 * @property {function(T): number} getSize function to get size of an item
 * @property {function(T): string} getKey function to get the key of an item
 */

/**
 * @template T
 * @param {Options<T>} options options object
 * @returns {GroupedItems<T>[]} grouped items
 */
module.exports = ({ maxSize, minSize, items, getSize, getKey }) => {
	/** @type {Group<T>[]} */
	const result = [];

	const nodes = Array.from(
		items,
		item => new Node(item, getKey(item), getSize(item))
	);

	/** @type {Node<T>[]} */
	const initialNodes = [];

	// lexically ordering of keys
	nodes.sort((a, b) => {
		if (a.key < b.key) return -1;
		if (a.key > b.key) return 1;
		return 0;
	});

	// return nodes bigger than maxSize directly as group
	for (const node of nodes) {
		if (node.size >= maxSize) {
			result.push(new Group([node], []));
		} else {
			initialNodes.push(node);
		}
	}

	if (initialNodes.length > 0) {
		// calculate similarities between lexically adjacent nodes
		/** @type {number[]} */
		const similarities = [];
		for (let i = 1; i < initialNodes.length; i++) {
			const a = initialNodes[i - 1];
			const b = initialNodes[i];
			similarities.push(similarity(a.key, b.key));
		}

		const initialGroup = new Group(initialNodes, similarities);

		if (initialGroup.size < minSize) {
			// We hit an edgecase where the working set is already smaller than minSize
			// We merge it with the smallest result node to keep minSize intact
			if (result.length > 0) {
				const smallestGroup = result.reduce(
					(min, group) => (min.size > group.size ? group : min)
				);
				for (const node of initialGroup.nodes) smallestGroup.nodes.push(node);
				smallestGroup.nodes.sort((a, b) => {
					if (a.key < b.key) return -1;
					if (a.key > b.key) return 1;
					return 0;
				});
			} else {
				// There are no other nodes
				// We use all nodes and have to accept that it's smaller than minSize
				result.push(initialGroup);
			}
		} else {
			const queue = [initialGroup];

			while (queue.length) {
				const group = queue.pop();
				// only groups bigger than maxSize need to be splitted
				if (group.size < maxSize) {
					result.push(group);
					continue;
				}

				// find unsplittable area from left and right
				// going minSize from left and right
				// at least one node need to be included otherwise we get stuck
				let left = 0;
				let leftSize = 0;
				while (leftSize <= minSize) {
					leftSize += group.nodes[left].size;
					left++;
				}
				let right = group.nodes.length - 1;
				let rightSize = 0;
				while (rightSize <= minSize) {
					rightSize += group.nodes[right].size;
					right--;
				}

				if (left - 1 > right) {
					// can't split group while holding minSize
					// because minSize is preferred of maxSize we return
					// the group here even while it's too big
					// To avoid this make sure maxSize > minSize * 3
					result.push(group);
					continue;
				}
				if (left <= right) {
					// when there is a area between left and right
					// we look for best split point
					// we split at the minimum similarity
					// here key space is separated the most
					let best = left - 1;
					let bestSimilarity = group.similarities[best];
					for (let i = left; i <= right; i++) {
						const similarity = group.similarities[i];
						if (similarity < bestSimilarity) {
							best = i;
							bestSimilarity = similarity;
						}
					}
					left = best + 1;
					right = best;
				}

				// create two new groups for left and right area
				// and queue them up
				const rightNodes = [group.nodes[right + 1]];
				/** @type {number[]} */
				const rightSimilaries = [];
				for (let i = right + 2; i < group.nodes.length; i++) {
					rightSimilaries.push(group.similarities[i - 1]);
					rightNodes.push(group.nodes[i]);
				}
				queue.push(new Group(rightNodes, rightSimilaries));

				const leftNodes = [group.nodes[0]];
				/** @type {number[]} */
				const leftSimilaries = [];
				for (let i = 1; i < left; i++) {
					leftSimilaries.push(group.similarities[i - 1]);
					leftNodes.push(group.nodes[i]);
				}
				queue.push(new Group(leftNodes, leftSimilaries));
			}
		}
	}

	// lexically ordering
	result.sort((a, b) => {
		if (a.nodes[0].key < b.nodes[0].key) return -1;
		if (a.nodes[0].key > b.nodes[0].key) return 1;
		return 0;
	});

	// give every group a name
	for (let i = 0; i < result.length; i++) {
		const group = result[i];
		const first = group.nodes[0];
		const last = group.nodes[group.nodes.length - 1];
		let name = getName(first.key, last.key);
		group.key = name;
	}

	// return the results
	return result.map(group => {
		/** @type {GroupedItems} */
		return {
			key: group.key,
			items: group.nodes.map(node => node.item),
			size: group.size
		};
	});
};
