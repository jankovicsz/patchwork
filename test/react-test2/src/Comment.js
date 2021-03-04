export default function Comment(props) {
    console.log('Comment props: ', props);
  return (
    <div className='Comment'>
      <UserInfo user1={props.author}/>
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
      <div className='Comment-time'>{formatTime(props.date)}</div>
    </div>
  );
}

function UserInfo(props) {
    console.log('User info', props);
    return (
        <div className='UserInfo props: '>
        <Avatar user2={props.user1} />
         <div className='UserInfo-name'>{props.user1.name}</div>
       </div>
    )

}

function Avatar(props) {
    console.log('Avatar props: ', props);
    const user = props.user2;
    return (
        <img
        className='Avatar'
        src={user.avatarUrl}
        alt={user.name}
      />
    )
}

function formatDate(date) {
  return date.toLocaleDateString();
}

function formatTime(date) {
    return date.toLocaleTimeString();
}
