import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.UserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}

// 用户名称 get 方法
export function getUserName(params) {
  return request({
    url: api.UserName,
    method: 'get',
    params,
    hideloading: true
  })
}

export const getStudyReports = (params) => {
  return request({
    url: api.StudyReports,
    params,
    method: 'get'
  })
}

/**
 * 获取微信用户信息
 */
export const getWexinInfo = (code) => {
  return request({
    url: `/weixin/invoke?code=${code}&state=1`,
    method: 'get'
  })
}

/**
 * 获取验证码
 */
export const getPhoneCode = (phone) => {
  return request({
    url: `/login/generatorSms?mobile=${phone}`,
    method: 'get'
  })
}

/**
 * 确认支付
 */
export const confirmPay = ({ courseId, mobile, openId, smsCode }) => {
  return request({
    url: `/signCourse/payCourse`,
    data: { courseId, mobile, openId, smsCode },
    method: 'post',
    hideloading: true,
  })
}

/**
 * 邮件地址
 */
export const addAddress = ({ contactAddr, contactName, contactRegion, contactTel, openId, packageId }) => {
  return request({
    url: `/signCourse/perfectInformation`,
    data: { contactAddr, contactName, contactRegion, contactTel, openId, packageId },
    method: 'post',
    hideloading: true,
  })
}

/**
 * 专属老师
 */
export const getTeacherInfo = ({ teamId, openId }) => {
  return request({
    url: `/signCourse/courseTeacher`,
    data: { teamId, openId },
    method: 'post',
  })
}

/**
 * 获取手机号码 
 */
export const getPhoneNumber = (openId) => {
  return request({
    url: `/signCourse/getMobile?openId=${openId}`,
    method: 'get'
  })
}

/**
 * 
 * @param {*} openId 
 * @returns 
 */
export const getJSON = () => {
  return request({
    url: `https://v1.cunzhangjianggushi.com/activity/220328.json`,
    method: 'get'
  })
}


export const getAccessToken = () => {
  return request({
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx04c02eacb0082991&secret=0b01977e34a4bb686595438a4f8b6436`,
    method: 'get'
  })
}

export const getWinxinConfig = () => {
  return request({
    url: `/wx/wxapi/`,
    method: 'get'
  })
}