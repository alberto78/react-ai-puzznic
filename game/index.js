import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class Game extends React.Component {
  render() {
    return <div>My game test!</div>
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);