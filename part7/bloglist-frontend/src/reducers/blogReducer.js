import blogService from "../services/blogs"

const blogReducer = (state=[], action) => {
  switch(action.type){
  case "NEW_BLOG":
    return [...state,action.data]
  case "INIT_BLOGS":
    return action.data
  case "DELETE_BLOG":
    return state.filter(blog => action.data.id !== blog.id)
  case "UPDATE_BLOG": {
    let newState = [...state]
    newState.forEach((blog, index) => {
      if(blog.id === action.data.id) {
        newState[index] = action.data
      }
    })
    return newState
  }
  default:
    return state
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: "NEW_BLOG",
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    })
  }
}


export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: "DELETE_BLOG",
      data: blog
    })
  }
}
export const updateBlog = (blog,newObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id,newObject)
    dispatch ({
      type: "UPDATE_BLOG",
      data: updatedBlog
    })
  }
}
export default blogReducer