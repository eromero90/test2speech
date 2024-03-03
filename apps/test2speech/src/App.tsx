import "./App.css";
import React, { useDeferredValue, useState } from "react";
import { createObjectResource, fetchContent } from "./lib";
import { SentencesComponent, SentencesLoader } from "./components";

function createResource() {
  return createObjectResource(fetchContent());
}

const initialData = createResource();

function App() {
  const [sentencesResource, setSentencesResource] = useState(initialData);

  // Using useDeferedValue React will first attempt a re-render with the old value (so it will return the old value),
  // and then try another re-render in background with the new value (so it will return the updated value).
  // So we will not show a loading message to avoid sudden shift layouts.
  const deferredResource = useDeferredValue(sentencesResource);
  const isStale = sentencesResource !== deferredResource;

  const loadMoreContent = () => {
    setSentencesResource(createResource());
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <React.Suspense fallback={<p>Loading...</p>}>
        <SentencesLoader sentencesResource={deferredResource}>
          {(sentences) => {
            return (
              <SentencesComponent
                sentences={sentences}
                loadMoreContent={loadMoreContent}
                isStale={isStale}
              />
            );
          }}
        </SentencesLoader>
      </React.Suspense>
    </div>
  );
}

export default App;
