'use client';

import {useMemo, useState} from 'react';
import type {PracticeTest as PracticeTestData} from '@/lib/practice-tests';

export default function PracticeTest({test}: {test: PracticeTestData}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => test.questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0), [answers, test.questions]);
  const complete = Object.keys(answers).length === test.questions.length;

  return <section className="practiceTest" aria-labelledby="practice-test-title">
    <div className="practiceTestNotice">{test.disclaimer}</div>
    <div className="practiceQuestions">
      {test.questions.map((question, index) => <fieldset className="practiceQuestion" key={question.id}>
        <legend><span>{index + 1}</span>{question.prompt}</legend>
        <div className="practiceChoices">{question.choices.map((choice, choiceIndex) => <label key={choice} className={submitted && choiceIndex === question.answer ? 'correctChoice' : submitted && answers[question.id] === choiceIndex ? 'wrongChoice' : ''}>
          <input type="radio" name={question.id} checked={answers[question.id] === choiceIndex} onChange={() => {setSubmitted(false); setAnswers((current) => ({...current, [question.id]: choiceIndex}));}} />
          <span>{choice}</span>
        </label>)}</div>
        {submitted && <p className="practiceExplanation">{question.explanation}</p>}
      </fieldset>)}
    </div>
    <div className="practiceActions">
      <button className="button primary" type="button" disabled={!complete} onClick={() => setSubmitted(true)}>Check answers</button>
      <button className="button secondary" type="button" onClick={() => {setAnswers({}); setSubmitted(false);}}>Reset</button>
      {submitted && <strong className="practiceScore" role="status">Score: {score}/{test.questions.length} ({Math.round(score / test.questions.length * 100)}%)</strong>}
    </div>
    {submitted && <p className="practiceResult">Use this result as a study signal, not as an official certification result. Review the explanations and official provider requirements before representing any credential.</p>}
  </section>;
}
