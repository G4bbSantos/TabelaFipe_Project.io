import axios from 'axios'

export const apiFipeBase = axios.create({
    baseURL: 'https://parallelum.com.br/fipe/api/v1'
    
})