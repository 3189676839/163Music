// app.js
// 在应用启动时获取屏幕的宽高
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    console.log(info);
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0
  }
})
