export default function Post(props) {
  const {
    post: { title, body },
  } = props;

  return (
    <div className='postDiv'>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  );
}
