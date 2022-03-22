/**
 * 事件上报专用文件
 */
// axios
import eventRequest from '@/utils/eventRequest'

// 登录
export function eventReport(data, env) {
  return eventRequest({
    url: '/collect-rest/collected/events',
    method: 'post',
    data,
    env
  })
}
