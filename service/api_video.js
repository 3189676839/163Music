import wyRequest from './index'

export function getTopMV(offset, limit = 10) {
  return wyRequest.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {Number} id  MV的id
 */
export function getMvUrl(id) {
  return wyRequest.get("/mv/url", { id })
}

/**
 * 请求MV的详情
 * @param {Number} mvid  MV的id
 */
export function getMvDetail(mvid) {
  return wyRequest.get("/mv/detail", {
    mvid
  })
}

/**
 * 请求MV的相关视频
 * @param {Number} id  MV的id
 */
export function getRelatedVideo(id) {
  return wyRequest.get("/related/allvideo", {
    id
  })
}