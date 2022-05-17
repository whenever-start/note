export default function deepCopy(source) {
  const type = getType(source)
  let o

  if (type === 'array') {
    o = []
    for (let i = 0; i < source.length; i++) {
      o.push(deepCopy(source[i]))
    }
  } else if (type === 'object') {
    o = {}
    for (let key in source) {
      o[key] = deepCopy(source[key])
    }
  } else if (type === 'date') {
    return new Date(source.getTime())
  } else if (type === 'regexp') {
    // 若要传递 lastIndex 用 source.lastIndex
    return new RegExp(source.source, source.flags)
  } else {
    // number string function boolean undefined null
    return source
  }
  return o
}

function getType(data) {
  const str = Object.prototype.toString.call(data)
  const reg = /\[\w+\s(\w+)]/
  return str.replace(reg, '$1').toLowerCase()
}
