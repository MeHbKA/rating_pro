import {districtsActions, districtsState, districtsTypes} from "../../types/districtsTypes";

const initialStateDistricts : districtsState = {
  loadingDistricts: true,
  errorDistricts: '',
  districtsResult: [],
}

export const districtsReducer = (state = initialStateDistricts, action : districtsActions) => {
  switch (action.type) {
    case districtsTypes.DISTRICTS_SUCCESS:
      return {
        ...state, loading:false, districtsResult: action.payload
      }
    case districtsTypes.DISTRICTS_ERROR:
      return {
        ...state, error: action.payload
      }
    default:
      return state
  }
}