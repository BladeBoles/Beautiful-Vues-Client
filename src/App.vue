<template>
  <div id="app">
    <button v-on:click="toggle='character-viewer'; getCharacters()">View all characters</button>
    <button v-on:click="toggle='character-creator'">Create a character</button>
    <ApodFavorites v-show="toggle==='character-viewer'" :characters="characters" />
    <ApodGenerator v-show="toggle==='character-creator'" />
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
      toggle: "character-viewer",
      characters: null  
    }  
  },
  methods: {
    getCharacters: function () {
      axios
        .get('http://localhost:3000/characters')
        .then(response => (this.characters = response.data))
    }
  },
  mounted: function () {
    this.getCharacters();
  }
}
</script>

<style>
  * {
    text-align: center
  }
</style>
