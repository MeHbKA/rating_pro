

export interface districtsState {
  loadingDistricts: boolean;
  errorDistricts: string;
  districtsResult: any[];
}

export enum districtsTypes {
  DISTRICTS_SUCCESS ="DISTRICTS_SUCCESS",
  DISTRICTS_ERROR = "DISTRICTS_ERROR",
}

interface SuccessDistrictsAction {
  type: districtsTypes.DISTRICTS_SUCCESS,
  payload: any[]
}
interface ErrorDistrictsAction {
  type: districtsTypes.DISTRICTS_ERROR,
  payload: string
}

export type districtsActions = SuccessDistrictsAction | ErrorDistrictsAction