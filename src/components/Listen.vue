<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Ecoutez le son {{ soundIndex }} sur 14</h1>
          <label>
            <v-btn color="primary" @click.prevent="playSound()">J'écoute le son</v-btn>
          </label>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5 v-if="soundPlayAtLeastOneTime">

      <form v-model="valid" ref="EmoForm" v-on:submit.prevent="submit" lazy-validation>
        <v-layout column >
        <v-flex class="text-md-left" >Ce son vous semble plutôt positif ou négatif ?</v-flex>
        <v-flex  >
          <v-radio-group v-model="category" v-validate="category"  row mandatory >
            <v-radio label="Positif ou neutre" value="positif"></v-radio>
            <v-radio label="Négatif" value="negatif"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex class="text-md-left">D'après vous de quelle émotion s'agit-il ?</v-flex>
          <v-flex >
            <v-radio-group v-model="emotion" v-validate="emotion" row mandatory >
              <v-tooltip bottom><v-radio slot="activator" label="Colère" value="Colère"></v-radio><span>La colère est définie comme un sentiment impulsif de protestation, d'irritation d'exaspération ou de frustration envers quelqu'un ou quelque chose.</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="Peur" value="Peur"></v-radio><span>La peur se produit face à une situation de danger éventuelle, quand on se sent menacé, physiquement ou psychologiquement.</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="Dégout" value="Dégout"></v-radio><span>Le dégout est un rejet instinctif ou culturel assez violent de quelque chose dont on n'a pas le goût (ni à manger, toucher ou sentir)</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="joie" value="joie"></v-radio><span>La joie es tune émotion vive qui procure un sentiment de plénitude.</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="tristesse" value="tristesse"></v-radio><span>La tristesse est une réaction douloureuse que l'on ressent en présence de quelque chose de désagréable.</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="suprise" value="suprise"></v-radio><span>La surprise est une émotion ressentie lorsque vous faites face à une situation inattendue. Elle peut être bonne ou mauvaise.</span>
              </v-tooltip>
              <v-tooltip bottom><v-radio slot="activator" label="neutre" value="neutre"></v-radio><span>L'émotion neutre se traduit par l'absence des autres émotions. Ce sont les situations les plus basiques de la vie courante.</span>
              </v-tooltip>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center" mt-1>
            <v-btn  type="submit" :class="{ red: !valid, green: valid }">Valider votre choix</v-btn>
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
      soundIndex: this.$route.params.index,
      category: '',
      emotion: '',
      soundPlayAtLeastOneTime: false,
      choiceHasBeenMade: false
    }
  },
  methods: {
    playSound () {
      console.log('sound: ' + this.soundName)
      if (this.soundName) {
        var audio = new Audio(this.soundName)
        audio.play()
        this.soundPlayAtLeastOneTime = true
      }
    },
    submit () {
      console.log(' submit : ' + this.category + ' / ' + this.emotion)
      if (this.category !== '' && this.emotion !== '') {
        console.log('save Emotion')
        this.$store.dispatch('saveChoice', { name: this.soundName, emotion: this.emotion, category: this.category })
        this.soundIndex++
        this.category = ''
        this.emotion = ''
        this.soundPlayAtLeastOneTime = false
      }
    }
  },
  computed: {
    soundSet () {
      console.log('user ? : ' + this.$store.state.user)
      return this.$store.state.user.soundSet
    },
    soundName () {
      return '/static/audio/ensemble ' + this.soundSet + '/' + this.$store.state.user.soundList[this.$route.params.index - 1]
    },
    valid () {
      return (this.category !== '' && this.emotion !== '')
    }
  }
}
</script>
