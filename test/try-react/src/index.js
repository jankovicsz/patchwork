import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Book from './Book';
import Button from './Button';
import AllButton from './AllButton';

// function App() {
//   return <h2>Ez egy h2-es cím</h2>;
// }

ReactDOM.render(
  <div className='container'>
    <Book title='Avatar' />
    <Book title='Star-Wars' />
    <Book title='Solaris' />
    <Button init={1}/>
    <div className="post">
    <AllButton />
    </div>
  </div>,
  document.getElementById('root')
);
