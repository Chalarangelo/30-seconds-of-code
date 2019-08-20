import postcss from 'postcss';

const OVERRIDABLE_RULES = ['keyframes', 'counter-style'];
const SCOPE_RULES = ['media', 'supports'];

function isOverridable (name) {
    return ~OVERRIDABLE_RULES.indexOf(postcss.vendor.unprefixed(name.toLowerCase()));
}

function isScope (name) {
    return ~SCOPE_RULES.indexOf(postcss.vendor.unprefixed(name.toLowerCase()));
}

function getScope (node) {
    let current = node.parent;
    const chain = [node.name.toLowerCase(), node.params];
    do {
        if (current.type === 'atrule' && isScope(current.name)) {
            chain.unshift(current.name + ' ' + current.params);
        }
        current = current.parent;
    } while (current);
    return chain.join('|');
}

export default postcss.plugin('postcss-discard-overridden', () => {
    return css => {
        const cache = {};
        const rules = [];
        css.walkAtRules(node => {
            if (isOverridable(node.name)) {
                const scope = getScope(node);
                cache[scope] = node;
                rules.push({
                    node,
                    scope,
                });
            }
        });
        rules.forEach(rule => {
            if (cache[rule.scope] !== rule.node) {
                rule.node.remove();
            }
        });
    };
});
