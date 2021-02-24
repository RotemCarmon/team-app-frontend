import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/user.store.js';
import teamStore from './modules/team.store.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg: null
  },
  getters: {
    message(state) {
      return state.userMsg
    }
  },
  mutations: {
    sendMsg(state, msg) {
      state.userMsg = msg
    }
  },
  actions: {},
  modules: {
    userStore,
    teamStore
  }
})
