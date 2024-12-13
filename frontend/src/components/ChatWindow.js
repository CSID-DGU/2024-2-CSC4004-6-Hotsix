import React, { useState } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage.js";
import ChatInput from "./ChatInput.js";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  // 메시지 추가 함수
  const addMessage = (message, isUser, imageUrl = null) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser, imageUrl },
    ]);
  };

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
    </div>
  );
};

export default ChatWindow;