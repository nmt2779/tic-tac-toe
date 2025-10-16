import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Square({
  value,
  onSquareClick,
  isWinningSquare,
  row,
  col,
}: {
  value: string;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
  row?: number;
  col?: number;
}) {
  // Determine corner positions and apply appropriate rounded corners
  const getCornerClasses = () => {
    if (row === undefined || col === undefined) return "";

    if (row === 0 && col === 0) return "rounded-tl-2xl"; // Top-left corner
    if (row === 0 && col === 2) return "rounded-tr-2xl"; // Top-right corner
    if (row === 2 && col === 0) return "rounded-bl-2xl"; // Bottom-left corner
    if (row === 2 && col === 2) return "rounded-br-2xl"; // Bottom-right corner

    return "";
  };

  return (
    <motion.button
      key={`${row}-${col}-${isWinningSquare}`}
      onClick={onSquareClick}
      className={cn(
        "text-4xl font-semibold text-center w-24 h-24 mr-[-1px] mt-[-1px] overflow-hidden bg-white",
        isWinningSquare
          ? "border-4 border-blue-500 shadow-lg"
          : "border border-gray-700",
        getCornerClasses()
      )}
      whileHover={{
        scale: 1.05,
        backgroundColor: value ? undefined : "#f9fafb",
      }}
      whileTap={{ scale: 0.95 }}
      animate={
        isWinningSquare
          ? {
              borderColor: ["#3b82f6", "#1d4ed8", "#3b82f6"],
            }
          : {
              scale: 1,
            }
      }
      transition={{
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <AnimatePresence mode="wait">
        {value && (
          <motion.span
            key={value}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -180,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              rotate: 180,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            className="block text-gray-800 font-bold"
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
