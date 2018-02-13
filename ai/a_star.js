import { _EMPTY, numPieces } from '../common/check';
import { getHash, getPieces, getPieceMoves, cloneTilemap, unmatchedPieces, printTilemap } from '../common/util';
import { updateTilemap } from '../common/update';
import * as tilemap from '../tilemaps/02';

tilemap.moves = [];
tilemap.h = 9999;
tilemap.hash = getHash(tilemap);

let listOpened = [tilemap];
let hashOpened = [getHash(tilemap)];
let listClosed = [];
let hashClosed = [];
let solved = false;

let _opened = listOpened;
let _closed = listClosed;

const a_star = (i) => {
  process.stdout.write('O: ' + _opened.length + ' / C: ' + _closed.length + '   \r');
  if (!_opened.length) {
    solved = true;
    console.log('\nNo solution found.');
  } else {
    const node = _opened[0];
    _closed.unshift(node);
    hashClosed.push(getHash(node));
    _opened = _opened.slice(1);
    hashOpened.slice(1);
    if (!numPieces(node)) {
      solved = true;
      console.log('\nSolved!');
      printTilemap(node);
    } else {
      const pieces = getPieces(node);
      pieces.forEach(p => {
        const moves = getPieceMoves(p, node);
        moves.forEach(m => {
          let newNode = cloneTilemap(node);
          newNode.tiles[m] = node.tiles[p];
          newNode.tiles[p] = _EMPTY;
          newNode = updateTilemap(newNode);
          const newHash = getHash(newNode);
          let exists = hashOpened.indexOf(newHash) >= 0 || hashClosed.indexOf(newHash) >= 0;
          if (!exists) {
            if (!unmatchedPieces(newNode)) {
              newNode.moves = Object.assign([], node.moves);
              newNode.moves.push(p, m);
              newNode.p = numPieces(newNode);
              newNode.m = newNode.moves.length
              newNode.hash = newHash;
              _opened.push(newNode);
              hashOpened.push(newHash);
            }
          }
        });
      });
      _opened = _opened.sort((n1, n2) => ((n1.p > n2.p) || (n1.p == n2.p && n1.m > n2.m)) ? 1 : -1);
      a_star(++i);
    }
  }
}

const iniTime = new Date().getTime();
a_star(0);
const endTime = new Date().getTime();
console.log('Time used: ', (endTime - iniTime) / 1000, 'seconds');