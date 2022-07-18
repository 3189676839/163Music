import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getMusicLyric } from '../service/api.player'
import { parseLyric } from '../utils/parse-lyric'
import { playMusic } from '../service/api.player'


// 创建播放器
// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
  state: {
    // 是否第一次播放
    isFirstPlay: true,
    // 是否是停止状态
    isStoping: false,
    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],

    // 当前时长
    currentTime: 0,
    // 要显示的歌词
    currentLyricText: "",
    // 以索引记录
    currentLyricIndex: 0,

    playModeIndex: 0,//0:循环播放 1:单曲循环 2:随机播放
    isPlaying: false,
    // 歌曲列表
    playListSongs: [],
    playListIndex: 0,
    artists: []
  },
  actions: {
    // 根据ID请求数据  单曲循环强制刷新 再次访问
    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (ctx.id == id && !isRefresh) {
        this.dispatch("changeMusicPlaySStatusAction", true)
        return
      }
      ctx.id = id

      // 修改播放的状态
      ctx.isPlaying = true
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      // 请求歌曲详情
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        ctx.artists = res.songs[0].ar.map(item => item.name).join(' / ')
        audioContext.title = res.songs[0].name
      })

      // 获取歌词
      getMusicLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics
      })

      // 2.播放对应id的歌曲
      audioContext.stop()
      playMusic(id).then(res => {
        audioContext.src = res.data[0].url
      })
      audioContext.title = id
      audioContext.autoplay = true

      // 3.监听audioContext的一些事件
      if (ctx.isFirstPlay) {
        this.dispatch("setupAudioContextListenerAction")
        ctx.isFirstPlay = false
      }
    },

    setupAudioContextListenerAction(ctx) {
      // 1.监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 2.监听时间改变
      audioContext.onTimeUpdate(() => {
        // 1.获取当前时间
        const currentTime = audioContext.currentTime * 1000
        // 2.根据当前时间修改currentTime
        ctx.currentTime = currentTime


        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            break
          }
        }

        const currentIndex = i - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyricInfo = ctx.lyricInfos[currentIndex]
          ctx.currentLyricIndex = currentIndex
          ctx.currentLyricText = currentLyricInfo.text

        }
      })

      // 3.监听歌曲播放完成自动下一首
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction")
      })

      // 4.监听音乐暂停/播放/停止
      // 播放状态
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    changeMusicPlaySStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      if (ctx.isPlaying && ctx.isStoping) {
        console.log(ctx);
        playMusic(ctx.id).then(res => {
          audioContext.src = res.data[0].url
        })

        audioContext.title = ctx.currentSong.name
        // audioContext.seek(ctx.currentTime)
        ctx.isPlaying = false
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
      //   if (ctx.isStoping) {
      //     audioContext.seek(ctx.currentTime)
      //     // ctx.isStoping = false
      //   }
    },
    changeNewMusicAction(ctx, isNext = true) {
      // 1.获取当前音乐的索引
      let index = ctx.playListIndex

      // 2.根据不同的播放模式，获取下一首歌的索引
      switch (ctx.playModeIndex) {
        case 0: //顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1: //单曲循环
          break
        case 2: //随机播放
          // 向下取整 Math.random * length = 0-length 
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }
      // 对索引做一次记录
      // ctx.playListIndex = index
      // 3.获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录最新的索引
        ctx.playListIndex = index
      }

      // 4.播放新的歌曲
      this.dispatch("playMusicWithSongIdAction", { id: currentSong.id, isRefresh: true })
    },
  }
})


export {
  audioContext, playerStore
}