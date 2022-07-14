export default function queryRect(selector) {
  // 获取image组件的高度
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    // 返回节点的布局位置的查询请求，相对于显示区域，以像素为单位
    query.select(selector).boundingClientRect()
    // query.exec(resolve)
    query.exec((res) => {
      resolve(res)
      // console.log(res);
    })
  })
}