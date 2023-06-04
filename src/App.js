import logo from "./logo.svg";
import "./App.css";
import ScallableWrapper from "./component/ScallableWrapper";
import Activity from "./component/activity";
import MyContext from "./context";
import gameData from "./gameData.json";
import { useEffect, useState } from "react";

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    setQuestionData(gameData.questionArray);
  }, []);

  const contextData = {
    questionData,
    setQuestionCount,
    questionCount,
    totalGameQue: gameData.totalGameQue,
    questionDuration: gameData.perQuestionTime,
    lables: gameData.gameLables,
  };

  return (
    <div className="App">
      <ScallableWrapper>
        <MyContext.Provider value={contextData}>
          <Activity />
        </MyContext.Provider>
      </ScallableWrapper>
    </div>
  );
}

export default App;
