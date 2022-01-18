import { useEffect, useState } from "react";
import startsound from "./start.wav";
import stopsound from "./stop.wav";
import "./main.css";

export default function Main() {
  let ranNum = Math.floor(Math.random() * 20);
  let ransec = ranNum < 10 ? ranNum + 10 : ranNum;

  const [isstart, setIsStart] = useState(false);
  const [seconds, setSeconds] = useState(ransec);
  const [isZero, setIsZero] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displaySec, setDisplaySec] = useState(false);

  function start(e) {
    let startAudio = new Audio(startsound);
    e.preventDefault();
    setIsPlaying(true);
    setIsZero(false);
    setIsStart(true);
    setSeconds(ransec);
    startAudio.play();
  }

  function reset(e) {
    e.preventDefault();
    setIsStart(false);
    setIsPlaying(false);
  }
  useEffect(() => {
    let stopAudio = new Audio(stopsound);
    let interval = null;
    if (seconds === 0) {
      setIsStart(false);
      setIsZero(true);
      stopAudio.play();
    } else if (isstart) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isstart && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isstart, seconds]);

  return (
    <div className="btn-3 container common">
      {!isstart ? (
        <div>
          <h2>STL Monopoly Gang</h2>
          <h4>Click "Start" button to start random timer</h4>
          <h4>Click "Reset" button to reset timer</h4>
        </div>
      ) : (
        ""
      )}
      {isstart ? (
        <div
          className="btn btn-3 common"
          onClick={() => setDisplaySec(!displaySec)}
          style={{ padding: "2%" }}
        >
          {displaySec ? (
            <div>
              <p style={{ fontSize: "8vh", marginTop: "0", marginBottom: "0" }}>
                {seconds}
              </p>{" "}
              <p style={{ marginTop: "0", marginBottom: "0" }}>
                Click to Hide timer
              </p>
            </div>
          ) : (
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              Click to show timer
            </p>
          )}
        </div>
      ) : (
        <button className="btn btn-1" onClick={start}>
          START
        </button>
      )}
      {isPlaying ? (
        <img
          className="animetion"
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
