import {searchActions, searchState, searchTypes} from "../../types/searchTypes";


const initialStateSearch : searchState = {
  loadingSearch: true,
  errorSearch: '',
  searchResult: [],
}

export const searchReducer = (state = initialStateSearch, action : searchActions) => {
  switch (action.type) {
    case searchTypes.SEARCH_SUCCESS:
      return {
        ...state, loadingSearch:false, searchResult: action.payload
      }
    case searchTypes.SEARCH_ERROR:
      return {
        ...state, errorSearch: action.payload
      }
    default:
      return state
  }
}