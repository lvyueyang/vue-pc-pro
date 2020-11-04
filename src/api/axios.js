import axios from 'axios'

let baseURL = '/'

if (process.env.NODE_ENV === 'production') {
    baseURL = ''
}

axios.defaults.baseURL = baseURL

// 请求拦截器
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    return Promise.resolve(response)
}, (error) => {
    return Promise.reject(error)
})

export default axios
