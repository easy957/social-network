import s from "./Users.module.css";
import userPhoto from "../../assets/images/profilePicture.webp";
import { NavLink } from "react-router-dom";
import Loader from "../common/Loader";
import Paginator from "../common/Paginator/Paginator";
import UsersSearch from "./UsersSearch";
import { UsersFilterType, getUsersThunk, toggleFollowThunk } from "../../redux/usersReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAreFetchingFollow,
  getCurrentPage,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/usersSelector";
import { useEffect } from "react";

function UsersPage() {
  const dispatch = useDispatch();

  const users = useSelector(getUsers);
  const currentPage = useSelector(getCurrentPage);
  const isLoading = useSelector(getIsLoading);
  const filter = useSelector(getUsersFilter);
  const areFetchingFollow = useSelector(getAreFetchingFollow);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);

  function setButtonStatus(id: number) {
    return areFetchingFollow.some((userId) => userId === id);
  }

  function handlePageClick(page: number, pageSize: number) {
    dispatch<any>(getUsersThunk(page, pageSize, filter));
  }

  function handleFilterChange(filter: UsersFilterType) {
    dispatch<any>(getUsersThunk(1, pageSize, filter));
  }

  useEffect(() => {
    if (users.length === 0) {
      dispatch<any>(getUsersThunk(currentPage, pageSize, filter));
    }
  }, [currentPage, dispatch, filter, pageSize, users.length]);

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
                      dispatch<any>(toggleFollowThunk(user.id, user.followed));
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

export default UsersPage;
