import React from "react";
import classes from "./ProfileInfo.module.css";
import form_classes from "../../common/FormsControls/FormsControls.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileForm = ({handleSubmit, profile, error}) => {
  return (
      <form method={"post"} className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.form_item}>
          <span>
            <b>
              Full name:
            </b>
            {createField("Full name", "fullName", "text", [], Input)}
          </span>
        </div>
        <div className={classes.form_item}>
          <span>
            <b>
              Looking for a job:
            </b>
            {createField("", "lookingForAJob", "checkbox", [], Input)}
          </span>
        </div>
        <div className={classes.form_item}>
          <span>
            <b>
              My professional skills:
            </b>
            {createField("Your skills", "lookingForAJobDescription", "", [], Textarea)}
          </span>
        </div>
        <div className={classes.form_item}>
          <span>
            <b>
              About me:
            </b>
            {createField("About you", "aboutMe", "", [], Textarea)}
          </span>
        </div>
        <div className={classes.form_item}>
          <span>
            <b>
              Contacts:
            </b>
            {
              Object.keys(profile.contacts).map(key =>
                  <div className={classes.form_item} key={key}>
                    <span>
                      <b>
                        {key}:
                      </b>
                      {createField(key, `contacts.${key}`, "text", [], Input)}
                    </span>
                  </div>
              )
            }
          </span>
        </div>
        {
          error &&
          <div className={form_classes.formSummaryError}>
            <span>{error}</span>
          </div>
        }
        <button className={"btn " + classes.btn} type={"submit"}>
          Save
        </button>
      </form>
  )
}

export const ReduxProfileForm = reduxForm({
  form: "edit-profile",
})(ProfileForm)