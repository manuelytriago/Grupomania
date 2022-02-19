<template>
  <div id="main" class="bg-secondary bg-gradient">
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
html {
    height: 100%;
}
body {
    height: 100%;
}

#main {
    height: 100%;
}
</style>
