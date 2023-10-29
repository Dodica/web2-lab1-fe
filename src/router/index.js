import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Tournaments from '../views/Tournaments.vue'
import Auth0Callback from '../views/Auth0Callback.vue'
import Store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth0callback',
      name: 'auth0callback',
      component: Auth0Callback,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: Tournaments,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach( (to,from,next)=>{
  // Allow finishing callback url for logging in
  if(to.matched.some(record=>record.path == "/auth0callback")){
   console.log("router.beforeEach found /auth0callback url");
   Store.dispatch('auth0HandleAuthentication');
   next(false);
 }
 
  // check if user is logged in (start assuming the user is not logged in = false)
  let routerAuthCheck = false;  
  // Verify all the proper access variables are present for proper authorization
  if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at') ){
    console.log('found local storage tokens');
    // Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = new Date().getTime() < expiresAt;  
  }
 
   // set global ui understanding of authentication
   Store.commit('setUserIsAuthenticated', routerAuthCheck); 
 
   // check if the route to be accessed requires authorizaton
   if (to.matched.some(record => record.meta.requiresAuth)) {
     // Check if user is Authenticated
     if(routerAuthCheck){
       // user is Authenticated - allow access
       next();
     }
     else{
       // user is not authenticated - redirect to login
       router.replace('/tournaments');
     }
     
   }
   // Allow page to load 
   else{
     next();
   }
 });
 
 export default router;
