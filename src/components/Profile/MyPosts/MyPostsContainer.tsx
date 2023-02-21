import MyPosts from "./MyPosts";
import { actions } from "../../../redux/profileReducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../redux/types";

type MapStatePropsType = {
  posts: Array<PostType>;
};
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPost,
})(MyPosts);

export default MyPostsContainer;
