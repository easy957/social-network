import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/profilePicture.webp";
import { NavLink } from "react-router-dom";
import Loader from "../common/Loader";
import Paginator from "../common/Paginator/Paginator";
import { UserType } from "../../redux/types";
import UsersSearch from "./UsersSearch";
import { UsersFilterType } from "../../redux/usersReducer";

type PropsType = {
  handlePageClick: (pageNumber: number, pageSize: number) => void;
  handleFilterChange: (filter: UsersFilterType) => void;
  toggleFollow: (id: number, followed: boolean) => void;
  filter: UsersFilterType;
  users: Array<UserType>;
  currentPage: number;
  isLoading: boolean;
  areFetchingFollow: Array<number>;
  totalUsersCount: number;
  pageSize: number;
};

function Users({
  handlePageClick,
  handleFilterChange,
  toggleFollow,
  users,
  currentPage,
  isLoading,
  areFetchingFollow,
  totalUsersCount,
  pageSize,
  filter,
}: PropsType) {
  function setButtonStatus(id: number) {
    return areFetchingFollow.some((userId) => userId === id);
  }

  return (
    <>
      <Paginator
        handlePageClick={handlePageClick}
        pageSize={pageSize}
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
      />

      <UsersSearch filter={filter} searchUsers={handleFilterChange} />

      <div style={{ position: "relative" }}>
        {isLoading && <Loader />}
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id} className={s.item}>
                <div>
                  <NavLink to={`../profile/${user.id}`}>
                    <img className={s.photo} src={user.photos.small ? user.photos.small : userPhoto} alt="Profile" />
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
