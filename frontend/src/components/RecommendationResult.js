import React, { useState, useEffect } from 'react';
import '../styles/RecommendationResult.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ResultContext } from './ResultContext.js';


function RecommendationResult() {
  // State 초기화
  const [requiredCourse, setRequiredCourse] = useState('');
  const [requiredLocation, setRequiredLocation] = useState('');
  const [activityPreference, setActivityPreference] = useState(false);
  const [dayBudgetRange, setDayBudgetRange] = useState('');
  const [mbti, setMbti] = useState('');
  const [preferredCourse, setPreferredCourse] = useState('');
  const [startTime, setStartTime] = useState('');
  const [transportType, setTransportType] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [prompt, setPrompt] = useState('');
  const { result, setResult } = useContext(ResultContext);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [isCarousel,setIsCarousel] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('ID');
  const storedResult = localStorage.getItem('result');

  // 유저 정보를 가져오는 함수
  const fetchUserDetail = async (userId) => {
    try {
      const response = await axios.get(`/userDetail/${userId}`);
      console.log(response.data);

      // 상태 업데이트
      setActivityPreference(response.data.activityPreference);
      setDayBudgetRange(response.data.dayBudgetRange);
      setRequiredLocation(response.data.requiredLocation);
      setMbti(response.data.mbti);
      setPreferredCourse(response.data.preferredCourse);
      setRequiredCourse(response.data.requiredCourse);
      setStartTime(response.data.startTime);
      setTransportType(response.data.transportType);
      setUserLocation(response.data.userLocation);

      // 프롬프트 생성
      const newPrompt = `
        {필수 지역: ${response.data.requiredLocation}},
        {필수 코스: ${response.data.requiredCourse}},
        {당일 예산: ${response.data.dayBudgetRange}},
        {MBTI: ${response.data.mbti}},
        {선호 코스: ${response.data.preferredCourse}},
        {데이트 시작 시간: ${response.data.startTime}},
        {이동 수단: ${response.data.transportType}},
        {액티비티 여부: ${response.data.activityPreference}},
        {사는 곳: ${response.data.userLocation}},
        isNotCarousel
      `;
      setPrompt(newPrompt);

      return newPrompt; // 다음 함수로 전달
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

 // GPT 결과를 가져오는 함수
const getGPTResult = async (prompt) => {
    try {
      const response = await axios.post('/ask', { prompt,isCarousel }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // 응답 데이터 처리
      // 마침표를 기준으로 문장을 분리하고 줄바꿈 추가
      const formattedResponse = response.data
        .split('.')
        .map(sentence => sentence.trim()) // 각 문장을 trim()하여 불필요한 공백 제거
        .filter(sentence => sentence.length > 0) // 빈 문장 제거
        .join('\n'); // 각 문장 사이에 줄바꿈 추가
      setResult(formattedResponse); // 결과 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch GPT result:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };
  

  // 컴포넌트가 렌더링될 때 fetchUserDetail -> getGPTResult 순차 실행
  useEffect(() => {
    if (storedResult) {
      // 如果存在本地缓存的 result，直接使用
      setResult(storedResult);
      setLoading(false);
    } else {
      // 如果不存在 result，按原逻辑获取数据
      const fetchData = async () => {
        if (userId) {
          const generatedPrompt = await fetchUserDetail(userId);
          if (generatedPrompt) {
            await getGPTResult(generatedPrompt);
          }
        }
      };
      fetchData();
    }
  }, [userId]);

  // 렌더링
  return (
    <div className="recommendation-result">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>추천 코스</h2>
      {/* \n 줄바꿈을 <br />로 변환하여 렌더링 */}
      <p>
        {result.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <button
        className="bingo-button"
        onClick={() => navigate('/bingo')}
      >
        빙고게임
      </button>
    </>
  )}
</div>

  );
}

export default RecommendationResult;
