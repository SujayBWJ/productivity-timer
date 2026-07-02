import { useState } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

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
