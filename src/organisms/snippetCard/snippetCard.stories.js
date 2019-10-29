import React from 'react';
import { StandardSnippetCard, CssSnippetCard } from 'organisms/snippetCard';
import { object } from '@storybook/addon-knobs';
import standardCardMdx from './standardSnippetCard/docs.mdx';
import cssCardMdx from './cssSnippetCard/docs.mdx';

export default {
  title: 'Organisms|SnippetCard',
};

export const standard = () => {
  const snippetHTMLs = {
    description: '<p>Performs right-to-left function composition.</p>',
    fullDescription: '<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
    code: '<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>',
    example: '<span class="token keyword">const</span> <span class="token function-variable function">add5</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class= "token keyword" >const</span> <span class="token function-variable function">multiply</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token parameter">x<span class="token punctuation">,</span> y</span> <span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> y <span class="token punctuation" >;</span >\n<span class="token keyword">const</span> multiplyAndAdd5 <span class="token operator" >=</span > <span class="token function">compose</span> <span class="token punctuation">(</span>add5 <span class="token punctuation" >,</span >multiply<span class="token punctuation" >);</span >\n<span class="token function">multiplyAndAdd5</span> <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">);</span> <span class="token comment">// 15</span>',
  };
  const snippet = object('snippet', {
    title: 'compose',
    language: {short: 'js', long: 'JavaScript'},
    tags: {
      primary: 'function',
      all: ['function', 'recursion'],
    },
    expertise: 'intermediate',
    code: {
      src: 'const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));',
      example: '',
    },
  });

  return (
    <StandardSnippetCard snippet={ { ...snippet, html: { ...snippetHTMLs } } }/>
  );
};
standard.story = {
  component: StandardSnippetCard,
  parameters: {
    docs: {
      page: standardCardMdx,
    },
    jest: [
      'snippetCard',
    ],
  },
};


export const css = () => {
  const snippetHTMLs = {
    description: '<p>Performs right-to-left function composition.</p>',
    fullDescription: '<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
    htmlCode: '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">="</span>mouse-cursor-gradient-tracking<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>Hover me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>',
    cssCode: `<span class="token selector">.mouse-cursor-gradient-tracking</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #7983ff<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0.5rem 1rem<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.2rem<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;
}</span>

<span class="token selector">.mouse-cursor-gradient-tracking span</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;
}</span>

<span class="token selector">.mouse-cursor-gradient-tracking::before</span> <span class="token punctuation">{</span>
  <span class="token property">--size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--x<span class="token punctuation">);</span>
  <span class="token property">top</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--y<span class="token punctuation">);</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--size<span class="token punctuation">);</span>
  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--size<span class="token punctuation">);</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle closest-side<span class="token punctuation">,</span> pink<span class="token punctuation">,</span> transparent<span class="token punctuation">);</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">);</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> width 0.2s ease<span class="token punctuation">,</span> height 0.2s ease<span class="token punctuation">;
}</span>

<span class="token selector">.mouse-cursor-gradient-tracking:hover::before</span> <span class="token punctuation">{</span>
  <span class="token property">--size</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;
}</span>`,
    jsCode: `<pre class="card-code language-js"><span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.mouse-cursor-gradient-tracking'</span><span class="token punctuation">)</span>
btn<span class="token punctuation">.</span><span class="token function-variable function">onmousemove</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">) {</span>
  <span class="token keyword">var</span> rect <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">()</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> e<span class="token punctuation">.</span>clientX <span class="token operator">-</span> rect<span class="token punctuation">.</span>left
  <span class="token keyword">var</span> y <span class="token operator">=</span> e<span class="token punctuation">.</span>clientY <span class="token operator">-</span> rect<span class="token punctuation">.</span>top
  btn<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">'--x'</span><span class="token punctuation">,</span> x <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">)</span>
  btn<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">'--y'</span><span class="token punctuation">,</span> y <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">)
}</span></pre>`,
    browserSupport: '\n<p><span class=\"snippet__support-note\">⚠️ Requires JavaScript.</span></p>\n<ul>\n<li><a href=\"https://caniuse.com/#feat=css-variables\">https://caniuse.com/#feat=css-variables</a></li>\n</ul>',
  };
  const snippet = object('snippet', {
    title: 'Mouse cursor gradient tracking',
    language: { short: 'css', long: 'CSS' },
    tags: {
      primary: 'visual',
      all: ['visual', 'interactivity'],
    },
    browserSupport: {
      browserSupportPercentage: 96.51,
    },
    expertise: 'intermediate',
    code: {
      html: '<button class="mouse-cursor-gradient-tracking">\n<span>Hover me</span>\n</button>',
      css:
`.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
}

.mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.mouse-cursor-gradient-tracking:hover::before {
  --size: 200px;
}`,
      scopedCss: `
[data-scope="mouse-cursor-gradient-tracking"] .mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden; }

[data-scope="mouse-cursor-gradient-tracking"] .mouse-cursor-gradient-tracking span {
  position: relative; }

[data-scope="mouse-cursor-gradient-tracking"] .mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease; }

[data-scope="mouse-cursor-gradient-tracking"] .mouse-cursor-gradient-tracking:hover::before {
  --size: 200px; }
`,
      js:
`var btn = document.querySelector('.mouse-cursor-gradient-tracking')
btn.onmousemove = function(e) {
  var rect = e.target.getBoundingClientRect()
  var x = e.clientX - rect.left
  var y = e.clientY - rect.top
  btn.style.setProperty('--x', x + 'px')
  btn.style.setProperty('--y', y + 'px')
}`,
    },
  });

  return (
    <CssSnippetCard snippet={ { ...snippet, html: { ...snippetHTMLs } } } />
  );
};
standard.story = {
  component: CssSnippetCard,
  parameters: {
    docs: {
      page: cssCardMdx,
    },
    jest: [
      'cssSnippetCard',
    ],
  },
};
