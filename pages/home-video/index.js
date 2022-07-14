// 导入封装好的请求方法
import { getTopMV } from '../../service/api_video'

// pages/home-video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载(created)
   * async 异步函数 await
   */
  async onLoad(options) {
    // const _this=this
    // wx.request({
    //   url: 'http://localhost:3000/top/mv',
    //   data:{
    //     offset:0,
    //     limit:10  //请求10条
    //   },
    //   success:function(res){
    //     // console.log(res);
    //     _this.setData({topMVs:res.data.data})
    //   },
    //   fail:function(err){
    //     console.log(err);
    //   }
    // })


    // wyRequest.get('/top/mv',{offset:0,limit:10}).then(res=>{
    //   this.setData({topMVs:res.data.data})
    // })

    const res = await getTopMV(0)
    this.setData({ topMVs: res.data.data })
    console.log(res);
    // this.getTopMVData(0)
  },

  // 统一封装网络请求
  async getTopMVData(offset) {
    // 判断是否可以请求
    if (!this.data.hasMore && offset !== 0) return

    // 展示加载动画
    wx.showNavigationBarLoading()

    // 真正请求数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset == 0) {
      newData = res.data.data
    } else {
      newData = newData.concat(res.data.data)
    }
    // 设置数据
    this.setData({ topMVs: newData })
    this.setData({ hasMore: res.data.hasMore })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  // 封装事件处理的方法
  handleVideoItemClick: function (event) {
    console.log(event.currentTarget.dataset.item)
    // 获取id
    const id = event.currentTarget.dataset.item.id
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
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
   * 下拉刷新，覆盖原有的数据
   */
  async onPullDownRefresh() {
    // const res = await getTopMV(0)
    // this.setData({ topMVs: res.data.data })
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    // if (!this.data.hasMore) return
    // // console.log("已经到底了");
    // const res = await getTopMV(this.data.topMVs.length)
    // this.setData({ topMVs: this.data.topMVs.concat(res.data.data) })
    // this.setData({ hasMore: res.data.hasMore })
    this.getTopMVData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})