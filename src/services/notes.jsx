import axios from "axios"
//const baseUrl = "http://localhost:3001/api/notes"
const baseUrl = "/api/notes"
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
//     const nonExisting = {
//         id: 10000,
//         content: "This note is not saved to sever",
//         date: "2019-05-30T17:30:31.098Z",
//         important: true
//     }
//     return axios.get(baseUrl).then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {getAll, create, update}
