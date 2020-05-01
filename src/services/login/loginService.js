/**
 * Created by fedrtg on 2019/12/15.
 */
import Fetch from '@/lib/fetch'
import CommonService from '@/services/commonService'

class LoginService extends CommonService {
  constructor() {
    super()
    this.fetch = new Fetch()
  }

  /**
   *
   * @param {params:{account:string;secret:string;type:number}}
   * @returns {*}
   */
  login (params) {
    // 获取token
    return this.fetch.post('v1/token', {
      account: params.username,
      secret: params.password,
      type: 100
    })
  }

  /**
   * @param params:{username:string;password1:string;password2:string}
   */
  register (params) {
    return this.fetch.post('/v1/client/register', params)
  }
}

export default new LoginService()
