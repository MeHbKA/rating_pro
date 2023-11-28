import {addAdvertActions, addAdvertState, clientAdvertsTypes} from "../../types/clientAdvertsTypes";


const initialStateAddAdvert : addAdvertState = {
  loadingAddAdvert: true,
  errorAddAdvert: '',
  addAdvertResult: [],
}

export const addAdvertReducer = (state = initialStateAddAdvert, action : addAdvertActions) => {
  switch (action.type) {
    case clientAdvertsTypes.ADD_ADVERT_SUCCESS:
      return {
        ...state, loadingAddAdvert:false, addAdvertResult: action.payload
      }
    case clientAdvertsTypes.ADD_ADVERT_ERROR:
      return {
        ...state, loadingAddAdvert:false, errorAddAdvert: action.payload
      }
    default:
      return state
  }
}