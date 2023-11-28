import {
    finalizeState,
    finalizeTypes,
    regAction,
    registerState,
    registrationTypes,
    sendCodeTypes,
    sendState,
} from "../../../types/registationTypes";

const initialStateRegister : registerState = {
    loadingRegister: true,
    errorRegister: '',
    registerState: '',
}

const initialStateSend : sendState = {
    loadingCode: true,
    errorCode: '',
    token: '',
}

const initialStateFinalize : finalizeState = {
    loadingVerify: true,
    errorVerify: '',
}

export const registerReducer = (state = initialStateRegister, action : regAction) => {
    switch (action.type) {
        case registrationTypes.REG_SUCCESS:
            return {
                ...state, loadingRegister:false, registerState: action.payload
            }
        case registrationTypes.REG_ERROR:
            return {
                ...state, errorRegister: action.payload
            }
        default:
            return state
    }
}

export const sendCodeReducer = (state = initialStateSend, action : regAction) => {
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


export const finalizeReducer = (state = initialStateFinalize, action : regAction) => {
    switch (action.type) {
        case finalizeTypes.FINALIZE_SUCCESS:
            return {
                ...state, loading:false,
            }
        case finalizeTypes.FINALIZE_ERROR:
            return {
                ...state, error: action.payload
            }
        default:
            return state
    }
}