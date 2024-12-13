// src/components/Bingo.js
import React, { useEffect, useState } from 'react';
import '../styles/Bingo.css';
import axios from 'axios';
import { useContext } from 'react';
import { ResultContext } from './ResultContext.js';

function Bingo() {
  const { result } = useContext(ResultContext);
  const [board, setBoard] = useState([]);
  const [bingoCount, setBingoCount] = useState(0);

  //const result = '노원에서 밥먹고 카페가고 노래방가고 사진찍기';
  const updateBoard = (activities) => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const rowItems = activities.slice(i * 3, i * 3 + 3).map((activity) => ({
        value: '',
        text: activity,
        style: { color: '#FA58AC' },
      }));
      rows.push(rowItems);
    }
    setBoard(rows);
  };
    // courses를 기반으로 GPT에 활동 추천 요청
    // 예: prompt: "다음 장소들에 대해 각각 할만한 재미있는 활동을 한 문장씩 총 9개 추천해줘: '경복궁', '남산타워', ..."

  const fetchBingoActivities = async () => {
    const prompt = `
      내가 다음과 같이 시간과 장소, 요약에 대해 추천 받았어. 시간이랑 요약내용은 무시하고 각각의 장소에서 할 수 있는 미션 총 9개 말해줘. 장소당 여러 개의 미션을 줘도 돼. 출력은 '(장소명)에서 (미션)하기' 형태로 각 줄에 하나씩. 다른 내용 없이 오직 활동 목록만. 
      추천 내용 : ${result}`;

    try {
      const response = await axios.post('/ask', { prompt });
      const activities = response.data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');

      // 将任务保存到 LocalStorage
      localStorage.setItem('GameTask', JSON.stringify(activities));

      // 更新游戏板
      updateBoard(activities);
    } catch (error) {
      console.error('Error fetching bingo activities:', error);
    }
  };

  useEffect(() => {
    // 优先从 LocalStorage 加载 GameTask
    const storedGameTask = localStorage.getItem('GameTask');
    if (storedGameTask) {
      const activities = JSON.parse(storedGameTask);
      updateBoard(activities);
    } else if (result) {
      // 如果 LocalStorage 没有 GameTask 并且有 result，重新生成任务
      fetchBingoActivities();
    }
  }, [result]);

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

  const checkBingo = (board) => {
    let count = 0;
    // 가로
    for (let row of board) {
      if (row.every((cell) => cell.value === 'O')) count++;
    }
    // 세로
    for (let col = 0; col < board.length; col++) {
      if (board.every((row) => row[col].value === 'O')) count++;
    }
    // 대각선
    if (board.every((row, i) => row[i].value === 'O')) count++;
    if (board.every((row, i) => row[board.length - i - 1].value === 'O')) count++;

    setBingoCount(count);
  };

  return (
    <div className="bingo-game">
      <h2>Bingo Game</h2>
      <div className="bingo-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="bingo-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="bingo-cell"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                <div className="cell-text">{cell.text}</div>
                {cell.value && <span>{cell.value}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="turn-indicator">Bingo Lines Completed: {bingoCount}</p>
    </div>
  );
}

export default Bingo;