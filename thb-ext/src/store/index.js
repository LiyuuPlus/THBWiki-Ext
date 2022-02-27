import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    options: {}
  },
  mutations: {
    setOption(state, { key, value }) {
      state.options[key] = value;
    },
    setOptions(state, opetions) {
      state.options = opetions; 
    }
  },
  actions: {
  },
  modules: {
  }
})
