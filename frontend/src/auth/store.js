
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      status: '',
      token: '',
      user : '',
      id: '',
      idComment: '',
      firstname: '',
      lastname: '',
      post_unread: '',
    },
    
  },
  mutations: {
    login(state, user){
      localStorage.setItem('userId', user.data.email)
      localStorage.setItem('token', user.data.token)
      localStorage.setItem('id', user.data.userId)
      state.user.token = user.data.token; 
      state.user.user = user.data.email;
      state.user.id = user.data.userId;
      state.user.firstname = user.data.firstname;
      state.user.lastname = user.data.lastname;
    },
    unread(state,unread){

      localStorage.setItem('unread', unread)
      state.user.post_unread= unread;
    },
    comment(state,comment){
      state.user.idComment= comment;
    },
    clear (state) {
      state.user.user = "";
      state.user.token = "";
      state.user.id = "";
      state.user.idComment= "";
    }
  },
  actions: {
   
     
  },
  getters : {
    getUser (state) {
      return state.user.user;
    }

  }
})