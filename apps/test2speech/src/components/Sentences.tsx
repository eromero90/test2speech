import { useSpeech } from "../hooks";
import { Controls } from "./Controls";
import { CurrentText } from "./CurrentText";

function SentencesComponent({
  sentences,
  loadMoreContent,
  isStale,
}: {
  sentences: string[];
  loadMoreContent: () => void;
  isStale: boolean;
}) {
  const { currentWordIdx, currentSentenceIdx, controls, playbackState } =
    useSpeech(sentences);

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <div>
        <CurrentText
          currentWordIdx={currentWordIdx}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          state={playbackState}
          loadNewContent={loadMoreContent}
          {...controls}
        />
      </div>
    </div>
  );
}

export { SentencesComponent };
