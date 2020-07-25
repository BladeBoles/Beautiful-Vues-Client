<template>
  <div class="apod-creator">
    <a :href="this.$store.state.currentImage.hdurl" target="_blank">
      <img
        :src="this.$store.state.currentImage.url"
        alt="Sorry, an image could not be fetched for this date.  Please try another."
        class="apod-image"
      />
    </a>

    <p class="click-image">(Click for high res version in new tab.)</p>

    <blockquote class="quote-section">
      <p class="quote-text">"{{ this.$store.state.currentQuote.quote }}"</p>
      <footer class="quote-author">{{ this.$store.state.currentQuote.author }}</footer>
    </blockquote>

    <label class="date-label" for="apod-date">Choose a date:</label>
    <input
      class="date-input"
      type="date"
      id="apod-date"
      v-model="currentDate"
      value="2020-07-20"
      min="1995-06-15"
      max="2020-07-20"
    />
    <div class="inspire-beauty-buttons">
      <button class="beauty-button" v-on:click="generateBeauty()">Generate Beauty</button>
      <button class="inspiration-button" v-on:click="generateInspiration()">Generate Inspiration</button>
    </div>

    <div class="inspire-favorite-buttons">
      <button v-if="currentUser" v-on:click="makeFavorite()">Add to favorites</button>
      <p class="no-account" v-if="!currentUser">Register or log in to save your favorites!</p>
    </div>
    <p class="submitted-message" v-show="this.favoriteSubmitted">Submitted new favorite!</p>
    <p class="explanation-label">Image Explanation:</p>
    <p class="apod-explanation">{{ this.$store.state.currentImage.explanation }}</p>

    <p class="warning">
      Warning! Side effects of simultaneously consuming beautiful
      astronomical pictures and inspirational quotes from STEM figures
      include: the desire to learn more about science, a sense of
      being one with the universe, and joyful crying.
    </p>
  </div>
</template>

<script>
import axios from "axios";

require("dotenv").config();

export default {
  name: "ApodGenerator",
  data: function () {
    return {
      currentDate: "2020-07-20",
    };
  },
  methods: {
    generateBeauty: function () {
      this.$store.dispatch("fetchImage", this.currentDate);
    },
    generateInspiration: function () {
      this.$store.dispatch("fetchQuote");
    },
    makeFavorite: function () {
      this.$store.dispatch("toggleSubmitted");
      this.currentFavorite = {
        quote: this.$store.state.currentQuote.quote,
        author: this.$store.state.currentQuote.author,
        image: this.$store.state.currentImage.url,
        owner: this.$store.state.auth.user.id,
      };
      axios.post(
        `https://polar-ridge-16440.herokuapp.com/favorites`,
        this.currentFavorite
      );
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    favoriteSubmitted() {
      return this.$store.getters.favoriteSubmitted;
    },
  },
  created() {
    console.log(this.$store);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submitted-message {
  text-align: right;
  color: rgb(71, 4, 4);
}

p.no-account {
  color: rgb(71, 4, 4);
  font-style: italic;
}
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
  width: 400px;
  height: 180px;
  margin-top: 0;
  max-width: 90vw;
}

.quote-text {
  font-style: italic;
  margin-top: 0px;
}

.explanation-label {
  font-weight: bold;
}

.click-image {
  margin-top: 0.2em;
  font-size: 0.7em;
  text-align: center;
}

.warning {
  font-size: 0.8em;
  color: rgb(71, 4, 4);
}
button {
  width: 150px;
  max-width: 45vw;
}
.inspire-beauty-buttons {
  width: 400px;
  max-width: 95vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
