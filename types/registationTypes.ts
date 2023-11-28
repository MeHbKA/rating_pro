export interface registerState {
    loadingRegister: boolean;
    errorRegister: string;
    registerState: string | number;
}

export interface sendState {
    loadingCode: boolean;
    errorCode: string;
    token: string;
}

export interface finalizeState {
    loadingVerify: boolean;
    errorVerify: string;
}

export enum registrationTypes {
    REG_SUCCESS ="REG_SUCCESS",
    REG_ERROR = "REG_ERROR",
}

interface SuccessRegAction {
    type: registrationTypes.REG_SUCCESS,
    payload: any
}
interface ErrorRegAction {
    type: registrationTypes.REG_ERROR,
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

export enum finalizeTypes {
    FINALIZE_SUCCESS ="FINALIZE_SUCCESS",
    FINALIZE_ERROR = "VERIFY_ERROR",
}

interface finalizeAction {
    type: finalizeTypes.FINALIZE_SUCCESS,
}

interface finalizeError {
    type: finalizeTypes.FINALIZE_ERROR,
    payload: string,
}

export type regAction = SuccessRegAction
  | ErrorRegAction
  | sendCodeAction
  | sendCodeError
  | finalizeAction
  | finalizeError