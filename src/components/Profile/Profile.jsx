import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../common/preloader/Preloader";


const Profile = ({profile, isOwner, status, updateStatus, savePhoto}) => {
  if (!profile) {
    return <Preloader/>
  }
  return (
      <div>
        <ProfileInfo profile={profile}
                     isOwner={isOwner}
                     status={status}
                     updateStatus={updateStatus}
                     savePhoto={savePhoto}/>
        <PostsContainer/>
      </div>
  );
}

export default Profile;
