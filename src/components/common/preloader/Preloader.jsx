import classes from "./Preloader.module.css";

let Preloader = () => {
  return <div className={classes.lds_roller}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}

export default Preloader;
