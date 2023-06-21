const initialState =false
 

function handleLoginBox(state=initialState,action) {
  switch(action.type) {
  case "OPEN_LOGIN_BOX" :
    return state = true
    case "CLOSE_LOGIN_BOX":
      return state = false
    
    default:
      return state
  }

}

export default handleLoginBox;