// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY } from './constants/token-const'

// 在应用启动时获取屏幕的宽高
App({
  onLaunch() {
    // 1.获取设备信息
    const info = wx.getSystemInfoSync()
    console.log(info);
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    // console.log(info.screenHeight / info.screenWidth);
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio

    // 2.让用户默认进行登录
    this.handleLogin()

    // 3.获取用户信息
    wx.getUserProfile({
      desc: 'AAA',
      success: (res) => {
        console.log(res);
      }
    })
  },

  async handleLogin() {
    const token = wx.getStorageSync(TOKEN_KEY)
    // token有没有过期
    const checkResult = await checkToken()
    console.log(checkResult);

    //3.判断session是否过期
    const isSessionExpire = await checkSession()

    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },

  async loginAction() {
    // 1.获取code
    const code = await getLoginCode()
    console.log(code);

    // 2.将code发送给服务器
    const result = await codeToToken(code)
    const token = result.token
    console.log(token);
    wx.setStorageSync(TOKEN_KEY, token)
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    // 状态栏的高度
    statusBarHeight: 0,
    // 标题栏高度
    navigationBarHeight: 44,
    deviceRadio: 0
  }
})
