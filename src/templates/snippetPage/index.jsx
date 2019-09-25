import React from 'react';
import Expertise from 'atoms/expertise';
import PropTypes from 'prop-types';
import 'index.scss';

const SnippetPage = () => (
  <div className="snippet-page">
    <Expertise level="intermediate" />
    Hello world!
  </div>
)

export default SnippetPage;