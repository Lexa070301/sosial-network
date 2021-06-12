import {auth} from "./authReducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

let initialState = {
  initialized: false
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
}

export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initialize = () => (dispatch) => {
  let dispatchResult = dispatch(auth());
  dispatchResult.then(response => {
        dispatch(setInitializedSuccess());
      }
  )
}
