import React, { useEffect, useState } from "react";
import AttemptBar from "./AttemptBar";

import Confetti from "react-confetti";

const MemoryGame = () => {
  const fruits = [
    {
      name: "Apple",
      image: "./public/assets/apple.png",
      color: "bg-red-500",
    },
    {
      name: "Bananas",
      image: "./public/assets/bananas.png",
      color: "bg-yellow-500",
    },
    {
      name: "Cherries",
      image: "./public/assets/cherries.png",
      color: "bg-red-600",
    },
    {
      name: "Grapes",
      image: "./public/assets/grapes.png",
      color: "bg-purple-500",
    },
    {
      name: "Orange",
      image: "./public/assets/orange.png",
      color: "bg-orange-500",
    },
    {
      name: "Pineapple",
      image: "./public/assets/pineapple.png",
      color: "bg-yellow-400",
    },
    // {
    //   name: "Strawberry",
    //   image: "./public/assets/strawberry.png",
    //   color: "bg-red-300",
    // },
    // {
    //   name: "Watermelon",
    //   image: "./public/assets/watermelon.png",
    //   color: "bg-green-500",
    // },
  ];
  const [maxAttempts, setMaxAttempts] = useState(20);
  const [boardSize, setBoardSize] = useState(4);
  const [attempts, setAttempts] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const initializedCards = initializeGame(fruits);
    setCards(initializedCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setGameWon(false);
  }, [boardSize]);

  const [showDifficultyModal, setShowDifficultyModal] = useState(true);
  const [showLossModal, setShowLossModal] = useState(false);

  // Adjust initial attempts based on difficulty
  const handleDifficultySelection = (difficulty) => {
    switch (difficulty) {
      case "easy":
        setMaxAttempts(20);
        break;
      case "medium":
        setMaxAttempts(14);
        break;
      case "hard":
        setMaxAttempts(8);
        break;
      default:
        setMaxAttempts(20);
    }
    setShowDifficultyModal(false);
  };

  // Trigger loss modal and reset after 3 seconds
  useEffect(() => {
    if (attempts > 0 && !gameWon) return;
    if (!gameWon) {
      if (attempts === maxAttempts) {
      }
    }
  }, [attempts, gameWon]);

  function reset() {
    const initializedCards = initializeGame(fruits);
    setCards(initializedCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setShowLossModal(false);
    setShowDifficultyModal(true);
    setGameWon(false);
  }

  function shuffle(array) {
    const arrayWithIds = array.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    for (let i = arrayWithIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayWithIds[i], arrayWithIds[j]] = [arrayWithIds[j], arrayWithIds[i]];
    }
    return arrayWithIds;
  }

  function initializeGame(fruits) {
    const fruitPairs = [...fruits, ...fruits];
    return shuffle(fruitPairs);
  }

  function handleClick(id) {
    if (attempts < maxAttempts) {
      console.log("MAx attempt", maxAttempts);
      console.log(" attempt", attempts);
      if (disabled || flippedCards.includes(id) || matchedPairs.includes(id))
        return;

      if (flippedCards.length === 0) {
        setFlippedCards([id]);
        return;
      }

      if (flippedCards.length === 1) {
        setFlippedCards([...flippedCards, id]);
        setAttempts((prev) => prev + 1);
        setDisabled(true);

        const firstCard = cards.find((card) => card.id === flippedCards[0]);
        const secondCard = cards.find((card) => card.id === id);

        if (firstCard.name === secondCard.name) {
          setMatchedPairs((prev) => [...prev, flippedCards[0], id]);
          setFlippedCards([]);
          setDisabled(false);
          if (matchedPairs.length + 2 === cards.length) {
            setGameWon(true);
          }
        } else {
          setTimeout(() => {
            setFlippedCards([]);
            setDisabled(false);
          }, 1000);
        }
      }
    } else {
      setShowLossModal(true);
    }
  }

  function isFlippedCard(id) {
    return flippedCards.includes(id) || matchedPairs.includes(id);
  }

  return (
    <div className="min-w-[320px] p-3 text-center">
      {/* Confetti on winning the game */}
      {gameWon ? <Confetti recycle={true} /> : undefined}

      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <div className="fixed inset-0  bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-black border border-white/20 h-[190px] flex flex-col items-center justify-center p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Select Difficulty</h2>
            <div className="space-x-4">
              <button
                onClick={() => handleDifficultySelection("easy")}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultySelection("medium")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Medium
              </button>
              <button
                onClick={() => handleDifficultySelection("hard")}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loss Modal */}
      {showLossModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-lg border-white/20 text-center">
            <h2 className="text-2xl font-bold mb-4">You Lost!</h2>
            <p className="mb-4">Better luck next time!</p>
            <button
              onClick={() => {
                setShowLossModal(false);
                reset();
                setShowDifficultyModal(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-5xl mt-5 font-semibold">Memory Match</div>

      {/* Description */}
      <p className="text-lg my-5">You have {attempts} attempts left.</p>

      {/* Attempt */}
      <div>
        <AttemptBar currentAttempt={attempts} maxAttempts={maxAttempts} />
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 px-2 py-4">
        {cards.map((item) => (
          <div onClick={() => handleClick(item.id)} key={item.id}>
            {isFlippedCard(item.id) ? (
              <div
                className={`flex flex-col justify-center items-center cursor-pointer ${item.color} p-2 rounded-md`}
              >
                <img
                  className="w-[40px] sm:w-[50px] drop-shadow-2xl hover:drop-shadow-md"
                  src={item.image}
                  alt={item.name}
                />
                <p className="text-sm sm:text-md [text-shadow:_0_2px_4px_rgb(0_0_0)]">
                  {item.name}
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center cursor-pointer bg-zinc-500 p-2 rounded-md">
                <img
                  className="sm:w-[70px] drop-shadow-2xl hover:drop-shadow-md"
                  src="./public/assets/questionmark.png"
                  alt="Question mark"
                />
                {/* {item.name} */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reset and Start Again Button */}
      <div className="py-4">
        <button
          onClick={reset}
          className="bg-white text-black hover:bg-white/70 rounded-md text-lg font-semibold px-4 py-1"
        >
          {gameWon ? "Play Again" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
