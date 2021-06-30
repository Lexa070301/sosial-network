import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileInfo, getStatus, savePhoto, updateStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export class ProfileAPIContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.MyUserId;
    }
    this.props.getProfileInfo(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId != this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
        <Profile {...this.props}
                 isOwner={!this.props.match.params.userId}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}
                 savePhoto={this.props.savePhoto}/>
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
          updateStatus,
          savePhoto
        }
    ),
    withRouter,
    WithAuthRedirect
)(ProfileAPIContainer);
