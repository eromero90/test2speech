const API_URL = "http://localhost:5174/text";

const createObjectResource = (promise: Promise<Response>) => {  
  let result: {
    content: string;
  };
  const resultPromise = promise
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.log(error));

    return {
      read() {
        if(!result) throw resultPromise;
        return result;
      }
    }
}

const fetchContent = async (): Promise<Response> => fetch(API_URL);


export { fetchContent, createObjectResource };
