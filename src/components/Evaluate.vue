<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Voilà c'est fini, merci pour votre aide</h1>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-left" mt-5>
        <v-btn color="primary" v-on:click="annulez">Annulez ! j'ai fait n'importe quoi</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-left" mt-5>
        <v-btn color="primary" to="/">C'est bon, je valide !</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      alert: false
    }
  },
  methods: {
    annulez () {
      console.log('Annulation de la participation  ')
      this.$store.dispatch('cancelUser', { cancel: true })
    }
  }
}
</script>
