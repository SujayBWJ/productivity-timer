# React Learning Journal

# Table of Contents

1.  React Project Structure
2.  Components
3.  JSX
4.  Rendering
5.  State
6.  Derived State
7.  Event Handling
8.  Introduction to Side Effects (`setInterval` & Closures)
9.  Key React Principles

------------------------------------------------------------------------

# 1. React Project Structure

## Understanding `main.jsx`

``` jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### What is `main.jsx`?

`main.jsx` is the entry point of a React application.

Its job is to:

-   Create a React Root.
-   Render the root component (`App`) inside the `root` div.

### Rendering Flow

``` text
Browser loads index.html
        ↓
<div id="root"></div>
        ↓
main.jsx executes
        ↓
createRoot()
        ↓
React creates a React Root
        ↓
render(<App />)
        ↓
React executes App()
        ↓
App returns JSX
        ↓
React creates the UI
        ↓
Browser displays the UI
```

------------------------------------------------------------------------

# 2. Components

A React component is simply a JavaScript function that returns JSX.

``` jsx
function App() {
  return (
    <h1>Hello</h1>
  );
}
```

When React encounters

``` jsx
<App />
```

it internally executes

``` jsx
App();
```

Whatever JSX is returned becomes the UI.

------------------------------------------------------------------------

# 3. JSX

JSX stands for **JavaScript XML**.

Although it looks like HTML, it is actually JavaScript syntax that React
converts into DOM elements.

## `className`

JavaScript already has the reserved keyword `class`.

Therefore React uses

``` jsx
className="container"
```

which becomes

``` html
class="container"
```

in the browser.

------------------------------------------------------------------------

## Curly Braces `{}`

Inside JSX, curly braces indicate that JavaScript should be evaluated.

Example:

``` jsx
const name = "Suj";

<h1>{name}</h1>
<h1>{5 + 10}</h1>
```

React evaluates the expression inside `{}` and inserts the result into
the UI.

------------------------------------------------------------------------

## Why `return (...)`?

### Reason 1

`{}` represent objects.

``` javascript
return {
  name: "Sujay"
};
```

`()`

groups an expression.

JSX is an expression.

### Reason 2

JavaScript follows Automatic Semicolon Insertion (ASI).

Incorrect:

``` javascript
return
<h1>Hello</h1>;
```

JavaScript interprets it as

``` javascript
return;

<h1>Hello</h1>;
```

Therefore nothing gets returned.

Correct:

``` jsx
return (
  <h1>Hello</h1>
);
```

------------------------------------------------------------------------

## Fragment

Instead of wrapping everything in an unnecessary `<div>`, React provides
Fragments.

``` jsx
<>
  <h1>Hello</h1>
  <button>Click</button>
</>
```

Fragments group elements without creating an extra DOM node.

------------------------------------------------------------------------

# 4. Rendering

Whenever React renders a component, it executes the component function.

``` jsx
function App() {
  console.log("Rendering...");
}
```

This runs:

-   Initial render
-   Every re-render

Calling a state setter causes:

``` text
State changes
      ↓
React executes the component again
      ↓
New JSX is created
      ↓
React compares old and new UI
      ↓
Only changed DOM nodes are updated
```

------------------------------------------------------------------------

# 5. State

A normal JavaScript variable

``` javascript
let count = 0;
```

can change, but React doesn't know that it changed.

Instead we use

``` jsx
const [count, setCount] = useState(0);
```

-   `count` → current value
-   `setCount()` → updates the value
-   `0` → initial value (used only during the first render)

Never do:

``` javascript
count = 5;
```

Instead:

``` jsx
setCount(5);
```

------------------------------------------------------------------------

# 6. Derived State

## Don't Store Derived State

One of React's most important principles:

> Store the minimum amount of state possible.

Instead of

``` jsx
const [minutes, setMinutes] = useState(25);
const [seconds, setSeconds] = useState(0);
```

store

``` jsx
const [timeLeft, setTimeLeft] = useState(1500);
```

and derive

``` jsx
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;
```

Benefits:

-   Single source of truth
-   Less state to manage
-   Prevents inconsistent values
-   Easier maintenance

------------------------------------------------------------------------

## Formatting Derived Values

``` jsx
const formattedMinutes =
  minutes < 10 ? "0" + minutes : minutes;

const formattedSeconds =
  seconds < 10 ? "0" + seconds : seconds;
```

Alternative:

``` jsx
String(minutes).padStart(2, "0");
```

`padStart(2, "0")` ensures the string has at least two characters by
adding leading zeroes.

------------------------------------------------------------------------

## Component Flow

``` text
State
   ↓
Derived Values
   ↓
Formatted Values
   ↓
JSX
   ↓
Browser UI
```

Example:

``` text
timeLeft
   ↓
minutes & seconds
   ↓
formattedMinutes & formattedSeconds
   ↓
25:00
```

------------------------------------------------------------------------

# 7. Event Handling

State changes only because something happens.

Examples:

-   Button click
-   User input
-   API response
-   Timer event

Initially,

``` jsx
const [timeLeft, setTimeLeft] = useState(1500);
```

is enough to display `25:00`.

`setTimeLeft()` is only required when an event changes the timer.

------------------------------------------------------------------------

# 8. Introduction to Side Effects

## Running the Project

Always run the development server from the project directory (the folder
containing `package.json`).

``` bash
npm run dev
```

------------------------------------------------------------------------

## `setInterval()`

``` javascript
setInterval(() => {
  console.log("Hello");
}, 1000);
```

This executes the callback every **1000 ms (1 second).**

------------------------------------------------------------------------

## Why can't the Start button update the timer?

``` jsx
<button onClick={() => setTimeLeft(timeLeft - 1)}>
```

This executes only once.

A countdown requires repeated execution.

That's why JavaScript provides `setInterval()`.

------------------------------------------------------------------------

## The Closure Problem

Suppose the interval is created when

``` text
timeLeft = 1500
```

Later React re-renders with

``` text
timeLeft = 1499
```

The interval callback still remembers the value from the render in which
it was created.

This happens because JavaScript functions remember the variables
available when they were created.

This behaviour is called a **closure**.

This is the motivation behind learning `useEffect()`.

------------------------------------------------------------------------

# 9. Key React Principles

-   Every React component is a JavaScript function.
-   Components return JSX.
-   React executes components during every render.
-   State is the source of truth.
-   The UI is derived from state.
-   Store the minimum amount of state possible.
-   Don't store derived state.
-   Derive → Format → Display.
-   State changes because of events.
-   React encourages declarative code over imperative code.
