<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-title><strong>Create Tournament</strong></v-title>
          <v-text-field
            v-model="naziv"
            :counter="20"
            label="Naziv turnira"
            required
            hide-details
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

          <v-autocomplete
            v-model="format"
            :rules="[() => !!format || 'This field is required']"
            :items="formati"
            label="Format turnira"
            placeholder="Select..."
            hide-details
            required
          ></v-autocomplete>
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
          <v-btn color="dark" variant="text" @click="createTournament">
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
    formati: ["3/1/0", "1/0.5/0", "2/0", "1/0"],
    natjecatelji: [4, 5, 6, 7, 8],
    naziv: "",
    brojnatjecatelja: 4,
    listanatjecatelja: "",
    listarezultata: "",
    brojrunde: 1,
    format: "",
    userid: 0,
  }),

  methods: {
    createTournament() {
      var natjecatelj = [];
      natjecatelj = this.listanatjecatelja.split(",");
      this.brojnatjecatelja = natjecatelj.length;
      for (let i = 0; i < natjecatelj.length; i++) {
        if (this.format == "1/0" || this.format == "2/0") {
          this.listarezultata += "0/0,";
        } else {
          this.listarezultata += "0/0/0,";
        }
      }
      this.listarezultata = this.listarezultata.slice(0, -1);
      console.log(
        this.naziv +
          " " +
          this.brojnatjecatelja +
          " " +
          this.listanatjecatelja +
          " " +
          this.listarezultata +
          " " +
          this.brojrunde +
          " " +
          this.format +
          " " +
          this.userid
      );
      TournamentService.createTournament({
        naziv: this.naziv,
        brojnatjecatelja: natjecatelj.length,
        listanatjecatelja: this.listanatjecatelja,
        listarezultata: this.listarezultata,
        format: this.format,
        userid: this.userid,
      }).then((response) => {
        if (response.status == 200) {
          alert("Tournament was created.");
        }
      });
    },
  }, //Hrvoje H, Dominik P, Luka F, Patrik C, Sandro K, Kristijan C, Vlatko C, Juraj V

  created() {
    this.userid = this.$store.getters.userid;
    console.log(this.userid);
  },
};
</script>