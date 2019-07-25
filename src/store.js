import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packagings: [],
    visibility: 'all'
  },
  mutations: {

    loadAllPack(state, allPack) {
      state.packagings = allPack;
      console.log("mutations...", state.packagings)
    },

    setvisibility(state, type) {
      state.visibility = type;
      console.log('mutation...setvisibility', state.visibility)
    }

  },
  getters: {
    filterPack(state) {
      console.log("getters...", state.visibility);
      if(state.visibility === 'all') {
        return state.packagings;
      }
      if(state.visibility === 'appoint') {
        return state.packagings.filter(function(pack){
          return (pack.status === '已预约');
        })
      }
      if(state.visibility === 'picked') {
        return state.packagings.filter(function(pack){
          return (pack.status === '已取件');
        })
      }
      if(state.visibility === 'nopick') {
        return state.packagings.filter(function(pack){
          return (pack.status === '未取件');
        })
      }
    },
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
    },

    appointmentPick({commit, dispatch}, appointment) {
      axios.post('http://localhost:9090/appointment', appointment).then((response)=> {
        console.log("appointmentPick...", response.data)
        if(response.data === 'nobill') {
          alert('没有此运单');
          return;
        }
        if (response.data === 'haspick') {
          alert('该订单已取件');
          return;
        }
        dispatch('loadAllPack')
      })
    }
    
  }
})
