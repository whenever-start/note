const str = 'get-element-by-id'

const f = (str) => {
  return str.split('-').reduce((acc, value) => {
    return acc + value[0].toUpperCase() + value.slice(1)
  })
}
console.log(f(str))

function toUpper(s) {
  return s.replace(/-\w/g, (match) => match[1].toUpperCase())
}
console.log(toUpper(str))

function format(n) {
  return (n + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
}
console.log(format(1233456789))
