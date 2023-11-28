import {Dispatch} from "react";
import axios from "axios";
import {logAction, loginTypes, sendCodeTypes} from "../../types/loginTypes";

export const loginAction = (phone) => {
  return async (dispatch: Dispatch<logAction>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/user/login/request',
        {
          phone: phone,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      dispatch({type: loginTypes.LOGIN_SUCCESS, payload: phone})
      
    } catch (e) {
      dispatch({
        type: loginTypes.LOGIN_ERROR,
        payload: `Ошибка при регистации ${e}`
      })
    }
  }
}

export const sendCodeLoginAction = (phone, code) => {
  return async (dispatch: Dispatch<logAction>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/user/login/verify',
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