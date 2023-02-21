import { InferActionsTypes } from "./redux-store";

export const actions = {
  sendMessage: (message: string) => ({
    type: "SEND_MESSAGE",
    message,
  }),
};

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

export type InitialStateType = typeof initialState;
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
      IsSentByMe: true,
    },
    {
      id: 2,
      text: "How are you?",
      IsSentByMe: true,
    },
    {
      id: 3,
      text: "React is cool.",
      IsSentByMe: false,
    },
  ],
};

type ActionsTypes = InferActionsTypes<typeof actions>;

function messagesReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case "SEND_MESSAGE":
      const newMessage = {
        id: state.messages.length + 1,
        text: action.message,
        IsSentByMe: true,
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
