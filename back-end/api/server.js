import express from "express";
import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`servidor online na porta ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("endpoints '/artists' e '/songs'");
});

app.get("/artists", (request, response) => {
  response.send(artistArray);
});

app.get("/songs", (request, response) => {
  response.send(songsArray);
});
