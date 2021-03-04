import React, { useState } from 'react';

export default function Button(props) {
  const [counter, setCounter] = useState(props.init);

  function increaseCounter() {
    return setCounter(counter + 1);
  }

  return (
    <div className='counter'>
      <button onClick={increaseCounter} type='button'>
        Add 1
      </button>
      <span>{counter}</span>
    </div>
  );
}
