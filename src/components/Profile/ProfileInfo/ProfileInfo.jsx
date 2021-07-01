import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import avatar from "../../../assets/images/default-avatar.jpg"
import React, {useState} from "react";
import {ProfileData} from "./ProfileData";
import {ReduxProfileForm} from "./ProfileForm";


const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    })
  }

  if (!profile) {
    return <Preloader/>
  } else {
    const onAvatarSelected = (e) => {
      if (e.target.files.length) {
        savePhoto(e.target.files[0]);
      }
    }

    return (
        <div>
          <div className={classes.info_wrap}>
            <label htmlFor="load-avatar" className={classes.load_avatar}>
              <img className={classes.avatar}
                   src={profile.photos.small ? profile.photos.small : avatar}
                   alt="Img"/>
              {
                isOwner && <input id={"load-avatar"} type={"file"} onChange={onAvatarSelected}/>
              }
            </label>
            {
              editMode ?
                  <ReduxProfileForm initialValues={profile}
                                    profile={profile}
                                    onSubmit={onSubmit}/> :
                  <ProfileData profile={profile}
                               status={status}
                               updateStatus={updateStatus}
                               isOwner={isOwner}
                               editMode={editMode}
                               setEditMode={setEditMode}/>
            }
          </div>
        </div>
    );
  }
}

export default ProfileInfo;
