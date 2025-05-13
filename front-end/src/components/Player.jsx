import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// Função para formatar segundos em "MM:SS"
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

// Função para converter "MM:SS" em segundos
const timeInSeconds = (timeString) => {
  const [min, sec] = timeString.split(":").map(Number);
  return min * 60 + sec;
};

const Player = ({ duration, currentIndex, songsArrayFromArtist, audio }) => {
  const prevSong = songsArrayFromArtist[currentIndex - 1];
  const nextSong = songsArrayFromArtist[currentIndex + 1];

  const audioPlayer = useRef(null);
  const progressBar = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSeconds = timeInSeconds(duration);

  // Alterna entre tocar e pausar
  const playPause = () => {
    if (!audioPlayer.current) return;

    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Atualiza a barra de progresso e tempo atual
  useEffect(() => {
    const audioEl = audioPlayer.current;

    const updateProgress = () => {
      if (!audioEl) return;
      const current = audioEl.currentTime;
      setCurrentTime(formatTime(current));
      progressBar.current.style.setProperty(
        "--_progress",
        `${(current / durationInSeconds) * 100}%`
      );
    };

    if (audioEl) {
      audioEl.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [durationInSeconds]);

  // Quando a música muda, reseta estado do player
  useEffect(() => {
    setCurrentTime(formatTime(0));
    setIsPlaying(false);
  }, [audio]);

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={prevSong ? `/song/${prevSong._id}` : "#"}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </Link>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          className="player__icon player__icon--play"
          onClick={playPause}
        >
          <FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} />
        </button>

        <Link to={nextSong ? `/song/${nextSong._id}` : "#"}>
          <FontAwesomeIcon icon={faForwardStep} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>
        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      {/* A chave força o React a recriar o <audio> quando a música muda */}
      <audio key={audio} ref={audioPlayer} style={{ display: "none" }}>
        <source src={audio} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
};

export default Player;
