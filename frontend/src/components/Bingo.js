import React, { useState } from 'react';
import '../styles/Bingo.css';

function Bingo() {
  const [board, setBoard] = useState(
    Array(3).fill(
      Array(3).fill({ value: '', text: '' }) // value: 클릭 여부, text: 칸에 표시될 텍스트
    )
  );
  const [bingoCount, setBingoCount] = useState(0);

  const handleClick = (row, col) => {
    const newBoard = board.map((r, i) =>
      i === row
        ? r.map((cell, j) =>
            j === col
              ? { ...cell, value: cell.value === 'O' ? '' : 'O' }
              : cell
          )
        : r
    );
    setBoard(newBoard);
    checkBingo(newBoard);
  };

  const handleTextChange = (row, col, newText) => {
    const newBoard = board.map((r, i) =>
      i === row
        ? r.map((cell, j) =>
            j === col
              ? { ...cell, text: newText } // 텍스트 업데이트
              : cell
          )
        : r
    );
    setBoard(newBoard);
  };

  const checkBingo = (board) => {
    let count = 0;

    // Check rows
    for (let row of board) {
      if (row.every((cell) => cell.value === 'O')) count++;
    }

    // Check columns
    for (let col = 0; col < board.length; col++) {
      if (board.every((row) => row[col].value === 'O')) count++;
    }

    // Check diagonals
    if (board.every((row, i) => row[i].value === 'O')) count++;
    if (board.every((row, i) => row[board.length - i - 1].value === 'O')) count++;

    setBingoCount(count);
  };

  return React.createElement(
    'div',
    { className: 'bingo-game' },
    React.createElement('h2', null, 'Bingo Game'),
    React.createElement(
      'div',
      { className: 'bingo-board' },
      board.map((row, rowIndex) =>
        React.createElement(
          'div',
          { key: rowIndex, className: 'bingo-row' },
          row.map((cell, colIndex) =>
            React.createElement(
              'div',
              {
                key: colIndex,
                className: 'bingo-cell',
                onClick: () => handleClick(rowIndex, colIndex),
              },
              React.createElement('input', {
                className: 'cell-text-input',
                type: 'text',
                value: cell.text,
                onChange: (e) => handleTextChange(rowIndex, colIndex, e.target.value),
                placeholder: 'Enter text',
              }),
              cell.value && React.createElement('span', null, cell.value) // O를 표시
            )
          )
        )
      )
    ),
    React.createElement(
      'p',
      { className: 'turn-indicator' },
      `Bingo Lines Completed: ${bingoCount}`
    )
  );
}

export default Bingo;
