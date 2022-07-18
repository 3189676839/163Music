// components/song-item-v3/index.js
import { playerStore } from '../../store/index'
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
    handleSongClick(event) {
      // console.log(event.currentTarget.dataset.id);
      const id = event.currentTarget.dataset.id
      console.log(id);
      wx.navigateTo({
        url: `/pages/music player/index?id=${id}`,
      })
      playerStore.dispatch("playMusicWithSongIdAction", { id })

    }
  }
})
