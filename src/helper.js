function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateRandomQuestion(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  const selectedQuestion = data[randomIndex];
  const correctAnswer = selectedQuestion.answer;
  const incorrectAnswers = data
    .filter((question, index) => index !== randomIndex)
    .map((question) => question.answer);
  const shuffledAnswers = shuffleArray(incorrectAnswers);
  const options = shuffledAnswers.slice(0, 3);
  options.push(correctAnswer);
  const shuffledOptions = shuffleArray(options);
  return {
    question: selectedQuestion.question,
    options: shuffledOptions,
    correctAnswer: correctAnswer,
  };
}
