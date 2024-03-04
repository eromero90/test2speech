# test2speech

I have created this small app to play a bit with web speech engine and the latest react features and best practices.

test2speech has 2 apps in a monorepo by NPM workspaces.

# App structure

# Backend
Simple express app to serve random text. The text uses SSML.

# Frontend
Simple react + vite app. Using fetch API, the app gets data from the local Backend.

## Use of suspense
In this case, as the app is simple, I am using fetch API to create a promise that will be handled by Suspense API (FYI: Suspense-enabled data fetching without the use of an opinionated framework is not yet supported).
The idea behind this is to demonstrate how to load data, how to show stale content while fresh content is loading, and how to use useDeferedValue.

Take a look at `App.tsx`, `SentencesLoader.tsx` and `Sentences.tsx`

## You might not need a useEffect ;)
When creating a custom hook, we sometimes rely on using useEffect to handle some updates, resetting values (those two using setState), and loading new data (in this case we are using Suspense API). Using a useEffect to have useState to update, reset, or derive will dispatch unnecessary rerenders. In this case, `useSpeech` needs to reset some state when you have new sentences. We can have a reference to the previous sentences, and check if the value has changed on render phase. This way, children don’t need to render twice.

Take a look at `useSpeech.tsx` to see the example and more documentation.

In React, side effects usually belong inside event handlers. For example, when the app is done reading the sentence, the index will be updated. We could tend to update the engine to load the new sentence with the new index but you can do the same in the onClick handler. The state is up to date and you don't need an effect.

Take a look at `useSpeech.tsx` to see the example and more documentation.

## You might not need a useMemo :D
Let's pretend `createEngine` is an expensive calc so recreating the engine on each re-render could cause a delay when painting the UI. We could be tempted to use `useMemo` because we have been told we can memoize an expensive calc, but that can be tricky. Why? because in this case, the dependencies array will be an empty array `[]`. So, it would look like this `const engine = useMemo(() => createEngine(), [])` and that is the tricky part. It's an expensive calc but it's not going to be recalculated in the time the component is mounted. Basically, your use case is retaining a value and you shouldn't rely on useMemo to retain a value. Why? React may add more features that take advantage of throwing away the cache to free memory or to reduce how much they retain. For this case, we can take advantage of react useRef and a single-like pattern.

Take a look at `useSpeech.tsx` to see the example and more documentation.

We can talk about using composition to avoid using `useMemo` but that would be in another project :D


**Writing pure functions takes a bit of practice, but it unlocks the power of React’s paradigm.**