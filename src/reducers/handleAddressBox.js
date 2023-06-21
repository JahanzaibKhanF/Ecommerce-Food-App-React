const initialState=false;

const handleAddressBox = (state=initialState,action) => {
   switch(action.type){
    case "OPEN_ADDRESS_BOX" : return state = true
case "CLOSE_ADDRESS_BOX" : return state = false
default :
return state
}
};

export default handleAddressBox;