<template>
  <div id="main" class="bg-secondary bg-gradient" >
   <div class="hello">
    <h1 class="h3 mb-3 fw-normal">You are log in</h1>
        <Replies msg="Welcome to Your Grupomania Network"/>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Replies from  '@/components/Replies.vue'
export default {
  name: 'Dashboard',
  components: {
    Replies
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