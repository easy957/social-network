import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { UsersFilterType, getUsersThunk, toggleFollowThunk } from "../../redux/usersReducer";
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

class UsersContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, { term: "", friend: null });
    }
  }

  handlePageClick(page: number, pageSize: number) {
    this.props.getUsersThunk(page, pageSize, this.props.filter);
  }

  handleFilterChange(filter: UsersFilterType) {
    this.props.getUsersThunk(1, this.props.pageSize, filter);
  }

  render() {
    return (
      <Users
        handlePageClick={this.handlePageClick.bind(this)}
        handleFilterChange={this.handleFilterChange.bind(this)}
        toggleFollow={this.props.toggleFollowThunk}
        users={this.props.users}
        currentPage={this.props.currentPage}
        isLoading={this.props.isLoading}
        areFetchingFollow={this.props.areFetchingFollow}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        filter={this.props.filter}
      />
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
  filter: UsersFilterType;
};

type MapDispatchPropsType = {
  getUsersThunk: (pageNumber: number, pageSize: number, filter: UsersFilterType) => void;
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
    filter: state.usersPage.filter,
  };
}

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUsersThunk,
    toggleFollowThunk,
  })
)(UsersContainer);
