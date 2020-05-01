/**
 * Created by fedrtg on 2019/12/22.
 */
import CommonService from '@/services/commonService'

class UserService extends CommonService {
  // eslint-disable-next-line no-useless-constructor
  constructor(vue) {
    super(vue)
  }

  getMembers (params) {
    return this.fetch.get('/v1/members', params)
  }

  createMember (params) {
    return this.fetch.post('/v1/members/create', params)
  }

  updateMember (params) {
    return this.fetch.put('/v1/members/' + params.id, params)
  }

  deleteMember (params) {
    return this.fetch.delete('/v1/members/' + params.id)
  }
}

export default UserService
