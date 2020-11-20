import React, { useEffect, useState } from 'react'

function Countdown(props) {
  
  const initialHours = props.time / 3600
  const initialMinutes = (initialHours - Math.floor(initialHours)) * 60
  const initialSeconds = (initialMinutes - Math.floor(initialMinutes)) * 60

  const [hours, setHours] = useState(Math.floor(initialHours))
  const [minutes, setMinutes] = useState(Math.floor(initialMinutes))
  const [seconds, setSeconds] = useState(Math.floor(initialSeconds))

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1) 
        } else if (seconds === 0 && minutes > 0) { 
          setMinutes(minutes - 1)
          setSeconds(59)
        }
        
        if (minutes === 0 && hours > 0) { 
          setHours(hours - 1)
          setMinutes(59)
        }

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalId)
        }
    }, 1000)

    return () => clearInterval(intervalId);
  }, [seconds, minutes, hours]);

  const pad = (number) => {
    return ('0' + number).slice(-2)
  }

  return (
    <span>{pad(hours)} : {pad(minutes)} : {pad(seconds)}</span>
  );
}

export default Countdown;
