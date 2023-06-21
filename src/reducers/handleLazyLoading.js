
const initialState = false;
function handleLazyLoading(state=initialState,action) {
    switch(action.type) {
    case "RUN_LAZY_LOADING":
       return state=true;
       case "STOP_LAZY_LOADING":
       return state=false
       
   
    default: return state;
   }
}

export default handleLazyLoading;