// pages/detail-songs/index.js
import { rankingStore, playerStore } from '../../store/index'
import { getSongMenuDetails } from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    ranking: "",
    songInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 根据 type 类型获取相应数据
  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if (type === "menu") {
      const id = options.id
      // console.log(id);
      getSongMenuDetails(id).then(res => {
        // console.log(res);
        this.setData({ songInfo: res.playlist })
      })
    } else if (type === "rank") {
      const ranking = options.ranking
      // console.log(ranking);
      this.setData({ ranking })

      // 1.获取数据
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }
  },
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.songInfo.tracks)
    playerStore.setState("playListIndex", index)
  },
  /**
   * 生命周期函数--监听页面卸载 取消监听
   */
  onUnload() {
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
      console.log("已销毁");
    }
  },
  getRankingDataHandler(res) {
    // console.log(res);
    this.setData({ songInfo: res })
  },
})