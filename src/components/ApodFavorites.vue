<template>
  <div class="character-view">
    <blockquote
      class="favorite-quote"
      v-for="(favorite, index) in this.$store.state.favorites"
      v-bind:key="index"
    >
      <h2>Favorite #{{index + 1}}</h2>
      <img class="favorite-image" :src="favorite.image" alt="beauty" />
      <p class="quote-text">{{ favorite.quote }}</p>
      <footer>{{ favorite.author }}</footer>
      <button
        class="delete-button"
        v-on:click="deleteFavorite(favorite._id, index)"
      >Remove this favorite</button>
    </blockquote>
  </div>
</template>

<script>
import ApodService from "../services/ApodService";
export default {
  name: "ApodFavorites",
  data: function() {
    return {
      testFav: "test favorite"
    };
  },
  methods: {
    deleteFavorite: async function(id) {
      console.log(id);
      await ApodService.deleteFavorite(id)
        .then(response => console.log(response))
        .then(() => this.$store.dispatch("fetchFavorites"))
        .catch(error => console.log("There was an error: ", error));
    }
  },
  mounted() {
    this.$store.dispatch("fetchFavorites");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete-button {
  margin-top: 10px;
}
.delete-button:hover {
  text-decoration-color: #fc3d21;
}
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
