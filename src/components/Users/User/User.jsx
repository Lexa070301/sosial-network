import classes from "../Users.module.css";
import default_avatar from "../../../assets/images/default-avatar.jpg"
import React from "react";
import {NavLink} from "react-router-dom";

const User = ({id, userId, photos, followed, isFollowing, unfollow, follow, name, status}) => {
  return (
      <div key={id}>
        <div className={classes.usersItem}>
          <NavLink to={"/profile/" + userId}>
            <img alt={"Avatar"} className={classes.avatar}
                 src={photos.small != null ?
                     photos.small :
                     default_avatar}/>
          </NavLink>
          {
            followed ?
                <button disabled={isFollowing.some(id => id === userId)}
                        onClick={() => {
                          unfollow(userId)
                        }}>Unfollow</button> :
                <button disabled={isFollowing.some(id => id === userId)}
                        onClick={() => {
                          follow(userId)
                        }}>Follow</button>
          }
          <span>{name}</span>
          <span>{status}</span>
        </div>
      </div>
  );
}

export default User;
