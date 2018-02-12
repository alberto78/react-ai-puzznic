const _WALL = '#';
const _EMPTY = ' ';

const isWall = (pos, tmap) => tmap.tiles[pos] === _WALL;
const isFree = (pos, tmap) => tmap.tiles[pos] === _EMPTY;
const isPiece = (pos, tmap) => !isWall(pos, tmap) && !isFree(pos, tmap);

const matchLeft = (pos, tmap) => isPiece(pos, tmap) && isPiece(pos - 1, tmap) && tmap.tiles[pos] === tmap.tiles[pos - 1];
const matchRight = (pos, tmap) => isPiece(pos, tmap) && isPiece(pos + 1, tmap) && tmap.tiles[pos] === tmap.tiles[pos + 1];
const matchBottom = (pos, tmap) => isPiece(pos, tmap) && isPiece(pos + tmap.cols, tmap) && tmap.tiles[pos] === tmap.tiles[pos + tmap.cols];

const areEqual = (tmap1, tmap2) => tmap1.hash === tmap2.hash;

const freeBottom = (pos, tmap) => isFree(pos + tmap.cols, tmap);

export {
  _WALL,
  _EMPTY,
  isWall,
  isFree,
  isPiece,
  matchLeft,
  matchRight,
  matchBottom,
  areEqual,
  freeBottom
}