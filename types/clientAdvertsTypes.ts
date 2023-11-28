

export interface addAdvertState {
  loadingAddAdvert: boolean;
  errorAddAdvert: string;
  addAdvertResult: any[];
}

export enum clientAdvertsTypes {
  ADD_ADVERT_SUCCESS ="ADD_ADVERT_SUCCESS",
  ADD_ADVERT_ERROR = "ADD_ADVERT_ERROR",
}

interface SuccessAddAdvertAction {
  type: clientAdvertsTypes.ADD_ADVERT_SUCCESS,
  payload: any[]
}
interface ErrorAddAdvertAction {
  type: clientAdvertsTypes.ADD_ADVERT_ERROR,
  payload: string
}

export interface addVisitState {
  loadingAddVisit: boolean;
  errorAddVisit: string;
  addVisitResult: any[];
}

export enum clientVisitTypes {
  ADD_VISIT_SUCCESS ="ADD_VISIT_SUCCESS",
  ADD_VISIT_ERROR = "ADD_VISIT_ERROR",
}

interface SuccessAddVisitAction {
  type: clientVisitTypes.ADD_VISIT_SUCCESS,
  payload: any[]
}
interface ErrorAddVisitAction {
  type: clientVisitTypes.ADD_VISIT_ERROR,
  payload: string
}

export type addAdvertActions =
  SuccessAddAdvertAction
  | ErrorAddAdvertAction
  | SuccessAddVisitAction
  | ErrorAddVisitAction