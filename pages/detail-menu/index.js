// pages/detail-menu/index.js
import { getSongMenu1, getSongMenu2, getSongMenu3, getSongMenu4 } from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 孤独
    lonely: [],
    cure: [],
    Chmusic: [],
    lovely: [],
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navigationBarHeight
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight })
    console.log(contentHeight);
  },
  // 网络请求
  getPageData() {
    getSongMenu1().then(res => {
      // console.log(res);
      this.setData({ lonely: res.playlists })
    })
    getSongMenu2().then(res => {
      // console.log(res);
      this.setData({ cure: res.playlists })
    })
    getSongMenu3().then(res => {
      this.setData({ Chmusic: res.playlists })
    })
    getSongMenu4().then(res => {
      this.setData({ lovely: res.playlists })
    })
  },

  handleBackClick() {
    wx.navigateBack()
  },
  handleClick1(event) {
    // console.log(event.currentTarget.dataset.item);
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${item.id}&type=menu`
    })
  }
})