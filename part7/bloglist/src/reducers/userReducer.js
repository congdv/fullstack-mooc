import userService from "../services/user"

const userLoginReducer = (state=null, action) => {
  switch(action.type) {
  case "LOG_IN":
    return action.data
  default:
    return state
  }
}


const userReducer = (state=null, action) => {
  switch(action.type) {
  case "SELECT_USER":
    return action.data
  default:
    return state
  }
}

export const loginAction = ( user ) => {
  return async dispatch => {
    dispatch({
      type: "LOG_IN",
      data: user
    })
  }
}

export const selectUserAction = (id) => {
  return async dispatch => {
    const user = await userService.getUser(id)
    console.log(user)
    dispatch({
      type: "SELECT_USER",
      data: user
    })
  }
}




export default { userReducer, userLoginReducer }
