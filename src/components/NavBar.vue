
<template>
  <div id="nav">
    <h1>
      <router-link class="app-title" :to="{name: 'generator'}">Beautiful Vues</router-link>
    </h1>
    <nav>
      <ul class="navbar-nav">
        <li class="nav-item">
          <h2>
            <router-link class="nav-link1" :to="{ name: 'favorites'}">Favorites Page</router-link>
          </h2>
        </li>
        <li class="nav-item">
          <h2>
            <router-link class="nav-link2" :to="{ name: 'generator'}">Generation Page</router-link>
          </h2>
        </li>
        <li class="nav-item" v-if="showAdminBoard">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li class="nav-item" v-if="showModeratorBoard">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item" v-if="currentUser">
          <router-link class="nav-link" to="/user">User</router-link>
        </li>
      </ul>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </div>

      <ul v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">{{ currentUser.username }}</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR ");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
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