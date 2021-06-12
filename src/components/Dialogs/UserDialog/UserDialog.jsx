import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const UserDialog = (props) => {
  return (
      <NavLink to={"/dialogs/" + props.userId} activeClassName={classes.active} className={classes.user}>
        <span>{props.name}</span>
      </NavLink>
  );
}


export default UserDialog;
