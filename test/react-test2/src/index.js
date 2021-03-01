import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

// const element = <h1>Hello, world</h1>;
// const subElement = <h2>Here I am</h2>
// ReactDOM.render(element, document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>It's {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

function Welcome(props) {
  const { name } = props;
  return <h2>Szia {name}</h2>;
}

function App() {
  return (
    <div>
      <Welcome name='Anna' />
      <Welcome name='Dani' />
      <Welcome name='Andris' />
    </div>
  );
}

const subElement = <Welcome name='Anna' />;

ReactDOM.render(
  <App />,
  // subElement,
  // <Welcome name="Anna" />,
  document.getElementById('sub-root')
);

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
