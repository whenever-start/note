/**
 * 格式化时间
 * new Date().valueOf() => 'xxxx年xx月xx日hh:mm:ss'
 * 例: formatTime(new Date(2021, 1, 1).valueOf())
 * => 2021年02月01日00:00:00
 * @param {Number} timestamp new Date().valueOf() 毫秒数
 * @returns {String} 时间字符串
 */
function formatTime(timestamp = Date.now()) {
  let timeStr = new Date(timestamp + 1000 * 60 * 60 * 8).toISOString()
  const reg = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/
  return timeStr.match(reg)[0].replace(reg, (match, date, time) => {
    const dateStr = date.split('-').reduce((acc, time, index) => {
      let s = index === 0 ? '年' : index === 1 ? '月' : '日'
      return acc + time + s
    }, '')
    return dateStr + time
  })
}
