/**
 * Page title component. Renders a simple `<h2>` element with a base class
 * and passes children to the element.
 */
const PageTitle = ({ className = '', children }) => (
  <h2 className={`page-title txt-200 fs-x2 f-alt ${className}`}>{children}</h2>
);

export default PageTitle;
