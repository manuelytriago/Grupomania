<template>
  <div class="about">

    <LogIn msg="Welcome to Your Grupomania Network"/>
  </div>
</template>
<script>
// @ is an alias to /src
import LogIn from '@/components/Home.vue'

export default {
  name: 'Register',
  components: {
    LogIn
  }
}
</script>