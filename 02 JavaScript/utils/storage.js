const localStorage = {
  get(key, def = '') {
    let value = deserialize(window.localStorage.getItem(key))
    return value === undefined ? def : value
  },

  set(key, value) {
    if (value === undefined) {
      return this.remove(key)
    }
    window.localStorage.setItem(key, serialize(value))
  },

  remove(key) {
    window.localStorage.removeItem(key)
  },

  clear() {
    window.localStorage.clear()
  }
}

function serialize(value) {
  return JSON.stringify(value)
}

function deserialize(value) {
  if (typeof value !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(value)
  } catch (e) {
    return value || undefined
  }
}

export default localStorage
