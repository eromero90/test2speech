import { parseContentIntoSentences } from "../lib/content";

// You don't need a useEffect to fetch data.
// This is simple and not recommended for larger applications.
// Use react router, remix, Relay or Next to have Data fetching with Suspense.
function SentencesLoader({
  children,
  sentencesResource,
}: {
  children: (sentences: string[]) => React.ReactElement;
  sentencesResource: {
    read(): {
      content: string;
    };
  };
}) {
  const data = sentencesResource.read();
  const sentences = parseContentIntoSentences(data.content);

  // render prop pattern. Giving rendering control to the dev.
  // The loader just loads data but is not in charge of rendering a component with that data.
  return children(sentences);
}

export { SentencesLoader };
