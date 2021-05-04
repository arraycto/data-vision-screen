import request from '@/utils/request'

export function getData () {
  return request({
    url: '/screen/data',
    method: 'get'
  })
}
