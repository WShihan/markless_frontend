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

export function userInfo() {
  return request({
    url: '/api/user/info',
    method: 'get',
  });
}

export function userEnv() {
  return request({
    url: '/api/user/env',
    method: 'get',
  });
}

/**
 * @description
 * @export
 * @param {Object} data
 * @return {Promise} 
 */
export function userinfoUpdate(data) {
  return request({
    url: '/api/user/info/update',
    method: 'post',
    data
  });
}


export function userTokenDel(){
  return request({
    url: '/api/user/token/delete',
    method:'get',
  })
}

export function userTokenRefresh(){
  return request({
    url: '/api/user/token/refresh',
    method:'get',
  })
}
export function userPasswordUpdate(password_old,password){
  return request({
    url: '/api/user/password/update',
    method:'post',
    data:{
      password,
      password_old
    }

  })
}