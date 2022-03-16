import React, { useState, useEffect, useRef } from "react";
import './css/index.css'

function App() {
  const [StateInSeconds, SetStateInSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  
  let intervalRef = useRef();
  const incrementTime = () => SetStateInSeconds((prevState) => prevState + 1);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []); // component unMount
  
  const handleClick = () => {
    pause ? intervalRef.current = setInterval(incrementTime, 1000) :
    clearInterval(intervalRef.current);
    setPause((prevState) => !prevState);
  };

  const clearTimer = () => {
    clearInterval(intervalRef.current);
    SetStateInSeconds(0)
    setPause(() => true);
  }
  
  const oneMinute = 60
  const oneHour = 3600
  const convertedMinutes = StateInSeconds / 60

  const seconds = StateInSeconds - (parseInt(StateInSeconds / 60) * 60)
  const minutes = StateInSeconds < oneMinute ? 0 : parseInt(convertedMinutes) - (parseInt(convertedMinutes / 60) * 60)
  const hours = StateInSeconds < oneHour ? 0 : parseInt(StateInSeconds / 3600)

  const render = (time) => time < 10 ? `0${time}` : time

  document.title = `${render(hours)} : ${render(minutes)} : ${render(seconds)}`
  const styleTimer = { fontSize: '60px', fontFamily: 'fantasy' }
  
  return (
    <main>
      <div>
      <span style={ styleTimer }>{`${render(hours)} : ${render(minutes)} : ${render(seconds)}`}</span>

         <br /> <br />
        <button onClick={ handleClick }>
          <span>{ pause ? "Start" : "Pause"}</span>
        </button>
        <br />

        <button onClick={ clearTimer }>
          <span>Clear</span>
        </button>

        <p style={{ fontSize: '33px' ,fontFamily: 'fantasy' }}>{ StateInSeconds } Seconds</p>
      </div> 
    </main>
    )
}

export default App;
