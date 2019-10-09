import React from 'react';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import TagList from 'molecules/tagList';
import Expertise from 'atoms/expertise';
import { Snippet as SnippetPropType } from 'proptypes';
import { trimWhiteSpace } from 'functions/utils';

const SnippetCard = ({
  snippet,
  className,
  ...rest
}) => (
  <Card className={ className } { ...rest } >
    <h4 className='card-title'>{ snippet.title }</h4>
    <Expertise level={ snippet.expertise } />
    <TagList tags={ [snippet.language, ...snippet.tags] } />
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.descriptionHtml} ${snippet.explanationHtml}` } }
    />
  </Card>
);

SnippetCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SnippetCard;
