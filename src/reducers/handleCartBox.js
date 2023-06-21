const initialState = {isOpen:false,cartData:""};

const switchCartBox = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE":
      return {...state,
      isOpen:false,
    };
      case "OPEN":
      return{
        isOpen:true,
        cartData:action.payload,
      }
    default:
      return state;
  }
};

export default switchCartBox;
