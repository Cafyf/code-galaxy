import { createStore } from 'vuex';

const store = createStore({
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
