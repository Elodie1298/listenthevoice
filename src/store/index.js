
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'Projet reconnaissance des émotions dans des extraits audio',
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    createUser ({commit}, payload) {
      commit('setLoading', true)
      payload.soundSet = 1 + Math.floor(Math.random() * 47)
      console.log('creating a user with : ' + JSON.stringify(payload))
      axios.post(`/v1/users`, payload)
      .then(response => {
        var savedUser = response.data
        console.log('reponse post user : ' + JSON.stringify(savedUser))
        savedUser.soundIndex = 1
        commit('setUser', savedUser)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/listen/' + savedUser.soundIndex)
      })
      .catch(e => {
        commit('setError', e)
        commit('setLoading', false)
      })
    },
    cancelUser ({commit}, payload) {
      commit('setLoading', true)
      console.log('cancel a user with : ' + JSON.stringify(this.state.user._id))
      axios.patch(`/v1/users/` + this.state.user._id, payload)
      .then(response => {
        var savedUser = response.data
        console.log('user has been cancel : ' + savedUser)
        commit('setUser', undefined)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/')
      })
      .catch(e => {
        commit('setError', e)
        commit('setLoading', false)
      })
    },
    saveChoice ({commit, state}, payload) {
      commit('setLoading', true)
      console.log('saving the choice ' + JSON.stringify(payload))
      var user = state.user
      console.log('user is  ' + JSON.stringify(user))
      if (user.soundIndex === undefined) {
        user.soundIndex = 1
      }
      user.soundIndex++
      console.log('user is now : ' + JSON.stringify(user))
      commit('setUser', user)
      payload.userId = user._id
      axios.post(`/v1/listenings`, payload)
      .then(response => {
        console.log('reponse post listening : ' + JSON.stringify(response.data))

        commit('setLoading', false)
        console.log('user Sound Index : ' + user.soundIndex)
        if (user.soundIndex > 14) {
          router.push('/evaluate')
        } else {
          console.log('user.soundIndex is now : ' + user.soundIndex)
          router.push('/listen/' + user.soundIndex)
        }
      })
      .catch(e => {
        commit('setError', e)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }

  }
})
