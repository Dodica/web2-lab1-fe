<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Tournament organizer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" v-if="!this.$store.state.userIsAuthorized" class="mr-2">Home</v-btn>
      <v-btn to="/create" v-if="this.$store.state.userIsAuthorized" class="mr-2">Create new tournament</v-btn>
      <v-btn to="/tournaments" v-if="this.$store.state.userIsAuthorized" class="mr-2">Tournaments</v-btn>
      <v-btn @click="login" v-if="!this.$store.state.userIsAuthorized">Login</v-btn>
      <v-btn @click="logout" v-if="this.$store.state.userIsAuthorized">Logout</v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth0Logout');
      console.log('logging out');
    },
    login(){
      this.$store.dispatch('auth0Login');
      console.log('logging in');
    }
  },
  beforeCreate(){

  }
}
</script>
