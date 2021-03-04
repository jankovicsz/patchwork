import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Clock from './Clock';
import Comment from './Comment';
import ActionLink from './ActionLink';

const commentObj = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

const {date, text, author} = commentObj;

ReactDOM.render(
  <Comment date={date} text={text} author={author} />,
  document.getElementById('sub-root')
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Clock />, document.getElementById('time'));

ReactDOM.render(<ActionLink />, document.getElementById('link'));