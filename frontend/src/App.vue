<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="$auth.isAuthenticated" @click.prevent="logout" to="/">Log Out</router-link>
      <router-link v-else to="/">Sign In</router-link> |
      <router-link to="/signup">Sign Up</router-link> 
       </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'LogoutButton',
    methods: {
      logout() {
        this.$auth.logout();
        this.$router.push({ path: '/' });
      },
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
