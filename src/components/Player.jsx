import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Player = ({ duration, currentIndex, songsArrayFromArtist }) => {
  const prevSong = songsArrayFromArtist[currentIndex - 1];
  const nextSong = songsArrayFromArtist[currentIndex + 1];

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={prevSong ? `/song/${prevSong.id}` : "#"}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </Link>
        <FontAwesomeIcon
          className="player__icon player__icon--play "
          icon={faCirclePlay}
        />
        <Link to={nextSong ? `/song/${nextSong.id}` : "#"}>
          <FontAwesomeIcon icon={faForwardStep} />
        </Link>
      </div>
      <div className="player__progress">
        <p>00:00</p>
        <div className="player__bar">
          <div className="player__bar-progress"></div>
        </div>
        <p>0{duration}</p>
      </div>
    </div>
  );
};

export default Player;
