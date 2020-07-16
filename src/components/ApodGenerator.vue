<template>
  <div class="apod-creator">
    <h1>Astronomy Picture of the Day Creator</h1>
    
    <label for="apod-date">Choose a date: </label>
    <input type="date" id="apod-date" v-model="currentDate"
            value="2020-07-14" min="1995-06-15"
            max="2020-07-15"> 

    <br /> <br />
    <button v-on:click="getApod">Create apod</button>

    <a :href="currentImage.hdurl" target="_blank">
      <img :src="currentImage.url" alt="nic cage" class="apod-image">
    </a>

    <p class="apod-explanation">{{ this.currentImage.explanation }}</p>
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
          June 16, 1995 and July 15, 2020 to see something even
          more beautiful - NASA's Astronomy Picture of the Day
          for that date.  If you would like an inspirational quote
          from a STEM figure to go along with it, check the box!`
      },
      currentDate: "2020-07-15"
    }
  },
  methods: {
    getApod: function () {
      axios
        .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_KEY}&date=${this.currentDate}`)
        .then(res => this.currentImage = res.data)
        .then(() => console.log(this.currentImage))
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
    max-height: 80vh;
    max-width: 90vw;
  }
</style>
