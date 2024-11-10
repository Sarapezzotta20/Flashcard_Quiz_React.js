import React, { useState } from "react";
import FlashcardList from "./components/FlashcardList";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  return <FlashcardList flashcards={flashcards} />;
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2+2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2+1?",
    answer: "3",
    options: ["2", "3", "4", "5"],
  },
];

export default App;
