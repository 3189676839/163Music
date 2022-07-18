import hyRequest from './index1'
// 热门关键词 
export function getSearchHot() {
  return hyRequest.get("/search/hot")
}
// 搜索建议
export function getSearchSuggest(keywords) {
  return hyRequest.get("/search/suggest", {
    keywords,
    type: "mobile",
    realIP: "42.91.0.126"
  })
}
// 搜索
export function getSearchResult(keywords) {
  return hyRequest.get("/cloudsearch", {
    keywords,
    realIP: "42.91.0.126"
  })
}