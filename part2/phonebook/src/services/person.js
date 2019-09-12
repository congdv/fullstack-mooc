import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
} 

const create = (personObj) => {
    const request = axios.post(baseURL, personObj);
    return request.then(response => response.data);
}
const update = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`,newPerson);
    return request.then(response => response.data);
}
const deleteAPerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}
export default {getAll, create, update, deleteAPerson};