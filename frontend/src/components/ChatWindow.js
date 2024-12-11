// src/components/ChatWindow.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage.js";
import ChatInput from "./ChatInput.js";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [contentSections, setContentSections] = useState([]);

  // 메시지 추가 함수
  const addMessage = (message, isUser, imageUrl = null) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser, imageUrl },
    ]);
  };

  // 초기 로드 시 GPT API에 사용자 정보 전송
  useEffect(() => {
    const userId = sessionStorage.getItem("ID");
    if (userId) {
      // 사용자 정보 가져오기
      axios
        .get(`/userNameAndUserProfile/${userId}`)
        .then((response) => {
          const userName = response.data.userName;
          const userProfile = response.data.profileImagePath;

          // 추가적으로 필요한 사용자 정보가 있다면 가져옵니다.
          // 예: preferredCourse, transportType 등

          // GPT API에 사용자 정보 전송
          const userInfo = {
            MBTI: "ISFP", // 실제 사용자 정보로 대체
            사는곳: "서울특별시 중구 퇴계로", // 실제 사용자 정보로 대체
            예산: "10~20만원", // 실제 사용자 정보로 대체
            필수코스: "카페, 영화", // 실제 사용자 정보로 대체
            선호코스: "산책", // 실제 사용자 정보로 대체
            액티비티선호유무: "비선호", // 실제 사용자 정보로 대체
            교통수단: "대중교통", // 실제 사용자 정보로 대체
          };

          axios
            .post("http://localhost:8080/ask", userInfo)
            .then((res) => {
              const gptResponse = res.data.text;
              // 응답을 각 컨텐츠 섹션에 매핑
              const courses = gptResponse.split("\n").filter(line => line.trim() !== "");
              setContentSections(courses);
            })
            .catch((error) => {
              console.error("Error fetching GPT response:", error);
              addMessage("Error fetching response from server.", false);
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleSubmit = async (message) => {
    // 사용자 메시지를 추가
    addMessage(message, true);

    try {
      // 백엔드 서버와 통신하여 GPT의 응답을 받음
      const response = await axios.post("http://localhost:8080/ask", {
        prompt: message,
      });

      // GPT 응답 처리
      if (response.data) {
        const { text, imageUrl } = response.data; // text와 imageUrl을 백엔드에서 받아옴
        addMessage(text, false, imageUrl); // 메시지와 이미지 추가
      }
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      addMessage("Error fetching response from server.", false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            imageUrl={message.imageUrl} // 이미지 URL 전달
          />
        ))}
      </div>

      <ChatInput onSubmit={handleSubmit} />

      {/* 컨텐츠 섹션 표시 */}
      <div className="content-sections">
        {contentSections.map((course, index) => (
          <div key={index} className={`content-item content-${index + 1}`}>
            {course}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
