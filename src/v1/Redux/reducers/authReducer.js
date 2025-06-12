import { SET_LOGIN, SET_USER_DETAILS } from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    showLoginPopup: false,
    userDetails: {}
  };

 export default (state = initialState, {type, payload}) =>{
    switch(type){
        case SET_USER_DETAILS:{
            return {
                ...state,
                userDetails: payload
            }
        }
        case SET_LOGIN:{
            return {
                ...state,
                 payload
            }
        }
        default:
            return state
    }

 }
