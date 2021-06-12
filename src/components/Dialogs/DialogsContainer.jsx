import {connect} from "react-redux";
import {sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
  return {
    DialogsPage: state.DialogsPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (value) => {
      dispatch(sendMessageActionCreator(value));
    }
  }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);

