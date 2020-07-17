class Precision {
  // 乘法
  times(num1, num2, ...others) {
    if (others.length > 0) {
      return this.times(this.times(num1, num2), ...others)
    }
    num1 = num1 || 0
    num2 = num2 || 0
    const num1Changed = this.float2Fixed(num1)
    const num2Changed = this.float2Fixed(num2)
    // 把两个数的小数位数相加
    const baseNum = this.digitLength(num1) + this.digitLength(num2)
    const leftValue = num1Changed * num2Changed
    // this.checkBoundary(leftValue)
    return leftValue / Math.pow(10, baseNum)
  }
// 精确加法
  plus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.plus(this.plus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum
  }
// 精确减法
  minus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.minus(this.minus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum
  }
// 精确除法
  divide(num1, num2, ...others) {
    if (others.length > 0) {
      return this.divide(this.divide(num1, num2), ...others)
    }
    const num1Change = this.float2Fixed(num1)
    const num2Change = this.float2Fixed(num2)
    return this.times(num1Change / num2Change, Math.pow(10, this.digitLength(num2) - this.digitLength(num1)))
  }
  // 精确除法2
  divide2(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1, r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
// 四舍五入，且保留小数
  round(num, ratio) {
    const base = Math.pow(10, ratio)
    return this.divide(Math.round(this.times(num, base)), base)
  }
// 把小数转成整数，支持科学计数法。如果是小数则放大成整数
  float2Fixed(num) {
    if (!~num.toString().indexOf('e')) {
      return Number(num.toString().replace('.', ''))
    }
    const dlen = this.digitLength(num)
    return dlen > 0 ? num * Math.pow(10, dlen) : num
  }
// 获取当前数小数位的长度(处理科学计数法，本质上处理e-n的情况)
  digitLength(num) {
    const eSplit = num.toString().split(/[eE]/)
    const len = (eSplit[0].split('.')[1] || '').length - (+eSplit[1] || 0)
    return len > 0 ? len : 0
  }
//  检测数字是否越界，如果越界给出提示
  checkBoundary(num) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.log(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
    }
  }
}

const Utils = {
  precision: new Precision(),
  // 获取小数位数
  retainDecimals(value, obj = {}) {
    if (!value) return 0
    value = value.toString()
    if (~value.indexOf('e')) {
      return 0
    }
    let decimals = ''
    if (value.indexOf('.') > 0 && obj.decimal !== 0) {
      let decimalsRe = new RegExp('[.]{1}[0-9]{0,' + (obj.decimal || 8) + '}')
      let decimalsExec = decimalsRe.exec(value)
      decimalsExec && (decimals = decimalsExec[0])
    }
    let v = 0
    let re = new RegExp('^-?[0-9]{1}[0-9]{0,' + (obj.integer - 1 || 14) + '}')
    v = re.exec(value)
    let n = ''
    if (v) {
      n = v[0]
    }
    return n + decimals
  },
  fixD(num, precision){
    // num初始化
    if (`${num}` === '0') {
      if (!window.parseFloat(precision)) {
        return 0
      }
      return '0.'.padEnd(precision + 2, '0')
    }
    if (!num) {
      return '--'
    }
    // 暂用 ----
    // if (num.length > 14) {
    //   let rNum = num.slice(0, 14);
    //   if (num[13] === '.') {
    //     rNum = rNum.slice(0, 13);
    //   }
    //   return `${rNum}+`;
    // }
    // ----------
    let flag = false
    if (parseFloat(num) < 0) {
      flag = true
    }

    const newnum = `${Math.abs(parseFloat(num))}`
    if (newnum === 'NaN') {
      return '--'
    }
    let fixNum = newnum
    // 科学计数法计算
    if (newnum.toLowerCase().indexOf('e') > -1) {
      const a = newnum.toLowerCase().split('e')
      let b = a[0]
      const c = Math.abs(parseFloat(a[1]))
      let d = ''
      let h = b.length
      let i
      if (a[0].split('.')[1]) {
        b = a[0].split('.')[0] + a[0].split('.')[1]
        h = a[0].split('.')[0].length
      }
      for (i = 0; i < c - h; i += 1) {
        d += '0'
      }
      fixNum = `0.${d}${b}`
    }
    // 精度格式化
    // precision初始化
    if (`${precision}` !== '0' && !precision) {
      return (flag ? '-' : '') + fixNum
    }
    if (`${parseFloat(num)}` === 'NaN') {
      return (flag ? '-' : '') + fixNum
    }
    const fNum = fixNum.split('.')
    if (precision === 0) {
      fixNum = Number(fixNum)
    } else if (precision > 0 && fNum[1]) {
      if (fNum[1].length > precision) {
        if (fNum[1].indexOf('999999999') > -1) {
          const s = parseFloat(fixNum).toFixed(precision + 1)
          fixNum = s.slice(0, s.length - 1)
        } else {
          fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`
        }
      } else {
        fixNum = parseFloat(fixNum).toFixed(precision)
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision)
    }
    if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
      const arry = fixNum.split('.')
      if (arry[0].length > 14) {
        fixNum = `${arry[0].slice(0, 14)}+`
      } else {
        fixNum = fixNum.slice(0, 13)
        if (fixNum.indexOf('.') === 12) {
          fixNum = fixNum.slice(0, 12)
        }
      }
    }
    return (flag ? '-' : '') + fixNum
  },
  mathCeil(val, n) {
    let d = Utils.fixD(val, n + 1);
    const f = Math.pow(10, n);
    d = Utils.precision.times(d, f);
    let result;
    if (d > 0) {
      result = Utils.precision.divide(Math.ceil(d), f);
    } else {
      result = Utils.precision.divide(Math.floor(d), f);
    }
    return Utils.fixD(result, n);
  },
  // 获取小数位数
  retainDecimalsWithSymbol(value, obj = {}) {
    if (!value) return 0
    value = value.toString()
    if (~value.indexOf('e')) {
      return 0
    }
    let decimals = ''
    if (value.indexOf('.') > 0 && obj.decimal !== 0) {
      let decimalsRe = new RegExp('[.]{1}[0-9]{0,' + (obj.decimal || 8) + '}')
      let decimalsExec = decimalsRe.exec(value)
      decimalsExec && (decimals = decimalsExec[0])
    }
    let v = 0
    let re = new RegExp('^-?[0-9]{1}[0-9]{0,' + (obj.integer - 1 || 14) + '}')
    v = re.exec(value)
    let n = ''
    if (v) {
      n = v[0]
    }
    let result = n + decimals
    if (Number(result) < 0) {
      return n + decimals
    } else {
      return '+' + n + decimals
    }
  },
  // 数字加逗号
  numberFormat(num) {
    if (num) {
      let [num1, num2] = num.toString().split('.')
      num1 = num1.split('').reverse().map((item, index) => {
        return (index) % 3 || !index || item === '-' || item === '+' ? item : item + ','
      }).reverse().join('')
      num2 ? num = num1 + '.' + num2 : num = num1
    }
    return num
  },
  // 补充0
  splitFormat(num, fractionDigits, len) {
    if (isNaN(num)) return num
    if (num) {
      if (num === '0') {
        return num
      }
      let digit = num.toString().split('.')
      if (fractionDigits === 0) {
        return digit[0]
      }
      if (digit.length > 1) {
        if (fractionDigits === 0) {
          return digit[0]
        } else if (digit[1].length < fractionDigits) {
          let digitResult = ''
          for (let i = 0; i < fractionDigits - digit[1].length; i++) {
            digitResult += '0'
          }
          return num + digitResult
        } else {
          let digitResult = digit[1].substring(0, len || fractionDigits)
          return digit[0] + '.' + digitResult
        }
      } else {
        let digitResult = '.'
        for (let i = 0; i < fractionDigits; i++) {
          digitResult += '0'
        }
        return num + digitResult
      }
    } else {
      return num
    }
  },
  // 位数不够补0
  addZero(num, len) {
    if (isNaN(num)) return 0
    let str = String(num)
    // console.log(num, len)
    return String(str).replace(new RegExp(`^(\\-?)(\\d+)(\\.\\d{1,${len}})?`), (n, a, b, c) => {
      // console.log(a, b, c)
      let str = a + b // .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (!len) {
        return str
      }
      if (c) {
        str += c + repeat('0', len - c.length)
      } else {
        str += '.' + repeat('0', len)
      }
      return str
    })
  },
  // 数字加逗号
  addCommom(num, len) {
    if (isNaN(num) || !num) return num
    num = String(num)
    if (!isNaN(len)) {
      if (len === 0) {
        num = num.split('.')[0]
      }
      return num.replace(/(\d+)(\.\d+)?/, (a, b, c) => {
        // console.log(b, c)
        return b.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (c ? c.slice(0, len + 1) : '')
      })
    } else {
      return num.replace(/^\d+/, (a) => { return a.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') })
    }
  },
  // 获取时间年月日 时分秒
  timeFormat(time, type) {
    let date = getTimeZone(time)
    if (!type) return getYMD(date) + ' ' + getHMS(date)
    switch (type) {
      case 'HMS': return getHMS(date)
      case 'YMD': return getYMD(date)
    }
  },
  cssProperty(attr) {
    var prefix = [ 'O', 'ms', 'Moz', 'Webkit' ]
    var len = prefix.length
    var style = document.createElement('i').style
    if (attr in style) {
      return true
    }
    attr = attr.replace(/^[a-z]/, function (val) {
      return val.toUpperCase()
    })
    while (len--) {
      if (prefix[ len ] + attr in style) {
        return true
      }
    }
    return false
  },
  /**
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true, debounce会在wait时间间隔的开始调用这个函数
 * @returns {Function}
 */
  debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result
    var later = function () {
      var last = new Date().getTime() - timestamp // timestamp会实时更新
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
    return function () {
      context = this
      args = arguments
      timestamp = new Date().getTime()
      var callNow = immediate && !timeout
      if (!timeout) {
        timeout = setTimeout(later, wait)
      }
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
      return result
    }
  }
}
  // 字符串复制
function repeat(target, n) {
  var s = ''
  while (n > 0) {
    if (n % 2 === 1) {
      s += target
    }
    if (n === 1) { break }
    target += target
    n = n >> 1
  }
  return s
}
function singleFormat(str) {
  return str.toString().length === 1 ? ('0' + str) : str
}

function getYMD(time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + singleFormat(month) + '-' + singleFormat(date)
}

function getHMS(time) {
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return singleFormat(hours) + ':' + singleFormat(minutes) + ':' + singleFormat(seconds)
}
function getTimeZone(time) {
  let GTM_8 = 480  // -480
  let date = new Date(time)
  let subMin = date.getTimezoneOffset() + GTM_8
  date.setMinutes(date.getMinutes() + subMin)
  return date
}

export default Utils
