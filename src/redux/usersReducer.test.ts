import { ToggleFollowResponseType, resultCodes, usersAPI } from "../api/api";
import usersReducer, { InitialStateType, actions, toggleFollowThunk } from "./usersReducer";
jest.mock("../api/api");

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const thunkMock = toggleFollowThunk(2, false);
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      { id: 0, followed: false, name: "Samurai 0", photos: { small: null, large: null }, status: "Status 0" },
      { id: 1, followed: false, name: "Samurai 1", photos: { small: null, large: null }, status: "Status 1" },
      { id: 2, followed: true, name: "Samurai 2", photos: { small: null, large: null }, status: "Status 2" },
      { id: 3, followed: true, name: "Samurai 3", photos: { small: null, large: null }, status: "Status 3" },
    ],
    pageSize: 20,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false,
    areFetchingFollow: [] as Array<number>,
    filter: {
      term: "",
      friend: null,
    },
  };

  usersAPIMock.fetchToggleFollow.mockClear();
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test("follow success", () => {
  const newState = usersReducer(state, actions.toggleFollow(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  const newState = usersReducer(state, actions.toggleFollow(2));

  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
});

test("thunk follow success", async () => {
  const response: ToggleFollowResponseType = {
    resultCode: resultCodes.success,
    messages: [""],
    data: {},
  };

  usersAPIMock.fetchToggleFollow.mockReturnValue(Promise.resolve(response));

  await thunkMock(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFetchingFollow(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollow(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFetchingFollow(false, 2));
});
