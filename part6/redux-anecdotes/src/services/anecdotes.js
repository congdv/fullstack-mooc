import axios from "axios"

const getId = () => (100000 * Math.random()).toFixed(0)
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async(content) => {
  const object = {
    content: content,
    id: getId(),
    votes: 0 
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const update = async(id, updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedObj)
  return response.data
}
export default { getAll, create, update }