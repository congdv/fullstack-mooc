

const filterReducer = (state="", action) => {
  console.log(state)
  switch(action.type) {
    case "FILTER":
      return action.data
    default:
      return null
  }
}

export const filterAction = (keyword) => {
  return {
    type:"FILTER",
    data: keyword
  }
}
export default filterReducer