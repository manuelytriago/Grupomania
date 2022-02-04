<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
<main class="form-user">
  <img class="mb-4" src="../assets/images/icon.png" alt="" width="72" height="72">
    
  <form class="row g-6" @submit.prevent="submit">
  <div class="col-md-6">
    <label for="validationDefault01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationDefault01" v-model="firstname" required>
  </div>
  <div class="col-md-6">
    <label for="validationDefault02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationDefault02" v-model="lastname" required>
  </div>
  <div class="col-md-6">
    <label for="validationDefault02" class="form-label">Email address</label>
      <input type="email" class="form-control" id="floatingInput" v-model="username" v-mask="mask">
  </div>
  <div class="col-md-6">
     <label for="validationDefault02" class="form-label">Phone Number</label>
    <div class="form-floating">
      <VuePhoneNumberInput v-model="phonenumber" />
    </div>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions to delete my account
      </label>
    </div>
  </div>
  <div class="col-12">
    <button class="w-100 btn btn-lg btn-primary" type="submit">Delete</button>
  </div>
</form>
    <p class="mt-5 mb-3 alert-danger" id="answer"></p>
    <p class="mt-5 mb-3 text-muted">&copy; 2020–2021</p>

</main>

  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import { mapState } from "vuex";
//import axios from "axios";
export default {
   components: { VuePhoneNumberInput },
  name: 'SaveUser',
   data() {
    return {
      mask: "",
      username: "",
      firstname:"",
      lastname:"",
      phonenumber:"",
      answer:""
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
    GetUser(){
       console.log("this.user");
        console.log(this.user.user);
        const user = this.user.user;
        let url = "http://localhost:3000/api/auth/user/"+user;  
        this.$http.get(url,{headers: {'Authorization': this.user.token},params:{'userId': this.user.user}})
        .then(response => {
          this.username = response.data.email;
          var user = response.data.email;
          this.mask =  user.replace(/^(.)(.*)(.@.*)$/,(_, a, b, c) => a + b.replace(/./g, '*') + c);

response.data.email;
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.phonenumber = response.data.phonenumber;
          console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
    },

    submit(e) {
      e.preventDefault()
      const user = this.user.user;
      let url = "http://localhost:3000/api/auth/deleteuser/"+user;
      let answer = document.getElementById("answer");
       this.$http.delete(url,{headers: {'Authorization': this.user.token}}).then(response => {
            console.log(response);
                     this.$router.push('/')
                     answer.innerHTML = response.data.message;
            
          })
          .catch(error => {
            if(!error.response.data.message)
            answer.innerHTML = error.response.data.message;
          });
      
      /*let answer = document.getElementById("answer");
      
      if (this.password === "" && this.password_confirmation === "" && this.username ==="") {
        this.password = ""
        this.password_confirmation = ""
        answer.innerHTML = "Please enter email and Passwords";
      
      }
      else if (this.password === "" && this.password_confirmation === "" && this.username !="") {
      
        answer.innerHTML = "Please enter passwords";
      }
      else if (this.password === this.password_confirmation && this.password.length > 0) {
        let url = "http://localhost:3000/api/auth/signup";
        let data1 = {
          email : this.username,
          password : this.password,
        }
          
        this.$http.post(url, data1)
          .then(response => {
            console.log(response);
                     this.$router.push('/dashboard')
                     answer.innerHTML = response.data.message;
            
          })
          .catch(error => {
            if(!error.response.data.message)
            answer.innerHTML = error.response.data.message;
          });
      } 
      
      else {
        this.password = ""
        this.password_confirmation = ""
        answer.innerHTML = "Passwords do not match";
      }*/
    
    }
  },
   beforeMount(){
     this.GetUser();
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

.form-user {
  width: 100%;
  max-width: 50%;
  padding: 15px;
  margin: auto;
}

.form-user .checkbox {
  font-weight: 400;
}

.form-user .form-floating:focus-within {
  z-index: 2;
}

.form-user input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-user input[type="password"] {
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
