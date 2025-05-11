import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";
import { db } from "./connect.js";

// funções criadas para exluir o id de cada obj das listas
//  pois o database criado no MongoDB ja retorna um id para cada
// objeto por padrao.

const newArtistsArray = artistArray.map((currentArtistObj) => {
  const newArtistObj = { ...currentArtistObj };
  delete newArtistObj.id;
  return newArtistObj;
});

const newSongsArray = songsArray.map((currentSongObj) => {
  const newSongObj = { ...currentSongObj };
  delete newSongObj.id;
  return newSongObj;
});

const responseArtists = await db
  .collection("artists")
  .insertMany(newArtistsArray);
const responseSongs = await db.collection("songs").insertMany(newSongsArray);

console.log(responseArtists);
console.log(responseSongs);
