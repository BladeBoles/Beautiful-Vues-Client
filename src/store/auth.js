import AuthService from '../services/auth'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user)
        .then(
          user => {
            commit('loginSuccess', user)
            return Promise.resolve(user);
          },
          err => {
            commit('loginFailure');
            return Promise.reject(err)
          })
    },

    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },

    register({ commit }, user) {
      return AuthService.register(user)
        .then(response => {
          commit('registerSuccess');
          return Promise.resolve(response.data)
        },
          err => {
            commit('registerFailure');
            return Promise.reject(err)
          })
    }
  },

  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
}