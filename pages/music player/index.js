// pages/music player/index.js
// import { playMusic } from '../../service/api.player'
import { audioContext, playerStore } from '../../store/index'
// import { parseLyric } from '../../utils/parse-lyric'

const playModeNames = ["order", "repeat", "random"]
Page({
  data: {
    id: 0,
    currentSong: {},
    // 总时长
    durationTime: 0,

    lyricInfos: [],
    isPlaying: false,

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
    // 当前时长
    currentTime: 0,
    // 要显示的歌词
    currentLyricText: "",
    // 以索引记录
    currentLyricIndex: 0,
    // 往上滚动的高度
    lyricScrollTop: 0,
    // 播放模式
    playModeIndex: 0,
    // 模式图片
    playModeName: "order",
    playingName: "pause",

    playAnimState: "paused",

    showlist: false,
    playListSongs1: [],

    playListIndex: 0,
  },
  onLoad(options) {
    // 1.获取传入的id
    const id = options.id
    this.setData({ id })
    // XXX 默认不需要，调试单页播放所需
    // playerStore.dispatch("playMusicWithSongIdAction", { id })
    // playerStore.dispatch("changeNewMusicAction", () => {
    //   console.log(ctx);
    //   // this.setData({ playListSongs } = ctx.playListSongs)
    // })
    // this.setlist()
    // 2.根据id获取歌曲信息
    // this.getDetailsSongInformation(id)
    this.setupPlayerStoreListener()

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
    // audioContext.stop()
    // playMusic(id).then(res => {
    //   this.setData({ artists: this.data.currentSong.ar.map(item => item.name).join(' / ') })
    // })
    // audioContext.autoplay = true
    // audioContext.onCanplay(() => {
    //   audioContext.play()
    // })
    // 监听音频播放进度更新事件
    // this.setupAudioCountextListener()
  },
  //   getDetailsSongInformation(id) {

  // **********************网络请求************************
  //   getDetailsSongInformation(id) {
  //     getSongDetail(id).then(res => {
  //       this.setData({ currentSongs: res.songs[0], durationTime: res.songs[0].dt })
  //     })
  // 
  // 
  //     // 获取歌词
  //     getMusicLyric(id).then(res => {
  //       const lyriString = res.lrc.lyric
  //       // console.log(lyriString);
  //       const lyrics = parseLyric(lyriString)
  //       this.setData({ lyricInfos: lyrics })
  //       // console.log(lyrics);
  //     })
  //   },
  // ************************事件监听 audio ************************
  //   setupAudioCountextListener: function () {
  // 
  //     // 监听时间改变
  //     audioContext.onTimeUpdate(() => {
  //       // 1.获取当前时间
  //       // console.log(audioContext.currentTime);
  //       // 毫秒数   当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）
  //       const currentTime = audioContext.currentTime * 1000
  //       // isSliderChaning 当我们没有正在左右拖动进度条时让slider的值发生改变
  // 
  //       // 2.根据当前时间修改currentTime/sliderValue
  //       if (!this.data.isSliderChaning) {
  //         // 让进度条随着播放时间而改变 0-100
  //         const sliderValue = currentTime / this.data.durationTime * 100
  //         this.setData({ sliderValue, currentTime })
  //       }
  // 
  //       // 3.根据当前时间去查找播放的歌词
  //       if (!this.data.lyricInfos.length) return
  //       let i = 0
  //       for (; i < this.data.lyricInfos.length; i++) {
  //         const lyricInfo = this.data.lyricInfos[i]
  //         if (currentTime < lyricInfo.time) {
  //           break
  //         }
  //       }
  // 
  //       // 设置当前歌词的索引和内容
  //       const currentIndex = i - 1
  //       // 当前记录的索引和实时歌词的索引不一样时才会执行
  //       if (this.data.currentLyricIndex !== currentIndex) {
  //         const currentLyricInfo = this.data.lyricInfos[currentIndex]
  //         console.log(currentLyricInfo.text);
  //         this.setData({
  //           currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex,
  //           lyricScrollTop: currentIndex * 35
  //         })
  //       }
  //     })
  //   },
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
    this.setData({ isSliderChaning: true, currentTime: currentTime })
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
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)
    // this.setData({ isPlaying: false, playingName: resume })

    // (4)记录最新的sliderValue 因为没有正在左右滑动所以为false
    this.setData({ sliderValue: value, isSliderChaning: false })

  },

  // 返回
  handleBackClick() {
    wx.navigateBack()
  },
  // 切换播放模式
  handleModeBtnClick() {
    // 计算最新的playModeIndex的值
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0

    // 设置playStore中的playModeIndex
    playerStore.setState("playModeIndex", playModeIndex)
  },
  // 播放暂停
  handlePlayBtnClick() {
    // playerStore.setState("isPlaying", !this.data.isPlaying)
    playerStore.dispatch("changeMusicPlaySStatusAction", !this.data.isPlaying)

  },
  // 上一首
  handlePrevBtnClick() {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  // 下一首
  handleNextBtnClick() {
    playerStore.dispatch("changeNewMusicAction")
  },
  handleList() {
    this.setData({ show: true })
    // console.log("点击了");
    this.setlist()

  },
  onClose() {
    this.setData({ show: false });
  },
  // ************************数据监听 audio ************************
  setupPlayerStoreListener: function () {
    // 1.监听数据
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos", "artists"], ({
      currentSong,
      durationTime,
      lyricInfos,
      artists,
    }) => {
      if (currentSong) this.setData({ currentSong })
      if (durationTime) this.setData({ durationTime })
      if (lyricInfos) this.setData({ lyricInfos })
      if (artists) this.setData({ artists })
    })

    // 2.监听currentTime/currentLyricIndex/currentLyricText
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {
      // 时间变化
      if (currentTime && !this.data.isSliderChaning) {
        const sliderValue = currentTime / this.data.durationTime * 100
        //BUG  偷改效果
        // this.setData({ playingName: "pause" })
        this.setData({ currentTime, sliderValue })
      }
      // 歌词变化
      if (currentLyricIndex) {
        this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
      }
      if (currentLyricText) {
        this.setData({ currentLyricText })
      }
    })
    // 3.监听播放模式相关的数据
    playerStore.onStates(["playModeIndex", "isPlaying"], ({ playModeIndex, isPlaying }) => {
      if (playModeIndex !== undefined) {
        this.setData({
          playModeIndex,
          playModeName: playModeNames[playModeIndex]
        })
      }
      if (isPlaying !== undefined) {
        this.setData({ isPlaying, playingName: isPlaying ? "pause" : "resume" })
        this.setData({ playAnimState: isPlaying ? "running" : "paused" })
      }
    })

  },
  setlist() {
    // BUG 列表与下一首冲突
    //     playerStore.onStates(["playListSongs", "playListIndex"], (playListSongs, playListIndex) => {
    //       if (playListSongs) this.setData({ playListSongs1: Object.values(playListSongs.playListSongs) })
    // 
    // 
    //       // ctx.artists = res.songs[0].ar.map(item => item.name).join(' / ')
    //     })
    //     console.log(this.data.playListSongs1);
  },
  onUnload() {

  }

})