<template>
  <div class="character-view">
    <h1>Character Viewer</h1>
    <blockquote v-for="(favorite, index) in favorites" v-bind:key="index">
      <h2>{{index + 1}}.)</h2>
      <img :src="favorite.image" alt="beauty" width=200>
      <p>
        {{ favorite.quote }}
      </p>
      <footer>
        {{ favorite.author }}
      </footer>
    </blockquote>
  </div>
</template>

<script>
  export default {
    name: 'ApodFavorites',
    props: {
      favorites: Array
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
