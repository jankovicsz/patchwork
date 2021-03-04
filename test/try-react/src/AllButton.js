import React, { useState } from 'react';
import Button2 from './Button2';

export default function AllButton() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  function handleFunctionButtonChange1(counter) {
    return setCounter1(counter);
  }

  function handleFunctionButtonChange2(counter) {
    return setCounter2(counter);
  }

  function handleFunctionButtonChange3(counter) {
    return setCounter3(counter);
  }

  function handleFunctionButtonChangeAll(num) {
    setCounter1(counter1 + num);
    setCounter2(counter2 + num);
    setCounter3(counter3 + num);
  }

  return (
    <>
      <div className='post'>
        <Button2 counter={counter1} onChange={handleFunctionButtonChange1} />
      </div>
      <div className='post'>
        <Button2 counter={counter2} onChange={handleFunctionButtonChange2} />
      </div>
      <div className='post'>
        <Button2 counter={counter3} onChange={handleFunctionButtonChange3} />
      </div>
      <div className='post'>
        <FunctionAllButtons onChange={handleFunctionButtonChangeAll} />
      </div>
    </>
  );
}

function FunctionAllButtons(props) {
  const { onChange } = props;
  return (
    <div className='counter'>
      <button type='button' onClick={() => onChange(-1)}>
        Csökkent
      </button>
      <span></span>
      <button type='button' onClick={() => onChange(1)}>
        Növel
      </button>
    </div>
  );
}
