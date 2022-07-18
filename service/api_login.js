import { hyLoginRequest } from "./index1"

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        // console.log(res.code);
        const code = res.code
        // 发送网络请求发送给服务器
        resolve(code)
      },
      fail: err => {
        console.log(err);
        reject(err)
      }
    })
  })
}

export function codeToToken(code) {
  return hyLoginRequest.post("/login", { code })
}
export function checkToken() {
  return hyLoginRequest.post("/auth", {}, true)
}

export function postFavorRequest(id) {
  return hyLoginRequest.post("/api/favor", { id }, true)
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: 'AAA',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}