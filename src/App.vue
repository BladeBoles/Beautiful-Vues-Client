<template>
  <div id="app">
    <h1>Beautiful Vues</h1>
    <div class="views-button-container">
      <button class="view-favorites-button" v-on:click="toggle='favorites-viewer'; getFavorites()">Favorites Page</button>
      <button class="beauty-generation-button" v-on:click="toggle='favorites-creator'">Generation Page</button>
    </div>
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
        .get('https://polar-ridge-16440.herokuapp.com/favorites')
        .then(response => (this.favorites = response.data))
    }
  },
  mounted: function () {
    this.getFavorites();
  }
}
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

 .views-button-container {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 350px;
 }

 button {
   padding: 1em;
   border: 3px solid black;
   border-radius: 1em;
   margin-bottom: 10px;
   cursor: pointer;
 }

 button:hover {
   text-decoration: underline;
 }

 p {
   max-width: 400px;
 }

 .view-favorites-button, .beauty-generation-button {
   border-radius: 0;
   padding: 0.5em;
 }

 .view-favorites-button:hover, .beauty-generation-button:hover {
   text-decoration-color: #fc3d21;
 }




</style>
