import {finalizeAction, registerAction, sendCodeAction} from "./registerActions";
import {categoriesAction, getCategoryAction, getSubCategoriesByCategoryIdAction} from "./categoriesActions";
import {searchAction} from "./searchActions";
import {districtsAction} from "./districtsActions";
import {citiesAction} from "./citiesActions";
import {specializationsAction} from "./specializationsActions";
import {addAdvertAction} from "./addAdvertActions";
import {loginAction, sendCodeLoginAction} from "./loginActions";


export default {
    registerAction,
    loginAction,
    sendCodeLoginAction,
    sendCodeAction,
    finalizeAction,
    searchAction,
    categoriesAction,
    getCategoryAction,
    getSubCategoriesByCategoryIdAction,
    citiesAction,
    districtsAction,
    specializationsAction,
    addAdvertAction,
}