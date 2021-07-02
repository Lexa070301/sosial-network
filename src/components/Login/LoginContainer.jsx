import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {login} from "../../redux/authReducer";


class LoginAPIComponent extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
        <Login login={this.props.login} isAuth={this.props.isAuth} captchaUrl={this.props.captchaUrl}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    captchaUrl: state.Auth.captchaUrl,
    isAuth: state.Auth.isAuth
  }
}


const LoginContainer= connect(mapStateToProps,
    {
      login
    }
)(LoginAPIComponent);

export default LoginContainer;
