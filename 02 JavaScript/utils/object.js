/**
 * 1. 目的: 判断两个值(对象或数组)是否完全相等
 * 2. 第一步: 对象 数组 其它
 * 3. 第二步: 对象
 *  3.1
 */
function compareValue(a, b) {
  if (a === b || (a !== a && b !== b)) {
    // 值相同或者指向相同(或者a b 都为NaN)
    return false
  }

  if (getType(a) === 'object' && getType(b) === 'object') {
    // 1. 都是对象
  } else if (getType(a) === 'array' && getType(b) === 'array') {
    // 2. 都是数组
  } else {
    return false
  }
}

/**
 *获取目标数据类型
 * @param {*} target 目标
 * @returns number string boolean function undefined array object null NaN
 */
function getType(target) {
  const type = typeof target
  // 'number', 'string', 'boolean', 'function', 'undefined' NaN
  if (
    ['number', 'string', 'boolean', 'function', 'undefined'].indexOf(type) !==
    -1
  ) {
    return target === target ? type : 'NaN'
  } else if (type === 'object') {
    // array object null
    return target instanceof Array
      ? 'array'
      : target instanceof Object
      ? 'object'
      : 'null'
  }
}

export const DataType = {
  isNumber: function (value) {
    return Object.prototype.toString.call(value) == '[object Number]'
  },
  isString: function (value) {
    return Object.prototype.toString.call(value) == '[object String]'
  },
  isArray: function (value) {
    return Object.prototype.toString.call(value) == '[object Array]'
  },
  isBoolean: function (value) {
    return Object.prototype.toString.call(value) == '[object Boolean]'
  },
  isUndefined: function (value) {
    return value === undefined
  },
  isNull: function (value) {
    return value === null
  },
  isFunction: function (value) {
    return Object.prototype.toString.call(value) == '[object Function]'
  },
  isSymbol: function (value) {
    return Object.prototype.toString.call(value) == '[object Symbol]'
  },
  isObject: function (value) {
    return (
      Object.prototype.toString.call(value) == '[object Object]' ||
      // if it isn't a primitive value, then it is a common object
      (!isNumber(value) &&
        !isString(value) &&
        !isBoolean(value) &&
        !isArray(value) &&
        !isNull(value) &&
        !isFunction(value) &&
        !isUndefined(value) &&
        !isSymbol(value))
    )
  },
  isEmptyArray: function (array) {
    if (!isArray(array)) {
      return false
    }
    return array.length > 0 ? false : true
  },
  isEmptyObject: function (obj) {
    if (!isObject(obj)) {
      return false
    }
    for (let key in obj) {
      return false
    }
    return true
  }
}
console.log(getType(NaN))
console.log(undefined === undefined)

/*
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */
const deepEqual = (x, y) => {
  // 指向同一内存时
  if (x === y) {
    return true
  } else if (
    typeof x == 'object' &&
    x != null &&
    typeof y == 'object' &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false
    }
    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false
      } else {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

let a = {
  name: 'dfjk',
  obj: {
    d: NaN,
    c: [1, 2, 3],
    e: {
      f: [2, { name: 'name' }, 'sk']
    }
  }
}
let b = {
  name: 'dfjk',
  obj: {
    d: NaN,
    c: [1, 2, 3],
    e: {
      f: [2, { names: 'name' }, 'sk']
    }
  }
}
let c = [1, 2, 3]
let d = [1, 2, 3]
console.log('deep:', deepEqual(c, d))
