import React, { useState } from "react";

export default function ButtonCount(num) {
    // biggest idea in React is: state variables!
    const [count, setCount] = useState(num.initialCount || 0);

    function addOne() {
        setCount(count + 1);
    }

    function resetCounter() {
        setCount(0);
    }

    return (
        <div>
            <button onClick={addOne}>You have clicked {count} times</button>
            <button onClick={resetCounter}>reset</button>
        </div>
    );
}