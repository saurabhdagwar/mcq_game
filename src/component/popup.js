import React, { useEffect, useState } from "react";

const Popup = (props) => {
  const [headingMessage, setHeadingMessage] = useState("");
  const { open, type, onPopupClosed, resetClicked, message, score } = props;
  useEffect(() => {
    if (open) {
      if (type === "incorrect") {
        setHeadingMessage("Incorrect Answer");
      } else if (type === "correct") {
        setHeadingMessage("Correct Answer");
      } else if (type === "timeout") {
        setHeadingMessage("Time Out");
      } else {
        setHeadingMessage("Reset Activity");
      }
    }
  }, [open]);

  return (
    <div className={`popup-main ${open && "popup-vissible"}`}>
      <div className="popup-background" />
      <div className={`popup-show ${type}`}>
        <div className={`popup-heading ${type}`}>{headingMessage}</div>
        <div className="popup-message">{message}</div>
        <div className="score-disp">
          <div className="score"><b>Correct:</b> {score.correct}</div>
          <div className="score"><b>Incorrect:</b> {score.incorrect}</div>
        </div>

        {type == "reset" ? (
          <button onClick={resetClicked}>Play Again</button>
        ) : (
          <button onClick={onPopupClosed}>Close</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
