import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import allUserReducer from "./reducers/allUserReducer"
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedUser: userReducer.userLoginReducer,
  selectedUser: userReducer.userReducer,
  users: allUserReducer,
})

const store = createStore(reducer,  composeWithDevTools(applyMiddleware(thunk)))

export default store