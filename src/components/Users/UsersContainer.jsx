import React from "react";
import {connect} from "react-redux";
import {
  follow,
  setIsFollowing,
  setCurrentPage,
  unfollow, getUsers
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
  getCurrentPage, getIsFollowing,
  getPageSize,
  getPreloader,
  getTotalUsersCount,
  getUsersFromState
} from "../../redux/usersSelectors";


class UsersAPIComponent extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    if (this.props.UsersData.length === 0) {
      this.props.getUsers(currentPage, pageSize);
    }
  }

  onPageChange = (page) => {
    const {setCurrentPage, getUsers} = this.props;
    setCurrentPage(page)
    getUsers(page, this.props.pageSize);
  }

  render() {
    return (
        <>
          {
            this.props.preloader ? <Preloader/> :
                <Users UsersData={this.props.UsersData}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       onPageChange={this.onPageChange}
                       setIsFollowing={this.props.setIsFollowing}
                       preloader={this.props.preloader}
                       isFollowing={this.props.isFollowing}/>
          }
        </>
    )
  }
}

// let mapStateToProps = (state) => {
//   const UsersPage = state.UsersPage
//   return {
//     UsersData: UsersPage.UsersData,
//     pageSize: UsersPage.pageSize,
//     totalUsersCount: UsersPage.totalUsersCount,
//     currentPage: UsersPage.currentPage,
//     preloader: UsersPage.preloader,
//     isFollowing: UsersPage.isFollowing
//   }
// }

let mapStateToProps = (state) => {
  return {
    UsersData: getUsersFromState(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    preloader: getPreloader(state),
    isFollowing: getIsFollowing(state)
  }
}

// функция mapDispatchToProps
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (currentPage) => {
//       dispatch(setCurrentPageAC(currentPage));
//     },
//     setTotalUsersCount: (count) => {
//       dispatch(setTotalUsersCountAC(count));
//     },
//     isLoad: (value) => {
//       dispatch(isLoadAC(value));
//     }
//   }
// }


export default compose(
    connect(mapStateToProps,
        {
          follow,
          unfollow,
          setCurrentPage,
          setIsFollowing,
          getUsers,
        }
    ),
    WithAuthRedirect
)(UsersAPIComponent);

