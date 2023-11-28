import {registrationTypes, regAction, sendCodeTypes, finalizeTypes} from "../../types/registationTypes";
import {Dispatch} from "react";
import axios from "axios";

export const registerAction = (phone) => {
    return async (dispatch: Dispatch<regAction>) => {
        try {
            const response = await axios.post(
                'https://api.ratingpro.pl/public/user/registration/request',
                {
                    phone: phone,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch({type: registrationTypes.REG_SUCCESS, payload: phone})

        } catch (e) {
            dispatch({
                type: registrationTypes.REG_ERROR,
                payload: `Ошибка при регистации ${e}`
            })
        }
    }
}

export const sendCodeAction = (phone, code) => {
    return async (dispatch: Dispatch<regAction>) => {
        try {
            const response = await axios.post(
              'https://api.ratingpro.pl/public/user/registration/verify',
              {
                  phone: phone,
                  code: code,
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
            )
            localStorage.setItem('token', response.data.data.token)
            dispatch({type: sendCodeTypes.SEND_SUCCESS, payload: response.data.data.token})
            
        } catch (e) {
            dispatch({
                type: sendCodeTypes.SEND_ERROR,
                payload: `Ошибка при отправке кода ${e}`
            })
        }
    }
}


export const finalizeAction = (values, token) => {
    return async (dispatch: Dispatch<regAction>) => {
        try {
            const response = await axios.post(
              'https://api.ratingpro.pl/private/client/registration/finalize',
              {
                  firstName: values.name,
                  lastName: values.surname,
                  birthday: values.date,
                  email: values.email,
                  password: values.password
                  
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`,
                },
              }
            )
            dispatch({ type: finalizeTypes.FINALIZE_SUCCESS })
            
        } catch (e) {
            dispatch({
                type: finalizeTypes.FINALIZE_ERROR,
                payload: `Ошибка при отправке кода ${e}`
            })
        }
    }
}