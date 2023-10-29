import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js'
import router from '../router'
import LoginService from "@/services/LoginService";

Vue.use(Vuex) 

export default new Vuex.Store({
  state: {
    userid: 0,
    userIsAuthorized:false,
    auth0: new auth0.WebAuth({
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN, 
      clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      redirectUri: process.env.VUE_APP_DOMAINURL + '/auth0callback',  
      responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE,
    }),    
  },  
  getters: {
    userid: state => state.userid,
    natjecanjeid: state => state.natjecanjeid
  },
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    },
    setUserId(state, userid) {
      state.userid = userid
    },
    setNatjecanjeId(state, natjecanjeid) {
      state.natjecanjeid = natjecanjeid
    },

  },
  actions: {
    auth0Login(context){
      console.log("in a store action named auth0Login");
      context.state.auth0.authorize()
    },
    auth0HandleAuthentication (context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          // save the tokens locally
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);  
          
          LoginService.signIn(authResult.idToken).then((response) => {
            if(response.status == 200){
              var userid = response.data;
              console.log(userid);
              context.commit('setUserId', userid);
              router.replace('/tournaments');
            } else if (err) {
              alert('login failed. Error #KJN838');
              router.replace('/');
              console.log(err);
            }
          })
        } 
        else if (err) {
          alert('login failed. Error #KJN838');
          router.replace('/');
          console.log(err);
        }
      })
    },
    auth0Logout (context) {
      // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
      // Clear Access Token and ID Token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');

      // redirect to auth0 logout to completely log the user out
      window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID; 
    },    
  }
})
