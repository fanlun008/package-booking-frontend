import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packagings: []
  },
  mutations: {

    loadAllPack(state, allPack) {
      state.packagings = allPack;
      console.log("mutations...", state.packagings)
    }

  },
  actions: {
    loadAllPack({commit}) {
      axios.get('http://localhost:9090/pack').then((response)=> {
        commit('loadAllPack', response.data)
      })
    },

    confirmpick({commit, dispatch}, id) {
      axios.put('http://localhost:9090/pack/status/'+id).then((response)=>{
        console.log("confirmpick...",response.data)
        dispatch('loadAllPack')
      })
    },

    addPack({commit, dispatch}, packaging) {
      axios.post('http://localhost:9090/pack', packaging).then((response)=> {
        console.log("addPack...", response.data)
        dispatch('loadAllPack')
      })
    }
  }
})
