import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [[true, true, false], [false, false, true], [true, false, false]];
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(r => r.every(c => c == false))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = [...oldBoard].map(r => [...r])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y - 1, x, newBoard)
      flipCell(y, x - 1, newBoard)
      flipCell(y, x + 1, newBoard)
      flipCell(y + 1, x, newBoard)

      // newBoard = [[false, false, false], [false, false, false], [false, false, false]];
      return newBoard

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {

    return (<><p>Congrats!</p></>)

  } else {
    // make table board
    return (
      <div className="Board">
        <table>
          <tbody>
            {board.map((r, xidx) => {
              return (
                <tr key={xidx}>
                  {r.map((c, yidx) => <Cell isLit={c} flipCellsAroundMe={flipCellsAround} id={`${xidx}-${yidx}`} key={`${xidx}-${yidx}`} />)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  // TODO
}

export default Board;
