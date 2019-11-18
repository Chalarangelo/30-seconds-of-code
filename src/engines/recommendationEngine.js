/* eslint-disable brace-style */
import config from '../../config';
import { mapNumRange, similarity } from 'functions/utils';

const determineRecommendedSnippetsWithoutContext = snippetNodes => {
  const freshnessSortedNodes = Object.entries(snippetNodes)
    .filter(v => !v[1].archived)
    .sort((a, b) => +b[1].meta.lastUpdated - a[1].meta.lastUpdated);

  const freshNodes = freshnessSortedNodes.slice(0, Math.ceil(0.1 * freshnessSortedNodes.length));
  const freshnessMaxValue = Math.max(...freshNodes.map(v => +v[1].meta.lastUpdated));
  const freshnessMaxDifference = freshnessMaxValue - Math.min(...freshNodes.map(v => +v[1].meta.lastUpdated));

  return freshNodes.map(node => {
    const freshnessValue = mapNumRange(freshnessMaxValue - node[1].meta.lastUpdated, freshnessMaxDifference, 0, 0.0, 0.45).toFixed(4);
    const indexableContent = [
      node[1].title,
      node[1].attributes.codeBlocks.src,
      node[1].attributes.codeBlocks.es6,
      node[1].attributes.codeBlocks.css,
      node[1].attributes.codeBlocks.html,
      node[1].attributes.codeBlocks.js,
      node[1].attributes.codeBlocks.style,
      node[1].attributes.text,
    ].join(' ');

    const keywordMaxValue = Object.values(node[1].keywordScores).reduce((acc, v) => acc + v, 0);
    let keywordValue = 0;

    Object.keys(node[1].keywordScores).forEach(k => {
      if (indexableContent.indexOf(k) !== -1) keywordValue += node[1].keywordScores[k];
    });

    keywordValue = mapNumRange(keywordValue, 0, keywordMaxValue, 0.0, 0.55).toFixed(4);

    return {
      recommendationRanking: +freshnessValue + +keywordValue,
      snippetKey: node[0],
    };
  }).sort((a, b) => b.recommendationRanking - a.recommendationRanking );
};

const determineRecommendedSnippetsWithContext = (snippetNodes, snippetContext) => {
  let relatedSnippets = snippetNodes
    .filter(v =>
      v.node.language.short === snippetContext.node.language.short
      && v.node.tags.primary === snippetContext.node.tags.primary
    );
  relatedSnippets
    .forEach(snippet =>
      snippet.similarity = similarity(snippet.node.tags.all, snippetContext.node.tags.all).length
    );

  return [...new Set(relatedSnippets.sort((a, b) =>
    b.similarity - a.similarity || b.ranking - a.ranking
  ))].filter(v => v.node.url !== snippetContext.node.url);
};

const determineRecommendedSnippets = (data, context) => {
  if(typeof context !== 'undefined')
    return determineRecommendedSnippetsWithContext(data, context);
  return determineRecommendedSnippetsWithoutContext(data);
};

export default determineRecommendedSnippets;
