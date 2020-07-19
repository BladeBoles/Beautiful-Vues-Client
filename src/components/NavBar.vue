<template>
  <div id="nav">
    <h1>
      <router-link class="app-title" :to="{name: 'generator'}">Beautiful Vues</router-link>
    </h1>
    <nav>
      <h2>
        <router-link class="nav-link1" :to="{ name: 'favorites'}">Favorites Page</router-link>
      </h2>
      <h2>
        <router-link class="nav-link2" :to="{ name: 'generator'}">Generation Page</router-link>
      </h2>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
}
.app-title {
  font-size: 1em;
  text-decoration: none;
  color: #2d2d2d;
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.nav-link1,
.nav-link2 {
  font-size: 0.8em;
  text-decoration: none;
  color: #2d2d2d;
}
.nav-link1:hover,
.nav-link2:hover {
  text-decoration: 2px solid #fc3d21 underline;
  margin-top: 0px;
  padding-top: 0px;
}
.nav-link1 {
  padding-right: 20px;
}
</style>