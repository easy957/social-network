import s from "./Post.module.css";

function Post({ message, likesCount }) {
  return (
    <li className={s.post}>
      <img
        className={s.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCgYOgHmN5jdz_T0RLYI9BUhR6nYs2fK8NA&usqp=CAU"
        alt="Profile"
      />
      <div className={s.content}>
        <p className={s.text}>{message}</p>
        <p className={s.likes}>{likesCount} likes</p>
      </div>
    </li>
  );
}

export default Post;
