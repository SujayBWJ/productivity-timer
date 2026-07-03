import { useState } from "react";

function App() {
  const [timer, setTimer] = useState(1500);
  let minutes = Math.floor(timer/60);
  let seconds = timer % 60;

  let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  
  
//  Another way of writing the above two lines
/* 

padStart(2, "0")

Converts the number to a string and ensures that
it is at least two characters long by adding
leading zeroes when necessary.

Examples:
5  -> "05"
15 -> "15"

*/

  return (
    <div>
      <h1>Productivity Timer</h1>
      <p>
        {formattedMinutes}:{formattedSeconds}
      </p>
      <button>Start</button>
      <button>Pause</button>
      <button>Reset</button>
    </div>
  );
}

export default App;
