import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/profilePicture.webp";
import { NavLink } from "react-router-dom";
import Loader from "../common/Loader";
import Paginator from "../common/Paginator/Paginator";

function Users({
  getCurrentPageUsers,
  toggleFollow,
  users,
  currentPage,
  isLoading,
  areFetchingFollow,
  totalUsersCount,
  pageSize,
  // setPages,
}) {
  function setButtonStatus(id) {
    return areFetchingFollow.some((userId) => userId === id);
  }

  return (
    <>
      <Paginator
        handlePageClick={getCurrentPageUsers}
        pageSize={pageSize}
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
      />

      <div style={{ position: "relative" }}>
        {isLoading && <Loader />}
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id} className={s.item}>
                <div>
                  <NavLink to={`../profile/${user.id}`}>
                    <img
                      className={s.photo}
                      src={user.photos.small ? user.photos.small : userPhoto}
                      alt="Profile"
                    />
                  </NavLink>
                  <button
                    disabled={setButtonStatus(user.id)}
                    className={s.button}
                    onClick={() => {
                      toggleFollow(user.id, user.followed);
                    }}
                  >
                    {user.followed ? "Unfollow" : "Follow"}
                  </button>
                </div>
                <div className={s.profileInfo}>
                  <p className={s.name}>{user.name}</p>
                  {user.status && <p className={s.status}>{user.status}</p>}
                </div>
                <p>
                  {"user.location.country"}, {"user.location.city"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Users;
