import { useRef, useState } from "react";

import { PlayingState, createSpeechEngine } from "../lib";

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordIdx, setCurrentWordIdx] = useState(-1);
  const [playbackState, setPlaybackState] =
    useState<PlayingState>("initialized");
  // create a reference to use the sentences lenght on the onEnd Callback closure so we don't need to recreate the closure
  // to get the new sentences references updates for each sentences array
  const currentSentences = useRef(sentences);

  // create engine could be expensive (just an example).
  // Instead of using use Memo with empty brackets ([]), we use a ref and a singleton-like pattern
  // https://github.com/facebook/react/issues/14490#issuecomment-454973512
  // https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  const currentEngine = useRef<ReturnType<typeof createSpeechEngine>>();
  if (currentEngine.current === undefined) {
    currentEngine.current = createSpeechEngine({
      onStateUpdate(state) {
        setPlaybackState(state);
      },
      onBoundary() {
        setCurrentWordIdx((currentIdx) => currentIdx + 1);
      },
      onEnd() {
        setCurrentSentenceIdx((currentIdx) =>
          currentIdx + 1 < currentSentences.current.length ? currentIdx + 1 : 0
        );
        setCurrentWordIdx(-1);
      },
    });
  }

  // We don't need a useEffect to load a new sentence when new sentences arrive.
  // Store the previous value, check, if differente, load new sentences
  // When you call the set function during render, React will re-render that component immediately after your component
  // exits with a return statement, and before rendering the children. This way, children don’t need to render twice.
  // Storing information from previous renders: https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [prevSentences, setPrevSentences] = useState(sentences);
  if (prevSentences !== sentences) {
    currentEngine.current.load(sentences[currentSentenceIdx]);
    currentSentences.current = sentences;
    setPrevSentences(sentences);
    setCurrentSentenceIdx(0);
    setCurrentWordIdx(-1);
  }

  const play = () => {
    if (currentEngine.current) {
      if (playbackState === "paused") {
        currentEngine.current.resume();
      } else {
        // When you need to load a new sentence, this event handle will be in charge of loading the state instead of using and effect
        // reacting to currentSentenceIdx to load the data.
        currentEngine.current.load(sentences[currentSentenceIdx]);
        currentEngine.current.play();
      }
    }
  };

  const pause = () => {
    if (currentEngine.current) {
      currentEngine.current.pause();
    }
  };

  const cancel = () => {
    if (currentEngine.current) {
      currentEngine.current.cancel();
    }
  };

  return {
    currentSentenceIdx,
    currentWordIdx,
    playbackState,
    controls: {
      play,
      pause,
      cancel,
    },
  };
};

export { useSpeech };
