import Vue from 'vue';
import Vuex from 'vuex';
import ApodService from '../services/ApodService'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    favorites: [],
    currentImage: {
      url: "https://www.placecage.com/500/500",
      hdurl: "https://www.placecage.com/500/500",
      explanation: `Although this placeholder image of 
        Nic Cage is surely glorious, choose a date between
        June 16, 1995 and July 15, 2020 and click the
        button "Generate Beauty" to see something even
        more beautiful - NASA's Astronomy Picture of the Day
        for that date.  If you would like an inspirational quote
        from a STEM figure to go along with it, click "Generate Inspiration." `
    },
    currentQuote: {
      quote: "Everything we do impacts someone else's life.",
      author: "Nicolas Cage"
    }
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
    }

  },
  getters: {

  }
});

export default store