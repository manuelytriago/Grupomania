<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
<main class="form-signin">
  
  <form @submit.prevent="submit">
    <img class="mb-4" src="../assets/images/icon.png" alt="" width="72" height="72">
    
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input for="validationDefaultUsername" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="formdata.username" required>
      <label for="floatingInput">Email address</label>
    </div>
     <div class="form-floating">
      <input type="text" class="form-control text-uppercase" id="floatingInput" placeholder="Victor" v-model="formdata.firstname" required>
      <label for="floatingInput">First Name</label>
    </div>
     <div class="form-floating">
      <input type="text" class="form-control text-uppercase" id="floatingInput" placeholder="Salazar" v-model="formdata.lastname" required>
      <label for="floatingInput">Last Name</label>
    </div>
    <div class="form-floating">
       <input  type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" class="form-control text-uppercase"  placeholder="111-1111111" v-model="formdata.phone" required>
      <label for="tel">Phone Number</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="formdata.password" required>
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword2" placeholder="password confirmation" v-model="formdata.password_confirmation" required>
      <label for="floatingPassword2">Password Confirmation</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
     <div class="checkbox mb-3">
    <button class="w-100 btn btn-lg btn-primary" type="submit" >Sign Up</button>
    </div>

    <p class="mt-5 mb-3 alert-danger" id="answer">{{user}}</p>
    <p class="mt-5 mb-3 text-muted">&copy; 2020–2021</p>
  </form>
</main>

  </div>
</template>

<script>
//import { VueTelInput } from 'vue3-tel-input'
//import 'vue3-tel-input/dist/vue3-tel-input.css'
import { mapState } from "vuex";

const script =  require('../../../backend/js/script');
//import axios from "axios";
export default {
  //components: { VueTelInput },
  name: 'SaveUser',
   data() {
    return {
    formdata:{
      username: "",
      password: "",
      firstname:"",
      lastname:"",
      password_confirmation: "",
      phone: ""
    },
     answer:"",
    };
  },
  props: {
    msg: String
  },
   computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    submit(){ 
      console.log("this.formdata") 
      console.log(this.formdata.phone)
    let answer = document.getElementById("answer");
      if (this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username ==="") {
        this.formdata.password = ""
        this.formdata.password_confirmation = ""
        answer.innerHTML = "Please enter email and Passwords";
      
      }
      else if (this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username !="") {
        answer.innerHTML = "Please enter passwords";
      }
      else if (this.formdata.password === this.formdata.password_confirmation && this.formdata.password.length > 0) {
        let url = "http://localhost:3000/api/auth/signup";
        let data1 = {
          email : this.formdata.username,
          password : this.formdata.password,
          firstname :this.formdata.firstname.toUpperCase(),
          lastname : this.formdata.lastname.toUpperCase(),
          phonenumber : this.formdata.phone,
        }
        const value = script.checkPassword(this.formdata.password);
        if(value.conditional == true){ 
          this.$http.post(url, data1).then(response => {
              answer.innerHTML = response.data;
              this.$store.commit('login',response); 
              if(response.status === 201 ){
              this.$router.push('/dashboard')
              }
              
            })
            .catch(error => {
              answer.innerHTML = error.response.data.message;
            });
        }else{
          answer.innerHTML = value.message
        }
      } 
      
      else {
        this.formdata.password = ""
        this.formdata.password_confirmation = ""
        answer.innerHTML = "Passwords do not match";
      }
    
    }
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
  margin-bottom: 0px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
#floatingPassword2 {
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
