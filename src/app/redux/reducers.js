import { AUTH_USER } from "../constants/action-types";

const initialState = {
    auth_user: null
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
          return { ...state,auth_user:action.payload};
        default:
          return state;
      }
};
  export default rootReducer;