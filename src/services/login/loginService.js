/**
 * Created by fedrtg on 2019/12/15.
 */
import CommonService from '@/services/commonService'

class LoginService extends CommonService {
  login() {
    this.axios.get('/v1/client/register').then(data => {
      console.log(data)
    }).catch(response => {
      console.log(response)
    })
  }

  /**
   * @param params:{username:string;password1:string;password2:string}
   */
  register(params) {
    // this.axios.post('/v1/client/register', params).then(data => {
    //   console.log(data)
    // }).catch(response => {
    //   console.log(response)
    // })

    return this.fetch.post('/v1/client/register', params)
    //   .then(data => {
    //   this.showSuccess(data.msg)
    // }).catch(response => {
    //   console.log(response)
    // })
  }
}

export default new LoginService()
