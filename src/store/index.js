import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    username: '',
    password: ''
  },
  mutations: {
    saveUsername(state, username){
      state.username = username;
    },
    savePassword(state, password){
      state.password = password;
    },
    removeCredentialsUser(state){
      state.username = '';
      state.password = '';
    }
  },
  actions: {
    saveUsername({commit}, username){
      commit("saveUsername", username);
    },
    savePassword({commit}, password){
      commit("savePassword", password);
    },
    removeCredentialsUser({commit}){
      commit("removeCredentialsUser");
    }
  },
  modules: {
  }
})
