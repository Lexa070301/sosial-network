import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import avatar from "../../../assets/images/default-avatar.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto}) => {
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
          {/*<img className={classes.img}*/}
          {/*     src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"*/}
          {/*     alt="Img"/>*/}
          <div className={classes.info_wrap}>
            <label htmlFor="load-avatar">
              <img className={classes.avatar}
                   src={profile.photos.small ? profile.photos.small : avatar}
                   alt="Img"/>
              {
                isOwner && <input id={"load-avatar"} type={"file"} onChange={onAvatarSelected}/>
              }
            </label>
            <div className={classes.info}>
              <span className={classes.name}>
                {profile.fullName}
              </span>
              <p className={classes.description}>
                {profile.aboutMe}
              </p>
              <ProfileStatusWithHooks status={status}
                                      updateStatus={updateStatus}/>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileInfo;
