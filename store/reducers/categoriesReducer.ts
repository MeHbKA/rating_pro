import {
  categoriesActions,
  categoriesState,
  categoriesTypes,
  categoryState,
  categoryTypes,
  subCategoriesState,
  subCategoriesTypes
} from "../../types/categoryTypes";


const initialStateCategories : categoriesState = {
  loadingCategories: true,
  errorCategories: '',
  categoriesResult: [],
}

export const categoriesReducer = (state = initialStateCategories, action : categoriesActions) => {
  switch (action.type) {
    case categoriesTypes.CATEGORIES_SUCCESS:
      return {
        ...state, loadingCategories:false, categoriesResult: action.payload
      }
    case categoriesTypes.CATEGORIES_ERROR:
      return {
        ...state, loadingCategories:false, errorCategories: action.payload
      }
    default:
      return state
  }
}

const initialStateCategory : categoryState = {
  loadingCategory: true,
  errorCategory: '',
  categoryResult: [],
}

export const categoryReducer = (state = initialStateCategory, action : categoriesActions) => {
  switch (action.type) {
    case categoryTypes.CATEGORY_SUCCESS:
      return {
        ...state, loadingCategory:false, categoryResult: action.payload
      }
    case categoryTypes.CATEGORY_ERROR:
      return {
        ...state, loadingCategories:false, errorCategories: action.payload
      }
    default:
      return state
  }
}

const initialStateSubCategories : subCategoriesState = {
  loadingSubCategories: true,
  errorSubCategories: '',
  subCategoriesResult: [],
}


export const subCategoriesReducer = (state = initialStateSubCategories, action : categoriesActions) => {
  switch (action.type) {
    case subCategoriesTypes.SUBCATEGORY_SUCCESS:
      return {
        ...state, loadingSubCategories:false, subCategoriesResult: action.payload
      }
    case subCategoriesTypes.SUBCATEGORY_ERROR:
      return {
        ...state, loadingCategories:false, errorSubCategories: action.payload
      }
    default:
      return state
  }
}