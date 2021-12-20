import { useState } from "react";
import { Player } from "./Player";
import "./PlayGround.scss";

const SCORES = [0, 15, 30, 40];

interface GameScores {
  player1: number | "A";
  player2: number | "A";
}

export function PlayGround() {
  const [gameScores, setGameScores] = useState<GameScores>({
    player1: 0,
    player2: 0,
  });
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<keyof GameScores | null>(null);

  const onScore = (scorer: keyof GameScores) => {
    const playerScore = gameScores[scorer];

    // if scorer score is not in advantage state
    if (typeof playerScore === "number") {
      if (playerScore < 40) {
        setGameScores({
          ...gameScores,
          [scorer]: SCORES[SCORES.indexOf(playerScore) + 1],
        });
      } else {
        // score is 40, opponent may be in advantage state
        const opponent = scorer === "player1" ? "player2" : "player1";
        if (gameScores[opponent] === "A") {
          // pull back opponents advantage
          setGameScores({ ...gameScores, [opponent]: 40 });
        } else {
          // set player advantage
          setGameScores({ ...gameScores, [scorer]: "A" });
        }
      }
    } else {
      // if scorer score is in advantage state
      setFinished(true);
      setWinner(scorer);
    }
  };

  const onPlayAgainClick = () => {
    setGameScores({ player1: 0, player2: 0 });
    setWinner(null);
    setFinished(false);
  };

  if (!finished) {
    return (
      <div className="play-ground">
        <Player
          score={gameScores.player1}
          name="Player 1"
          onPlayerScore={() => onScore("player1")}
        />
        <Player
          score={gameScores.player2}
          name="Player 2"
          onPlayerScore={() => onScore("player2")}
        />
      </div>
    );
  } else {
    const winnerName = winner === "player1" ? "Player 1" : "Player 2";
    return (
      <div className="winner-page">
        <div className="winner-message">{winnerName} won the game!</div>
        <button
          type="button"
          className="play-again-button"
          onClick={onPlayAgainClick}
        >
          Play again?
        </button>
      </div>
    );
  }
}
