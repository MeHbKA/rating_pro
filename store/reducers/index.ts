import {combineReducers} from "redux";
import {finalizeReducer, registerReducer, sendCodeReducer} from "./regAuth/registerReducer";
import {HYDRATE} from "next-redux-wrapper";
import {searchReducer} from "./searchReducer";
import {categoriesReducer, categoryReducer, subCategoriesReducer} from "./categoriesReducer";
import {citiesReducer} from "./citiesReducer";
import {districtsReducer} from "./districtsReducer";
import {specializationsReducer} from "./specializationsReducer";
import {addAdvertReducer} from "./addAdvertReducer";
import {loginReducer, sendCodeLoginReducer} from "./regAuth/loginReducer";


const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    sendCode: sendCodeReducer,
    sendCodeLogin: sendCodeLoginReducer,
    finalize: finalizeReducer,
    search: searchReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    subCategoriesByCategoryId: subCategoriesReducer,
    cities: citiesReducer,
    districts: districtsReducer,
    specializations: specializationsReducer,
    addAdvert: addAdvertReducer,
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>