<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/icon.png">-->
    <SingUp msg="Welcome to Your Grupomania Network"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SingUp from '@/components/SingUp.vue'

export default {
  name: 'Home',
  components: {
    SingUp
  }
}
</script>
