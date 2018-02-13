import React from 'react';
import ReactDOM from 'react-dom';
import { getPieceMoves } from '../common/util'
import { updateTilemap } from '../common/update'
import * as tilemap from '../tilemaps/02';
import './styles.css';

const Square = (props) => {
  const item = props.tiles[props.pos];
  const cssItem = item.trim() ? "square__" + (item === '#' ? '0' : item) : '';
  return <button className={"square " + cssItem} onClick={() => props.onClick(props.pos)}>{item}</button>
}

const Column = (props) => Square(props);

const Row = (props) => {
  let cols = [];
  for (let col = 0; col < props.cols; col++) {
    const item = props.row * props.cols + col;
    cols.push(<Column key={col} col={col} pos={item} {...props} />);
  }
  return <div className="row">{cols}</div>
}

const Board = (props) => {
  let rows = [];
  for (let row = 0; row < props.rows; row++) {
    rows.push(<Row key={row} row={row} {...props} />);
  }
  return <div className="board">{rows}</div>
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tilemap: tilemap,
      click: 0,
      moves: []
    };
  }
  handleClick(pos) {
    if (this.state.moves.indexOf(pos) >= 0) {
      let tmap = this.state.tilemap;
      tmap.tiles[pos] = tmap.tiles[this.state.click];
      tmap.tiles[this.state.click] = ' ';
      const newTmap = updateTilemap(tmap);
      this.setState({tilemap: newTmap, click: 0, moves: []});
    } else {
      const moves = getPieceMoves(pos, this.state.tilemap)
      this.setState({click: pos, moves: moves});
    }
  }
  render() {
    return (
      <Board 
        cols={tilemap.cols}
        rows={tilemap.rows}
        tiles={this.state.tilemap.tiles}
        onClick={i => this.handleClick(i)}
      />
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);