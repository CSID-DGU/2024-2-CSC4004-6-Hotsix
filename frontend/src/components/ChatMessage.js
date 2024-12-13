import React from "react";

const ChatMessage = ({ message, isUser, imageUrl }) => {
  const messageStyle = {
    marginBottom: isUser ? "16px" : "0",
  };

  return (
    <div
      className={`chat-message ${isUser ? "user-message" : "bot-message"}`}
      style={messageStyle}
    >
      <p>{message}</p>
      {/* 이미지가 있으면 렌더링 */}
      {imageUrl && <img src={imageUrl} alt="Related" className="message-image" />}
    </div>
  );
};

export default ChatMessage;