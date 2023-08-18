const Configs = {
  botName: "Bonita",
  initialMessages: [
    {
      id: "welcome",
      message: {
        text: "¡Hola! Soy Bonita, tu asistente virtual. ¿Cómo te llamas?",
        lang: {
          es: "¡Hola! Soy Bonita, tu asistente virtual. ¿Cómo te llamas?",
          en: "Hello! I'm Bonita, your virtual assistant. What's your name?"
        }
      },
      trigger: "get_name"
    },
    {
      id: "get_name",
      user: true,
      trigger: "greet"
    },
    {
      id: "greet",
      message: {
        text: "Hola {previousValue}, ¡mucho gusto! ¿En qué puedo ayudarte?",
        lang: {
          es: "¡Hola {previousValue}, ¡mucho gusto! ¿En qué puedo ayudarte?",
          en: "Hello {previousValue}, nice to meet you! How can I assist you?"
        }
      },
      trigger: "options"
    },
    {
      id: "options",
      options: [
        {
          value: 1,
          label: {
            text: "Ver productos",
            lang: {
              es: "Ver productos",
              en: "See products"
            }
          },
          trigger: "show_products"
        },
        {
          value: 2,
          label: {
            text: "Hacer una pregunta",
            lang: {
              es: "Hacer una pregunta",
              en: "Ask a question"
            }
          },
          trigger: "ask_question"
        },
        {
          value: 3,
          label: {
            text: "Salir",
            lang: {
              es: "Salir",
              en: "Exit"
            }
          },
          trigger: "goodbye"
        }
      ]
    },
    {
      id: "show_products",
      message: {
        text: "Estos son nuestros productos:",
        lang: {
          es: "Estos son nuestros productos:",
          en: "These are our products:"
        }
      },
      trigger: "options"
    },
    {
      id: "ask_question",
      message: {
        text: "¿Cuál es tu pregunta?",
        lang: {
          es: "¿Cuál es tu pregunta?",
          en: "What's your question?"
        }
      },
      trigger: "wait_answer"
    },
    {
      id: "wait_answer",
      user: true,
      trigger: "answer"
    },
    {
      id: "answer",
      message: {
        text: "Lo siento, no puedo responder a esa pregunta en este momento.",
        lang: {
          es: "Lo siento, no puedo responder a esa pregunta en este momento.",
          en: "Sorry, I can't answer that question right now."
        }
      },
      trigger: "options"
    },
    {
      id: "goodbye",
      message: {
        text: "¡Hasta pronto!",
        lang: {
          es: "¡Hasta pronto!",
          en: "See you soon!"
        }
      },
      end: true
    }
  ]
};

export default Configs;