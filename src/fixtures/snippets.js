export const previewSnippet = {
  title: 'RippleButton',
  expertise: 'Intermediate',
  primaryTag: 'Visual',
  language: 'React',
  icon: 'react',
  description: '<p>Renders a button that animates a ripple effect when clicked.</p>',
  url: '/react/s/ripple-button',
  searchTokens: 'ripplebutton jsx react visual state effect render button anim rippl click',
};

export const previewBlogSnippet = {
  title: 'What are CSS variables and where can I use them?',
  expertise: 'Blog',
  primaryTag: 'CSS',
  icon: 'blog',
  description: '<p>Learn how CSS custom properties (CSS variables) work and what you can use them for in your code and designs.</p>',
  url: '/blog/s/css-variables',
  searchTokens: 'css visual layout learn custom properti variabl work can us code design',
};

export const searchResultSnippet = {
  title: 'compose',
  expertise: 'Intermediate',
  primaryTag: 'Function',
  language: 'JavaScript',
  icon: 'js',
  description: '<p>Performs right-to-left function composition.</p>', 'url': '/js/s/compose',
  searchTokens: 'compose js javascript function perform right-to-left composit',
  score: 1.01,
};

export const fullSnippet = {
  'id': '30code/snippets/mapString',
  'title': 'mapString',
  'description': 'Creates a new string with the results of calling a provided function on every character in the calling string.',
  'url': 'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/mapString.md',
  'slug': '/js/s/map-string',
  'firstSeen': '2018-07-14T07:59:56.000Z',
  'lastUpdated': '2019-08-13T07:29:12.000Z',
  'expertise': 'Beginner',
  'language': {
    'long': 'JavaScript',
    'short': 'js',
    'otherLanguages': null,
  },
  'icon': 'js',
  'tags': {
    'primary': 'String',
    'all': [
      'String',
      'Array',
      'Function',
      'Utility',
      'Beginner',
    ],
  },
  'html': {
    'code': "<span class=\"token keyword\">const</span> <span class=\"token function-variable function\">mapString</span> <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span><span class=\"token parameter\">str<span class=\"token punctuation\">,</span> fn</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span>\n  str\n    <span class=\"token punctuation\">.</span><span class=\"token function\">split</span><span class=\"token punctuation\">(</span><span class=\"token string\">''</span><span class=\"token punctuation\">)\n    .</span><span class=\"token function\">map</span><span class=\"token punctuation\">((</span><span class=\"token parameter\">c<span class=\"token punctuation\">,</span> i</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token function\">fn</span><span class=\"token punctuation\">(</span>c<span class=\"token punctuation\">,</span> i<span class=\"token punctuation\">,</span> str<span class=\"token punctuation\">))\n    .</span><span class=\"token function\">join</span><span class=\"token punctuation\">(</span><span class=\"token string\">''</span><span class=\"token punctuation\">);</span>",
    'example': "<span class=\"token function\">mapString</span><span class=\"token punctuation\">(</span><span class=\"token string\">'lorem ipsum'</span><span class=\"token punctuation\">,</span> <span class=\"token parameter\">c</span> <span class=\"token operator\">=></span> c<span class=\"token punctuation\">.</span><span class=\"token function\">toUpperCase</span><span class=\"token punctuation\">());</span> <span class=\"token comment\">// 'LOREM IPSUM'</span>",
    'style': null,
    'description': '<p>Creates a new string with the results of calling a provided function on every character in the calling string.</p>',
    'fullDescription': '<p>Creates a new string with the results of calling a provided function on every character in the calling string.</p>\n<p>Use <code class="language-text">String.prototype.split(\'\')</code> and <code class="language-text">Array.prototype.map()</code> to call the provided function, <code class="language-text">fn</code>, for each character in <code class="language-text">str</code>.\nUse <code class="language-text">Array.prototype.join(\'\')</code> to recombine the array of characters into a string.\nThe callback function, <code class="language-text">fn</code>, takes three arguments (the current character, the index of the current character and the string <code class="language-text">mapString</code> was called upon).</p>\n',
  },
  'code': {
    'src': "const mapString = (str, fn) =>\n  str\n    .split('')\n    .map((c, i) => fn(c, i, str))\n    .join('');",
    'example': "mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'",
    'style': null,
  },
  'searchTokens': 'mapstring js javascript string array function utility creat new result call provid everi charact',
};

export const fullReactSnippet = {
  'id': '30react/snippets/TagInput',
  'title': 'TagInput',
  'description': 'Renders a tag input field.',
  'url': 'https://github.com/30-seconds/30-seconds-of-react/blob/master/snippets/TagInput.md',
  'slug': '/react/s/tag-input',
  'firstSeen': '2019-10-02T07:06:11.000Z',
  'lastUpdated': '2019-10-11T11:20:45.000Z',
  'expertise': 'Intermediate',
  'language': {
    'long': 'React',
    'short': 'jsx',
    'otherLanguages': [
      {
        'short': 'css',
        'long': 'CSS',
      },
    ],
  },
  'icon': 'react',
  'tags': {
    'primary': 'Input',
    'all': [
      'Input',
      'Visual',
      'State',
      'Intermediate',
    ],
  },
  'html': {
    'code': '<span class="token keyword">function</span> <span class="token function">TagInput</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">) {</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>tags<span class="token punctuation">,</span> setTags<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>tags<span class="token punctuation">);</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">removeTags</span> <span class="token operator">=</span> <span class="token parameter">indexToRemove</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setTags</span><span class="token punctuation">([</span><span class="token operator">...</span>tags<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">((</span><span class="token parameter">_<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> index <span class="token operator">!==</span> indexToRemove<span class="token punctuation">)]);\n  };</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">addTags</span> <span class="token operator">=</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value <span class="token operator">!==</span> <span class="token string">""</span><span class="token punctuation">) {</span>\n      <span class="token function">setTags</span><span class="token punctuation">([</span><span class="token operator">...</span>tags<span class="token punctuation">,</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">]);</span>\n      event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;\n    }\n  };</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">="</span>tag-input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">="</span>tags<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span>tags<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">((</span><span class="token parameter">tag<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">="</span>tag<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">="</span>tag-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>tag<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">="</span>tag-close-icon<span class="token punctuation">"</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{()</span> <span class="token operator">=></span> <span class="token function">removeTags</span><span class="token punctuation">(</span>index<span class="token punctuation">)}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              x\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">))}</span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">="</span>text<span class="token punctuation">"</span></span>\n        <span class="token attr-name">onKeyUp</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>key <span class="token operator">===</span> <span class="token string">"Enter"</span> <span class="token operator">?</span> <span class="token function">addTags</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)}</span></span>\n        <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation">="</span>Press enter to add tags<span class="token punctuation">"</span></span>\n      <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">);\n}</span>',
    'example': "ReactDOM<span class=\"token punctuation\">.</span><span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span><span class=\"token class-name\">TagInput</span></span> <span class=\"token attr-name\">tags</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{[</span><span class=\"token string\">'Nodejs'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'MongoDB'</span><span class=\"token punctuation\">]}</span></span><span class=\"token punctuation\">/></span></span><span class=\"token punctuation\">,</span> document<span class=\"token punctuation\">.</span><span class=\"token function\">getElementById</span><span class=\"token punctuation\">(</span><span class=\"token string\">'root'</span><span class=\"token punctuation\">));</span>",
    'style': '<span class="token selector">.tag-input</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>\n  <span class="token property">min-height</span><span class="token punctuation">:</span> 48px<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 0 8px<span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #d6d8da<span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;\n}</span>\n<span class="token selector">.tag-input input</span> <span class="token punctuation">{</span>\n  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 46px<span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 4px 0 0<span class="token selector">;\n  &amp;:focus</span> <span class="token punctuation">{</span>\n    <span class="token property">outline</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;\n  }\n}</span>\n<span class="token selector">#tags</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 8px 0 0<span class="token punctuation">;\n}</span>\n<span class="token selector">.tag</span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 0 8px<span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>\n  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 0 8px 8px 0<span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> #0052cc<span class="token punctuation">;\n}</span>\n<span class="token selector">.tag-title</span> <span class="token punctuation">{</span>\n  <span class="token property">margin-top</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;\n}</span>\n<span class="token selector">.tag-close-icon</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>\n  <span class="token property">line-height</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>\n  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>\n  <span class="token property">margin-left</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> #0052cc<span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>\n  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;\n}</span>',
    'description': '<p>Renders a tag input field.</p>',
    'fullDescription': '<p>Renders a tag input field.</p>\n<ul>\n<li>Define a <code class="language-text">TagInput</code> component and use <code class="language-text">React.useState()</code> hook to initialize an array with tags passed as <code class="language-text">props</code>.</li>\n<li>Use <code class="language-text">Array.prototype.map()</code> on collected nodes to render the list of tags.</li>\n<li>Define the <code class="language-text">addTags</code> method, which will be executed on pressing the <code class="language-text">Enter</code> key.</li>\n<li>The <code class="language-text">addTags</code> method uses the <code class="language-text">setTags</code> method to add the new tag using the spread (<code class="language-text">...</code>) operator to prepend the existing tags and adds the new tag at the end of the <code class="language-text">tags</code> array.</li>\n<li>Define the <code class="language-text">removeTags</code> method, which will be executed on clicking the delete icon in the tag.</li>\n<li>Use <code class="language-text">Array.prototype.filter()</code> in <code class="language-text">removeTags</code> method to remove the tag using the <code class="language-text">index</code> of the tag to filter it out from <code class="language-text">tags</code> array.</li>\n</ul>\n',
  },
  'code': {
    'src': 'function TagInput(props) {\n  const [tags, setTags] = React.useState(props.tags);\n  const removeTags = indexToRemove => {\n    setTags([...tags.filter((_, index) => index !== indexToRemove)]);\n  };\n  const addTags = event => {\n    if (event.target.value !== "") {\n      setTags([...tags, event.target.value]);\n      event.target.value = "";\n    }\n  };\n  return (\n    <div className="tag-input">\n      <ul id="tags">\n        {tags.map((tag, index) => (\n          <li key={index} className="tag">\n            <span className="tag-title">{tag}</span>\n            <span className="tag-close-icon" onClick={() => removeTags(index)}>\n              x\n            </span>\n          </li>\n        ))}\n      </ul>\n      <input\n        type="text"\n        onKeyUp={event => (event.key === "Enter" ? addTags(event) : null)}\n        placeholder="Press enter to add tags"\n      />\n    </div>\n  );\n}',
    'example': "ReactDOM.render(<TagInput tags={['Nodejs', 'MongoDB']}/>, document.getElementById('root'));",
    'style': '.tag-input {\n  display: flex;\n  flex-wrap: wrap;\n  min-height: 48px;\n  padding: 0 8px;\n  border: 1px solid #d6d8da;\n  border-radius: 6px;\n}\n.tag-input input {\n  flex: 1;\n  border: none;\n  height: 46px;\n  font-size: 14px;\n  padding: 4px 0 0;\n  &:focus {\n    outline: transparent;\n  }\n}\n#tags {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0;\n  margin: 8px 0 0;\n}\n.tag {\n  width: auto;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  padding: 0 8px;\n  font-size: 14px;\n  list-style: none;\n  border-radius: 6px;\n  margin: 0 8px 8px 0;\n  background: #0052cc;\n}\n.tag-title {\n  margin-top: 3px;\n}\n.tag-close-icon {\n  display: block;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n  text-align: center;\n  font-size: 14px;\n  margin-left: 8px;\n  color: #0052cc;\n  border-radius: 50%;\n  background: #fff;\n  cursor: pointer;\n}',
  },
  'searchTokens': 'taginput jsx react input visual state render tag field',
};

export const fullCssSnippet = {
  'id': '30css/snippets/bouncing-loader',
  'title': 'Bouncing loader',
  'description': 'Creates a bouncing loader animation.',
  'url': 'https://github.com/30-seconds/30-seconds-of-css/blob/master/snippets/bouncing-loader.md',
  'slug': '/css/s/bouncing-loader',
  'firstSeen': '2018-03-04T04:24:22.000Z',
  'lastUpdated': '2020-03-05T20:52:51.000Z',
  'expertise': 'Intermediate',
  'language': {
    'long': 'CSS',
    'short': 'css',
  },
  'icon': 'css',
  'tags': {
    'primary': 'Animation',
    'all': [
      'Animation',
      'Intermediate',
    ],
  },
  'html': {
    'htmlCode': '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">="</span>bouncing-loader<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',
    'cssCode': '<span class="token atrule"><span class="token rule">@keyframes</span> bouncing-loader</span> <span class="token punctuation">{</span>\n  <span class="token selector">to</span> <span class="token punctuation">{</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 0.1<span class="token punctuation">;</span>\n    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> -1rem<span class="token punctuation">,</span> 0<span class="token punctuation">);\n  }\n}</span>\n\n<span class="token selector">.bouncing-loader</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;\n}</span>\n\n<span class="token selector">.bouncing-loader > div</span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 3rem 0.2rem<span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> #8385aa<span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>\n  <span class="token property">animation</span><span class="token punctuation">:</span> bouncing-loader 0.6s infinite alternate<span class="token punctuation">;\n}</span>\n\n<span class="token selector">.bouncing-loader > div:nth-child(2)</span> <span class="token punctuation">{</span>\n  <span class="token property">animation-delay</span><span class="token punctuation">:</span> 0.2s<span class="token punctuation">;\n}</span>\n\n<span class="token selector">.bouncing-loader > div:nth-child(3)</span> <span class="token punctuation">{</span>\n  <span class="token property">animation-delay</span><span class="token punctuation">:</span> 0.4s<span class="token punctuation">;\n}</span>',
    'jsCode': '',
    'browserSupport': '\n<ul>\n<li><a target="_blank" rel="nofollow noopener noreferrer" href="https://caniuse.com/#feat=css-animation">https://caniuse.com/#feat=css-animation</a></li>\n</ul>',
    'description': '<p>Creates a bouncing loader animation.</p>\n',
    'fullDescription': '<p>Creates a bouncing loader animation.</p>\n\n\n<p>Note: <code class="language-text">1rem</code> is usually <code class="language-text">16px</code>.</p>\n<ol>\n<li><code class="language-text">@keyframes</code> defines an animation that has two states, where the element changes <code class="language-text">opacity</code> and is translated up on the 2D plane using <code class="language-text">transform: translate3d()</code>. Using a single axis translation on <code class="language-text">transform: translate3d()</code> improves the performance of the animation.</li>\n<li><code class="language-text">.bouncing-loader</code> is the parent container of the bouncing circles and uses <code class="language-text">display: flex</code> and <code class="language-text">justify-content: center</code> to position them in the center.</li>\n<li><code class="language-text">.bouncing-loader &gt; div</code>, targets the three child <code class="language-text">div</code>s of the parent to be styled. The <code class="language-text">div</code>s are given a width and height of <code class="language-text">1rem</code>, using <code class="language-text">border-radius: 50%</code> to turn them from squares to circles.</li>\n<li><code class="language-text">margin: 3rem 0.2rem</code> specifies that each circle has a top/bottom margin of <code class="language-text">3rem</code> and left/right margin of <code class="language-text">0.2rem</code> so that they do not directly touch each other, giving them some breathing room.</li>\n<li><code class="language-text">animation</code> is a shorthand property for the various animation properties: <code class="language-text">animation-name</code>, <code class="language-text">animation-duration</code>, <code class="language-text">animation-iteration-count</code>, <code class="language-text">animation-direction</code> are used.</li>\n<li><code class="language-text">nth-child(n)</code> targets the element which is the nth child of its parent.</li>\n<li><code class="language-text">animation-delay</code> is used on the second and third <code class="language-text">div</code> respectively, so that each element does not start the animation at the same time.</li>\n</ol>\n',
  },
  'code': {
    'html': '<div class="bouncing-loader">\n  <div></div>\n  <div></div>\n  <div></div>\n</div>',
    'css': '@keyframes bouncing-loader {\n  to {\n    opacity: 0.1;\n    transform: translate3d(0, -1rem, 0);\n  }\n}\n\n.bouncing-loader {\n  display: flex;\n  justify-content: center;\n}\n\n.bouncing-loader > div {\n  width: 1rem;\n  height: 1rem;\n  margin: 3rem 0.2rem;\n  background: #8385aa;\n  border-radius: 50%;\n  animation: bouncing-loader 0.6s infinite alternate;\n}\n\n.bouncing-loader > div:nth-child(2) {\n  animation-delay: 0.2s;\n}\n\n.bouncing-loader > div:nth-child(3) {\n  animation-delay: 0.4s;\n}',
    'js': '',
    'scopedCss': '@keyframes bouncing-loader {\n  to {\n    opacity: 0.1;\n    transform: translate3d(0, -1rem, 0); } }\n\n[data-scope="bouncing-loader"] .bouncing-loader {\n  display: flex;\n  justify-content: center; }\n\n[data-scope="bouncing-loader"] .bouncing-loader > div {\n  width: 1rem;\n  height: 1rem;\n  margin: 3rem 0.2rem;\n  background: #8385aa;\n  border-radius: 50%;\n  animation: bouncing-loader 0.6s infinite alternate; }\n\n[data-scope="bouncing-loader"] .bouncing-loader > div:nth-child(2) {\n  animation-delay: 0.2s; }\n\n[data-scope="bouncing-loader"] .bouncing-loader > div:nth-child(3) {\n  animation-delay: 0.4s; }\n',
  },
  'browserSupport': {
    'supportPercentage': '100.0%',
  },
  'searchTokens': 'bouncing loader css animation creat bounc loader anim',
};

export const fullCssWithJsSnippet = {
  'id': '30css/snippets/mouse-cursor-gradient-tracking',
  'title': 'Mouse cursor gradient tracking',
  'description': 'A hover effect where the gradient follows the mouse cursor.',
  'url': 'https://github.com/30-seconds/30-seconds-of-css/blob/master/snippets/mouse-cursor-gradient-tracking.md',
  'slug': '/css/s/mouse-cursor-gradient-tracking',
  'firstSeen': '2018-02-25T13:14:39.000Z',
  'lastUpdated': '2020-03-05T20:52:51.000Z',
  'expertise': 'Advanced',
  'language': {
    'long': 'CSS',
    'short': 'css',
  },
  'icon': 'css',
  'tags': {
    'primary': 'Visual',
    'all': [
      'Visual',
      'Interactivity',
      'Advanced',
    ],
  },
  'html': {
    'htmlCode': '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">="</span>mouse-cursor-gradient-tracking<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>Hover me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>',
    'cssCode': "<span class=\"token selector\">.mouse-cursor-gradient-tracking</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">position</span><span class=\"token punctuation\">:</span> relative<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">background</span><span class=\"token punctuation\">:</span> #7983ff<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">padding</span><span class=\"token punctuation\">:</span> 0.5rem 1rem<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">font-size</span><span class=\"token punctuation\">:</span> 1.2rem<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">border</span><span class=\"token punctuation\">:</span> none<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">color</span><span class=\"token punctuation\">:</span> white<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">cursor</span><span class=\"token punctuation\">:</span> pointer<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">outline</span><span class=\"token punctuation\">:</span> none<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">overflow</span><span class=\"token punctuation\">:</span> hidden<span class=\"token punctuation\">;\n}</span>\n\n<span class=\"token selector\">.mouse-cursor-gradient-tracking span</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">position</span><span class=\"token punctuation\">:</span> relative<span class=\"token punctuation\">;\n}</span>\n\n<span class=\"token selector\">.mouse-cursor-gradient-tracking::before</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">--size</span><span class=\"token punctuation\">:</span> 0<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">content</span><span class=\"token punctuation\">:</span> <span class=\"token string\">''</span><span class=\"token punctuation\">;</span>\n  <span class=\"token property\">position</span><span class=\"token punctuation\">:</span> absolute<span class=\"token punctuation\">;</span>\n  <span class=\"token property\">left</span><span class=\"token punctuation\">:</span> <span class=\"token function\">var</span><span class=\"token punctuation\">(</span>--x<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">top</span><span class=\"token punctuation\">:</span> <span class=\"token function\">var</span><span class=\"token punctuation\">(</span>--y<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">width</span><span class=\"token punctuation\">:</span> <span class=\"token function\">var</span><span class=\"token punctuation\">(</span>--size<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">height</span><span class=\"token punctuation\">:</span> <span class=\"token function\">var</span><span class=\"token punctuation\">(</span>--size<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">background</span><span class=\"token punctuation\">:</span> <span class=\"token function\">radial-gradient</span><span class=\"token punctuation\">(</span>circle closest-side<span class=\"token punctuation\">,</span> pink<span class=\"token punctuation\">,</span> transparent<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">transform</span><span class=\"token punctuation\">:</span> <span class=\"token function\">translate</span><span class=\"token punctuation\">(</span>-50%<span class=\"token punctuation\">,</span> -50%<span class=\"token punctuation\">);</span>\n  <span class=\"token property\">transition</span><span class=\"token punctuation\">:</span> width 0.2s ease<span class=\"token punctuation\">,</span> height 0.2s ease<span class=\"token punctuation\">;\n}</span>\n\n<span class=\"token selector\">.mouse-cursor-gradient-tracking:hover::before</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">--size</span><span class=\"token punctuation\">:</span> 200px<span class=\"token punctuation\">;\n}</span>",
    'jsCode': "<span class=\"token keyword\">var</span> btn <span class=\"token operator\">=</span> document<span class=\"token punctuation\">.</span><span class=\"token function\">querySelector</span><span class=\"token punctuation\">(</span><span class=\"token string\">'.mouse-cursor-gradient-tracking'</span><span class=\"token punctuation\">)</span>\nbtn<span class=\"token punctuation\">.</span><span class=\"token function-variable function\">onmousemove</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">function</span><span class=\"token punctuation\">(</span><span class=\"token parameter\">e</span><span class=\"token punctuation\">) {</span>\n  <span class=\"token keyword\">var</span> rect <span class=\"token operator\">=</span> e<span class=\"token punctuation\">.</span>target<span class=\"token punctuation\">.</span><span class=\"token function\">getBoundingClientRect</span><span class=\"token punctuation\">()</span>\n  <span class=\"token keyword\">var</span> x <span class=\"token operator\">=</span> e<span class=\"token punctuation\">.</span>clientX <span class=\"token operator\">-</span> rect<span class=\"token punctuation\">.</span>left\n  <span class=\"token keyword\">var</span> y <span class=\"token operator\">=</span> e<span class=\"token punctuation\">.</span>clientY <span class=\"token operator\">-</span> rect<span class=\"token punctuation\">.</span>top\n  btn<span class=\"token punctuation\">.</span>style<span class=\"token punctuation\">.</span><span class=\"token function\">setProperty</span><span class=\"token punctuation\">(</span><span class=\"token string\">'--x'</span><span class=\"token punctuation\">,</span> x <span class=\"token operator\">+</span> <span class=\"token string\">'px'</span><span class=\"token punctuation\">)</span>\n  btn<span class=\"token punctuation\">.</span>style<span class=\"token punctuation\">.</span><span class=\"token function\">setProperty</span><span class=\"token punctuation\">(</span><span class=\"token string\">'--y'</span><span class=\"token punctuation\">,</span> y <span class=\"token operator\">+</span> <span class=\"token string\">'px'</span><span class=\"token punctuation\">)\n}</span>",
    'browserSupport': '\n<ul>\n<li><a target="_blank" rel="nofollow noopener noreferrer" href="https://caniuse.com/#feat=css-variables">https://caniuse.com/#feat=css-variables</a></li>\n</ul>',
    'description': '<p>A hover effect where the gradient follows the mouse cursor.</p>\n',
    'fullDescription': "<p>A hover effect where the gradient follows the mouse cursor.</p>\n\n\n<ol>\n<li><code class=\"language-text\">--x</code> and <code class=\"language-text\">--y</code> are used to track the position of the mouse on the button.</li>\n<li><code class=\"language-text\">--size</code> is used to keep modify of the gradient's dimensions.</li>\n<li><code class=\"language-text\">background: radial-gradient(circle closest-side, pink, transparent);</code> creates the gradient at the correct postion.</li>\n</ol>\n",
  },
  'code': {
    'html': '<button class="mouse-cursor-gradient-tracking">\n  <span>Hover me</span>\n</button>',
    'css': ".mouse-cursor-gradient-tracking {\n  position: relative;\n  background: #7983ff;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  border: none;\n  color: white;\n  cursor: pointer;\n  outline: none;\n  overflow: hidden;\n}\n\n.mouse-cursor-gradient-tracking span {\n  position: relative;\n}\n\n.mouse-cursor-gradient-tracking::before {\n  --size: 0;\n  content: '';\n  position: absolute;\n  left: var(--x);\n  top: var(--y);\n  width: var(--size);\n  height: var(--size);\n  background: radial-gradient(circle closest-side, pink, transparent);\n  transform: translate(-50%, -50%);\n  transition: width 0.2s ease, height 0.2s ease;\n}\n\n.mouse-cursor-gradient-tracking:hover::before {\n  --size: 200px;\n}",
    'js': "var btn = document.querySelector('.mouse-cursor-gradient-tracking')\nbtn.onmousemove = function(e) {\n  var rect = e.target.getBoundingClientRect()\n  var x = e.clientX - rect.left\n  var y = e.clientY - rect.top\n  btn.style.setProperty('--x', x + 'px')\n  btn.style.setProperty('--y', y + 'px')\n}",
    'scopedCss': "[data-scope=\"mouse-cursor-gradient-tracking\"] .mouse-cursor-gradient-tracking {\n  position: relative;\n  background: #7983ff;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  border: none;\n  color: white;\n  cursor: pointer;\n  outline: none;\n  overflow: hidden; }\n\n[data-scope=\"mouse-cursor-gradient-tracking\"] .mouse-cursor-gradient-tracking span {\n  position: relative; }\n\n[data-scope=\"mouse-cursor-gradient-tracking\"] .mouse-cursor-gradient-tracking::before {\n  --size: 0;\n  content: '';\n  position: absolute;\n  left: var(--x);\n  top: var(--y);\n  width: var(--size);\n  height: var(--size);\n  background: radial-gradient(circle closest-side, pink, transparent);\n  transform: translate(-50%, -50%);\n  transition: width 0.2s ease, height 0.2s ease; }\n\n[data-scope=\"mouse-cursor-gradient-tracking\"] .mouse-cursor-gradient-tracking:hover::before {\n  --size: 200px; }\n",
  },
  'browserSupport': {
    'supportPercentage': '98.7%',
  },
  'searchTokens': 'mouse cursor gradient tracking css visual interactivity hover effect gradient follow mous cursor',
};

export const fullBlogSnippet = {
  'id': '30blog/blog_posts/javascript-for-in-for-of-foreach',
  'title': "What is the difference between JavaScript's for...in, for...of and forEach?",
  'description': 'Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.',
  'url': 'https://github.com/30-seconds/30-seconds-blog/blob/master/blog_posts/javascript-for-in-for-of-foreach.md',
  'slug': '/blog/s/javascript-for-in-for-of-foreach',
  'firstSeen': '2020-01-20T08:12:31.000Z',
  'lastUpdated': '2020-02-05T07:48:22.000Z',
  'expertise': 'Blog',
  'icon': 'blog',
  'tags': {
    'primary': 'JavaScript',
    'all': [
      'JavaScript',
      'Array',
      'Object',
      'Iterator',
    ],
  },
  'html': {
    'description': '<p>Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.</p>',
    'fullDescription': "<p><code class=\"language-text\">for...in</code> is used to iterate over all enumerable properties of an object, including inherited enumerable properties.\nThis iteration statement can be used with arrays strings or plain objects, but not with <code class=\"language-text\">Map</code> or <code class=\"language-text\">Set</code> objects.</p>\n<div class=\"gatsby-highlight\" data-language=\"js\"><pre class=\"blog-code language-js\"><span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> prop <span class=\"token keyword\">in</span> <span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'c'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>prop<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// 0, 1, 2 (array indexes)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> prop <span class=\"token keyword\">in</span> <span class=\"token string\">'str'</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>prop<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// 0, 1, 2 (string indexes)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> prop <span class=\"token keyword\">in</span> <span class=\"token punctuation\">{</span>a<span class=\"token operator\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">,</span> b<span class=\"token operator\">:</span> <span class=\"token number\">2</span><span class=\"token punctuation\">,</span> c<span class=\"token operator\">:</span> <span class=\"token number\">3</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>prop<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// a, b, c (object property names)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> prop <span class=\"token keyword\">in</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">Set</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'d'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>prop<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// undefined (no enumerable properties)</span></pre></div>\n<p><code class=\"language-text\">for...of</code> is used to iterate over iterable objects, iterating over their values instead of their properties.\nThis iteration statement can be used with arrays, strings, <code class=\"language-text\">Map</code> or <code class=\"language-text\">Set</code> objects, but not with plain objects.</p>\n<div class=\"gatsby-highlight\" data-language=\"js\"><pre class=\"blog-code language-js\"><span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> val <span class=\"token keyword\">of</span> <span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'c'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>val<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// a, b, c (array values)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> val <span class=\"token keyword\">of</span> <span class=\"token string\">'str'</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>val<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// s, t, r (string characters)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> val <span class=\"token keyword\">of</span> <span class=\"token punctuation\">{</span>a<span class=\"token operator\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">,</span> b<span class=\"token operator\">:</span> <span class=\"token number\">2</span><span class=\"token punctuation\">,</span> c<span class=\"token operator\">:</span> <span class=\"token number\">3</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>prop<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// TypeError (not iterable)</span>\n\n<span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">let</span> val <span class=\"token keyword\">of</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">Set</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'d'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">)</span> \n  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>val<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// a, b, d (Set values)</span></pre></div>\n<p>Finally, <code class=\"language-text\">forEach()</code> is a method of the <code class=\"language-text\">Array</code> prototype, which allows you to iterate over the elements of an array.\nWhile <code class=\"language-text\">forEach()</code> only iterates over arrays, it can access both the value and the index of each element while iterating.</p>\n<div class=\"gatsby-highlight\" data-language=\"js\"><pre class=\"blog-code language-js\"><span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'c'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">.</span><span class=\"token function\">forEach</span><span class=\"token punctuation\">(</span>\n  <span class=\"token parameter\">val</span> <span class=\"token operator\">=&gt;</span> console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>val<span class=\"token punctuation\">)</span>     <span class=\"token comment\">// a, b, c (array values)</span>\n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token punctuation\">[</span><span class=\"token string\">'a'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'b'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'c'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">.</span><span class=\"token function\">forEach</span><span class=\"token punctuation\">(</span>\n  <span class=\"token punctuation\">(</span><span class=\"token parameter\">val<span class=\"token punctuation\">,</span> i</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=&gt;</span> console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>i<span class=\"token punctuation\">)</span>  <span class=\"token comment\">// 0, 1, 2 (array indexes)</span>\n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span></pre></div>\n<p class=\"blog-image-credit\">Image credit:  <a target=\"_blank\" rel=\"nofollow noopener noreferrer\" href=\"https://unsplash.com/@timstief?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText\">Tim Stief</a> on <a target=\"_blank\" rel=\"nofollow noopener noreferrer\" href=\"https://unsplash.com/s/photos/code?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText\">Unsplash</a></p>",
  },
  'authors': [
    {
      'name': 'Angelos Chalaris',
      'profile': 'https://twitter.com/chalarangelo',
    },
  ],
  'cover': {
    'src': '/static/d4f86d604fa5bab671646831d08a85b3/701ee/javascript-for-in-for-of-foreach.jpg',
  },
  'language': {
    'short': '',
    'long': '',
  },
  'searchTokens': "javascript array object iterator learn differ three commonli us iter method offer often confus beginn veteran alik javascript' foreach",
};

export const rawSnippet = {
  id: 'all',
  title: 'all',
  type: 'snippet',
  tags: {
    all: [ 'array', 'function', 'beginner' ],
    primary: 'array',
  },
  code: {
    es6: 'const all = (arr, fn = Boolean) => arr.every(fn);',
    es5:
     'var all = function all(arr) {\n  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;\n  return arr.every(fn);\n};',
    example:
     'all([4, 2, 3], x => x > 1); // true\nall([1, 2, 3]); // true',
  },
  text: {
    full: 'Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.\n\nUse `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.\nOmit the second argument, `fn`, to use `Boolean` as a default.\n\n',
    short: 'Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.',
  },
  hash: 'ba8e5f17500d1e5428f4ca7fcc8095934a7ad3aa496b35465e8f7799f1715aaa',
  firstSeen: new Date('2020-05-04T09:20:46.000Z'),
  lastUpdated: new Date('2020-05-04T09:20:46.000Z'),
  updateCount: 26,
  authorCount: 4,
  blog: false,
  language: {
    short: 'js',
    long: 'JavaScript',
  },
  icon: 'js',
  otherLanguages: undefined,
  sourceDir: '30code/snippets',
  slugPrefix: 'js/s',
  repoUrlPrefix:
 'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets',
  reducer: 'es6Reducer',
  resolver: 'stdResolver',
  biasPenaltyMultiplier: 1.05,
  tagScores: [],
  keywordScores: [],
  recommendationRanking: 0,
};

export const rawBlogSnippet = {
  id: '10-vs-code-extensions-for-js-developers',
  title: '10 must-have VS Code extensions for JavaScript developers',
  type: 'blog.list',
  tags: {
    all: [ 'devtools', 'vscode' ],
    primary: 'devtools',
  },
  text: {
    full: 'Developers will most likely argue for the rest of eternity about the most productive code editor and the best extensions. Here are my personal extension preferences for VS Code as a JavaScript developer:\n\n1. ESLint\n[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) turns the popular JavaScrpt linter into an extension of VS Code. It automatically reads your linting configuration, identifies problems and even fixes them for you, if you want.\n\n2.  GitLens\n[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) is a very powerful collaboration tool for VS Code. It provides many useful tools for git such as blame, code authorship, activity heatmaps, recent changes, file history and even commit search.\n \n3. Debugger for Chrome\n[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) allows you to debug your JavaScript code in Chrome or Chromium. Breakpoints, call stack inspection and stepping inside a function are only some of its features.\n\n4. Bracket Pair Colorizer 2\n[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) makes reading code faster as it makes matching brackets the same color. This extension for VS Code improves upon its predecessor by providing improved performance.\n\n5. Bookmarks\n[Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) is one of those extensions that will significantly reduce your time jumping between different files, as it allows you to save important positions and navigate back to them easily and quickly.\n\n6. TODO Highlight\n[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) simplifies tracking leftover tasks by allowing you to list all of your TODO annotations, as well as adding a handy background highlight to them to make them pop out immediately. \n\n7. Live Server\n[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) gives you an easy way to serve web pages from VS Code, making previewing and debugging a lot easier. One of the core features is the live reload support that many developers are used to.\n\n8. REST Client\n[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) allows you to send HTTP requests and view the responses directly in VS Code. This extension supports a wide range of formats and authorization and should work with most setups.\n\n9. One Dark Pro\n[One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) is one of the most popular VS Code themes and with very good reason. It provides a clean theme with a nice palette that has great contrast and is very comfortable to use on a daily basis.\n \n10. Fira Code\n[Fira Code](https://github.com/tonsky/FiraCode) is not a traditional VS Code extension and might take a couple more steps to set up, but it\'s a superb programming font with ligatures that will help you scan code faster once you get used to it.\n\n**Image credit:** [Fotis Fotopoulos](https://unsplash.com/@ffstop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)\n',
    short: 'VS Code is steadily gaining popularity among developers. Here are 10 essential extensions for JavaScript developers that aim to increase your productivity.',
  },
  attributes: {
    cover: 'blog_images/10-vs-code-extensions-for-js-developers.jpg',
    authors: [ 'chalarangelo' ],
  },
  hash: '2dd00656f3a19b08dd10877431101751009c00b0658dc5d3acab61e11fea21e3',
  firstSeen: new Date('2020-03-27T15:37:16.000Z'),
  lastUpdated: new Date('2020-03-27T15:37:16.000Z'),
  updateCount: 6,
  authorCount: 2,
  blog: true,
  language: {
    short: '',
    long: '',
  },
  icon: 'blog',
  otherLanguages: undefined,
  sourceDir: '30blog/blog_posts',
  slugPrefix: 'blog/s',
  repoUrlPrefix:
 'https://github.com/30-seconds/30-seconds-blog/blob/master/blog_posts',
  reducer: 'blogReducer',
  resolver: 'blogResolver',
  biasPenaltyMultiplier: 1,
  tagScores: [],
  keywordScores: [],
  recommendationRanking: 0,
};
