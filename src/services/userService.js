/**
 * Created by fedrtg on 2019/12/22.
 */
import CommonService from '@/services/commonService'

class UserService extends CommonService {
  // eslint-disable-next-line no-useless-constructor
  constructor(vue) {
    super(vue)
  }

  getMembers() {
    return this.fetch.get('/v1/members')
  }

  createMember(params) {
    return this.fetch.post('/v1/members/create', params)
  }
}

export default UserService
