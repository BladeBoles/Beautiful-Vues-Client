import AuthService from '../services/auth.js'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const namespaced = true;
export const state = initialState;
export const actions = {
  login({ commit }, user) {
    console.log('login fired')
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
};

export const mutations = {
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