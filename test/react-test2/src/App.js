import Clock from './Clock';

function App() {
  return (
    <div>
      <Welcome name='Anna' />
      <Welcome name='Dani' />
      <Welcome name='Andris' />
      <Clock />
    </div>
  );
}

function Welcome(props) {
  const { name } = props;
  return <h2>Szia {name}</h2>;
}

export default App;
