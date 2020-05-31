import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getCookie(name) {
  let arr, reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg)))
    return unescape(arr[2]);
  else
    return null;
}

function setCookie(name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
}

export default new Vuex.Store({
  state: {
    selectedPage: 1,
    user: null
  },
  mutations: {
    pageSelect(state, n) {
      state.selectedPage = n;
    },
    user(state, user) {
      state.user = user;
    },
    restore(state, rstate) {
      state.selectedPage = rstate.selectedPage;
      state.user = rstate.user;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    store => {
      let state;
      if ((state = getCookie('state'))) {
        store.commit('restore', JSON.parse(state));
      }
      store.subscribe((mutation, state) => {
        setCookie('state', JSON.stringify(state));
      })
    }
  ]
})
