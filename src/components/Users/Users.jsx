import classes from "./Users.module.css";
import User from "./User/User";
import React from "react";
import Paginator from "../common/Paginator/Paginator";


let Users = ({currentPage, onPageChange, pageSize, totalUsersCount, ...props}) => {
  return (
      <div className={classes.usersList}>
        <Paginator currentPage={currentPage}
                   onPageChange={onPageChange}
                   pageSize={pageSize}
                   totalItemsCount={totalUsersCount}
                   portionSize={10}/>
        <div>
          {
            props.UsersData.map(user =>
                <User key={user.id}
                      name={user.name}
                      photos={user.photos}
                      status={user.status}
                      followed={user.followed}
                      follow={props.follow}
                      unfollow={props.unfollow}
                      userId={user.id}
                      isFollowing={props.isFollowing}
                      setIsFollowing={props.setIsFollowing}/>
            )
          }
        </div>
      </div>
  )
}

export default Users
