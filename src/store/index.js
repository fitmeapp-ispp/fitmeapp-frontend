import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import moment from "moment";


export default createStore({
  plugins: [createPersistedState()],
  state: {
    username: '',
    password: '',
    userId: '',
    loggedIn: false,
    fechaHome: moment().format('YYYY-MM-DD'),
    tipo: 'Almuerzo'
  },
  mutations: {
    saveUsername(state, username){
      state.username = username;
    },
    saveTipo(state, tipo){
      state.tipo = tipo;
    },
    saveFechaHome(state, fechaHome){
      state.fechaHome = fechaHome;
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
    saveTipo({commit}, tipo){
      commit("saveTipo", tipo);
    },
    saveFechaHome({commit}, fecha){
      commit("saveFechaHome", fecha);
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
