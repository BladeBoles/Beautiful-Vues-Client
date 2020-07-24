import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
  // baseURL: 'https://polar-ridge-16440.herokuapp.com',
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const nasaClient = axios.create({
  baseURL: `https://api.nasa.gov/planetary/`,
  withCredentials: false
})

export default {
  getApod(date) {
    return nasaClient
      .get(`/apod?api_key=${process.env.VUE_APP_KEY}&date=${date}`)
  },
  getFavorites() {
    return apiClient
      .get(`/favorites/myfavorites/${store.state.auth.user.id}`)

  },
  makeFavorite() {
    console.log("The user store:", store.state.auth.user)
    let currentFavorite = {
      quote: this.currentQuote.quote,
      author: this.currentQuote.author,
      image: this.currentImage.url,
      owner: store.state.auth.user.id
    }
    return apiClient
      .post('/favorites', {
        quote: currentFavorite.quote,
        author: currentFavorite.author,
        image: currentFavorite.url,
        owner: currentFavorite.owner
      })
  },
  getQuote() {
    return apiClient
      .get('/quotes')
  },
  deleteFavorite(id) {
    console.log(id)
    return apiClient
      .delete(`/favorites/delete/${id}`)
  }
  // TODO: deleteFavorite(), modifyFavorite()

}