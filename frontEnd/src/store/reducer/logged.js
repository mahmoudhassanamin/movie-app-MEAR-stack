let INITIAL_VALUE = {
    status : "unAuth"
}

function logged(state = INITIAL_VALUE,action) {
  switch(action.type){
    case "LOGGED_USER":
        return {
            ...state,status:action.payload
        }
    default :
        return state
  }
}

export default logged
