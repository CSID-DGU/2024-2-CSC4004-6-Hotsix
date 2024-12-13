// src/components/BingoGame.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/BingoGame.css"; // BingoGame.css는 style 폴더 내에 있다고 가정

function BingoGame() {
  const [bingoItems, setBingoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]); // 클릭한 셀 저장
   //유저 정보
   const id = sessionStorage.getItem("ID");

   const [requiredCourse, setRequiredCourse] = useState('카페');
   const [requiredLocation, setRequiredLocation] = useState('서울');
   const [activityPreference, setActivityPreference] = useState(false);
   const [dayBudgetRange, setDayBudgetRange] = useState('5만원');
   const [transportType, setTransportType] = useState('대중교통');
   const [userLocation, setUserLocation] = useState('서울특별시 중구');


  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/userDetail/${id}`);
      setRequiredCourse(response.data.requiredCourse);
      setRequiredLocation(response.data.requiredLocation);
      setActivityPreference(response.data.activityPreference);
      setDayBudgetRange(response.data.dayBudgetRange);
      setTransportType(response.data.transportType);
      setUserLocation(response.data.userLocation);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUserInfo();
  useEffect(() => {
    const fetchBingoItems = async () => {
      const bingoUserInfo = {
        location: userLocation,
        budget: dayBudgetRange,
        requiredCourse: requiredCourse,
        preferredCourse: requiredLocation,
        activityPreference: activityPreference,
        transportType: transportType,
        requestType: 'user_recommendations'
      };

      try {
        const response = await axios.post('http://localhost:8080/ask', bingoUserInfo);
        let responseText = '';
        if (typeof response.data === 'object' && response.data.text) {
          responseText = response.data.text;
        } else if (typeof response.data === 'string') {
          responseText = response.data;
        } else {
          console.error("응답 데이터 형식이 예상과 다릅니다:", response.data);
          setError("응답 데이터 형식이 올바르지 않습니다.");
          setLoading(false);
          return;
        }

        // GPT 응답 파싱
        const parsedItems = responseText
          .split(/\s*,\s*/)
          .filter(item => item.trim() !== '')
          .map(item => item.replace(/^\[|\]$/g, '').trim());

        // 빙고 3x3용 데이터 정리
        const bingoData = parsedItems.slice(0, 9);
        while (bingoData.length < 9) {
          bingoData.push('빈칸');
        }

        setBingoItems(bingoData);
        setSelectedCells(Array(bingoData.length).fill(false));
        setLoading(false);
      } catch (err) {
        console.error("빙고 데이터 가져오는 중 오류 발생:", err);
        if (err.response) {
          setError(`서버 오류: ${err.response.status} - ${err.response.data}`);
        } else if (err.request) {
          setError("서버로부터 응답을 받지 못했습니다.");
        } else {
          setError("요청 설정 중 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    };

    fetchBingoItems();
  }, []);

  if (loading) return <div className="bingo-loading">빙고판 로딩중...</div>;
  if (error) return <div className="bingo-error">{error}</div>;

  // bingoItems에서 3x3으로 나누기
  const rows = [];
  for (let i = 0; i < 3; i++) {
    const rowItems = bingoItems.slice(i * 3, i * 3 + 3);
    rows.push(rowItems);
  }

  const handleCellClick = (rowIndex, colIndex) => {
    const cellIndex = rowIndex * 3 + colIndex;
    setSelectedCells(prev => {
      const newSelected = [...prev];
      newSelected[cellIndex] = !newSelected[cellIndex];
      return newSelected;
    });
  }

  return (
    <div className="bingo-container">
      <h2 className="bingo-title">빙고 게임</h2>
      <div className="bingo-grid">
        {rows.map((row, rowIndex) => (
          <div className="bingo-row" key={rowIndex}>
            {row.map((item, colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex;
              const clicked = selectedCells[cellIndex];
              return (
                <div
                  className={`bingo-cell ${clicked ? 'clicked' : ''}`}
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BingoGame;