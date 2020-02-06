/**
 * Created by fedrtg on 2019/12/15.
 */
const config = {
  'dev': {
    hostName: 'http://127.0.0.1:5000/'
  },
  'prod': {
    hostName: 'http://127.0.0.1:5000/'
  }
}

const env = 'dev'
export default config[env]
