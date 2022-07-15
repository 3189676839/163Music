// [03:55.81]
const timeRegEXP = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/


export function parseLyric(lyriString) {
  const lyricStrings = lyriString.split("\n")
  const lyricInfos = []
  for (const lineString of lyricStrings) {
    // [03:55.81]谁说站在光里的才算英雄
    const timeResult = timeRegEXP.exec(lineString)
    // (4) ["[00:00.000]", "00", "00", "000", index: 0, input: "[00:00.000] 作词 : 唐恬", groups: undefined]0: "[00:00.000]"1: "00"2: "00"3: "000"groups: undefinedindex: 0input: "[00:00.000] 作词 : 唐恬"length: 4nv_length: (...)__proto__: Array(0)
    //1.获取时间 转毫秒 
    if (!timeResult) continue
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecond = timeResult[3].length === 2 ? timeResult[3] * 10 : timeResult[3] * 1
    const time = minute + second + millsecond

    // 2.获取歌词文本
    const text = lineString.replace(timeRegEXP, "")

    lyricInfos.push({ time, text })

  }

  return lyricInfos
}
