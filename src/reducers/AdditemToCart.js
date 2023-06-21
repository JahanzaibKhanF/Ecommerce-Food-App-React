
import { useEffect } from "react";
import { firestore } from "../firebase_config";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";




async function fetchUserCart() {
  const userId = localStorage.getItem("userId")
  try {
    
    if (userId) {
      const userCartCollection =collection(firestore,"users",userId,"cartItems")
      const userCartDocRef = doc(userCartCollection, userId);
      const userCartSnap = await getDoc(userCartDocRef);
      if (userCartSnap.exists) {
        const userData = userCartSnap.data();
        const cartItems = userData.cartItems || [];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    }
  } catch (error) {
    console.error("error fetching cart data from firebase", error);
  }
}
fetchUserCart();


// getting data from local storage and setting in initial state of reducer
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

async function updateUserCart(userId, cartItems) {
  const userCartCollection = collection(firestore, "users", userId, "cartItems");
  await setDoc(doc(userCartCollection, userId), { cartItems: [...cartItems] });
}



function AdditemToCart(state = initialState, action) {
  const userId = localStorage.getItem("userId");
 

  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return state;
      } else {
        const updatedCartItemsAdd = [...state.cartItems, newItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsAdd));
        updateUserCart(userId, updatedCartItemsAdd); // Update Firebase cart items
        return {
          ...state,
          cartItems: updatedCartItemsAdd,
        };
      }

    case "DECREASE":
      const decreasedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(decreasedCartItems));
      updateUserCart(userId, decreasedCartItems); // Update Firebase cart items
      return {
        ...state,
        cartItems: decreasedCartItems,
      };

    case "INCREASE":
      const increasedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(increasedCartItems));
      updateUserCart(userId, increasedCartItems); // Update Firebase cart items
      return {
        ...state,
        cartItems: increasedCartItems,
      };

    case "DELETE":
      const updatedCartItemsDelete = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCartItemsDelete)
      );
      updateUserCart(userId, updatedCartItemsDelete); // Update Firebase cart items
      return {
        ...state,
        cartItems: updatedCartItemsDelete,
      };

    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      updateUserCart(userId, []); // Clear Firebase cart items
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

export default AdditemToCart;
