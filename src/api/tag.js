import request from '@/utils/request';

export function tagAll() {
  return request({
    url: '/api/tag/all',
    method: 'get',
  });
}
