import request from '@/utils/request';

export function userLogin({ username, password }) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function userRegister({ username, password }) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}
