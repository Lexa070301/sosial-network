import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import avatar from "../../../assets/images/default-avatar.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader/>
  } else {
    return (
        <div>
          {/*<img className={classes.img}*/}
          {/*     src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"*/}
          {/*     alt="Img"/>*/}
          <div className={classes.info_wrap}>
            <img className={classes.avatar}
                 src={profile.photos.small ? profile.photos.small : avatar}
                 alt="Img"/>
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
