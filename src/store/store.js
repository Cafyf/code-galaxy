import { createStore } from 'vuex';

const store = createStore({
  state: {
    questions: '',
    sessionData: [],
    currentSession: {},
    sessionManagerDetails: {},
    singleQuestion: {},
    lastRunnedStatus: '',
    isDefaultTestAccepted: '',
    retainedCode: '',
    codeStatus: ''
  },
  getters: {},
  mutations: {
    saveQuestions(state, questions) {
      state.questions = questions;
    },
    updateDefaultTestAccepted(state, status) {
      state.isDefaultTestAccepted = status;
    },
  },
  actions: {
    storeQuestions({ commit }, questions) {
      commit('saveQuestions', questions);
    },
    setDefaultTestAccepted({ commit }, status) {
      commit("updateDefaultTestAccepted", status);
    },
  },
  modules: {}
});

export default store;
