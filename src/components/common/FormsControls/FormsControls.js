import classes from "./FormsControls.module.css";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children, ...props}) => {
  const hasError = touched && error;
  return (
      <div className={classes.formControl + " " + (hasError ? classes.error : null)}>
        {children}
        {hasError && <span>{error}</span>}
      </div>
  )
}

export const Textarea = (props) => {
  const {input, meta, child, ...restProps} = props
  return (
      <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
  )
}


export const Input = (props) => {
  const {input, meta, child, ...restProps} = props
  return (
      <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}

export const createField = (placeholder, name, type, validators, component, props) => {
  return (
      <div>
        <Field name={name}
               type={type}
               validate={validators}
               placeholder={placeholder}
               component={component}
               {...props}
        />
      </div>
  )
}