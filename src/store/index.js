import Vue from 'vue';
import Vuex from 'vuex';
import ApodService from '../services/ApodService'
import * as auth from './auth.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    submittedFavorite: false,
    favorites: [],
    currentImage: {
      url: "https://www.placecage.com/500/500",
      hdurl: "https://www.placecage.com/500/500",
      explanation: `Although this placeholder image of 
        Nic Cage is surely glorious, choose a date between
        June 16, 1995 and today and click the
        button "Generate Beauty" to see something even
        more beautiful - NASA's Astronomy Picture of the Day
        for that date.`
    },
    currentQuote: {
      quote: "Everything we do impacts someone else's life.",
      author: "Nicolas Cage"
    }
  },
  modules: {
    auth
  },
  mutations: {
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    SET_QUOTE(state, quote) {
      state.currentQuote = quote;
    },
    SET_IMAGE(state, image) {
      state.currentImage = image;
    },
    SET_SUBMITTED_FAVORITE(state) {
      state.submittedFavorite = !state.submittedFavorite;
    }
  },
  actions: {
    fetchFavorites({ commit }) {
      return ApodService.getFavorites()
        .then(response => {
          commit('SET_FAVORITES', response.data)
        })
        .catch(error => console.log(`There was an error: ${error}`))
    },
    fetchQuote({ commit }) {
      return ApodService.getQuote()
        .then(response => {
          commit('SET_QUOTE', response.data)
        })
    },
    fetchImage({ commit }, date) {
      return ApodService.getApod(date)
        .then(response => {
          commit('SET_IMAGE', response.data)
        })
    },
    toggleSubmitted({ commit }) {
      commit('SET_SUBMITTED_FAVORITE')
      setTimeout(function () { commit('SET_SUBMITTED_FAVORITE') }, 3000)
    }

  },
  getters: {
    favoriteSubmitted: state => {
      return state.submittedFavorite
    }
  }
});

export default store