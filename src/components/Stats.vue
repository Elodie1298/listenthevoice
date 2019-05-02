<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>statistiques des réponses</h1>
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-left" mt-5>
      Nb users : {{ nbUser }}
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-left" mt-5>
      Nb users complet : {{ nbComplet }}
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-left" mt-5>
      Nb sons écoutés : {{ nbUser }}
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
data () {
  return {
    alert: {},
    error: null,
    nbUser: 0,
    nbComplet: 0,
    nbSonEcoute: 0

  }
},
mounted:function(){
       this.readTheStats() //this method will execute at pageload
 },
methods: {
  readTheStats() {
  axios.get(`/v1/users/stats`, {})
  .then(response => {
    console.log('reponse stats : ' + JSON.stringify(response.data))

    response.data.forEach(function(user) {
    
      this.nbUser += 1
      if (user.cancel === "false" && user.listenings.length === 14) {
      this.nbComplet += 1
      }
      this.nbSonEcoute += user.listenings.length
    })
  })
  .catch(e => {
    this.error = e
  })
  }
},
computed: {

}


}
</script>
