import wyRequest from './index'
import hyRequest from './index1'

/**
 * 
 * @returns 获取轮播图数据
 */
export function getBanners() {
  return wyRequest.get("/banner", {
    type: 2
  })
}

// 获取热歌榜
export function getRankings(id) {
  return hyRequest.get("/playlist/detail", {
    id,
    realIP: "42.91.0.126"
  })
}

// 获取热门歌单
export function getSongMenu(limit = 6, offset = 0) {
  return hyRequest.get("/top/playlist", {
    limit, offset, realIP: "42.91.0.126"

  })
}
// 孤独
export function getSongMenu1(cat = "孤独", limit = 6, offset = 0) {
  return hyRequest.get("/top/playlist", {
    cat, limit, offset
  })
}
// 治愈
export function getSongMenu2(cat = "治愈", limit = 6, offset = 1) {
  return hyRequest.get("/top/playlist", {
    cat, limit, offset
  })
}
// 华语
export function getSongMenu3(cat = "华语", limit = 6, offset = 0) {
  return hyRequest.get("/top/playlist", {
    cat, limit, offset
  })
}
// 浪漫
export function getSongMenu4(cat = "浪漫", limit = 6, offset = 1) {
  return hyRequest.get("/top/playlist", {
    cat, limit, offset
  })
}
// 获取推荐歌单
export function getRecommendSongMenu(limit = 6) {
  return hyRequest.get("/personalized", {
    limit,
    realIP: "42.91.0.126"
  })
}

// 获取歌单详情动态
export function getSongMenuDetails(id) {
  return hyRequest.get("/playlist/detail", {
    id,
    realIP: "42.91.0.126"
  })
}
