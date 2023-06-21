const initialState = false;

function handleCart(state = initialState,action) {


    switch(action.type)
    {
        case "SLIDE_IN": return state = false
        case "SLIDE_OUT": return state = true
        default : return state
    }
}

export default handleCart;