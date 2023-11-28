import {Dispatch} from "react";
import axios from "axios";
import {searchActions, searchTypes} from "../../types/searchTypes";


interface data {
  categoryId: string | number;
  subCategoryId: string | any[];
  cityId: string | number;
  districtId: string | number;
  findBy: string;
}

export const searchAction = ({categoryId, subCategoryId, cityId, districtId, findBy} : data) => {
  return async (dispatch: Dispatch<searchActions>) => {
    try {
      const response = await axios.post(
        'https://api.ratingpro.pl/public/specialist/find/all?offset=0&order=asc&by=id',
        {
          categoryId: categoryId ? categoryId : '',
          subCategoryId: subCategoryId ? subCategoryId : '',
          cityId: cityId ? cityId : '',
          districtId: districtId ? districtId : '',
          findBy: findBy ? findBy : '',
        },
        // {
        //   categoryId: 1,
        //   subCategoryId: 1,
        //   cityId: 2,
        //   districtId: 2,
        //   findBy: '',
        // },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch({type: searchTypes.SEARCH_SUCCESS, payload: response.data.data.rows})
      
    } catch (e) {
      dispatch({
        type: searchTypes.SEARCH_ERROR,
        payload: `Ошибка при поиске ${e}`
      })
    }
  }
}