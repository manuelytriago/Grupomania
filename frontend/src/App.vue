<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand me-0" href="/dashboard">
      <img src="./assets/images/icon.png" alt="" width="72" height="72">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link  class="navbar-brand me-0" to="/dashboard">Grupomania</router-link> 
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <div class="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link @click="logout()" class="nav-link" v-if="!isdashboardPage()" to="/">Log out </router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="!isauth()" to="/"> Sign In </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="!isauth()" to="/signup"> Sign Up </router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="!isdashboardPage()" to="/profile"> Profile </router-link> 
          </li>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
  </div> 
</template>
<script>

import { mapState } from "vuex";

  export default {
    name: 'App',
    computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
    methods: {
      isdashboardPage: function() {
        if ( this.$route.path === '/' || this.$route.path === '/signup'){
          return true
        }else{
          return false
        }
      },
      isauth: function() {
        if(this.user.user != "" || this.user.token != ""){
          return true;
        }else{
          return false;
        }
      },
     logout() {
       //sessionStorage.clear();
        this.$store.commit('clear'); 
        this.$router.push('/');
      }
    },
  };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
