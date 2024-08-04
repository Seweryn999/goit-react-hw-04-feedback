import React from 'react';
import PropTypes from 'prop-types';
import css from './Feedback-button.module.css';

const FeedbackButton = ({ name, func, id }) => {
  return (
    <button type="button" className={css.feedBtn} onClick={func} id={id}>
      {name}
    </button>
  );
};

FeedbackButton.propTypes = {
  name: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // Added prop type for id
};

export default FeedbackButton;
