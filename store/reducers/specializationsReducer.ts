import {specializationsActions, specializationsState, specializationsTypes} from "../../types/specializationsTypes";

const initialStateSpecializations : specializationsState = {
  loadingSpecializations: true,
  errorSpecializations: '',
  specializationsResult: [],
}

export const specializationsReducer = (state = initialStateSpecializations, action : specializationsActions) => {
  switch (action.type) {
    case specializationsTypes.SPECIALIZATIONS_SUCCESS:
      return {
        ...state, loadingSpecializations:false, specializationsResult: action.payload
      }
    case specializationsTypes.SPECIALIZATIONS_ERROR:
      return {
        ...state, errorSpecializations: action.payload
      }
    default:
      return state
  }
}