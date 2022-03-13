import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


export default createStore({
  plugins: [createPersistedState()],
  state: {
    username: '',
    password: '',
    userId: '',
    loggedIn: false,
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
    },
    saveUserId(state, userId){
      state.userId = userId;
    },
    logIn(state){
      state.loggedIn = true;
    },
    logOut(state){
      state.loggedIn = false;
    },
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
    },
    saveUserId({commit}, userId) {
      commit("saveUserId", userId);
    },
    logIn({commit}){
      commit("logIn");
    },
    logOut({commit}){
      commit("logOut");
    },
  },
  modules: {
  }
})
