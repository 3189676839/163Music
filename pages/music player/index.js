// pages/music player/index.js
import { getSongDetail, playMusic, getMusicLyric } from '../../service/api.player'
import { audioContext } from '../../store/index'
import { parseLyric } from '../../utils/parse-lyric'

Page({
  data: {
    id: 0,
    currentSongs: {},
    // 总时长
    durationTime: 0,
    // 当前时长
    currentTime: 0,
    lyricInfos: [],


    // 歌手
    artists: [],
    // 默认为第0页
    currentPage: 0,
    // 默认高度为0
    contentHeight: 0,
    // 默认歌词显示
    isMusicLyric: true,
    // 滑块的值
    sliderValue: 0,
    isSliderChaning: false,
    // 要显示的歌词
    currentLyricText: "",
    // 以索引记录
    currentLyricIndex: 0,
    // 往上滚动的高度
    lyricScrollTop: 0

  },
  onLoad(options) {
    // 1.获取传入的id
    const id = options.id
    this.setData({ id })


    // 2.根据id获取歌曲信息
    this.getDetailsSongInformation(id)

    // 3.动态计算swiper的高度
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navigationBarHeight
    const deviceRadio = globalData.deviceRadio
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })
    console.log(contentHeight);

    // 4.播放歌曲
    // 在播放之前先把前一个停掉
    audioContext.stop()
    playMusic(id).then(res => {
      audioContext.src = res.data[0].url
    })
    audioContext.autoplay = true
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    // 监听音频播放进度更新事件
    this.setupAudioCountextListener()
  },
  onUnload() {

  },
  // **********************网络请求************************
  getDetailsSongInformation(id) {
    getSongDetail(id).then(res => {
      this.setData({ currentSongs: res.songs[0], durationTime: res.songs[0].dt })
      this.setData({ artists: this.data.currentSongs.ar.map(item => item.name).join(' / ') })
    })



    // 获取歌词
    getMusicLyric(id).then(res => {
      const lyriString = res.lrc.lyric
      // console.log(lyriString);
      const lyrics = parseLyric(lyriString)
      this.setData({ lyricInfos: lyrics })
      // console.log(lyrics);
    })
  },
  // ************************事件监听 audio ************************
  setupAudioCountextListener: function () {

    // 监听时间改变
    audioContext.onTimeUpdate(() => {
      // 1.获取当前时间
      // console.log(audioContext.currentTime);
      // 毫秒数   当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）
      const currentTime = audioContext.currentTime * 1000
      // isSliderChaning 当我们没有正在左右拖动进度条时让slider的值发生改变

      // 2.根据当前时间修改currentTime/sliderValue
      if (!this.data.isSliderChaning) {
        // 让进度条随着播放时间而改变 0-100
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({ sliderValue, currentTime })
      }

      // 3.根据当前时间去查找播放的歌词
      let i = 0
      for (; i < this.data.lyricInfos.length; i++) {
        const lyricInfo = this.data.lyricInfos[i]
        if (currentTime < lyricInfo.time) {
          break
        }
      }

      // 设置当前歌词的索引和内容
      const currentIndex = i - 1
      // 当前记录的索引和实时歌词的索引不一样时才会执行
      if (this.data.currentLyricIndex !== currentIndex) {
        const currentLyricInfo = this.data.lyricInfos[currentIndex]
        console.log(currentLyricInfo.text);
        this.setData({
          currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex,
          lyricScrollTop: currentIndex * 35
        })
      }
    })
  },
  // ************************事件处理************************
  handleSwiperChange(event) {
    // console.log(event.detail.current); // 1 0 页数
    const current = event.detail.current
    this.setData({ currentPage: current })
  },

  // 当我们正在左右拖动滑块时 不要修改slider的值 true
  handleSilderChanging(event) {
    const value = event.detail.value
    // 滑块滑动时改变显示的进度时间
    const currentTime = this.data.durationTime * value / 100
    this.setData({ isSliderChaning: true, currentTime: currentTime, sliderValue: value })
  },

  //1. 点击进度条
  handleSliderChange(event) {

    // (1)获取slider变化的值 0-100
    const value = event.detail.value
    // console.log(event);

    // (2)计算想要要播放的时间
    const currentTime = this.data.durationTime * value / 100

    // (3)设置content播放我们点击进度条的当前位置的音乐
    // 跳转到指定位置 因为这里拿到的时长是ms所以除以1000让他以秒来跳转
    audioContext.pause()
    audioContext.seek(currentTime / 1000)

    // (4)记录最新的sliderValue 因为没有正在左右滑动所以为false
    this.setData({ sliderValue: value, isSliderChaning: false })
  }
})