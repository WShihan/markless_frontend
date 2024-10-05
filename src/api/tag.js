import request from '@/api/request';

export function tagAll() {
  return request({
    url: '/api/tag/all',
    method: 'get',
  });
}

export function tagDel({ name }) {
  return request({
    url: `/api/tag/delete/${name}`,
    method: 'get',
  });
}

export function tagAdd({ names }) {
  return request({
    url: `/api/tag/add`,
    method: 'post',
    data: {
      names,
    },
  });
}

export function tagRelatedLinks({ name }) {
  return request({
    url: `/api/tag/related-link/${name}`,
    method: 'get',
  });
}
/**
 * @description
 * @export
 * @param {string, Array<Number>} { tag, links }
 * @return {Promise}
 */
export function attachLink({ tag, links }) {
  return request({
    url: `/api/tag/attach`,
    method: 'post',
    data: {
      tag,
      links,
    },
  });
}

export function tagStastic() {
  return request({
    url: '/api/tag/stastic',
    method: 'get',
  });
}
