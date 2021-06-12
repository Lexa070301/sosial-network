import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/authReducer";
import {compose} from "redux";


class HeaderAPIComponent extends React.Component {
  render() {
    return (
        <Header userId={this.props.userId}
                email={this.props.email}
                login={this.props.login}
                isAuth={this.props.isAuth}
                logout={this.props.logout}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userId: state.Auth.userId,
    email: state.Auth.email,
    login: state.Auth.login,
    isAuth: state.Auth.isAuth
  }
}


export default compose(
    connect(mapStateToProps,
        {
          logout
        }
    ),
)(HeaderAPIComponent);
