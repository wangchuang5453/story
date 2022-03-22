
/**
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
import md5 from 'js-md5'
import constant from './constant'
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function formatSecond(result) {
  // const h = Math.floor((result / 3600) % 24)
  // const m = Math.floor((result / 60) % 60)
  const s = Math.floor(result % 60)
  result = s + '秒'
  // if (m > 0) {
  //   result = m + '分钟' + result
  // }
  // if (h > 0) {
  //   result = h + '小时' + result
  // }

  return s
}

/**
 * 时间戳转年月
 * @param {*} result
 * @returns
 */
export function formatBirthday(totalTime) {
  let result = ''
  var times = new Date(totalTime * 1000)
  var nian = times.getFullYear() // 年
  var yue = times.getMonth() + 1 // 月
  result = nian + '年' + yue + '月'
  return result
}

/**
 * 获取请求头所需要的sign
 * @param {*} deviceId
 * @param {*} appKey
 */
export const getSign = () => {
  const deviceId = constant.deviceId
  const { appKey } = constant
  const randStr = getRandStr(1, 10)
  const now = new Date().getTime()
  return `${md5(now + appKey + randStr + deviceId)} ${now} ${randStr} v2`
}

/**
 * 随机生成数字加大小写字母组合字符串
 * @param {*} min 最小位数
 * @param {*} max 最大位数
 */
export const getRandStr = (min, max) => {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  range = Math.round(Math.random() * (max - min)) + min
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

