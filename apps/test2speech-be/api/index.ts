import express, { Request, Response } from "express";
import cors from "cors";

const data = [
  {
    content: "<speak><s>This is a sentence.</s></speak>",
  },
  {
    content:
      "<speak><s>This is a sentence number 1.</s><s>This is another sentence</s></speak>",
  },
  {
    content:
      "<speak><s>This is a long sentence.</s><s>This is an incredible sentence</s>And some more text</speak>",
  },
  {
    content:
      "<speak><s>This is a sentence.</s><s>This is my newest quote</s><s>So much more text</s><s>This is a longer sentences and I like it</s></speak>",
  },
  {
    content:
      "<speak><s>This is a long sentence.</s><s>This is an incredible sentence</s>And some more text<s>This is a longer piece of content</s></speak>",
  },
  {
    content: `<speak><p><s>Nulla facilisi</s><s>Aenean sed nisl quis nisl euismod commodo</s><s>Vestibulum nec varius sapien, eget tristique lectus</s><s>Curabitur et nulla lectus</s><s>Aenean ut viverra mauris, ut ullamcorper elit</s><s>Ut at dapibus risus, ut imperdiet mi</s><s>Suspendisse potenti</s><s>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos</s><s>Sed id nibh lacinia, vulputate lacus eu, lobortis nisi</s><s>Phasellus porttitor semper nunc</s><s>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas</s><s>Phasellus et odio nec dolor convallis malesuada nec a ante</s><s>Mauris arcu diam, vehicula quis tempus eu, feugiat in augue</s><s>Mauris rutrum fermentum ex non cursus.</s></p><speak>`,
  },
];

const app = express();
app.use(cors<Request>());

const getRandomElement = <T>(arr: Array<T>): T =>
  arr[(Math.random() * arr.length) | 0];

const wait = (min: number, max: number) => {
  const time = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};

app.get("/text", async (_: Request, res: Response) => {
  await wait(500, 3000);
  const content = getRandomElement(data);
  res.json(content);
});


const port = 5174;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
