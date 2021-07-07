import { userService } from '../../services/user.service.js'

var localLoggedinUser = null;
if (localStorage.loggedinUser) localLoggedinUser = JSON.parse(localStorage.loggedinUser);

export default {
  state: {
    loggedinUser: localLoggedinUser,
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser
    },
  },
  mutations: {
    setUser(state, user) {
      if (user?.id) state.loggedinUser = user;
      else state.loggedinUser = null;
    },
  },
  actions: {
    async login(context, cred) {
      try {
        const user = await userService.login(cred);
        context.commit('setUser', user)
        return user;
      } catch (err) {
        console.log(err.response);
      }
    },
    async logout({ commit }) {
      await userService.logout();
      commit('setUser', null)
    }
  },
};