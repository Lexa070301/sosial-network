import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileInfo, getStatus, updateStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export class ProfileAPIContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.MyUserId;
    }
    this.props.getProfileInfo(userId);
    this.props.getStatus(userId);
  }

  render() {
    return (
        <Profile {...this.props}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
    status: state.ProfilePage.status,
    MyUserId: state.Auth.userId,
    isAuth: state.Auth.isAuth
  }
}


export default compose(
    connect(mapStateToProps,
        {
          getProfileInfo,
          getStatus,
          updateStatus
        }
    ),
    withRouter,
    WithAuthRedirect
)(ProfileAPIContainer);
