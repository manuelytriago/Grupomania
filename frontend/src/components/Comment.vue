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
        <input type="text" class=" form-control w-100 h-100" id="comment1" placeholder="WRITE YOUR POST" v-model="comment" required>
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
          <input type="file" name="files" style="display: none" id="files" ref="fileInput" accept="image/*, video/*" @change="onFilePicked"/>
         </div>
        
      </div>
      <div id="uploaded" class="border border-primary col-12 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
        <div id="imageUploaded" class="border border-primary col-12 w">
          
        </div>
      </div>
    </div>
      <div v-if="posts_shared" id="posts" class="border me-5 ms-5 col margin_half" >
        <div @mouseover="addPost(user.id,postsdata.idComment)" v-for="postsdata in posts_shared" :key="postsdata.idComment" :id="'posts'+postsdata.idComment" class="border border-primary col-12 mt-sm-3 mb-sm-3 mt-2 mb-2 me-xl-0 ms-xl-0">
          {{postsdata.user_tag}}
          <div v-if="postsdata.user_tag == true" class="border border-primary col-12 me-xl-0 ms-xl-0 background_read">    
              <All v-if="postsdata.user_tag == true" :posts_shared="posts"
              
              />
              <All v-else :posts_shared="posts"/>
          </div>
      </div> 
    </div>
      </div> 
</template>

<script>

//import { store } from "../auth/store.js";
import { mapState } from "vuex";
import All from  '@/components/Posts.vue'
//import axios from "axios";

export default {
  name: 'Dashboard',
  component:{
    All
  },
   data() {
    return {
      username: "",
      password: "",
      comment:"",
      image: null,
      video: null,
      multimedia: null,
      posts: null,
      replyresponse:null,
      user_tag:null,
      replytext: []
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
    mounted(){
     // invocar los métodos
    this.dataPosts();
    },

  methods: {
    commentcount(id){
      var cont = 0;

      var replys = this.replyresponse;
      if (replys != null){
        for (var i = 0 ; i < replys.length; i++ ){
          if (replys[i].idComment == id){
            cont++
          }

        }
        return cont;
      }else{
        return cont;
      }
    },
    commentdate(datecomment){
      if(datecomment){
      //var date = new Date(Date.parse(datecomment));
      //var date = datecomment.split('T',1);
       var date = datecomment.split('.',1);
       //var time = date.split('T',1);
      //var time = datecomment.split('T',2);

      console.log("NEW DATE");
      console.log(date);

      var date1 = new Date(date);
     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var datestring = date1.toLocaleDateString('en-US', options)+ " " +
    date1.getHours() + ":" + (date1.getMinutes()<10?'0':'') + date1.getMinutes();
      
      return datestring;
      }else{
        return
      }
      },

    dataPosts(){
    
      let url = "/comment/"+this.user.id;
        
        this.$http.get(url,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.posts = JSON.parse(JSON.stringify(response.data.comments));
          this.replyresponse = JSON.parse(JSON.stringify(response.data.reply));
          this.user_tag = JSON.parse(JSON.stringify(response.data.user));
          
          })
          .catch(error => {
            console.error(error);
          });
    },
    addPost (user, post){
      let url = "/auth/add";
        let data1 = {
          userId: this.user.id,
          postiD: post,
        }
         this.$http.post(url,data1,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.clear()
          console.log("response in component",response);
          })
          .catch(error => {
            console.error("error");
            console.error(error);
          });
    },
    post () {    
        console.log("user home")
      console.log(this.user)
     const comment = document.getElementById('comment1').value;
     if(comment != ''){
        let url = "/comment";
        let data1 = {
          userId: this.user.id,
          comment: this.comment,
        }
        const formData = new FormData();
        //Take the first selected file
        const fileField = document.querySelector('input[type="file"]')
        formData.append("files", fileField.files[0])
        formData.append("body", JSON.stringify(data1));
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.clear()
          console.log("response in component",response);
          })
          .catch(error => {
            console.error(error);
          });
     }else{
       document.getElementById('comment1').placeholder = "Please write something down to post"
       
     }
    },
  
    show (idComment) {
      var display = document.getElementById('show'+idComment);

    if(display.classList.contains('d-none')){
      console.log("entre block")
      display.classList.remove('d-none');
      display.classList.add('d-block');
    }else{
  
      display.classList.remove('d-block');
      display.classList.add('d-none');
    }
    
    },
    reply (idComment) {    
      console.log("this.multimedia")
      console.log(this.multimedia)
     const comment = document.getElementById(idComment).value;
     if(comment != ''){
        let url = "/Reply";
        let data1 = {
          id: this.user.id,
          idComment: idComment,
          reply: this.replytext[idComment]
        }
        const formData = new FormData();
        formData.append("body", JSON.stringify(data1));
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.user}}).then(response => {
          this.clear()
          console.log("response in component",response);
          })
          .catch(error => {
            console.error(error);
          });
     }else{
       document.getElementById(idComment).placeholder = "Please write something down to post"
       
     }
    },
    onUploadFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      let images = document.getElementById("imageUploaded");
      this.image =  this.$refs.fileInput.files[0];
      const files = event.target.files
      //let filename = files[0].name
      
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {

        this.imageUrl = fileReader.result;

         if(files[0].type === 'video/mp4'){   
            if (!document.getElementById("video") && !document.getElementById("image") ){
                createVideo(this.imageUrl)
                console.log('HAY VIDEO')
            }else{
                 if(document.getElementById("image") ){
                const picture1 = document.getElementById('image');
                images.removeChild(picture1);
                }
                if(document.getElementById("video") ){
                const picture1 = document.getElementById('video');
                images.removeChild(picture1);
                }
                 createVideo(this.imageUrl) 
            }
         }else{
             if (!document.getElementById("video") &&  !document.getElementById("image") ){
                createImage(this.imageUrl)
             }else{
               if(document.getElementById("image") ){
                const picture1 = document.getElementById('image');
                images.removeChild(picture1);
                }
                if(document.getElementById("video") ){
                const picture1 = document.getElementById('video');
                images.removeChild(picture1);
                }
                 createImage(this.imageUrl) 
             }
           
          }
            
               
      })

      function createVideo(imageUrl){
        const div1 = document.createElement('video');
        div1.id = "video"
        div1.controls = "controls";
        div1.className = "img-fluid"
        images.appendChild(div1);
        const div2 = document.createElement('source');
        div2.ype ="video/mp4";
        div2.src = imageUrl;
        div1.appendChild(div2);
      }

      function createImage(imageUrl){
        const picture = document.createElement('img');
              picture.id = "image";
              picture.src = imageUrl;
              picture.className = "img-fluid";
              images.appendChild(picture);
      }
      
      fileReader.readAsDataURL(files[0])
      this.multimedia = files[0]; 
        //Take the first selected file
        
    },
    clear () {
      let images = document.getElementById("imageUploaded");       
      if (document.getElementById("video")){
        const picture1 = document.getElementById('video');
            images.removeChild(picture1);
      }else{
        if (document.getElementById("image")){
          const picture1 = document.getElementById('image');
            images.removeChild(picture1);
        }
        
      }
      this.username = "",
      this.password = "",
      this.comment = "",
      this.image = null,
      this.video = null,
      this.multimedia = null,
      this.replytext = ""
    }
  },
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

.margin_half {
  margin-right: 25% !important;
  margin-left: 25% !important;
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
