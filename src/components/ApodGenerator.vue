<template>
  <div class="apod-creator">
    <div class="generation-button-container">
      
    </div>

    <a :href="currentImage.hdurl" target="_blank">
      <img :src="currentImage.url" 
            alt="Sorry, an image could not be fetched for this date.  Pleas try another." 
            class="apod-image">
    </a>

    <p class="click-image">(Click for high res version in new tab.)</p>

    <label class="date-label" for="apod-date">Choose a date: </label>
    <input class="date-input" type="date" id="apod-date" v-model="currentDate"
            value="2020-07-14" min="1995-06-15"
            max="2020-07-15"> 

    <button class="beauty-button" v-on:click="getApod()">Generate Beauty</button>

    <blockquote class="quote-section">
      <p class="quote-text">"{{ this.currentQuote.quote }}"</p>
      <footer class="quote-author">{{ this.currentQuote.author }}</footer>
    </blockquote>

    <div class="inspire-favorite-buttons">
      <button class="inspiration-button" v-on:click="getQuote()">Generate Inspiration</button>
      <button v-on:click="makeFavorite()">Add to favorites</button>
    </div>
    <p class="explanation-label">Image Explanation: </p>
    <p class="apod-explanation">{{ this.currentImage.explanation }}</p>

    <p class="warning">
      Warning!  Side effects of simultaneously consuming beautiful
      astronomical pictures and inspirational quotes from STEM figures 
      include:  the desire to learn more about science, a sense of 
      being one with the universe, and joyful crying.
    </p>
  </div>
</template>

<script>
import axios from 'axios';
require('dotenv').config();

export default {
  name: 'ApodGenerator',
  data: function() {
    return {
      currentImage: {
        url: "https://www.placecage.com/500/500",
        hdurl: "https://www.placecage.com/500/500",
        explanation: `Although this placeholder image of 
          Nicolas Cage is surely glorious, choose a date between
          June 16, 1995 and July 15, 2020 and click the
          button "Generate Beauty" to see something even
          more beautiful - NASA's Astronomy Picture of the Day
          for that date.  If you would like an inspirational quote
          from a STEM figure to go along with it, click "Generate Inspiration." `
      },
      currentDate: "2020-07-15",
      currentQuote: {
        quote: "Everything we do impacts someone else's life.",
        author: "Nicolas Cage"
      },
      currentFavorite: {
        quote: "",
        author: "",
        image: ""
      }
    }
  },
  methods: {
    getApod: function () {
      axios
        .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_KEY}&date=${this.currentDate}`)
        .then(res => this.currentImage = res.data)
    },
    getQuote: function () {
      axios
        .get(`https://polar-ridge-16440.herokuapp.com/quotes`)
        .then(res => this.currentQuote = res.data)
        .then(() => console.log(this.currentQuote))
    },
    makeFavorite: function () {
      this.currentFavorite = {
        quote: this.currentQuote.quote,
        author: this.currentQuote.author,
        image: this.currentImage.url
      }
      axios
        .post(`https://polar-ridge-16440.herokuapp.com/favorites`, {
          quote: this.currentQuote.quote,
          author: this.currentQuote.author,
          image: this.currentImage.url
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .apod-creator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .apod-image {
    max-height: 60vh;
    max-width: 90vw;
    border: 3px solid gray;
    border-radius: 0.1em;
  }

  .generation-button-container {
    display: flex;
    flex-direction: row;
    width: 60vw;
    justify-content: space-between;
  }

  .date-label {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  .date-input {
    margin-bottom: 1em;
    font-size: 1.5em;
  }

  .quote-section {
    width: 350px;
    height: 140px;
    margin-top: 0;
    max-width: 90vw;
  }

  .quote-text {
    font-style: italic;
  }

  .explanation-label {
    font-weight: bold;
  }

  .click-image {
    margin-top: 0.2em;
    font-size: 0.7em;
    text-align:center;
  }

  .warning {
    font-size: 0.8em;
    color: rgb(71, 4, 4);
  }

  .inspire-favorite-buttons {
    width: 350px;
    display: flex;
    justify-content: space-between;
  }

</style>
