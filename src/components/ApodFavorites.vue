<template>
  <div class="character-view">
    <blockquote class="favorite-quote" v-for="(favorite, index) in favorites" v-bind:key="index">
      <h2># {{index + 1}}</h2>
      <img class="favorite-image" :src="favorite.image" alt="beauty">
      <p class="quote-text">
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
  .favorite-quote {
    max-width: 90vw;
  }

  .character-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  img {
    max-height: 50vh;
    max-width: 90vw;
  }

  .quote-text {
    font-style: italic;
    
  }
</style>
