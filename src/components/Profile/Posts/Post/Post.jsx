import classes from "./Post.module.css";

const Post = (props) => {
  return (
      <div className={classes.item}>
        <img alt={"Avatar"} className={classes.avatar} src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'/>
        <p>
          {props.content}
        </p>
        <span>Likes: {props.likes}</span>
      </div>
  );
}
export default Post;
