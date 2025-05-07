import React from "react";
import ItemList from "./itemList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Main = () => {
  return (
    <div className="main">
      {/* Lista de Artistas */}
      <ItemList
        title="Artistas"
        items={5}
        itemsArray={artistArray}
        path="artists"
        idPath="/artist"
      />
      {/* Lista de Musicas */}
      <ItemList
        title="Musicas"
        items={10}
        itemsArray={songsArray}
        path="songs"
        idPath="/songs"
      />
    </div>
  );
};

export default Main;
