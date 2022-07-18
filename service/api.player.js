import hyRequest from "./index1";

export function getSongDetail(ids) {
  return hyRequest.get("/song/detail", {
    ids,
    realIP: "42.91.0.126"
  })
}

export function playMusic(id) {
  return hyRequest.get("/song/url", {
    id,
    realIP: "42.91.0.126"
  })
}

export function getMusicLyric(id) {
  return hyRequest.get("/lyric", {
    id,
    realIP: "42.91.0.126"
  })
}