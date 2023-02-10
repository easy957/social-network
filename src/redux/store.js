import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

const store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          text: "Cats rule the world!!!",
          likesCount: 548,
        },
        {
          id: 2,
          text: "Hi, how are you?",
          likesCount: 43,
        },
        {
          id: 3,
          text: "It's my first post.",
          likesCount: 65,
        },
      ],
      newPostText: "React is cool!",
    },
    messagesPage: {
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
      newMessageText: "Yo!",
    },
    sidebar: {
      friends: [
        {
          id: 1,
          name: "Valentine",
          profilePicture:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCgYOgHmN5jdz_T0RLYI9BUhR6nYs2fK8NA&usqp=CAU",
        },
        {
          id: 2,
          name: "Nathan",
          profilePicture:
            "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg",
        },
        {
          id: 3,
          name: "Aleksandr",
          profilePicture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },
      ],
    },
  },
  _subscriber() {},

  subscribe(observer) {
    this._subscriber = observer;
  },
  getState() {
    return this._state;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);

    this._state.messagesPage = messagesReducer(
      this._state.messagesPage,
      action
    );

    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._subscriber(this._state);
  },
};

// window.store = store;

export default store;
