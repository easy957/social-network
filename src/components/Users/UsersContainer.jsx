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

class UsersContainer extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsersThunk(1, this.props.pageSize);
    }
  }

  // getPages() {
  //   let totalPages = Math.ceil(
  //     this.props.totalUsersCount / this.props.pageSize
  //   );
  //   let pages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     if (pages.length < 200) {
  //       pages.push(i);
  //     }
  //   }
  //   return pages;
  // }

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
          // setPages={this.getPages.bind(this)}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
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
  connect(mapStateToProps, {
    getUsersThunk,
    toggleFollowThunk,
  })
)(UsersContainer);
