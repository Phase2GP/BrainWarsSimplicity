import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question: '',
    correctAnswer: '',
    userAnswer: '',
    username: '',
    users: [],
    status: false,
    score: 0,
    activeUser: ''
  },
  mutations: {
    updateQuestion(state, payload) {
      state.question = payload
    },
    updateAnswer(state, payload) {
      state.correctAnswer = payload
    },
    updateUser(state) {
      state.username = ''
    },
    updateStatus(state) {
      state.status = false
    },
    updateUsers(state, payload) {
      state.users = payload
    },
    updateActiveUser(state, payload) {
      state.activeUser = payload
    }
  },
  actions: {
    SOCKET_init(context, payload) {
      let random = Math.floor(Math.random() * 50)
      context.commit('updateQuestion', payload[random].question)
      context.commit('updateAnswer', payload[random].answer)
    },
    SOCKET_newServerUser(context, payload) {
      if (!payload.length) {
        context.commit('updateUser')
        context.commit('updateStatus')
      }
      context.commit('updateUsers', payload)
    },
    SOCKET_newServerQuestion(context, payload) {
      context.commit('updateQuestion', payload.question)
      context.commit('updateAnswer', payload.answer)
    },
    SOCKET_newServerScore(context, payload) {
      context.commit('updateUsers', payload)
    },
    addSingleUser(context, payload) {
      context.commit('updateActiveUser', payload)

    }
  }
})
