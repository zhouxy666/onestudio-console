/**
 * Created by fedrtg on 2019/12/15.
 */
import axios from 'axios'
import $cookie from 'vue-cookies'

class Fetch {
  constructor(vue) {
    this.vue = vue
    // axios全局设置完毕
    this.headers = {
      'Content-Type': 'application/json'
    }
  }

  get(url, params) {
    const config = this._generateConfig('get', url, params)
    // 发送请求
    return this._request(config)
  };

  post(url, params) {
    const config = this._generateConfig('post', url, params)
    // 发送请求
    return this._request(config)
  };

  put(url, params) {
    const config = this._generateConfig('put', url, params)
    // 发送请求
    return this._request(config)
  };

  delete(url, params) {
    const config = this._generateConfig('delete', url, params)
    // 发送请求
    return this._request(config)
  }

  // 生成配置文件_generateConfig
  _generateConfig(method, url, params, headers) {
    let config = {
      method,
      url,
      headers: this.headers,
      auth: this.auth,
      ...headers
    }
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

    console.log('request config', config)
    return config
  }

  // 发送请求
  _request(config) {
    // 配置axios
    return axios.request(config)
      .then(axiosResponse => {
        if (axiosResponse.status === 200) {
          return axiosResponse.data
        }
      })
      .catch(error => {
        if (!error.response) {
          throw new Error('something error')
        }
        if (error.response.status === 401) {
          // 没有权限
          const errorData = error.response.data
          // console.log(errorData.msg)
          this.vue.$message(`${errorData.msg},3s后请重新登陆`)

          // token不合法的话，3s后跳到login页面
          setTimeout(() => {
            $cookie.remove('token')
            this.vue.$router.push({name: 'login'})
          }, 3000)
        }
        return error
      })
  }
}

export default Fetch
