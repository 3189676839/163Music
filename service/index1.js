import { TOKEN_KEY } from "../constants/token-const"
const token = wx.getStorageSync(TOKEN_KEY)

// 统一封装请求接口地址
const BASE_URL = 'https://www.codeman.ink/api'
// const BASE_URL = 'https://netease-cloud-music-api-chi-cyan.vercel.app/'
// const BASE_URL = "http://123.207.32.32:9001"
const LOGIN_BASE_URL = "http://123.207.32.32:3000"

class HYRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    this.authHeader = authHeader
  }

  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...header } : header

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        header: finalHeader,
        data: params,
        success: function (res) {
          resolve(res.data)
        },
        fail: reject
        // fail: function (err) {
        //   reject(err)
        // }
      })
    })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, 'GET', params, isAuth, header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, 'POST', data, isAuth, header)
  }
}

const hyRequest = new HYRequest(BASE_URL)

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL, {
  token
})

export default hyRequest
export {
  hyLoginRequest
}