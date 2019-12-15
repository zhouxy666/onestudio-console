/**
 * Created by fedrtg on 2019/12/15.
 */
const config = {
  'dev': {
    hostName: 'http://localhost:5000/'
  },
  'prod': {
    hostName: 'http://localhost:5000/'
  }
}

const env = 'dev'
export default config[env]
