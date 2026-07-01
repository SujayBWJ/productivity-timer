# React Learning Journal

## Understanding `main.jsx`

```jsx
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

`main.jsx` is the entry point of the React application.

When the application starts, this file is executed first.

Its job is to tell React:

> "Find the place where I should display my application and render it there."

---

### Understanding `createRoot()`

```jsx
createRoot(document.getElementById("root"))
```

This line does two things:

1. Finds the HTML element with the id `root` inside `index.html`.

```html
<div id="root"></div>
```

2. Creates a React Root (or React workspace) inside that div.

From this point onwards, React controls everything inside this `root` div.

---

### Understanding `.render()`

```jsx
.render(
    <App />
)
```

This tells React:

> Render the `App` component inside the React Root.

`<App />` is **not HTML**.

It represents the `App` component.

Internally, React executes the `App()` function and renders whatever JSX it returns.

---

### Complete Rendering Flow

```
Browser loads index.html

        ↓

<div id="root"></div>

        ↓

main.jsx executes

        ↓

createRoot()

        ↓

React creates a workspace inside the root div

        ↓

render(<App />)

        ↓

React calls App()

        ↓

App returns JSX

        ↓

React converts JSX into HTML

        ↓

Browser displays the UI
```

---

### Mental Model

HTML is ultimately responsible for displaying everything on the webpage.

React doesn't replace HTML.

Instead, React generates HTML (from JSX) and places it inside the `root` div.

Everything visible in the React application exists inside this single div.

---

# Understanding `App.jsx`

The `App` component is the root component of the application.

Every React component is simply a JavaScript function that returns JSX.

```jsx
function App() {
    return (
        <h1>Hello</h1>
    );
}
```

When React renders `<App />`, it actually executes:

```jsx
App();
```

Whatever JSX is returned becomes the UI.

---

# JSX

JSX stands for **JavaScript XML**.

It allows us to write HTML-like syntax inside JavaScript.

Example:

```jsx
return (
    <h1>Hello World</h1>
);
```

Although it looks like HTML, it is actually JavaScript.

React later converts this JSX into normal HTML.

---

## Why `className` instead of `class`?

JavaScript already has a reserved keyword:

```javascript
class
```

Since JSX is JavaScript, React cannot reuse this keyword for HTML classes.

Instead, React uses:

```jsx
className="container"
```

When rendered, React automatically converts it into:

```html
class="container"
```

---

# Understanding Imports

```jsx
import { useState } from "react";
```

This means:

> Import the `useState` Hook from the React library.

Other imports work similarly.

```jsx
import heroImg from "./assets/hero.png";
```

imports an image.

```jsx
import "./App.css";
```

imports the stylesheet.

---

# State

Suppose we write:

```javascript
let count = 0;
```

Now,

```javascript
count++;
```

changes the value to `1`.

JavaScript knows the value changed.

However, React does **not** know that the UI should update.

The webpage will still display the old value.

React solves this problem using **State**.

Instead of:

```javascript
let count = 0;
```

we write:

```jsx
const [count, setCount] = useState(0);
```

Here,

- `count` → current state value
- `setCount()` → function used to update the state
- `0` → initial value (used only during the first render)

If we want to change the value,

instead of

```javascript
count = 4;
```

we write

```jsx
setCount(4);
```

Calling `setCount()` tells React:

> "The UI depends on this value. It has changed. Please render the component again."

---

# What Happens When State Changes?

Suppose we have:

```jsx
const [count, setCount] = useState(0);
```

When

```jsx
setCount(count + 1);
```

is executed,

the following happens:

```
State changes

↓

React notices the change

↓

React executes App() again

↓

App returns new JSX

↓

React compares the new JSX with the previous JSX

↓

Only the changed DOM elements are updated

↓

Browser displays the updated UI
```

This process is called **Re-rendering**.

---

# Important Note

The entire component function executes again during a re-render.

For example,

```jsx
function App() {
    console.log("Rendering...");
}
```

This `console.log()` executes:

- During the initial render
- During every re-render

However,

React **does not rebuild the entire webpage**.

It compares the previous UI with the new UI and updates only the parts that actually changed.

---

# Curly Braces `{}`

Inside JSX,

normal HTML is written directly.

Whenever JavaScript needs to be evaluated, it is written inside curly braces.

Example:

```jsx
const name = "Suj";

<h1>{name}</h1>
```

Output:

```
Suj
```

Another example:

```jsx
<h1>{5 + 10}</h1>
```

Output:

```
15
```

Curly braces tell React:

> Evaluate this JavaScript expression and place the result here.

---

# Fragment

Sometimes a component needs to return multiple elements.

Instead of wrapping everything inside an unnecessary `<div>`, React provides a Fragment.

```jsx
<>
    <h1>Hello</h1>
    <button>Click</button>
</>
```

A Fragment groups multiple elements together without creating an extra HTML element in the DOM.

---

# Key Takeaways

- Every React component is a JavaScript function.
- Components return JSX.
- JSX looks like HTML but is actually JavaScript.
- `main.jsx` is the entry point of the application.
- `createRoot()` creates a React Root inside the `root` div.
- `render(<App />)` tells React to render the `App` component.
- `useState` allows React to remember values between renders.
- State should always be updated using its setter function.
- Calling a state setter triggers a re-render.
- During a re-render, the component function executes again.
- React compares the old UI with the new UI and updates only what changed.
- JavaScript expressions inside JSX are written using `{}`.
- `className` is used instead of `class`.
- Fragments (`<> </>`) allow multiple elements to be returned without adding extra HTML elements.