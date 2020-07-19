<template>
  <div id="nav">
    <h1 class="app-title">
      <router-link :to="{name: 'generator'}">Beautiful Vues</router-link>
    </h1>
    <nav>
      <router-link :to="{ name: 'favorites'}">Favorites Page</router-link>|
      <router-link :to="{ name: 'generator'}">Generation Page</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>