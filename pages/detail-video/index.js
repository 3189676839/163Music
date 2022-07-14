// pages/detail-vedio/index.js
// 导入获取视频播放地址、详情、相关视频的方法
import { getMvUrl, getMvDetail, getRelatedVideo } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url返回的所有信息
    mvURLInfo: {},
    mvDetail: {},
    relatedVideos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 1.获取传入的id
    const id = options.id
    console.log("id=" + id)

    // 2.获取页面的数据
    this.getPageData(id)

    //TODO:其他逻辑
  },
  getPageData(id) {
    // 1.请求播放地址
    getMvUrl(id).then(res => {
      this.setData({ mvURLInfo: res.data.data })
    })
    // 2.请求视频信息
    getMvDetail(id).then(res => {
      this.setData({ mvDetail: res.data.data })
    })
    // 3.请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({ relatedVideos: res.data.data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})