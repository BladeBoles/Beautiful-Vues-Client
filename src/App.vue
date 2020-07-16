<template>
  <div id="app">
    <button v-on:click="toggle='favorites-viewer'; getFavorites()">My Favorites</button>
    <button v-on:click="toggle='favorites-creator'">Beauty Generation</button>
    <ApodFavorites v-show="toggle==='favorites-viewer'" :favorites="favorites" />
    <ApodGenerator v-show="toggle==='favorites-creator'" />
  </div>
</template>

<script>
import ApodFavorites from './components/ApodFavorites.vue'
import ApodGenerator from './components/ApodGenerator.vue'
import axios from "axios"

export default {
  name: 'App',
  components: {
    ApodFavorites,
    ApodGenerator
  },
  data: function() {
    return {
      toggle: "favorites-creator",
      favorites: null  
    }  
  },
  methods: {
    getFavorites: function () {
      axios
        .get('http://localhost:3000/favorites')
        .then(response => (this.favorites = response.data))
    }
  },
  mounted: function () {
    this.getFavorites();
  }
}
</script>

<style>
  * {
    text-align: center
  }
</style>
