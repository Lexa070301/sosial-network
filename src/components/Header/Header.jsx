import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {

  const logOut = () => {
    props.logout()
  }

  return (
      <header className={classes.header}>
        <img className={classes.logo} src="logo192.png" alt="Logo"/>
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
