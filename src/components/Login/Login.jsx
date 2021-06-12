import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {Redirect} from "react-router";
import classes from "../common/FormsControls/FormsControls.module.css";

const LoginForm = ({handleSubmit, error}) => {
  return (
      <form action="" onSubmit={handleSubmit}>
        {
          createField("Email", "email", "email", [requiredField], Input)
        }
        {
          createField("Password", "password", "password", [requiredField], Input)
        }
        {
          createField("", "rememberMe", "checkbox", [], Input)
        }
        <span>remember me</span>
        {
          error &&
          <div className={classes.formSummaryError}>
            <span>{error}</span>
          </div>
        }

        <div>
          <button>Log in</button>
        </div>
      </form>
  )
}

const ReduxLoginForm = reduxForm({
  form: "Login",
})(LoginForm)

const Login = (props) => {

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return (
      <div>
        <h1>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit}/>
      </div>
  )
}

export default Login;
