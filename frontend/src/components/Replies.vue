<template>
    <div id="post_actions" class="mb-sm-1 mb-1 me-sm-5 ms-sm-5 me-5 ms-5 row h-75">
    <div v-if="replies_shared" id="posts" class="col-7 col-sm-9 ps-0 pe-0 col-lg-9 col-xl-9 offset-1 offset-sm-2 offset-lg-2 offset-xl-2 " >
      <div :class="'background_read'" v-for="postsdata in replies_shared" :key="postsdata.idComment" :id="'posts'+postsdata.idComment" class="col-12 mt-sm-3 mb-sm-3 mt-2 mb-2 me-xl-0 ms-xl-0">
         <div id="posts_information" class=" d-inline-flex col-12 mt-sm-3">
            <div class="text-start ps-3 mb-0 col-12">
              <p>
              Post made by {{postsdata.firstname}} {{postsdata.lastname}} on {{commentdate(postsdata.myDate)}}
              </p> 
            </div>
            
          </div>
          <div id="comments" class="col-12 mt-sm-3">
            <div id="comments" class="ps-5 col-12">
              <p class="text-start ">
              {{postsdata.comment}}
              </p>  
            </div>
          </div>
          <div v-if="postsdata.video" id="postsmultimedia" class="col-12 w">
            <video class="img-fluid" controls>
                <source :src="require('../../../assets/'+postsdata.video)" type="video/mp4">
              </video> 
          </div>
          <div v-if="postsdata.image" id="postsimages" class="border col-12">
            <img :src="require('../../../assets/'+postsdata.image)" class="img-fluid" :alt="postsdata.image">
          </div>
          <div v-if="postsdata.reply" id="replypost" class="border col-12 mt-sm-3">
            <div id="replyposts" class="border col-12">
              <p class="text-start ">
              {{postsdata.reply}}
              </p>  
            </div>
          </div>
          <div v-if="replyresponse" id="comments_actions" class="col-12 d-flex mt-2 mb-2 me-2 align-content-center flex-wrap">
            <div id="comments" class=" col-xl-12">

              <a class="navbar-brand me-0 pt-0 pb-0 w-100 h-100" href="#">
                <img src="../assets/images/comment.webp" class="img-fluid" alt="" width="25" height="25">
              </a>
              <a :id="'button'+postsdata.idComment" @click="show(postsdata.idComment)" class="navbar-brand me-0 pt-0 pb-0">
                {{postsdata.total_replies}} Comments
              </a>
        
            </div>
          </div>
          <div v-if="replyresponse" id="replies" class=" ps-3 pe-3 col-12 d-flex mt-2 mb-2 me-2">
            <div :id="'show'+postsdata.idComment" class="d-none col-12" >
    
                <div v-for="replys in postsdata.replies" :key="replys.idReply" class="col-12" >

                  <p  v-if="postsdata.idComment == replys.idCommentReply"  class="border text-start col-12">
                    {{replys.reply}}
                </p>

              </div>
            </div>
          </div>


      </div> 

    </div>
     <p class="mt-5 mb-3 alert-danger" id="answer"></p>
    </div> 
</template>

<script>

//import { store } from "../auth/store.js";
import { mapState } from "vuex";
//import axios from "axios";

export default {
  name: 'Posts',
   data() {
    return {
      username: "",
      password: "",
      replyComment:"",
      idcomment:"",
      image: null,
      video: null,
      multimedia: null,
      replyresponse:null,
      user_tag:null,
      replytext: []
    };
  },
  props: {
     replies_shared: {
      type: Array,
      required: true
    },
  },
   computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
    mounted(){
    this.replyresponse = this.replies_shared
    this.getPostsReplies( this.user.idComment);
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

       var date = datecomment.split('.',1);

      var date1 = new Date(date);
     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var datestring = date1.toLocaleDateString('en-US', options)+ " " +
    date1.getHours() + ":" + (date1.getMinutes()<10?'0':'') + date1.getMinutes();
      
      return datestring;
      },
    getPostsReplies(idComment){
    
      let url = "/comment/"+this.user.id+"/"+idComment;
        this.$http.get(url,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.replyresponse = response.data.comments;
          this.clear()
          setTimeout(() => {
          },1000)
          })
          .catch(error => {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
          });
    },
    post () {    
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
        let answer = document.getElementById("answer");
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.user}}).then(response => {
           setTimeout(() => {
          this.clear()
          },1000)
          if(response.status == 201){
          answer.innerHTML = "Post created"
          }else{
          answer.innerHTML = "Something went wrong"
          }
          })
          .catch(error => {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
          });
     }else{
       document.getElementById('comment1').placeholder = "Please write something down to post"
       
     }
    },
  
    show (idComment) {
      var display = document.getElementById('show'+idComment);

    if(display.classList.contains('d-none')){
      display.classList.remove('d-none');
      display.classList.add('d-block');
    }else{
  
      display.classList.remove('d-block');
      display.classList.add('d-none');
    }
    
    },
    reply (idComment) {    
     const comment = document.getElementById("reply").value;
     if(comment != ''){
        let url = "/Reply";
        let data1 = {
          userId: this.user.id,
          id: this.user.id,
          idComment: idComment,
          reply: comment
        }
        const formData = new FormData();
        formData.append("body", JSON.stringify(data1));
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
        
          this.idcomment = this.user.idComment;
          this.getPostsReplies(this.idcomment);
          let answer = document.getElementById("answer");
          if(response.status == 201){
          answer.classList.remove('alert-danger');
          answer.classList.add('alert-success');
          answer.innerHTML = "Reply created"
          }else{
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = "Something went wrong"
          }
           setTimeout(() => {
          this.clear()
          },1000)
          
          }).catch(error => {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
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
      let answer = document.getElementById("answer");           
      if (document.getElementById("video")){
        const picture1 = document.getElementById('video');
            images.removeChild(picture1);
      }else{
        if (document.getElementById("image")){
          const picture1 = document.getElementById('image');
            images.removeChild(picture1);
        }
        
      }

      answer.innerHTML = ""
      this.username = "",
      this.password = "",
      this.comment = "",
      this.image = null,
      this.video = null,
      this.multimedia = null,
      this.replytext = ""
      this.replyComment = ""
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

.background_read{
background-color:white;
}

.background_not_read{

background-color: #f1eeed;
  
}
</style>
