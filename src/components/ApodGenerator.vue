<template>
  <div class="apod-creator">
    <div class="generation-button-container"></div>

    <a :href="this.$store.state.currentImage.hdurl" target="_blank">
      <img
        :src="this.$store.state.currentImage.url"
        alt="Sorry, an image could not be fetched for this date.  Please try another."
        class="apod-image"
      />
    </a>

    <p class="click-image">(Click for high res version in new tab.)</p>

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

    <button class="beauty-button" v-on:click="generateBeauty()">Generate Beauty</button>

    <blockquote class="quote-section">
      <p class="quote-text">"{{ this.$store.state.currentQuote.quote }}"</p>
      <footer class="quote-author">{{ this.$store.state.currentQuote.author }}</footer>
    </blockquote>

    <div class="inspire-favorite-buttons">
      <button class="inspiration-button" v-on:click="generateInspiration()">Generate Inspiration</button>
      <button v-on:click="makeFavorite()">Add to favorites</button>
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
      axios.post(`http://localhost:3000/favorites`, this.currentFavorite);
    },
  },
  computed: {
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
  height: 140px;
  margin-top: 0;
  max-width: 95vw;
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
  text-align: center;
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
