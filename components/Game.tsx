"use client";

import { cn } from "@/lib/utils";
import { useGameStore } from "@/providers/game-store-provider";
import { Move } from "@/types/Move";
import { MapPinIcon } from "lucide-react";
import Board from "./Board";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Game() {
  const {
    history,
    setHistory,
    currentMove,
    showHistory,
    setCurrentMove,
    movesAscending,
    setMovesAscending,
    setShowHistory,
  } = useGameStore((state) => state);

  // Force re-render when history changes
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    setHistoryVersion((prev) => prev + 1);
  }, [history.length, movesAscending]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(move: Move) {
    const nextHistory = [...history.slice(0, currentMove + 1), move];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleMovesOrder() {
    setMovesAscending(!movesAscending);
  }

  const moves = history.map((move, index) => {
    const desc = index
      ? `Move #${index} (${move.coordinates?.row}, ${move.coordinates?.col})`
      : `START`;
    return (
      <li key={`history-${index}`}>
        {index === currentMove && index !== 0 ? (
          <motion.div
            className="flex gap-2 items-center h-10 px-4 py-2 min-w-fit"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <MapPinIcon className="w-6 h-6 text-red-500" />
            </motion.div>
            <span className="text-base font-medium">
              ({move.coordinates?.row}, {move.coordinates?.col})
            </span>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className={cn(
                index === 0 ? "font-semibold" : "",
                "w-full border border-gray-300 text-base transition-all duration-200 hover:shadow-md"
              )}
              variant={"outline"}
              onClick={() => jumpTo(index)}
            >
              {desc}
            </Button>
          </motion.div>
        )}
      </li>
    );
  });

  return (
    <motion.div
      className="w-full max-w-[700px] lg:max-w-[900px] flex flex-col 
     justify-center sm:justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <motion.div
        className="flex flex-col items-center justify-center p-6 lg:p-12 lg:px-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </motion.div>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button
          onClick={() => setShowHistory(!showHistory)}
          className="px-6 py-2 text-base font-medium transition-all duration-300"
          variant={showHistory ? "outline" : "default"}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {showHistory ? "Hide History" : "Show History"}
          </motion.span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showHistory ? "auto" : 0,
          opacity: showHistory ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="overflow-hidden"
      >
        <motion.div
          className="px-2 lg:px-6 py-4 lg:py-10 grow"
          initial={{ y: -20 }}
          animate={{
            y: showHistory ? 0 : -20,
            scale: showHistory ? 1 : 0.95,
          }}
          transition={{
            duration: 0.3,
            delay: showHistory ? 0.1 : 0,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <motion.ol
            key={`history-list-${historyVersion}`}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            initial="hidden"
            animate={showHistory ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
              hidden: {
                transition: {
                  staggerChildren: 0.02,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {(movesAscending ? moves : [...moves].reverse()).map(
              (move, displayIndex) => {
                // Extract original index from the move's li key
                const originalIndex = move.key?.toString().split("-")[1]
                  ? parseInt(move.key.toString().split("-")[1])
                  : displayIndex;

                return (
                  <motion.div
                    key={`move-${originalIndex}-${historyVersion}-${movesAscending}`}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.8,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {move}
                  </motion.div>
                );
              }
            )}
          </motion.ol>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showHistory ? 1 : 0,
              y: showHistory ? 0 : 20,
            }}
            transition={{
              duration: 0.3,
              delay: showHistory ? 0.4 : 0,
            }}
            className="w-full  flex justify-center"
          >
            <Button
              onClick={toggleMovesOrder}
              className="mt-6 sm:mt-6 w-full max-w-xs mx-auto font-bold h-12 rounded-xl text-lg transition-all duration-200 hover:scale-105"
            >
              Sort by {movesAscending ? "Descending" : "Ascending"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
