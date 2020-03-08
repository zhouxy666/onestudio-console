// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './static/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import config from '@/config/config'
import $cookie from 'vue-cookies'

Vue.use(ElementUI)
Vue.use(ElementUI.Loading.directive)
Vue.use($cookie)

Vue.config.productionTip = false

Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$notify = ElementUI.Notification
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$http = initAxios()

/**
 * 配置axios的攔截器
 * @returns {AxiosStatic}
 */
function initAxios() {
  axios.defaults.baseURL = config.hostName
  axios.interceptors.request.use(function (config) {
    const token = $cookie.get('token') || ''
    // 配置基础校验
    config.auth = {
      username: token,
      password: ''
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  return axios
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
