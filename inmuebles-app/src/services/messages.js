import axios from 'axios'

const baseUrl = 'api/messages'

const sendMessage = async (message) => {
    const response = await axios.post(baseUrl, message)
    return response.data
}

const getAllMessages = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { sendMessage, getAllMessages }
