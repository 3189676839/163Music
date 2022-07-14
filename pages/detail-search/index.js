// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../service/api_search'
import { stringToNodes } from '../../utils/string-To-nodes'
import debounce from '../../utils/debounce'

const debounceGetSearchSuggest = debounce(getSearchSuggest)
Page({
  data: {
    hotKeyWords: [],
    suggestSongs: [],
    searchValue: "",
    suggestSongsNodes: [],
    resultSongs: []
  },
  onLoad(options) {
    // 1.获取数据
    this.getPageData()
  },
  // 网络请求 获取热词
  getPageData() {
    getSearchHot().then(res => {
      // console.log(res);
      this.setData({ hotKeyWords: res.result.hots })
    })
  },
  // 事件处理 当搜索框数据发生改变时触发
  bandleSearchChange(event) {
    // 1.获取我们输入的关键字
    const searchValue = event.detail
    // console.log(event);
    // 2.保存关键字
    this.setData({ searchValue })
    // 3.判断关键字为空字符串的处理逻辑
    if (!searchValue.length) {
      this.setData({ suggestSongs: [] })
      this.setData({ resultSongs: [] })
      this.setData({ suggestSongsNodes: [] })
      return
    }
    // console.log(searchValue);
    // 4.根据关键字进行搜索
    debounceGetSearchSuggest(searchValue).then(res => {
      // console.log(res);
      // 1.获取建议的关键字
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      // 2.构成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      // console.log(suggestKeywords);
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  // 通过回车获取到搜索结果
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      console.log(res);
      this.setData({ resultSongs: res.result.songs })
    })
  },
  // 点击关键字搜索
  handleSuggestItemClick(event) {
    // 1.获取点击的关键字
    // console.log(event);
    const index = event.currentTarget.dataset.index
    const keyword = this.data.suggestSongs[index].keyword
    // console.log(keyword);
    // 2.将关键字设置到searchValue中
    this.setData({ searchValue: keyword })
    // 3.发送网络请求
    this.handleSearchAction()
    // getSearchResult(keyword).then(res => {
    //   // console.log(res.result.songs);
    //   this.setData({ resultSongs: res.result.songs })
    // })
  },
  // 点击热门搜索关键字进行查询
  handleSearchTagItemClick(event) {
    // console.log(event.currentTarget.dataset.item);
    const keyword = event.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword })
    this.handleSearchAction()
  }
})