// app.js
// 在应用启动时获取屏幕的宽高
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    console.log(info);
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    // console.log(info.screenHeight / info.screenWidth);
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio
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
