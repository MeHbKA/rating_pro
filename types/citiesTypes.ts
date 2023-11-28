

export interface citiesState {
  loadingCities: boolean;
  errorCities: string;
  citiesResult: any[];
}

export enum citiesTypes {
  CITIES_SUCCESS ="CITIES_SUCCESS",
  CITIES_ERROR = "CITIES_ERROR",
}

interface SuccessCitiesAction {
  type: citiesTypes.CITIES_SUCCESS,
  payload: any[]
}
interface ErrorCitiesAction {
  type: citiesTypes.CITIES_ERROR,
  payload: string
}

export type citiesActions = SuccessCitiesAction | ErrorCitiesAction