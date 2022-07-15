// 创建播放器
const audioContext = wx.createInnerAudioContext()
import { HYEventStore } from 'hy-event-store'

const playerStore = new HYEventStore({
  state: {

  },
  actions: {
    playMusicWithSongIdAction(ctx,) {

    }
  }
})


export {
  audioContext, playerStore
}