import express from "express";
import cors from "cors";
import anagrams from "english-anagrams";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

const capitalise = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const getAnagrams = (word: string) => {
  const res = anagrams(word);
  return res == undefined || res.length === 0
    ? `${capitalise(word)} doesn't have any anagrams that we know of`
    : res.filter((ans: string) => ans !== word).join(", ");
};

//get the default

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json("Input any word as a parameter into the link, i.e. ...herokuapp.com/your_word");
});

//get the anagrams

app.get("/:word", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { word } = req.params;
  const result = getAnagrams(word);
  res.json(result);
});

const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;
