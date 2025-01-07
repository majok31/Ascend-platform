import React, { useState } from 'react';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: 1, question: 'What is React?', options: ['Library', 'Framework', 'Language'] },
    { id: 2, question: 'What is Node.js?', options: ['Frontend', 'Backend', 'Database'] },
  ];

  const handleAnswer = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map(q => (
        <div key={q.id}>
          <h2>{q.question}</h2>
          {q.options.map(option => (
            <button key={option} onClick={() => handleAnswer(q.id, option)}>{option}</button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;
