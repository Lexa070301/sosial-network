import classes from "./Aside.module.css";
import {
  NavLink
} from "react-router-dom";

const Aside = () => {
  return (
      <aside className={classes.aside}>
        <nav className={classes.nav}>
          <ul className={classes.menu}>
            <li className={classes.item}>
              <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
  );
}
export default Aside;
