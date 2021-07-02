import classes from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";

const Contact = ({contactTitle, contactValue}) => {
  return (
      <>
        {
          contactValue &&
          <a href={contactValue} className={classes.contactLink}>
            {contactTitle}
          </a>
        }
      </>
  )
}


export const ProfileData = ({profile, status, updateStatus, isOwner, editMode, setEditMode}) => {
  return (
      <div className={classes.info}>
        <div>
          <span className={classes.name}>
            {profile.fullName}
          </span>
        </div>
        <div>
          <span>
            <b>
              Looking for a job:
            </b>
            {profile.lookingForAJob ? " Yes" : " No"}
          </span>
        </div>
        {profile.lookingForAJob &&
        <div>
          <span>
            <b>
              My professional skills:&nbsp;
            </b>
            {profile.lookingForAJobDescription}
          </span>
        </div>
        }
        <div>
          <p className={classes.description}>
            {profile.aboutMe}
          </p>
        </div>
        {profile.contacts &&
        <div>
          <span>
            <b>
              Contacts:&nbsp;
            </b>
            {
              Object.keys(profile.contacts).map(key =>
                  <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>
              )
            }
          </span>
        </div>
        }
        <div>
          <b>Статус:</b>
          <ProfileStatusWithHooks status={status}
                                  updateStatus={updateStatus}/>
        </div>
        {
          isOwner && !editMode &&
          <button className={"btn " + classes.btn} onClick={() => setEditMode(true)}>
            Edit info
          </button>
        }
      </div>
  )
}