import React from 'react';
import CodeBlock from 'atoms/codeBlock';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|CodeBlock',
  component: CodeBlock,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'codeBlock',
    ],
  },
};

export const component = () => {
  const long = text('language.long', 'javascript'), short = text('language.short', 'js');
  const language = { short, long };

  return (
    <CodeBlock
      language={ language }
      htmlContent='<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>'
    />
  );
};
