import Game from "@/components/Game";
import { GameStoreProvider } from "@/providers/game-store-provider";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center p-6">
      <GameStoreProvider>
        <Game></Game>
      </GameStoreProvider>
    </div>
  );
}
