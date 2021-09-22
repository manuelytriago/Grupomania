<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon.png">
    <SignIn msg="Welcome to Your Grupomania Network"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'Home',
  components: {
    SignIn
  }
}
</script>
