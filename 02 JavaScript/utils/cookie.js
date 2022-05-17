/**
 * cookie.set('test','hello',365)
 * cookie.get('test')
 * cookie.remove('test')
 * 注: 若没有设置 key 值, cookie.get() 返回 null
 */
export default cookie = {
  // 默认 30 天
  set(name, value, day = 30) {
    const timestamp = day * 1000 * 3600 * 24 + new Date().getTime()
    const expires = new Date(timestamp).toUTCString()

    // encodeURIComponent 对 空格 / . 等等进行转码
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires}`
  },
  // 如果没有找到, 则返回 null
  get(name) {
    const cookies = document.cookie.split('; ')
    let str = cookies.find((item) => item.split('=')[0] === name)
    return str ? decodeURIComponent(str.split('=')[1]) : null
  },
  remove(name) {
    this.set(name, '', -1)
  }
}
