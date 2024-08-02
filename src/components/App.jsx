import React, { useState } from 'react';
import FeedbackButton from 'components/feedback-button/feedback-button';
import { nanoid } from 'nanoid';
import FeedbackItemRender from 'components/feedback-item-render/feedback-item-render';
import FuncItemRender from 'components/total-count/func-item-render';
import Section from './section/section';
import Notification from './notification/notification';
import PropTypes from 'prop-types';

export const App = ({ names }) => {
  const STATE_NAMES = [...names];
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stateNameToValueForRender = n => {
    if (n === 'good') {
      return good;
    } else if (n === 'neutral') {
      return neutral;
    } else {
      return bad;
    }
  };

  const btnHandle = e => {
    console.log(e.target);
    if (e.target.id === 'good') {
      setGood(good + 1);
    } else if (e.target.id === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  const countTotalFeedback = () => bad + neutral + good;

  const countPositiveFeedbackPercentage = () =>
    ((good / countTotalFeedback()) * 100).toFixed(2);

  return (
    <>
      <Section
        title="Please leave feedback"
        render={STATE_NAMES.map(feedback => (
          <FeedbackButton name={feedback} key={feedback} func={btnHandle} />
        ))}
      />

      {good > 0 || neutral > 0 || bad > 0 ? (
        <Section
          title="Statistics"
          render={STATE_NAMES.map(n => (
            <FeedbackItemRender
              objkey={n}
              value={stateNameToValueForRender(n)}
              key={nanoid()}
            />
          ))}
          reactComp={
            <div>
              <FuncItemRender
                title="total"
                func={countTotalFeedback()}
                key={nanoid()}
              />
              <FuncItemRender
                title="Positive feedback"
                func={countPositiveFeedbackPercentage()}
                percent="%"
                key={nanoid()}
              />
            </div>
          }
        />
      ) : (
        <Section
          title="Statistics"
          reactComp={<Notification messege="There is no feedback" />}
        />
      )}
    </>
  );
};

App.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
};
