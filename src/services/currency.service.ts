import axios from 'axios'

export async function getCurrency() {
  try {
    const response = await axios.get(
      'https://status.neuralgeneration.com/api/currency',
    )
    return response.data
  } catch (error) {
    console.log('error in currency request request', error)
    return Promise.reject(error)
  }
}
