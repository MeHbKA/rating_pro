import {Dispatch} from "react";
import axios from "axios";
import {specializationsActions, specializationsTypes} from "../../types/specializationsTypes";



export const specializationsAction = () => {
  return async (dispatch: Dispatch<specializationsActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/specializations/get/all?offset=0&order=desc&by=id',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: specializationsTypes.SPECIALIZATIONS_SUCCESS, payload: response.data.data.rows})
      
    } catch (e) {
      dispatch({
        type: specializationsTypes.SPECIALIZATIONS_ERROR,
        payload: `Ошибка при поиске ${e}`
      })
    }
  }
}