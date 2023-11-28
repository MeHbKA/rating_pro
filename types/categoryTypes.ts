

export interface categoriesState {
  loadingCategories: boolean;
  errorCategories: string;
  categoriesResult: any[];
}

export interface categoryState {
  loadingCategory: boolean;
  errorCategory: string;
  categoryResult: any[];
}

export interface subCategoriesState {
  loadingSubCategories: boolean;
  errorSubCategories: string;
  subCategoriesResult: any[];
}

export enum categoriesTypes {
  CATEGORIES_SUCCESS ="CATEGORIES_SUCCESS",
  CATEGORIES_ERROR = "CATEGORIES_ERROR",
}

export enum categoryTypes {
  CATEGORY_SUCCESS ="CATEGORY_SUCCESS",
  CATEGORY_ERROR = "CATEGORY_ERROR",
}

export enum subCategoriesTypes {
  SUBCATEGORY_SUCCESS ="SUBCATEGORY_SUCCESS",
  SUBCATEGORY_ERROR = "SUBCATEGORY_ERROR",
}

interface SuccessCategoriesAction {
  type: categoriesTypes.CATEGORIES_SUCCESS,
  payload: any[]
}
interface ErrorCategoriesAction {
  type: categoriesTypes.CATEGORIES_ERROR,
  payload: string
}

interface SuccessCategoryAction {
  type: categoryTypes.CATEGORY_SUCCESS,
  payload: any[]
}
interface ErrorCategoryAction {
  type: categoryTypes.CATEGORY_ERROR,
  payload: string
}
interface SuccessSubCategoriesAction {
  type: subCategoriesTypes.SUBCATEGORY_SUCCESS,
  payload: any[]
}
interface ErrorSubCategoriesAction {
  type: subCategoriesTypes.SUBCATEGORY_ERROR,
  payload: string
}

export type categoriesActions = SuccessCategoriesAction
  | ErrorCategoriesAction
  | SuccessCategoryAction
  | ErrorCategoryAction
  | SuccessSubCategoriesAction
  | ErrorSubCategoriesAction