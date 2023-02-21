import { FriendType } from "./types";

export type InitialStateType = typeof initialState;

const initialState = {
  friends: [
    {
      id: 1,
      name: "Valentine",
      profilePicture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCgYOgHmN5jdz_T0RLYI9BUhR6nYs2fK8NA&usqp=CAU",
    } as FriendType,
    {
      id: 2,
      name: "Nathan",
      profilePicture:
        "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg",
    } as FriendType,
    {
      id: 3,
      name: "Aleksandr",
      profilePicture:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    } as FriendType,
  ],
};

function sidebarReducer(
  state = initialState,
  action: unknown
): InitialStateType {
  return state;
}

export default sidebarReducer;
