import { reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";

const NewPostForm = reduxForm({
  form: "newPost",
})(NewPost);

const MyPosts = ({ posts, addPost }) => {
  function onPostSubmit({ newPost }) {
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
