const parseContentIntoSentences = (content: string) => {
  const sentences = content.match(/<s>(.+?)<\/s>/g)?.map(sentence => sentence.replace(/<s>|<\/s>/g, ''));
  return sentences ?? [];
};

export { parseContentIntoSentences };
