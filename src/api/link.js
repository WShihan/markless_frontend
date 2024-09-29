import request from '@/utils/request';

export function linkAll({ page, keyword, read }) {
  return request({
    url: '/api/link/all',
    method: 'get',
    params: {
      page,
      keyword,
      read: read || 0,
    },
  });
}

export function linkDel({ id }) {
  return request({
    url: `/api/link/delete/${id}`,
    method: 'get',
  });
}

export function linkRead({ id }) {
  return request({
    url: `/api/link/read/${id}`,
    method: 'get',
  });
}
export function linkUnread({ id }) {
  return request({
    url: `/api/link/unread/${id}`,
    method: 'get',
  });
}
