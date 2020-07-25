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
/* CSS Mini Reset */

html,
body,
div,
form,
fieldset,
legend,
label {
  margin: 0;
  padding: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

th,
td {
  text-align: left;
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6,
th,
td,
caption {
  font-weight: normal;
}

img {
  border: 0;
}

* {
  overflow-x: hidden;
}

ul {
  padding-left: 0;
  max-width: 90vw;
}

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
  max-width: 90vw;
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
