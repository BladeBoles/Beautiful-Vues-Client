<template>
  <div id="app">
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data: function () {
    return {
      toggle: "favorites-creator",
      favorites: null,
    };
  },
};
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
  width: 400px;
  max-width: 95vw;
}

.view-favorites-button,
.beauty-generation-button {
  border-radius: 0;
  padding: 0.5em;
}

.view-favorites-button:hover,
.beauty-generation-button:hover {
  text-decoration-color: #fc3d21;
}
</style>
