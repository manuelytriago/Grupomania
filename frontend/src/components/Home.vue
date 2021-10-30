<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 class="h3 mb-3 fw-normal">You are log in</h1>

    <div id="createpost" class="border mb-sm-1 mb-1 me-sm-5 ms-sm-5 me-5 ms-5 row h-75">
      <div id="logo" class="border border-primary col-2 col-sm-2 col-lg-2 col-xl-2 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
        <a class="navbar-brand me-0 pt-0 pb-0 w-100 h-100" href="#">
        <img src="../assets/images/icon.svg" class="img-fluid" alt="" width="25" height="25">
        </a>
      </div>
      <div id="comment" class="border border-primary col-6 col-sm-8 ps-0 pe-0 col-lg-8 col-xl-8 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 ">
        <input type="text" class=" form-control text-uppercase w-100 h-100" id="comment1" placeholder="write your post" v-model="comment">
      
      </div>
       <div id="post" @click="post"  class="d-flex align-items-center justify-content-center border border-primary col-2 col-sm-1 col-lg-1 col-xl-1 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
         <div class="">
           <a class="navbar-brand me-0 pt-0 pb-0" href="#">
            Post
          </a>
        </div>
        
      </div>
      <div id="upload" class="d-flex align-items-center justify-content-center border border-primary col-2 col-sm-1 col-lg-1 col-xl-1 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
         <div class="">
           <a class="navbar-brand me-0 pt-0 pb-0 w-100 h-100" href="#" @click="onUploadFile">
            <img src="../assets/images/clip.svg" class="img-fluid" alt="" width="25" height="25">
          </a>
          <input type="file"  style="display: none" id="filelem" ref="fileInput" accept="image/*, video/*" @change="onFilePicked"/>
         </div>
        
      </div>
      <div id="uploaded" class="border border-primary col-12 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
        <div class="border border-primary col-12">
          <img id="imageUploaded" src="" class="img-fluid" alt="">
        </div>
        <div id="videoUploaded" class="border border-primary col-12 w">
           <!--video class="img-fluid" controls>
              <source id="videoUploaded" src=""  type="video/mp4">
            </video> -->
        </div>
      </div>
    </div>

    <div id="posts" class="border me-5 ms-5 row">
      <div id="posts1" class="border border-primary col-12 mt-sm-3 mb-sm-3 mt-2 mb-2">
        <div id="posts_information" class=" border border-primary col-12 mt-sm-3">
           <p class="border border-primary text-start mb-0">
            Post made by Manuel Ytriago on October 15 at 6:22pm 5 hours ago
          </p>
        </div>
        <div id="comments" class="border border-primary col-12 mt-sm-3">
          <div id="comments" class="border border-primary col-12">
            <p class="text-start ">
              Hello this is my first comment I am going to try to do this as awesomw as my plan of life
              that is become in the most incredible developer in the world
            </p>  
          </div>
        </div>
        <div id="postsmultimedia" class="border border-primary col-12 w">
           <video class="img-fluid" controls>
              <source src="../assets/videos/video.mp4" type="video/mp4">
            </video> 
        </div>
        <div id="postsimages" class="border border-primary col-12">
          <img src="../assets/images/icon.png" class="img-fluid" alt="">
        </div>

        <div id="post_actions" class="col-12 d-flex mt-2 mb-2 me-2 ms-2">
           <a href="#" class="me-sm-3 ms-sm-3 me-2 ms-2">
            Comments
          </a>
          <a href="#">
            Share
          </a>
        </div>
        
      </div>
      
    </div>

  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: 'SaveUser',
   data() {
    return {
      username: "",
      password: "",
      comment:"",
      image: null,
      video: null,
      savedimage: null,
      savedvideo: null
    };
  },
  props: {
    msg: String
  },
  methods: {
    
    post () {    
     if(this.comment == ""){
       alert('you cant comment something empty');

     }
     /*if(image != ""){
       alert('you cant comment something empty');
     }
     if(video != ""){
       alert('you cant comment something empty');
     }*/
      
        
        let url = "/comment"
        let data1 = {
          userId: localStorage.getItem('user'),
          comment: this.comment,
        }
       let headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data;boundary=${data._boundary}',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
          }
          console.log(this.image)
       let formdata = new FormData();
       formdata.append('file', this.image);
       console.log("FORMDATA"+formdata)
       for (var pair of formdata.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
        } 

       
        this.$http.post(url,data1,formdata,headers)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
       

    },
    onUploadFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      this.image =  this.$refs.fileInput.files[0];
      const files = event.target.files
      //let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {

        this.imageUrl = fileReader.result;

         if(files[0].type === 'image/png' || files[0].type === 'image/jpg' || files[0].type === 'image/jpeg'){
        let images = document.getElementById("imageUploaded");
        /*console.log('imagesss')
        console.log(files);
        console.log(this.imageUrl);*/
         images.src = this.imageUrl;
         //this.image = fileReader.result;
         this.savedvideo = files; 
         }
         
        if(files[0].type === 'video/mp4'){
        console.log('videossss')
        let videos = document.getElementById("videoUploaded");
        const div1 = document.createElement('video');
        div1.controls = "controls";
        div1.className = "img-fluid"
        videos.appendChild(div1);
        const div2 = document.createElement('source');
        div2.ype ="video/mp4";
        div2.src = this.imageUrl;
        div1.appendChild(div2);
          console.log(files);
        console.log(this.imageUrl);
         videos.src = fileReader.result;
         
          this.video = fileReader.result;
          //this.savedvideo = files[0]; 
         }     
      })
      fileReader.readAsDataURL(files[0])
      this.savedimage = files[0]; 
    },
    SignUpUser(e) {
      e.preventDefault()

      if (this.password === this.password_confirmation && this.password.length > 0) {
        let url = "http://localhost:3000/signup"

        this.$http.post(url, {
          //name: this.name,
          email: this.email,
          password: this.password,
          //is_admin: this.is_admin
        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt',response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push('/')
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.password = ""
        this.passwordConfirm = ""

        return alert("Passwords do not match")
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
