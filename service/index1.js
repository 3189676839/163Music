// 统一封装请求接口地址
// const BASE_URL = 'https://caozhengguo.top'
const BASE_URL = 'http://localhost:3000'


class HYRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
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

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}

const hyRequest = new HYRequest()

export default hyRequest