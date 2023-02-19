import axios from 'axios'
const baseUrl = '/api/properties'


const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createProperty = async (newObject, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const createPropertyV2 = async (newObject, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const response = await axios.post(`${baseUrl}/upload`, newObject, config)
    return response.data
}
export default { createProperty, createPropertyV2, getAll }