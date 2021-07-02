import './App.css';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch
} from "react-router-dom";
import Aside from "./components/Aside/Aside";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import React, {Component} from "react";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initialize} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/reduxStore";
import Swal from 'sweetalert2'

const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));


class App extends Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    Swal.fire({
      title: 'Error!',
      text: promiseRejectionEvent,
      icon: 'error',
      confirmButtonText: ':('
    })
  }

  componentDidMount() {
    if (!this.props.initialized) {
      this.props.initialize();
    }
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return (<Preloader/>);
    }
    return (
        <div className="main-grid">
          <HeaderContainer/>
          <Aside/>
          <main className="main">
            <Switch>
              <Route exact path="/">
                <Redirect to={"/profile"}/>
              </Route>
              <Route path="/profile/:userId?">
                <React.Suspense fallback={<Preloader/>}>
                  <ProfileContainer/>
                </React.Suspense>
              </Route>
              <Route path="/dialogs">
                <React.Suspense fallback={<Preloader/>}>
                  <DialogsContainer/>
                </React.Suspense>
              </Route>
              <Route path="/users">
                <UsersContainer/>
              </Route>
              <Route path="/news">
                <News/>
              </Route>
              <Route path="/music">
                <Music/>
              </Route>
              <Route path="/settings">
                <Settings/>
              </Route>
              <Route path="/login">
                <LoginContainer/>
              </Route>
              <Route path="*">
                <div>404 PAGE NOT FOUND</div>
              </Route>
            </Switch>
          </main>
        </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    userId: state.Auth.userId,
    initialized: state.App.initialized
  }
}


export let AppContainer = compose(
    connect(mapStateToProps,
        {
          initialize
        }
    ),
)(App);


export let MainApp = (props) => {
  return (
      <Router>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </Router>
  );
}

