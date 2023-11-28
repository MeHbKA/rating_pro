

export interface searchState {
  loadingSearch: boolean;
  errorSearch: string;
  searchResult: any[];
}

export enum searchTypes {
  SEARCH_SUCCESS ="SEARCH_SUCCESS",
  SEARCH_ERROR = "SEARCH_ERROR",
}

interface SuccessSearchAction {
  type: searchTypes.SEARCH_SUCCESS,
  payload: any[]
}
interface ErrorSearchAction {
  type: searchTypes.SEARCH_ERROR,
  payload: string
}

export type searchActions = SuccessSearchAction | ErrorSearchAction