/**
 * Created by fedrtg on 2019/12/15.
 */
import config from '@/config/config'
import axios from 'axios'

class CommonService {
  constructor () {
    axios.defaults.baseURL = config.hostName
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    this.axios = axios
  }
}

export default CommonService
