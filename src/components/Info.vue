<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex>
      <v-alert type="error" dismissible v-model="alert">
        {{ error }}
      </v-alert>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Quelques questions pour démarrer</h1>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="saveInfo">
        <v-layout column>
          <v-flex>
            <v-text-field
              name="culture"
              label="Culture"
              id="culture"
              type="text"
              v-model="culture"
              placeholder="de quelle(s) culture(s) vous définissez vous ? (Française, Japonaise, Tunisienne, Bretonne, Bigoudène, ...)"
              required></v-text-field>
			</v-flex>

          <v-flex>
            <v-radio-group label="Avez-vous une bonne compréhension du français ?" v-model="french" row required>
              <v-radio label="Oui" value='true'></v-radio>
              <v-radio label="Non" value='false'></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex>
            <v-radio-group label="Sexe " v-model="gender" row required>
              <v-radio label="Femme" value="woman"></v-radio>
              <v-radio label="Homme" value="man"></v-radio>
            </v-radio-group>

          </v-flex>
          <v-flex>
            <v-text-field
              name="age"
              label="Age"
              id="age"
              type="number"
              min="18" max="99"
              v-model="age"
              required
              ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn color="primary" type="submit" :disabled="loading" >Passons à l'écoute</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>
export default {
  data () {
    return {
      alert: false,
      culture: '',
      gender: '',
      age: '',
      french: 'true'
    }
  },
  methods: {
    saveInfo () {
      console.log('culture : ' + this.culture)
      this.$store.dispatch('createUser', { culture: this.culture, age: this.age, gender: this.gender, frenchSpeaking: this.french })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
