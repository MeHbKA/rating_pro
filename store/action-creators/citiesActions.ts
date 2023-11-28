import {Dispatch} from "react";
import axios from "axios";
import {citiesActions, citiesTypes} from "../../types/citiesTypes";

export const citiesAction = () => {
  return async (dispatch: Dispatch<citiesActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/cities/get/all?offset=0&order=asc&by=id',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: citiesTypes.CITIES_SUCCESS, payload: response.data.data.rows})
      
    } catch (e) {
      dispatch({
        type: citiesTypes.CITIES_ERROR,
        payload: `Ошибка при получении города ${e}`
      })
    }
  }
}