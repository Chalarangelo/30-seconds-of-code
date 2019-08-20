module.exports = {
    decorator: function(handlers) {
        var curNode = null;
        var prev = null;
        var tokens = [];

        return {
            children: handlers.children,
            node: function(node) {
                var tmp = curNode;
                curNode = node;
                handlers.node.call(this, node);
                curNode = tmp;
            },
            chunk: function(chunk) {
                if (tokens.length > 0) {
                    switch (curNode.type) {
                        case 'Dimension':
                        case 'HexColor':
                        case 'IdSelector':
                        case 'Percentage':
                            if (prev.node === curNode) {
                                prev.value += chunk;
                                return;
                            }
                            break;

                        case 'Function':
                        case 'PseudoClassSelector':
                        case 'PseudoElementSelector':
                        case 'Url':
                            if (chunk === '(') {
                                prev.value += chunk;
                                return;
                            }
                            break;

                        case 'Atrule':
                            if (prev.node === curNode && prev.value === '@') {
                                prev.value += chunk;
                                return;
                            }
                            break;
                    }
                }

                tokens.push(prev = {
                    value: chunk,
                    node: curNode
                });
            },
            result: function() {
                return tokens;
            }
        };
    }
};
