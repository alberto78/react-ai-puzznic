import { isFree, isPiece } from './check';

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

const getHash = (tmap) => {
  let hash = '';
  tmap.tiles.forEach((piece, pos) => hash += isPiece(pos, tmap) ? '@' + (pos << 3 + piece) : '');
  return hash;
}

export {
  cloneTilemap,
  getPieces,
  getPieceMoves,
  getHash
}