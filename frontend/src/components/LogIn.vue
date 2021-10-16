<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
<main class="form-signin">
  <img class="mb-4" src="../assets/icon.png" alt="" width="72" height="72">
    
  <form>
    
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="username">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
     <div class="checkbox mb-3">
    <button class="w-100 btn btn-lg btn-primary" type="submit" @click="SignInUser">Sign In</button>

    </div>

     <div class="checkbox mb-3">
    <button class="w-100 btn btn-lg btn-primary" type="submit" @click="SignUpUser">Sign Up</button>
    
    </div>
    <p class="mt-5 mb-3 alert-danger" id="response" ></p>
    <p class="mt-5 mb-3 text-muted">&copy; 2020–2021</p>
  </form>
</main>

  </div>
</template>

<script>
//import axios from "axios";
//import { AUTH_REQUEST } from "../auth/actions/auth";

export default {
  name: 'SaveUser',
   data() {
    return {
      username: "",
      password: "",
    };
  },
  props: {
    msg: String
  },
  methods: {
      SignUpUser() { 
        this.$router.push('/signup')
      },
    SignInUser(e) {
      e.preventDefault()

        let url = "http://localhost:3000/api/auth/login"
        let data1 = {
          email : this.username,
          password : this.password,
        }
         let answer = document.getElementById("response");
        
        this.$http.post(url, data1)
        .then(response => {
          const user = JSON.parse(response.config.data);
          console.log(response.data.token);
           // localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt',response.data.token)
            localStorage.setItem('user',user.email)

            console.log("entre");
            if (localStorage.getItem('jwt') != null) {
              this.$router.push('/dashboard')
               console.log("JWT NOT NULL");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
                 console.log("PARAMS NOT NULL");
              }
            }
          })
          .catch(error => {
             answer.innerHTML = error.response.data.message;
          });
    
    },
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>
