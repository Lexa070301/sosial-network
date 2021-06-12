import {connect} from "react-redux";
import {addPost} from "../../../redux/profileReducer";
import Posts from "./Posts";


let mapStateToProps = (state) => {
  return {
    ProfilePage: state.ProfilePage,
  }
}

const PostsContainer = connect(mapStateToProps,
    {
      addPost
    })(Posts);

export default PostsContainer;
