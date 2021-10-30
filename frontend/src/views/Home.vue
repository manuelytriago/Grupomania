<template>
  <div class="about">

    <Home msg="Welcome to Your Grupomania Network"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'Dashboard',
  components: {
    Home
  }
}
</script>