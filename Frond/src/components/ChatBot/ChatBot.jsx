import React from "react";
import ChatBot from "react-chatbot-kit";
import './Chatbot.css';
import Configs from "./Configs";
import MessageParser from "./MessageParser";
// import ActionProvider from "./ActionProvider";

const ChatBotComponent = ({ language }) => {

  const getPlaceholderText = () => {
    if (language === 'es') {
      return 'Escribe tu mensaje aquí...';
    } else if (language === 'en') {
      return 'Type your message here...';
    }
  };

  return (
    <div className="chatbot-container">
      <ChatBot
        config={{
          ...Configs,
          initialMessages: [
            {
              id: 'welcome',
              message: Configs.initialMessages[0].message.lang[language],
              trigger: 'get_name'
            },
            ...Configs.initialMessages.slice(1)
          ]
        }}
        messageParser={MessageParser}
        // actionProvider={ActionProvider}
        headerTitle="Bonita"
        placeholder={getPlaceholderText()}
        botAvatar="https://example.com/bot-avatar.png"
        userAvatar="https://example.com/user-avatar.png"
        lang={language}
      />
    </div>
  );
};

export default ChatBotComponent;