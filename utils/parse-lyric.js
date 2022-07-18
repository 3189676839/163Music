// 正则(regular)表达式(expression): 字符串匹配利器

// [00:58.65]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split("\n")

  const lyricInfos = []
  for (const lineString of lyricStrings) {
    // [00:58.65]他们说 要缝好你的伤 没有人爱小丑
    const timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    // 1.获取时间 转毫秒 
    // (4) ["[00:00.000]", "00", "00", "000", index: 0, input: "[00:00.000] 作词 : 唐恬", groups: undefined]0: "[00:00.000]"1: "00"2: "00"3: "000"groups: undefinedindex: 0input: "[00:00.000] 作词 : 唐恬"length: 4nv_length: (...)__proto__: Array(0)

    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond

    // 2.获取歌词文
    const text = lineString.replace(timeRegExp, "")
    lyricInfos.push({ time, text })
  }

  return lyricInfos
}