import userService from "../services/user"

const allUserReducer = (state=[], action) => {
  switch(action.type) {
  case "ALL_USERS":
    return action.data
  default:
    return state
  }
}

export const getAllUserAction = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    dispatch({
      type: "ALL_USERS",
      data: users
    })
  }
}

export default allUserReducer