const CurrentText = ({
  currentWordIdx,
  currentSentenceIdx,
  sentences,
}: {
  currentWordIdx: number;
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  return (
    <div>
      <p>{sentences[currentSentenceIdx].split(' ').map((word, idx) => <a key={word+idx} className={idx === currentWordIdx ? 'current-word' : ''}>{word + ' '}</a>)}</p>
      <p>{sentences.join(" ")}</p>
    </div>
  );
};

export { CurrentText };
