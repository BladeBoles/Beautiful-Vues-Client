import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://polar-ridge-16440.herokuapp.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const nasaClient = axios.create({
  baseURL: `https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_KEY}&date=${this.currentDate}`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type:': 'application/json'
  }
})

export default {
  getApod() {
    return nasaClient
      .get('/')
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
  getQuotes() {
    return apiClient
      .get('/quotes')
  }

}