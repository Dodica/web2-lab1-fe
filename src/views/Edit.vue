<template>
    <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-title><strong>Edit Tournament</strong></v-title>
          <v-text-field
            v-model="naziv"
            :counter="20"
            label="Naziv turnira"
            required
            hide-details
          ></v-text-field>

          <v-text-field
            v-model="brojrunde"
            label="Broj runde"
            hide-details
            required
          ></v-text-field>

          <v-autocomplete
            v-model="brojnatjecatelja"
            :rules="[() => !!brojnatjecatelja || 'This field is required']"
            :items="natjecatelji"
            label="Broj natjecatelja"
            placeholder="Select..."
            hide-details
            required
          ></v-autocomplete>

          <v-text-field
            v-model="listanatjecatelja"
            label="Lista natjecatelja (ime prezime, ime prezime...)"
            hide-details
            required
          ></v-text-field>

          <v-text-field
            v-model="listarezultata"
            label="Lista rezultata"
            hide-details
            required
          ></v-text-field>
          
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn variant="text"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" location="left">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="dark" variant="text" @click="editTournament">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  <script>
import TournamentService from "@/services/TournamentService";

export default {
  data: () => ({
    tournaments: [],
    parovi: [],
    natjecatelj: [],
    natjecatelji: [4, 5, 6, 7, 8],
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
      editTournament() {
        TournamentService.editTournament({
            natjecanjeid: this.natjecanjeid,
            naziv: this.naziv,
            brojnatjecatelja: this.brojnatjecatelja,
            listanatjecatelja: this.listanatjecatelja,
            listarezultata: this.listarezultata,
            pairing: this.pairing,
            brojrunde: this.brojrunde,
            format: this.format,
            userid: this.userid
        }).then((response) => {
          if (response.status == 200) {
            alert("Tournament was edited.");
          }
        });
      },
  
      showTournamentsById() {
        TournamentService.showTournamentsByTournamentId(this.natjecanjeid).then((response) => {
          if (response.status == 200) {
            this.natjecanjeid = response.data.natjecanjeid;
            this.naziv = response.data.naziv;
            this.brojnatjecatelja = response.data.brojnatjecatelja;
            this.listanatjecatelja = response.data.listanatjecatelja;
            this.listarezultata = response.data.listarezultata;
            this.pairing = response.data.pairing;
            this.brojrunde = response.data.brojrunde;
            this.format = response.data.format;
            this.userid = response.data.userid;
            //alert("Tournaments shown by user id.");
          }
        });
      }
    },
  
    created() {
        this.userid = this.$store.getters.userid;
        this.natjecanjeid = this.$store.getters.natjecanjeid;
        console.log("userid: " + this.userid);
        console.log("natjecanjeid: " + this.natjecanjeid);
        this.showTournamentsById();
    },
  };
  </script>