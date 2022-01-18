import react, { useEffect, useState } from "react";

export default function Main() {
  let ranNum = Math.floor(Math.random() * 40);
  let ransec = ranNum < 10 ? ranNum + 10 : ranNum;

  const [isstart, setIsStart] = useState(false);
  const [seconds, setSeconds] = useState(ransec);

  function reset() {
    setSeconds(0);
    setIsStart(false);
  }

  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      alert("gggg");
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
    <div>
      <button onClick={() => setIsStart(!isstart)}>START</button>

      <h2>{seconds}</h2>

      <button onClick={() => reset}>RESET</button>
    </div>
  );
}
