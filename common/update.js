import { cloneTilemap, getPieces, getHash } from './util';
import { _EMPTY, freeBottom, areEqual, matchLeft, matchRight, matchBottom } from './check';

const updateFalling = (tmap) => {
  let newTmap = cloneTilemap(tmap);
  getPieces(tmap).forEach(p => {
      if (freeBottom(p, tmap)) {
          newTmap.tiles[p + tmap.cols] = tmap.tiles[p];
          newTmap.tiles[p] = _EMPTY;
          newTmap.hash = getHash(newTmap);
      }
  });
  if (!areEqual(tmap, newTmap)) {
      return updateFalling(newTmap);
  }
  return newTmap;
}

const updateMatching = (tmap) => {
  let newTmap = cloneTilemap(tmap);
  getPieces(tmap).forEach(p => {
      const matchL = matchLeft(p, tmap);
      const matchR = matchRight(p, tmap);
      const matchB = matchBottom(p, tmap);
      if (matchL) {
          newTmap.tiles[p - 1] = _EMPTY;
      }
      if (matchR) {
          newTmap.tiles[p + 1] = _EMPTY;
      }
      if (matchB) {
          newTmap.tiles[p + tmap.cols] = _EMPTY;
      }
      if (matchL || matchR || matchB) {
        newTmap.tiles[p] = _EMPTY;
        newTmap.hash = getHash(newTmap);
      }
  });
  if (!areEqual(tmap, newTmap)) {
      return updateMatching(newTmap);
  }
  return newTmap;
}

const updateTilemap = (tmap) => {
  let tmapFalling = updateFalling(tmap);
  let tmapMatching = updateMatching(tmapFalling);
  if (!areEqual(tmap, tmapMatching)) {
      return updateTilemap(tmapMatching);
  }
  return tmapMatching;
}

export {
  updateFalling,
  updateMatching,
  updateTilemap
}