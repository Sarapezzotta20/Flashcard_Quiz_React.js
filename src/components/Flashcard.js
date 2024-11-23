import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcard, handleAnswer }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 200));
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  const handleClick = (option) => {
    if (!answered) {
      setSelectedOption(option);
      handleAnswer(option === flashcard.answer);
      setAnswered(true);
    }
  };

  const getButtonClass = (option) => {
    if (selectedOption === null) return "";
    if (option === flashcard.answer) return "correct";
    if (option === selectedOption) return "incorrect";
    return "";
  };

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => (
            <button
              className={`flashcard-option ${getButtonClass(option)}`}
              key={option}
              onClick={() => handleClick(option)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
