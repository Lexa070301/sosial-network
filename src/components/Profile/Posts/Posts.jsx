import React from "react";
import classes from "./Posts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength =  maxLengthCreator(30);

const AddPostForm = (props) => {
  return (
      <form action="" onSubmit={props.handleSubmit} className={classes.new_post}>
        <Field
            className={classes.textarea}
            name="new_post"
            id="new-post"
            placeholder="Новый пост"
            component={Textarea}
            validate={[requiredField, maxLength]}/>
        <button className={"btn " + classes.btn}>
          Add Post
        </button>
      </form>
  )
}

const AddPost = reduxForm({
  form: "AddPost",
})(AddPostForm)

const Posts = React.memo(props => {
  console.log("render")
  let PostsDataElements = props.ProfilePage.PostsData.map(post =>
      <Post key={post.id}
            content={post.text}
            likes={post.likesCount}/>
  );

  const onSubmit = (formData) => {
    props.addPost(formData.new_post)
  }

  return (
      <div className={classes.posts}>
        <h2 className={classes.postsTitle}>My posts</h2>
        <AddPost onSubmit={onSubmit}/>
        {PostsDataElements}
      </div>
  );
});
export default Posts;
