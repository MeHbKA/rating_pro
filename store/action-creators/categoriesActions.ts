import {Dispatch} from "react";
import axios from "axios";
import {categoriesActions, categoriesTypes, categoryTypes, subCategoriesTypes} from "../../types/categoryTypes";

export const categoriesAction = () => {
  return async (dispatch: Dispatch<categoriesActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/categories/get/all?offset=0&limit=20&order=asc&by=id',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: categoriesTypes.CATEGORIES_SUCCESS, payload: response.data.data.rows})
      
    } catch (e) {
      dispatch({
        type: categoriesTypes.CATEGORIES_ERROR,
        payload: `Ошибка при получении категорий ${e}`
      })
    }
  }
}

export const getCategoryAction = (id) => {
  return async (dispatch: Dispatch<categoriesActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/categories/get/by/id',
        {
          id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: categoryTypes.CATEGORY_SUCCESS, payload: response.data.data})
      
    } catch (e) {
      dispatch({
        type: categoryTypes.CATEGORY_ERROR,
        payload: `Ошибка при получении категорий ${e}`
      })
    }
  }
}

export const getSubCategoriesByCategoryIdAction = (id) => {
  return async (dispatch: Dispatch<categoriesActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/categories/get/by/id',
        {
          id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: subCategoriesTypes.SUBCATEGORY_SUCCESS, payload: response.data.data.SubCategories})
      
    } catch (e) {
      dispatch({
        type: subCategoriesTypes.SUBCATEGORY_ERROR,
        payload: `Ошибка при получении категорий ${e}`
      })
    }
  }
}