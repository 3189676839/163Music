// components/song-item-v4/index.js
import { playerStore } from '../../store/play-store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    playsong(event) {
      const id = event.currentTarget.dataset.id
      // playerStore.dispatch("changeNewMusicAction", { id })
      playerStore.dispatch("playMusicWithSongIdAction", { id })
      // console.log(event);
    }
  }
})
