/**
 * Created by fedrtg on 2019/12/15.
 */
import config from '@/config/config'
import axios from 'axios'

// import qs from 'qs'

class CommonService {
  constructor() {
    axios.defaults.baseURL = config.hostName
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.request.use(function (config) {
      // if (config.method === 'post') {
      // config.data = qs.stringify(config.data)
      // }
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    axios.interceptors.response.use(function (config) {
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // axios全局设置完毕
    this.axios = axios
    this.config = {}
    this.fetch = this._createFetch()
  }

  // 生成配置文件
  _generateConfig(method, url, params) {
    let config = {method, url}
    if (method.toLowerCase() === 'get') {
      Object.assign(config, {
        params: params
      })
    } else {
      // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
      Object.assign(config, {
        data: params
      })
    }
    return config
  }

  // 发送请求
  _request(config) {
    return this.axios.request(config)
      .then(axiosResponse => {
        if (axiosResponse.status === 200) {
          return axiosResponse.data
        }
      })
      .catch(axiosResponse => {
        return axiosResponse
      })
  }

  // 创建自定义请求方法
  _createFetch() {
    const mapMethod = {
      get: (url, params) => {
        const config = this._generateConfig('get', url, params)
        // 发送请求
        return this._request(config)
      },
      post: (url, params) => {
        const config = this._generateConfig('post', url, params)
        // 发送请求
        return this._request(config)
      },
      put: (url, params) => {
        const config = this._generateConfig('put', url, params)
        // 发送请求
        return this._request(config)
      },
      delete: (url, params) => {
        const config = this._generateConfig('delete', url, params)
        // 发送请求
        return this._request(config)
      }
    }

    return mapMethod
  }
}

export default CommonService
