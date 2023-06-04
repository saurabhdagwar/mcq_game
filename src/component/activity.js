import React, { useContext, useEffect, useRef, useState } from "react";
import context from "../context";
import { generateRandomQuestion } from "../helper";
import anime from "animejs";
import "./activity.scss";
import Popup from "./popup";

const Activity = () => {
  const { questionData, setQuestionCount, questionCount, questionDuration } =
    useContext(context);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestions] = useState({});
  const [attemptedScore, setAttemtedScore] = useState({
    correct: 0,
    incorrect: 0,
  });
  //   const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [timerCount, setTimerCount] = useState(30);
  const queContainerRef = useRef(null);
  const timerRef = useRef(null);
  const popupOpen = useRef(false);

  const generateQuestion = () => {
    if (questionCount < 10) {
      openQuestionContainer();
      const question = generateRandomQuestion(questionData);
      setCurrentQuestions(question);
      console.log("Check Que", question);
      startTimer();
    }
  };
  const resetClicked = () => {
    setQuestionCount(0);
    setGameStarted(false);
    popupOpen.current = false;
    setPopupType("");
    setPopupMessage("");
    setAttemtedScore({
      correct: 0,
      incorrect: 0,
    });
  };
  const startTimer = () => {
    let timerAnimation = anime.timeline({
      targets: timerRef.current,
      easing: "linear",
      //   innerHTML: 30,
      duration: 1000,
      round: 1,
    });
    for (let i = 30; i >= 0; i--) {
      timerAnimation.add({
        innerHTML: i,
        complete: () => {
          if (i == 0 && !popupOpen.current) {
            answerClicked("time-out");
          }
        },
      });
    }
  };

  const openQuestionContainer = () => {
    anime({
      targets: queContainerRef.current,
      scale: ["0", "1"],
      opacity: 1,
      direction: 2000,
      easing: "linear",
    });
  };

  const closingQuestionContainer = () => {
    anime({
      targets: queContainerRef.current,
      opacity: ["1", "0"],
      direction: 500,
      easing: "linear",
    });
  };

  const answerClicked = (value) => {
    let currentSocre = { ...attemptedScore };
    if (value == currentQuestion.correctAnswer) {
      setPopupType("correct");
      setPopupMessage("Answer is Correct");
      currentSocre.correct++;
    } else if (value == "time-out") {
      setPopupType("timeout");
      setPopupMessage("30 Sec of Question time is over");
      currentSocre.incorrect++;
    } else {
      setPopupType("incorrect");
      let text = `${currentQuestion.question} : ${currentQuestion.correctAnswer}`;
      setPopupMessage(text);
      currentSocre.incorrect++;
    }
    setQuestionCount(questionCount + 1);
    setAttemtedScore(currentSocre);
    popupOpen.current = true;
    anime.remove(timerRef.current);
    closingQuestionContainer();
  };
  const onPopupClosed = () => {
    popupOpen.current = false;
    setPopupType("");
    setPopupMessage("");
    if (questionCount < 10) {
      generateQuestion();
    } else {
      setTimeout(() => {
        setPopupType("reset");
        setPopupMessage("Back to home Page");
        popupOpen.current = true;
        anime.remove(timerRef.current);
        closingQuestionContainer();
      }, 1000);
    }
  };
  const animationEnd = (e) => {
    console.log("Aniamtion Namne", e.animationName);
  };
  return (
    <div className="activity-main" onAnimationEnd={animationEnd}>
      <h1 className="game-title">Geography Game</h1>

      <>
        <button
          className="start-button"
          style={{ visibility: gameStarted ? "hidden" : "visible" }}
          onClick={() => {
            setGameStarted(true);
            generateQuestion();
          }}
        >
          Play
        </button>
      </>

      <div
        className="game-started-container"
        style={{ visibility: gameStarted ? "visible" : "hidden" }}
      >
        <div className={`progressDisplay progress-${questionCount}`} />
        <div className="timer-display" ref={timerRef}>
          {questionDuration}
        </div>
        <div className="mcq-main" ref={queContainerRef}>
          <div className="background-opacity"></div>
          <div className="question-display">{currentQuestion.question}</div>
          <div className="options-main">
            {currentQuestion.options &&
              currentQuestion.options.map((option, index) => {
                return (
                  <button
                    className="option-btn"
                    key={index}
                    onClick={() => {
                      answerClicked(option);
                    }}
                  >
                    {option}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      <Popup
        open={popupOpen.current}
        type={popupType}
        message={popupMessage}
        score={attemptedScore}
        onPopupClosed={onPopupClosed}
        resetClicked={resetClicked}
      />
    </div>
  );
};

export default Activity;
