// 统一封装请求接口地址
// const BASE_URL = 'https://caozhengguo.top'
const BASE_URL = 'https://www.codeman.ink/api'

// const BASE_URL = "https://netease-cloud-music-api-chi-cyan.vercel.app/"

class WYRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success: function (res) {
          resolve(res)
        },
        fail: reject
        // fail: function (err) {
        //   reject(err)
        // }
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}

const wyRequest = new WYRequest()

export default wyRequest