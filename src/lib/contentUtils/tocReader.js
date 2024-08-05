/**
 * Reads and builds a table of contents from HTML.
 */
export default class TocReader {
  static matcher =
    /<h(?<level>[2-4])><a.*id="(?<href>.*?)"[^<]*>(?<content>.*?)<\/a><\/h\1>/g;

  static readToC = html => {
    if (!html) return undefined;
    const headings = [...html.matchAll(TocReader.matcher)].map(({ groups }) => {
      return {
        level: Number.parseInt(groups.level, 10),
        href: groups.href,
        content: groups.content.replace(/<[^>]*>/g, '').trim(),
      };
    });
    if (headings.length === 0) return undefined;

    return `<ol>${TocReader.nestHeadings(headings).reduce(
      (html, heading) => html + TocReader.toNavItem(heading),
      ''
    )}</ol>`;
  };

  static nestHeadings = (headings, level = 2) => {
    const result = [];
    let i = 0;
    while (i < headings.length) {
      const heading = headings[i];
      if (heading.level === level) {
        const stopIndex = headings
          .slice(i + 1)
          .findIndex(h => h.level <= level);
        const childrenArray = headings.slice(
          i + 1,
          stopIndex === -1 ? headings.length : i + stopIndex + 1
        );
        result.push({
          ...heading,
          children: TocReader.nestHeadings(childrenArray, level + 1),
        });
      }
      i++;
    }
    return result;
  };

  static toNavItem = ({ content, href = content, children }) => {
    const linkContent = `<a href="#${href}">${content}</a>`;
    const childrenContent = children.length
      ? `<ol>${children
          .map(child => TocReader.toNavItem(child))
          .join('\n')}</ol>`
      : '';

    return `<li>${linkContent}${childrenContent}</li>`;
  };
}
