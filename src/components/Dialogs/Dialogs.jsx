import classes from "./Dialogs.module.css";
import UserDialog from "./UserDialog/UserDialog";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";


const maxLength = maxLengthCreator(30)

const SendMessage = (props) => {
  return (
      <form action="#" onSubmit={props.handleSubmit} className={classes.sendMessages}>
        <Field
            className={classes.textarea}
            name="send_message"
            id="send-message"
            placeholder="Сообщение..."
            validate={[requiredField, maxLength]}
            component={Textarea}/>
        <button className="btn">
          Send
        </button>
      </form>
  )
}

const SendMessageForm = reduxForm({
  form: "SendMessage",
})(SendMessage)

const Dialogs = (props) => {

  let UserDialogElements = props.DialogsPage.UserDialogData
      .map(user => <UserDialog key={user.id} name={user.name} userId={user.id}/>);

  let MessagesDataElements = props.DialogsPage.MessagesData
      .map(message => <Message key={message.id} text={message.text}/>);


  const sendMessage = (formData) => {
    props.sendMessage(formData.send_message);
  }

  return (
      <div>
        <h2 className={classes.dialogsTitle}>Dialogs</h2>
        <div className={classes.dialogs}>
          <div className={classes.usersScroll}>
            <div className={classes.users}>
              {UserDialogElements}
            </div>
          </div>
          <div className={classes.messagesWrap}>
            <div className={classes.messagesScroll}>
              <div className={classes.messages}>
                {MessagesDataElements}
              </div>
            </div>
            <SendMessageForm onSubmit={sendMessage}/>
          </div>
        </div>
      </div>
  );

}

export default Dialogs;
