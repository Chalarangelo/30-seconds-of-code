import settings from '#src/config/settings.js';

export default class StringUtils {
  static capitalize([first, ...rest], lowerRest = false) {
    return (
      first.toUpperCase() +
      (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
    );
  }

  static toKebabCase(str) {
    return (
      str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map(x => x.toLowerCase())
        .join('-')
    );
  }

  static convertToValidId(str) {
    return StringUtils.toKebabCase(StringUtils.stripHtmlTags(str));
  }

  static convertToSeoSlug(str) {
    return `/${StringUtils.toKebabCase(str)}`;
  }

  static stripMarkdown(str) {
    return str
      .replace(/[`*]/g, '')
      .replace(/\n/g, '')
      .replace(/\[(.*)\]\(.*\)/g, '$1')
      .replace(/_(.*?)_/g, '$1');
  }

  static stripHtmlParagraphsAndLinks(str) {
    return str.replace(/<\/?p>/g, '').replace(/<a.*?>(.*?)<\/a>/g, '$1');
  }

  static stripHtmlTags(str) {
    return str.replace(/<[^>]*>/g, '');
  }

  static stripHtml(str) {
    return str
      .replace(/<.*?>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');
  }

  static normalizedTokens(str) {
    return str
      .toLowerCase()
      .trim()
      .split(/[^a-z0-9\-']+/i)
      .filter(x => x.length >= 2);
  }

  static escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/>/g, '&gt;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static formatTag(tag) {
    if (!tag) return '';

    return settings.tags[tag] || tag.replace(/^./, tag[0].toUpperCase());
  }
}
