<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Bienvenue sur notre application de validation de corpus</h1>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
En participant à notre test, vous nous permettez de valider notre base de données d'enregistrements de voix, exprimant une émotion parmi celles que nous avons retenues : Joie, Tristesse, Dégout, Colère, Surprise, Peur et Neutre.
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
Le test est anonyme et consiste à répondre à quelques questions (pour valider des hypothèses selon l'age, la culture, etc.)
puis à écouter et donner votre ressenti sur 14 enregistrements de quelques secondes.
  </v-flex>
<v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
  <v-btn color="primary" to="/info">Let's Start</v-btn>
</v-flex>
<v-flex xs12 sm6 offset-sm3 mt-3>
Quelques mots sur nous :
</v-flex>
<v-flex xs12 sm6 offset-sm3 mt-3>
Ce projet est mené au Mans par Youssef Serrestou (1), Catherine Cléder (2), Leila Kerkeni (1) et Kosai Raoof (1) qui sont chercheurs aux laboratoires LAUM (1) et CREN (2).<br>Pour toute information n'hésitez pas à contacter Catherine Cléder : <a href="catherine.cleder@univ-lemans.fr" >catherine.cleder@univ-lemans.fr</a>
</v-flex>
<v-flex xs12 sm6 offset-sm3 mt-3>
Nous en profitons pour remercier tous les étudiants qui travaillent ou ont travaillé avec nous, à la construction de ce corpus : Manuella, Christophe, Amelle, Constance, Kiéran, Ludovic, Rubens, et tous ceux qui ont preté leurs voix pour les enregistrements.
  </v-flex>
  <v-flex  offset-sm3 mt-3>
  <img src="@/assets/cren.png" sm3 alt="">
  <img src="@/assets/laum.png" sm3 alt="">
  </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {}
</script>
