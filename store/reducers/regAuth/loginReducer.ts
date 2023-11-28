import {logAction, loginState, loginTypes, sendCodeTypes, sendState} from "../../../types/loginTypes";


const initialStateLogin : loginState = {
  loadingLogin: true,
  errorLogin: '',
  loginState: '',
}

const initialStateSend : sendState = {
  loadingCode: true,
  errorCode: '',
  token: '',
}

export const loginReducer = (state = initialStateLogin, action : logAction) => {
  switch (action.type) {
    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state, loadingLogin:false, loginState: action.payload
      }
    case loginTypes.LOGIN_ERROR:
      return {
        ...state, errorLogin: action.payload
      }
    default:
      return state
  }
}

export const sendCodeLoginReducer = (state = initialStateSend, action : logAction) => {
  switch (action.type) {
    case sendCodeTypes.SEND_SUCCESS:
      return {
        ...state, loadingCode:false, token: action.payload
      }
    case sendCodeTypes.SEND_ERROR:
      return {
        ...state, errorCode: action.payload
      }
    default:
      return state
  }
}