import {Dispatch} from "react";
import axios from "axios";
import {districtsActions, districtsTypes} from "../../types/districtsTypes";

export const districtsAction = (cityId) => {
  return async (dispatch: Dispatch<districtsActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/districts/get/by/city/id',
        {
          id: cityId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: districtsTypes.DISTRICTS_SUCCESS, payload: response.data.data})
      
    } catch (e) {
      dispatch({
        type: districtsTypes.DISTRICTS_ERROR,
        payload: `Ошибка при получении района ${e}`
      })
    }
  }
}