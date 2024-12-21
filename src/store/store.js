import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    questions :'',
    sessionData:[],
    currentSession:{},
    sessionManagerDetails:{},
    singleQuestion:{},
    lastRunnedStatus:'',
    isDefaultTestAccepted:'',
    retainedCode:'',
    codeStatus:''
  },
  getters: {},
  mutations: {
    setPreservedState(state, preservedState) {
      state.questions = preservedState;
    },
  },
  actions: {
    setPreservedState(state, preservedState) {
      state.questions = preservedState;
    }
  },
  modules: {}
});

export default store;
