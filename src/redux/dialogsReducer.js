const SEND_MESSAGE = "dialogs/SEND-MESSAGE";

let initialState = {
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
  ]
}

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case(SEND_MESSAGE):
      return {
        ...state,
        MessagesData: [
          ...state.MessagesData,
          {
            id: state.MessagesData.length + 1,
            text: action.value
          }
        ]
      };
    default:
      return state;
  }
}

export const sendMessageActionCreator = (value) => ({type: SEND_MESSAGE, value});


