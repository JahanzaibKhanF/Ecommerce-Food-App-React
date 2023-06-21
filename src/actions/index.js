// action for opening / closeing cart box
export const openCartBox =(data)=>{
    return{type:"OPEN",
payload:data}}
export const closeCartBox =()=>{return{type:"CLOSE"}}

// action for  + 0r - product in cart box/cart 
export const increaseItem =(itemId)=>{return {type:"INCREASE" ,payload: itemId}}
export const decreaseItem =(itemId)=>{return {type:"DECREASE",payload: itemId}}
// action for deleting item in cart
export const deleteItem =(itemId)=>{return {type:"DELETE", payload:itemId}}

// action for (sliding/swiping) cart 

export const openCart =()=>{
    return {type:"SLIDE_OUT"}}
export const closeCart =()=>{return {type:"SLIDE_IN"}}

// action for sending item from cartbox to to cart
export const addItemToCart =(itemData)=>{
    return {type:"ADD_TO_CART",
payload:itemData}
}
export const clearCart=()=>{return {type:"CLEAR_CART"}}

// for opening/closing login box and OTP box
export const openLoginBox=()=>{return {type:"OPEN_LOGIN_BOX"}}
export const closeLoginBox=()=>{return {type:"CLOSE_LOGIN_BOX"}}

// for full screen lazy loading
export const    RunLazyLoading =()=>{return {type:"RUN_LAZY_LOADING"}}
export const    STOPLazyLoading =()=>{return {type:"STOP_LAZY_LOADING"}}

//for closing or opeing address box
export const openAddressBox =()=>{return{type:"OPEN_ADDRESS_BOX"}}
export const closeAddressBox =()=>{return{type:"CLOSE_ADDRESS_BOX"}}
