<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/icon.png">-->
    <LogIn msg="Welcome to Your Grupomania Network"/>
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
