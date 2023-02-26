import s from "./Users.module.css";
import userPhoto from "../../assets/images/profilePicture.webp";
import { NavLink, useSearchParams } from "react-router-dom";
import Loader from "../common/Loader";
import Paginator from "../common/Paginator/Paginator";
import UsersSearch from "./UsersSearch";
import { UsersFilterType, actions, getUsersThunk, toggleFollowThunk } from "../../redux/usersReducer";
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

  const [searchParams, setSearchParams] = useSearchParams();

  function setButtonStatus(id: number) {
    return areFetchingFollow.some((userId) => userId === id);
  }

  function handlePageClick(page: number, pageSize: number) {
    dispatch<any>(getUsersThunk(page, pageSize, filter));
  }

  function handleFilterChange(filter: UsersFilterType) {
    dispatch<any>(getUsersThunk(1, pageSize, filter));
  }

  // FIRST LOAD

  useEffect(() => {
    if (users.length === 0) {
      dispatch<any>(getUsersThunk(currentPage, pageSize, filter));
    }
  }, [currentPage, dispatch, filter, pageSize, users.length]);

  // BIND STATE TO SEARCH PARAMS

  useEffect(() => {
    searchParams.get("page") && dispatch(actions.setCurrentPage(Number(searchParams.get("page"))));

    let newFilter: UsersFilterType = {
      friend: null,
      term: "",
    };

    if (searchParams.get("term")) {
      newFilter = {
        ...newFilter,
        term: searchParams.get("term") as string,
      };
    }

    if (searchParams.get("friend")) {
      newFilter = {
        ...newFilter,
        friend: searchParams.get("friend") === "null" ? null : searchParams.get("friend") === "true" ? true : false,
      };
    }

    if (searchParams.get("term") ?? searchParams.get("friend")) {
      dispatch(actions.setFilter(newFilter));
    }
  }, [dispatch, searchParams]);

  // BIND SEARCH PARAMS TO STATE

  useEffect(() => {
    setSearchParams((prev) => {
      filter.friend !== null ? prev.set("friend", filter.friend === true ? "true" : "false") : prev.delete("friend");
      filter.term ? prev.set("term", filter.term) : prev.delete("term");
      currentPage !== 1 ? prev.set("page", currentPage.toString()) : prev.delete("page");
      return prev;
    });
  }, [currentPage, filter.friend, filter.term, setSearchParams]);

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
