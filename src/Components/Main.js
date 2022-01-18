import { useEffect, useState } from "react";
import startsound from "./start.wav";
import stopsound from "./stop.wav";
import "./main.css";

export default function Main() {
  let ranNum = Math.floor(Math.random() * 40);
  let ransec = ranNum < 10 ? ranNum + 10 : ranNum;

  const [isstart, setIsStart] = useState(false);
  const [seconds, setSeconds] = useState(ransec);
  const [isZero, setIsZero] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  let startAudio = new Audio(startsound);
  let stopAudio = new Audio(stopsound);

  function start(e) {
    e.preventDefault();
    setIsPlaying(true);
    setIsZero(false);
    setIsStart(true);
    setSeconds(ransec);
    startAudio.play();
  }

  function playAudio() {
    stopAudio.play();
  }
  function reset(e) {
    e.preventDefault();
    setIsStart(false);
    setIsPlaying(false);
  }
  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      setIsStart(false);
      setIsZero(true);
      playAudio();
    } else if (isstart) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isstart && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isstart, seconds, playAudio]);

  return (
    <div className="btn-3 container">
      {!isstart ? (
        <div>
          <h2>STL Monopoly Gang</h2>
          <h4>Click "Start" button to start hidden timer</h4>
          <h4>Click "Reset" button to reset timer</h4>
        </div>
      ) : (
        ""
      )}
      <button className="btn btn-1" onClick={start}>
        START
      </button>
      {isPlaying ? (
        <img
          alt="stopnstart"
          src={
            !isZero
              ? "https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif"
              : "https://media.giphy.com/media/EKDGlXqALQUOQ/giphy.gif"
          }
        />
      ) : (
        ""
      )}
      <button className="btn btn-2" onClick={reset}>
        RESET
      </button>
    </div>
  );
}
