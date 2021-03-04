import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Helló Világ!!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

function FormattedDate(props) {
  return <h2>Az idő {props.date.toLocaleTimeString()}</h2>;
}
