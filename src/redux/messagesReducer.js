const SEND_MESSAGE = "SEND-MESSAGE";

export const sendMessage = (message) => ({ type: SEND_MESSAGE, message });

const initialState = {
  users: [
    {
      id: 1,
      user: "Nathan",
    },
    {
      id: 2,
      user: "Aleksandr",
    },
    {
      id: 3,
      user: "Valentine",
    },
  ],
  messages: [
    {
      id: 1,
      text: "Hi!",
      sentByMe: true,
    },
    {
      id: 2,
      text: "How are you?",
      sentByMe: true,
    },
    {
      id: 3,
      text: "React is cool.",
      sentByMe: false,
    },
  ],
};

function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: state.messages.length + 1,
        text: action.message,
        sentByMe: true,
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageText: "",
      };

    default:
      return state;
  }
}

export default messagesReducer;
