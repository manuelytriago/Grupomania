<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isdashboardPage()" to="/">Log Out | </router-link> 
      <router-link v-if="!isauth()" to="/"> Sign In |</router-link>
      <router-link v-if="!isauth()" to="/signup"> Sign Up |</router-link> 
      <router-link v-if="!isdashboardPage()" to="/profile"> Profile </router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>


  export default {
    name: 'LogoutButton',
    methods: {
      isdashboardPage: function() {
        if ( this.$route.path === '/profile' ||  this.$route.path === '/' || this.$route.path === '/signup'){
          return true
        }else{
          return false
        }
      },
      isauth: function() {
        const user =  localStorage.getItem('user');
        if(user){
          return true;
        }else{
          return false;
        }
      }
    /*logout() {
      this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push('/login')
      })
    },
     logout() {
        
        window.onbeforeunload = function (){
          Storage.clear();
        localStorage.clear();
        localStorage.removeItem('vuex');
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.clear();
        }
        localStorage.setItem('jwt',"")
        localStorage.setItem('user',"")
        this.$router.push('/');
      },
       beforeDestroy() {
          Storage.clear();
      localStorage.clear();
   }*/
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
