/**
 * Created by fedrtg on 2019/12/15.
 */
import Fetch from '@/lib/fetch'

class CommonService {
  constructor(vue) {
    this.vue = vue
    this.fetch = new Fetch(vue)
  }

  showSuccess(data) {
    alert(data)
  }

  showError(response) {
    alert(response)
  }
}

export default CommonService
