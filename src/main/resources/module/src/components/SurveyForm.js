// src/components/SurveyForm.js

import '../styles/SurveyForm.css';

function SurveyForm() {
    const [formData, setFormData] = React.useState({
      mbti: '', meetingFrequency: '', budgetRange: '', relationshipDate: '',
      activityPreference: '', mustVisitCourse: '', preferredCourse: '',
      transportation: '', startTime: '', mustVisitArea: '', preferredArea: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Survey Data:', formData);
      fetch('https://your-server-url.com/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then(response => response.json())
        .then(data => console.log('성공:', data))
        .catch(error => console.error('에러:', error));
    };
  
    return (
      <div className="survey-container">
        <form className="survey-form" onSubmit={handleSubmit}>
          <label>1. MBTI</label>
          <input type="text" name="mbti" value={formData.mbti} onChange={handleChange} required />
          {/* Add other form fields similarly */}
          <button type="submit">저장</button>
        </form>
      </div>
    );
  }
  
  export default SurveyForm;
  