

export interface specializationsState {
  loadingSpecializations: boolean;
  errorSpecializations: string;
  specializationsResult: any[];
}

export enum specializationsTypes {
  SPECIALIZATIONS_SUCCESS ="SPECIALIZATIONS_SUCCESS",
  SPECIALIZATIONS_ERROR = "SPECIALIZATIONS_ERROR",
}

interface SuccessSpecializationsAction {
  type: specializationsTypes.SPECIALIZATIONS_SUCCESS,
  payload: any[]
}
interface ErrorSpecializationsAction {
  type: specializationsTypes.SPECIALIZATIONS_ERROR,
  payload: string
}

export type specializationsActions = SuccessSpecializationsAction | ErrorSpecializationsAction