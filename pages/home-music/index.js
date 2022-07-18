// pages/home-music/index.js
import { rankingStore, rankingMap, playerStore } from '../../store/index'

import { getBanners, getSongMenu, getRecommendSongMenu } from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

// 套用节流函数
const throttleQueryRect = throttle(queryRect, 500, { trailing: true })
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    banners: [],
    hotSongMenu: [],
    recommmendSongMenu: [],
    recommendSongs: [],
    rankings: { 0: {}, 2: {}, 3: {} },

    currentSong: {},
    isPlaying: false,
    playAnimState: "paused"
  },
  // 网络请求
  getPageData: function () {
    getBanners().then(res => {
      // console.log(res.data.banners);
      // setData在设置Data数据时，是同步的
      // 通过最新的数据对wxml进行渲染的时候，是异步的
      this.setData({ banners: res.data.banners })
    })
    // 热门歌单
    getSongMenu().then(res => {
      // console.log(res);
      this.setData({ hotSongMenu: res.playlists })
    })
    // 推荐歌单
    getRecommendSongMenu().then(res => {
      // console.log(res);
      this.setData({ recommmendSongMenu: res.result })
    })
  },
  // 事件处理
  handleSearchClick() {
    // console.log("点击了搜索框")
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  // 点击更多时进入  歌曲推荐
  hancleMoreClick() {
    this.navigateToDetailSongsPage("hotRanking")
  },
  //巅峰榜下的item
  handleRankingItemClick(event) {
    // console.log(event.currentTarget.dataset.id);
    const id = event.currentTarget.dataset.idx
    const rankingName = rankingMap[id]
    // console.log(rankingName);
    this.navigateToDetailSongsPage(rankingName)
  },
  // 统一跳转，方便click方法传不同参数
  navigateToDetailSongsPage(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`
    })
  },

  // 图片加载完成调用，获取图片高度
  handleSwiperImageLoaded() {
    // 获取图片的高度（相应swiper组件的高度）
    throttleQueryRect(".swiper-image").then(res => {
      console.log(res[0].height)
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // playerStore.dispatch("playMusicWithSongIdAction", { id: 1901371647 })

    this.getPageData()
    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享的数据 热歌榜
    rankingStore.onState("hotRanking", (res) => {
      // console.log("home-music", res);
      // 拿前六首歌的数据
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      console.log(recommendSongs);
      this.setData({ recommendSongs })
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("orginRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))
    // 播放器的监听

    playerStore.onStates(["currentSong", "isPlaying"], ({ currentSong, isPlaying }) => {
      if (currentSong) this.setData({ currentSong })
      if (isPlaying !== undefined) {
        this.setData({ isPlaying, playAnimState: isPlaying ? "running" : "paused" })
      }
    })
  },

  handleSongItemClick(event) {
    // console.log(event);
    const index = event.currentTarget.dataset.index
    console.log(index, this.data.recommendSongs);
    playerStore.setState("playListSongs", this.data.recommendSongs)
    playerStore.setState("playListIndex", index)
  },
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlaySStatusAction", !this.data.isPlaying)
    //  阻止冒泡  小程序不支持
    // event.stopPropagation()
  },
  handlePlayBarClick() {
    wx.navigateTo({
      url: '/pages/music player/index?id=' + this.data.currentSong.id
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  //   setupPlayerStoreListener(){
  // 
  //   },
  getRankingHandler(id) {
    // console.log(res);
    return (res) => {
      if (Object.keys(res).length === 0) return
      // console.log("id:", id);
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankingObj = { name, coverImgUrl, songList, playCount }
      const orginRankings = { ...this.data.rankings, [id]: rankingObj } //浅拷贝
      this.setData({
        rankings: orginRankings
      })
      // console.log(this.data.rankings);
    }
  },
})