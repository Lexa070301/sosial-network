import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

import logo from "../../logo.svg"

const Header = (props) => {

  const logOut = () => {
    props.logout()
  }

  return (
      <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="Logo"/>
        <div className={classes.loginBlock}>
          {
            props.isAuth ?
                <div>
                  {props.login}
                  <button onClick={logOut}>Log out</button>
                </div> :
                <NavLink to={"/login"}>Log In</NavLink>
          }
        </div>
      </header>
  );
}

export default Header;
