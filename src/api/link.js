import request from '@/utils/request';

export function linkAll() {
  return request({
    url: '/api/link/all',
    method: 'get',
  });
}
export function linkPagination({ page, keyword, read }) {
  return request({
    url: '/api/link/pagination',
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
export function linkAdd({ url, tags, read, desc }) {
  return request({
    url: `/api/link/add`,
    method: 'post',
    data: {
      url,
      tags,
      read,
      desc,
    },
  });
}

/**
 * @description
 * @export
 * @param {Array<Number>} links
 * @param {Boolean} read
 * @return {Promise}
 */
export function markReadState(links, read) {
  return request({
    url: '/api/link/markread',
    method: 'post',
    data: {
      links,
      read,
    },
  });
}
