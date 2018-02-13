import { isFree, isPiece } from './check';

const printTilemap = (tmap) => {
  const strMap = tmap.tiles.join('');
  for(let r = 0; r < tmap.rows; r++) {
      console.log(strMap.slice(r * tmap.cols, (r + 1) * tmap.cols));
  }
  console.log('MOVES', tmap.moves, "\n");
}

const cloneTilemap = (tmap) => {
  let newTmap = Object.assign({}, tmap);
  newTmap.tiles = Object.assign([], tmap.tiles);
  return newTmap;
}

const getPieces = (tmap) => {
  let pieces = [];
  tmap.tiles.forEach((p, pos) => {
      if (isPiece(pos, tmap)) {
          pieces.push(pos);
      }
  });
  return pieces;
}

const getPieceMoves = (pos, tmap) => {
  let moves = [];
  if (isFree(pos - 1, tmap)) {
      moves.push(pos - 1);
  }
  if (isFree(pos + 1, tmap)) {
      moves.push(pos + 1);
  }
  return moves;
}

const unmatchedPieces = (tmap) => {
  let anySingle = false;
  const pieces = getPieces(tmap).map(p => tmap.tiles[p]);
  pieces.filter((x, pos) => pieces.indexOf(x) == pos)
      .forEach(p => {
          if (tmap.tiles.filter(x => p == x).length == 1) {
              anySingle = true;
          }
      });
  return anySingle;
}

const getHash = (tmap) => {
  let hash = '';
  tmap.tiles.forEach((piece, pos) => hash += isPiece(pos, tmap) ? '@' + (pos << 4 + piece) : '');
  return hash;
}

export {
  printTilemap,
  cloneTilemap,
  getPieces,
  getPieceMoves,
  unmatchedPieces,
  getHash
}