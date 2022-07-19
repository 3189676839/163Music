import wyRequest from './index'

export function getTopMV(offset, limit = 10) {
  return wyRequest.get('/top/mv', {
    offset,
    limit,
    realIP: "42.91.0.126"
  })
}

/**
 * 请求MV的播放地址
 * @param {Number} id  MV的id
 */
export function getMvUrl(id) {
  return wyRequest.get("/mv/url", {
    id,
    realIP: "42.91.0.126"
  })
}

/**
 * 请求MV的详情
 * @param {Number} mvid  MV的id
 */
export function getMvDetail(mvid) {
  return wyRequest.get("/mv/detail", {
    mvid,
    realIP: "42.91.0.126"
  })
}

/**
 * 请求MV的相关视频
 * @param {Number} id  MV的id
 */
export function getRelatedVideo(offset, limit = 6, type = "网易出品") {
  return wyRequest.get("/mv/all", {
    offset,
    limit,
    type,
    realIP: "42.91.0.126"
  })
}

