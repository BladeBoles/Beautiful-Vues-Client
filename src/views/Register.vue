<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssel.gstatic.com/accounts/ui/avatar_2x.png"
        alt="some kind of avatar"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              name="username"
              class="form-control"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{ errors.first('username') }}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="user.email"
              v-validate="'required|email|max:50'"
              class="form-control"
              name="email"
            />

            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{ errors.first('email') }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              class="alert-danger"
              v-if="submitted && errors.has('password')"
            >{{ errors.first('password') }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
      <p v-if="this.successful">Registration complete! Please log in.</p>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      console.log("Attempting to register");
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
</style>