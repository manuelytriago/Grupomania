<template>
  <div id="main" class="bg-secondary bg-gradient mt-body">
    <!-- <img alt="Vue logo" src="../assets/icon.png">-->
    <LogIn msg="Welcome to Your Social Network"/>
  
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'SignIn',
  components: {
    LogIn
  }
}
</script>
<style lang="scss">

  @import '../assets/css/global.css';
html {
    height: 100%;
}
body {
    height: 100%;
}

</style>
