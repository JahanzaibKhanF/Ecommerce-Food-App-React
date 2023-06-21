import switchCartBox from "./handleCartBox"
import itemsQuantity from "./itemsQuantity";
import handleCart from "./handleCart";
import AdditemToCart from "./AdditemToCart";
import handleLoginBox from "./handleLoginBox";
import handleLazyLoading from "./handleLazyLoading";
import handleAddressBox from "./handleAddressBox";

import { combineReducers } from "redux";
const rootReducer = combineReducers({switchCartBox,itemsQuantity,handleCart,AdditemToCart,handleLoginBox,handleLazyLoading,handleAddressBox})
export default rootReducer;
