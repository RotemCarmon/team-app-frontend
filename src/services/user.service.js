import httpService from './http.service.js';
import {storageService} from './storage.service.js';
import store from '@/store'
import router from '@/router'


async function login(cred) {
  const res = await httpService.post('auth/login',cred)
  console.log('res:', res)
  if (res.type === 'message') store.commit('sendMsg', {txt:res.txt,type:'warning'})
  router.push('/')
  storageService.store('loggedinUser', res)
  return res;
}

async function logout() {
  await httpService.post('auth/logout');
  storageService.remove('loggedinUser')

}

export const userService = { 
  login, 
  logout
}