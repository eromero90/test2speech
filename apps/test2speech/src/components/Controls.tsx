import { PlayingState } from "../lib";

const Controls = ({
  play,
  pause,
  cancel,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  cancel: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  const onPlay = () => {
    if (state === "playing") {
      pause();
    } else {
      play();
    }
  };

  const onLoadNewContent = () => {
    cancel();
    loadNewContent();
  };

  return (
    <div>
      <button onClick={onPlay}>{state === "playing" ? "Pause" : "Play"}</button>
      <button onClick={onLoadNewContent}>Load new content</button>
    </div>
  );
};

export { Controls };
