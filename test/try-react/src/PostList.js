import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function PostList() {
  const [list, setList] = useState([]);

  function getPost() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((post) => setList(post))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
      getPost();
  }, [])

  function renderPost(post) {
    return (
      <Post key={post.id} post={post} />
    );
  }

  return (
    <div>
      <div>Post</div>
      {list.length > 0 && list.map(renderPost)}
    </div>
  );
}
