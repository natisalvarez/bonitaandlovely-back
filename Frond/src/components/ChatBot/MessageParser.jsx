import React from 'react';

const MessageParser = ({ message }) => {
  return (
    <div className="message">
      {message.text}
    </div>
  );
};

export default MessageParser;