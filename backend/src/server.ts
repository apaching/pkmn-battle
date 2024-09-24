import express from "express";
import cors from "cors"
import { pokemonRouter } from "./route/pokemonRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/pokemon", pokemonRouter)

app.get('/', (req, res) => {
  res.send("");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
