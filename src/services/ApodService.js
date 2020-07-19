import axios from 'axios'

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
      .get('/favorites')
  },
  makeFavorite() {
    let currentFavorite = {
      quote: this.currentQuote.quote,
      author: this.currentQuote.author,
      image: this.currentImage.url
    }
    return apiClient
      .post('/favorites', {
        quote: currentFavorite.quote,
        author: currentFavorite.author,
        image: currentFavorite.url
      })
  },
  getQuote() {
    return apiClient
      .get('/quotes')
  },
  deleteFavorite(id) {
    console.log(id)
    return apiClient
      .delete(`/favorites/${id}`)
  }
  // TODO: deleteFavorite(), modifyFavorite()

}