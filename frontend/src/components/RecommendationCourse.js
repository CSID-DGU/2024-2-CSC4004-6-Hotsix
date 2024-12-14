// src/components/RecommendationCourse.js
import React, { useEffect, useState } from 'react';
import '../styles/RecommendationCourse.css';
import { useNavigate } from 'react-router-dom';

function RecommendationCourse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false); // 控制弹窗显示
  const navigate = useNavigate();
  const id = sessionStorage.getItem("ID");

  const [formData, setFormData] = useState({
    requiredLocation: '',
    activityPreference: false,
    requiredCourse: '',
    transportType: '',
    startTime: '',
    dayBudgetRange: '',
  });

  // 检查 localStorage 中是否有 GameTask
  useEffect(() => {
    const storedGameTask = localStorage.getItem('GameTask');
    if (storedGameTask) {
      setShowPrompt(true); // 如果存在 GameTask，显示弹窗
    }
  }, []);

  // 用户选择使用现有任务
  const handleUseExistingTask = () => {
    setShowPrompt(false);
    navigate('/RecommendationResult'); // 跳转到结果页面
  };

  // 用户选择生成新任务
  const handleGenerateNewTask = () => {
    setShowPrompt(false);
    localStorage.removeItem('result');
    localStorage.removeItem('GameTask'); // 删除现有的 GameTask
  };

  const seoulRegions = [
    '종로', '강북', '의정부', '노원', '광화문', '이태원',
    '신촌', '홍대', '강남', '건대', '동작', '용산',
  ];

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegionSelect = (region) => {
    setFormData((prev) => ({
      ...prev,
      requiredLocation: region,
    }));
    // 지역 선택 후 다음 페이지로
    handleNext();
  };

  const submitResult = async () => {
    try {
      const response = await fetch(`/recommendationCourse/${id}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('제출되었습니다!');
        // 제출 후 추천 결과 페이지로 이동
        navigate('/recommendation-course-result');
      } else {
        alert('문제가 발생했습니다.잠시 후 다시 시도해주세요!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className='form-page regions-page'>
            <h2>지역을 선택하세요</h2>
            <div className='region-grid'>
              {seoulRegions.map((region) => (
                <button
                  key={region}
                  className='region-button'
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className='form-page'>
            <h2>선호도 조사 - 사용자 취향</h2>
            <label className='inline-label'>
              액티비티 선호 여부 (선호 시 클릭)
              <div className='checkbox-wrapper'>
                <span>예:</span>
                <input
                  type='checkbox'
                  name='activityPreference'
                  checked={formData.activityPreference}
                  onChange={handleChange}
                />
              </div>
            </label>

            <h2>선호도 조사 - 지역 및 코스</h2>
            <label>
              필수 코스:
              <input
                type='text'
                name='requiredCourse'
                value={formData.requiredCourse}
                onChange={handleChange}
                placeholder='예: 롯데월드, 한강공원'
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div className='form-page'>
            <h2>선호도 조사 - 기타 정보</h2>
            <label>
              교통수단:
              <select
                name='transportType'
                value={formData.transportType}
                onChange={handleChange}
              >
                <option value=''>선택하세요</option>
                <option value='자가용'>자가용</option>
                <option value='대중교통'>대중교통</option>
                <option value='도보'>도보</option>
              </select>
            </label>
            <label>
              데이트 시작 시간:
              <input
                type='time'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange}
              />
            </label>
            <label>
              당일 예산 (단위:만원):
              <input
                type='number'
                name='dayBudgetRange'
                value={formData.dayBudgetRange}
                onChange={handleChange}
                placeholder='예: 5'
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='survey-form'>
      {showPrompt ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>기존 추천 결과가 존재합니다.</h3>
            <p>기존 추천을 사용하시겠습니까?</p>
            <div className="modal-buttons">
              <button onClick={handleUseExistingTask}>예</button>
              <button onClick={handleGenerateNewTask}>아니오</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {renderPage()}
          <div className='navigation-buttons'>
            {currentPage > 1 && (
              <button className='prev-button' onClick={handleBack}>뒤로</button>
            )}
            {currentPage < 3 && currentPage > 1 && (
              <button className='next-button' onClick={handleNext}>다음</button>
            )}
            {currentPage === 3 && (
              <button className='commit-button' onClick={submitResult}>
                제출
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RecommendationCourse;