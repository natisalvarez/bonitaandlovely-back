// import { createChatBotMessage } from "react-chatbot-kit";

// const ActionProvider = (setStateFunc) => {
//   const handleVerProductos = () => {
//     const messageParser = createChatBotMessage(
//       "Estos son nuestros productos: [lista de productos]",
//       {
//         withAvatar: true,
//         delay: 2000,
//         widget: "options",
//         avatarStyle: {
//           width: "40px",
//           height: "40px",
//         },
//         avatarImage: "https://example.com/bot-avatar.png",
//         avatarName: "Bonita",
//         lang: {
//           es: "Este es nuestro catálogo de productos:",
//           en: "This is our product catalog:"
//         }
//       }
//     );
//     setChatbotMessage(messageParser);
//   };

//   const handleHacerPregunta = () => {
//     const message = createChatBotMessage(
//       "Lo siento, no puedo responder esa pregunta en este momento. ¿Quieres hacer otra pregunta o ver nuestros productos?",
//       {
//         withAvatar: true,
//         delay: 2000,
//         widget: "options",
//         avatarStyle: {
//           width: "40px",
//           height: "40px",
//         },
//         avatarImage: "https://example.com/bot-avatar.png",
//         avatarName: "Bonita",
//         lang: {
//           es: "Lo siento, no puedo responder esa pregunta en este momento. ¿Quieres hacer otra pregunta o ver nuestros productos?",
//           en: "Sorry, I can't answer that question right now. Would you like to ask another question or see our products?"
//         }
//       }
//     );

//     setChatbotMessage(message);
//   };

//   const setChatbotMessage = (message) => {
//     setStateFunc((prevState) => ({
//       ...prevState,
//       messages: [...prevState.messages, message],
//     }));
//   };

//   return {
//     handleVerProductos,
//     handleHacerPregunta,
//   };
// };

// export default ActionProvider;