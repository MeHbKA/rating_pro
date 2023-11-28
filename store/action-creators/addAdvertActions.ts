import {Dispatch} from "react";
import axios from "axios";
import {addAdvertActions, clientAdvertsTypes, clientVisitTypes} from "../../types/clientAdvertsTypes";

export const addAdvertAction = (title:string, description:string, categoryId:number, cityId:number, districtId:number, isEnabled:boolean, token:string|null) => {
  return async (dispatch: Dispatch<addAdvertActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/private/client/instruments/adverts/create',
        {
          "title": title,
          "description": description,
          "categoryId": categoryId,
          "cityId" : cityId,
          "districtId": districtId,
          "isEnabled" : isEnabled,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        }
      )
      dispatch({type: clientAdvertsTypes.ADD_ADVERT_SUCCESS, payload: response.data})
    } catch (e) {
      dispatch({
        type: clientAdvertsTypes.ADD_ADVERT_ERROR,
        payload: `Ошибка при добавлении обьявления ${e}`
      })
      console.log(e)
    }
  }
}

export const addVisitAction = (id:number, reason:string, visitAt, isVisited, visitedAt, token:string|null) => {
  return async (dispatch: Dispatch<addAdvertActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/private/client/instruments/adverts/visits/add',
        {
          "id": 1,
          "reason": reason,
          "visitAt": visitAt,
          "isVisited" : isVisited ? isVisited : false,
          "visitedAt": visitedAt ? visitedAt : '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        }
      )
      dispatch({type: clientVisitTypes.ADD_VISIT_SUCCESS, payload: response.data})
      console.log(response)
    } catch (e) {
      dispatch({
        type: clientVisitTypes.ADD_VISIT_ERROR,
        payload: `Ошибка при добавлении обьявления ${e}`
      })
    }
  }
}