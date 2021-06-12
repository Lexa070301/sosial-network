import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../common/preloader/Preloader";


const Profile = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader/>
  }
  return (
      <div>
        <ProfileInfo profile={profile}
                     status={status}
                     updateStatus={updateStatus}/>
        <PostsContainer/>
      </div>
  );
}

export default Profile;
