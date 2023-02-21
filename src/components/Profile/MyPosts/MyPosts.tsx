import { reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { PostType } from "../../../redux/types";

const NewPostForm = reduxForm<{ newPost: string }>({
  form: "newPost",
})(NewPost);

type PropsType = {
  posts: Array<PostType>;
  addPost: (newPost: string) => void;
};

const MyPosts = ({ posts, addPost }: PropsType) => {
  function onPostSubmit({ newPost }: { newPost: string }) {
    addPost(newPost);
  }

  return (
    <div className={s.wrapper}>
      <h2>my posts</h2>

      <NewPostForm onSubmit={onPostSubmit} />

      <ul className={s.list}>
        {posts.map(({ text, likesCount, id }) => (
          <Post key={id} message={text} likesCount={likesCount} />
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
