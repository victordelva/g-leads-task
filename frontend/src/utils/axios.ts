import axios from 'axios'

if (!import.meta.env.VITE_API_URL || typeof import.meta.env.VITE_API_URL !== 'string') {
  throw new Error('VITE_API_URL is not set')
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
