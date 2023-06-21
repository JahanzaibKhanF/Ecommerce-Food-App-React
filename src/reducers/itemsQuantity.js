const initialState = 1;


function itemsQuantity(state = initialState, action) {
    switch (action.type) {
      case "INCREASE":
        return state + 1;
      case "DECREASE":
        if (state==initialState){
return state
        }
        return state - 1;
      default:
        return state; 
    }
  }
  
  export default itemsQuantity;