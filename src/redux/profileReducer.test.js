import profileReducer, { addPost, deletePost } from "./profileReducer";

const initialState = {
  posts: [
    {
      id: 1,
      text: "No API for posts on this server :(",
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
};

it("posts length should be incremented", () => {
  // 1. initial data
  const action = addPost("new post text");

  // 2. action
  const newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.posts.length).toBe(4);
});

it("last post text should be", () => {
  // 1. initial data
  const action = addPost("new post text");

  // 2. action
  const newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.posts[3].text).toBe("new post text");
});

it("after deleting length of posts should be decremented", () => {
  // 1. initial data
  const action = deletePost(1);

  // 2. action
  const newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.posts.length).toBe(2);
});

it("after deleting length of posts should not be decremented, if id is incorrect", () => {
  // 1. initial data
  const action = deletePost(20);

  // 2. action
  const newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});
