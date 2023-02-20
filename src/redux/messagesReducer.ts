const SEND_MESSAGE = "SEND-MESSAGE";

type SendMessageActionType = {
  type: typeof SEND_MESSAGE;
  message: string;
};
export const sendMessage = (message: string): SendMessageActionType => ({
  type: SEND_MESSAGE,
  message,
});

// type UserType = {
//   id: number;
//   user: string;
// };
// type MessageType = {
//   id: number;
//   text: string;
//   sentByMe: boolean;
// };
// type InitialStateType = {
//   users: Array<UserType>;
//   messages: Array<MessageType>;
// };

type InitialStateType = typeof initialState;
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

function messagesReducer(state = initialState, action: any): InitialStateType {
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
        // newMessageText: "",
      };

    default:
      return state;
  }
}

export default messagesReducer;
