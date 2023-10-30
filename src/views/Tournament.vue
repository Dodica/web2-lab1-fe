<template>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title class="text-title">Tournament Details</v-card-title>
          <v-card-text>
            <div class="text-large">
              <strong>Naziv:</strong> {{ this.naziv }}
            </div>
            <div class="text-large">
              <strong>Broj Runde:</strong> {{ this.brojrunde }}
            </div>
            <div class="text-large">
              <strong>Broj Natjecatelja:</strong> {{ this.brojnatjecatelja }}
            </div>
            <div class="text-large">
              <strong>Lista Natjecatelja:</strong> {{ this.listanatjecatelja }}
            </div>
            <div class="text-large">
              <strong>Lista Rezultata:</strong> {{ this.listarezultata }}
            </div>
            <div class="text-large">
              <strong>Pairing:</strong> {{ this.pairing }}
            </div>
            <div class="text-large">
              <strong>Format:</strong> {{ this.format }}
            </div>
            <div class="text-large">
              <strong>User ID:</strong> {{ this.userid }}
            </div>
          </v-card-text>
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
        this.userid = 1;
        this.natjecanjeid = 5;
        console.log("userid: " + this.userid);
        console.log("natjecanjeid: " + this.natjecanjeid);
        this.showTournamentsById();
    },
  };
  </script>
  <style>
  .text-large {
    font-size: 18px; /* Adjust the font size as needed */
  }
  
  .text-title {
    font-size: 24px; /* Adjust the title font size as needed */
  }
  </style>