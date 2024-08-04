import React, { useState } from 'react';
import FeedbackButton from 'components/feedback-button/feedback-button';
import { nanoid } from 'nanoid';
import FeedbackItemRender from 'components/feedback-item-render/feedback-item-render';
import FuncItemRender from 'components/total-count/func-item-render';
import Section from './section/section';
import Notification from './notification/notification';
import PropTypes from 'prop-types';

export const App = ({ names }) => {
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
    const { id } = e.target;
    if (id === 'good') {
      setGood(prev => prev + 1);
    } else if (id === 'neutral') {
      setNeutral(prev => prev + 1);
    } else if (id === 'bad') {
      setBad(prev => prev + 1);
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? ((good / total) * 100).toFixed(2) : '0.00';
  };

  return (
    <>
      <Section
        title="Please leave feedback"
        render={names.map(feedback => (
          <FeedbackButton
            name={feedback}
            id={feedback}
            func={btnHandle}
            key={feedback}
          />
        ))}
      />

      {good > 0 || neutral > 0 || bad > 0 ? (
        <Section
          title="Statistics"
          render={names.map(n => (
            <FeedbackItemRender
              objkey={n}
              value={stateNameToValueForRender(n)}
              key={nanoid()}
            />
          ))}
          reactComp={
            <div>
              <FuncItemRender
                title="Total"
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
