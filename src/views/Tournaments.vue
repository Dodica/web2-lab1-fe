<template>
  <div>
    <div class="data"></div>
    <v-card max-width="500" class="mx-auto">
      <v-row justify="center">
        <v-expansion-panels accordion>
          <v-card-title font-size="larger"
            ><strong>Tournaments</strong></v-card-title
          >
          <v-expansion-panel
            v-for="tournament in tournaments"
            :key="tournament.naziv"
          >
            <v-expansion-panel-header class="title"
              ><strong>{{ tournament.naziv }}</strong></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <strong>Broj natjecatelja:</strong>
              {{ tournament.brojnatjecatelja }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <strong>Broj Runde:</strong
              >{{ tournament.brojrunde }}</v-expansion-panel-content
            >
            <v-expansion-panel-content>
              <strong>Lista Natjecatelja: </strong
              >{{ tournament.listanatjecatelja }}</v-expansion-panel-content
            >
            <v-expansion-panel-content>
              <strong>Lista Rezultata: </strong
              >{{ tournament.listarezultata }}</v-expansion-panel-content
            >
            <v-expansion-panel-content>
              <strong>Parovi: </strong
              >{{ tournament.pairing }}</v-expansion-panel-content
            >
                  <v-expansion-panel-content><strong>Link za podjelu: </strong>
                  <a :href="'http://localhost:8081/tournament?natjecanjeid=' + tournament.natjecanjeid" @click="sharingLink(tournament.natjecanjeid)">http://localhost:8081/tournament?natjecanjeid={{ tournament.natjecanjeid }}</a>
                  </v-expansion-panel-content>
            <v-expansion-panel-content>
                  <v-btn @click="editTournament(tournament.natjecanjeid)">Edit</v-btn></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </div>
</template>
  
  <script>
import TournamentService from "@/services/TournamentService";
import router from '../router'

export default {
  data: () => ({
    tournaments: [],
    parovi: [],
    natjecatelj: [],
    natjecanjeid: 0,
    naziv: "",
    brojnatjecatelja: 0,
    listanatjecatelja: "",
    listarezultata: "",
    pairing: "",
    brojrunde: 0,
    userid: 0,
  }),

  methods: {
      sharingLink(natjecanjeid) {
        this.$store.commit('setNatjecanjeId', natjecanjeid);
        router.replace('/tournament?natjecanjeid='+natjecanjeid);
      },
      editTournament(natjecanjeid) {
        this.$store.commit('setNatjecanjeId', natjecanjeid);
        router.replace('/edit');
      },
    showTournamentsById() {
      TournamentService.showTournamentsById(this.userid).then((response) => {
        if (response.status == 200) {
          this.tournaments = response.data;
          console.log(this.tournaments);
          //alert("Tournaments shown by user id.");
        }
      });
    },
  },

  created() {
    this.userid = this.$store.getters.userid;
    console.log("userid: " + this.userid);
    this.showTournamentsById();
  },
};
</script>