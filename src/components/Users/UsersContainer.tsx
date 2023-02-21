import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { getUsersThunk, toggleFollowThunk } from "../../redux/usersReducer";
import {
  getAreFetchingFollow,
  getCurrentPage,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/usersSelector";
import Users from "./Users";
import { UserType } from "../../redux/types";
import { AppStateType } from "../../redux/redux-store";

class UsersContainer extends React.Component<
  MapStatePropsType & MapDispatchPropsType
> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }
  }

  render() {
    return (
      <>
        <Users
          getCurrentPageUsers={this.props.getUsersThunk}
          toggleFollow={this.props.toggleFollowThunk}
          users={this.props.users}
          currentPage={this.props.currentPage}
          isLoading={this.props.isLoading}
          areFetchingFollow={this.props.areFetchingFollow}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
        />
      </>
    );
  }
}
type MapStatePropsType = {
  users: Array<UserType>;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  areFetchingFollow: Array<number>;
  totalUsersCount: number;
};

type MapDispatchPropsType = {
  getUsersThunk: (currentPage: number, pageSize: number) => void;
  toggleFollowThunk: (id: number, followed: boolean) => void;
};

function mapStateToProps(state: AppStateType): MapStatePropsType {
  return {
    // users: getUsersReselectLib(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    areFetchingFollow: getAreFetchingFollow(state),
  };
}

export default compose(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    {
      getUsersThunk,
      toggleFollowThunk,
    }
  )
)(UsersContainer);
