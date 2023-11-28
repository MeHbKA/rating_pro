import {citiesActions, citiesState, citiesTypes} from "../../types/citiesTypes";


const initialStateCities : citiesState = {
  loadingCities: true,
  errorCities: '',
  citiesResult: [],
}

export const citiesReducer = (state = initialStateCities, action : citiesActions) => {
  switch (action.type) {
    case citiesTypes.CITIES_SUCCESS:
      return {
        ...state, loading:false, citiesResult: action.payload
      }
    case citiesTypes.CITIES_ERROR:
      return {
        ...state, error: action.payload
      }
    default:
      return state
  }
}