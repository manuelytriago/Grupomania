<template>
  <div id="main" class="bg-secondary bg-gradient">
    <SignUp msg="Welcome to Your Grupomania Network"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'Register',
  components: {
    SignUp
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