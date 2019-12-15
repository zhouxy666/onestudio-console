/**
 * Created by fedrtg on 2019/12/15.
 */
import CommonService from '@/services/commonService'

class LoginService extends CommonService {
  login () {
    this.axios('/v1/user/get', function (data) {
      console.log(data)
    })
  }
}

export default new LoginService()
