import React, { useState } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, isUser) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, isUser }]);
  };

  const handleSubmit = async (message) => {
    // 사용자 메시지를 추가합니다.
    addMessage(message, true);

    try {
      // 백엔드 서버와 통신하여 GPT의 응답을 받습니다.
      const response = await axios.post("http://localhost:8080/ask", {
        prompt: message,
      });

      // GPT로부터 받은 응답을 채팅창에 추가합니다.
      if (response.data) {
        addMessage(response.data, false);
      }
    } catch (error) {
      console.error("Error fetching GPT response:", error);
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
          />
        ))}
      </div>

      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatWindow;