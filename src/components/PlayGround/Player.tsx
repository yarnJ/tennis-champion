import "./Player.scss";

export function Player({ score, name, onPlayerScore }: PlayerProps) {
  return (
    <div className="player-wrapper player-1">
      <h3 className="player-title">{name}</h3>
      <div className="player-point">{score}</div>
      <button className="player-button" onClick={onPlayerScore}>
        Score for {name}
      </button>
    </div>
  );
}

export interface PlayerProps {
  score: number | "A";
  name: string;
  onPlayerScore: () => void;
}
