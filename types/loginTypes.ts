export interface loginState {
  loadingLogin: boolean;
  errorLogin: string;
  loginState: string | number;
}

export interface sendState {
  loadingCode: boolean;
  errorCode: string;
  token: string;
}

export enum loginTypes {
  LOGIN_SUCCESS ="LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}

interface SuccessLoginAction {
  type: loginTypes.LOGIN_SUCCESS,
  payload: any
}
interface ErrorLoginAction {
  type: loginTypes.LOGIN_ERROR,
  payload: string
}

export enum sendCodeTypes {
  SEND_SUCCESS ="SEND_SUCCESS",
  SEND_ERROR = "SEND_ERROR",
}

interface sendCodeAction {
  type: sendCodeTypes.SEND_SUCCESS,
  payload: string,
}

interface sendCodeError {
  type: sendCodeTypes.SEND_ERROR,
  payload: string,
}

export type logAction = SuccessLoginAction
  | ErrorLoginAction
  | sendCodeAction
  | sendCodeError