// components/song-item-v1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
      wx.navigateTo({
        url: `/pages/music player/index?id=${id}`,
      })
    }
  }
})