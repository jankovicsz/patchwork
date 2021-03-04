import React from 'react';
import ReactDOM from 'react-dom';

function Clock(props) {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>It's {props.date.toLocaleTimeString()}</h2>
    </div>
  );
}

export default function Tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById('time'));
}
