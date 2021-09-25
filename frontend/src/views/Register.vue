<template>
  <div class="about">
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