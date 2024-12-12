// src/components/RecommendationResult.js
import React, { useState, useEffect } from 'react';
import '../styles/RecommendationResult.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecommendationResult() {
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
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCarousel, setIsCarousel] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('ID');

  const fetchUserDetail = async (userId) => {
    try {
      const response = await axios.get(`/userDetail/${userId}`);
      setActivityPreference(response.data.activityPreference === 'true');
      setDayBudgetRange(response.data.dayBudgetRange);
      setRequiredLocation(response.data.requiredLocation);
      setMbti(response.data.mbti);
      setPreferredCourse(response.data.preferredCourse);
      setRequiredCourse(response.data.requiredCourse);
      setStartTime(response.data.startTime);
      setTransportType(response.data.transportType);
      setUserLocation(response.data.userLocation);

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

      return newPrompt;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const getGPTResult = async (prompt) => {
    try {
      const response = await axios.post('/ask', { prompt, isCarousel }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const formattedResponse = response.data
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .join('\n');

      setResult(formattedResponse);
    } catch (error) {
      console.error('Failed to fetch GPT result:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const generatedPrompt = await fetchUserDetail(userId);
        if (generatedPrompt) {
          await getGPTResult(generatedPrompt);
        }
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!loading && result) {
      // 결과에서 코스 추출 로직
      // 여기서는 각 줄마다 한 코스라고 가정
      const courses = result.split('\n').map(line => line.replace(/[\[\]]/g,'').trim()).filter(l=>l);
      // 추출된 코스 배열을 세션 스토리지에 저장
      sessionStorage.setItem('recommendedCourses', JSON.stringify(courses));
    }
  }, [loading, result]);

  return (
    <div className="recommendation-result">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>추천 코스</h2>
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
