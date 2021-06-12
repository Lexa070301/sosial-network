import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

let store = {
  _state: {
    ProfilePage: {
      PostsData: [
        {
          id: 1,
          text: "test1",
          likesCount: 23
        },
        {
          id: 2,
          text: "test2",
          likesCount: 11
        },
      ],
      TempTextarea: "",
    },
    DialogsPage: {
      UserDialogData:
          [
            {
              id: 1,
              name: "Andrew"
            },
            {
              id: 2,
              name: "Alexey"
            },
            {
              id: 3,
              name: "Ivan"
            },
            {
              id: 4,
              name: "Masha"
            },
            {
              id: 5,
              name: "Anna"
            },
            {
              id: 6,
              name: "Milena"
            },
          ],

      MessagesData: [
        {
          id: 1,
          text: "Hi"
        },
        {
          id: 2,
          text: "Great job!"
        },
        {
          id: 3,
          text: "Thx!"
        },
      ],
      TempTextarea: "",
    }
  },
  _callSubscriber() {
    console.log('temp')
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) { // {type: 'ADD-POST'}
    this._state.ProfilePage = profileReducer(this._state.ProfilePage, action);
    this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action);
    this._callSubscriber(this._state);
  }
}

export default store;
