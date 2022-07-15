import hyRequest from "./index1";

export function getSongDetail(ids) {
  return hyRequest.get("/song/detail", {
    ids
  })
}

export function playMusic(id) {
  return hyRequest.get("/song/url", {
    id
  })
}

export function getMusicLyric(id) {
  return hyRequest.get("/lyric", {
    id
  })
}