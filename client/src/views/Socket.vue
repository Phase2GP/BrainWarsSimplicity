<template>
  <div>
    <h1>Test Socket</h1>
    <form @submit.prevent='addUser' v-if="(status === false)">
      <label for="">NickName</label>
      <input type="text" v-model='user'>
      <input type="submit" value="submit">
    </form>
    
    <h3>{{getAnswerQuestion.question}}</h3>
    <input type="text" v-model="userAnswer">
    <button @click.prevent='changeQuestion'>submit</button>
    <div>
      <div v-if="this.getUsers.length > 0">
        <div v-for="(user, i) in this.getUsers" :key=i >
          <h5>{{user.name}}</h5>
          <h3>{{user.score}}</h3>
        </div>
      </div>
      <div v-if="Array.isArray(this.getUsers) === false">
        <div v-if="this.getUsers === user">
          <h1>Congratulation {{this.getUsers}}</h1>
          <button @click.prevent="clearAll">Done!</button>
        </div>
        <div v-if="this.getUsers !== user">
          <h1>You lose!</h1>
          <button @click.prevent="clearAll">Done!</button>
        </div>
      </div>
    </div>
      
    
  </div>
</template>

<script>
export default {
  name: 'Socket',
  data () {
    return {
      userAnswer: '',
      user: '',
      onlineUser: '',
      users: '',
      status: false,
      score: 0
    }
  },
  methods: {
    changeQuestion(){
      let random = Math.floor(Math.random() * 50)
      if(this.getAnswerQuestion.correctAnswer == this.userAnswer){
        this.score += 10
      } else {
        this.score += 0
      }
      let dataUser = {
        name: this.user,
        currentScore: this.score
      }
      this.$socket.emit('updateScore', dataUser)
      this.$socket.emit('newQuestion', random)
      this.userAnswer = ''
    },
    addUser(){
      let data = {
        name: this.user,
        score: 0
      }
      this.status = true
      this.$socket.emit('addUser', data)
    },
    clearAll(){
      this.$socket.emit('clearAll')
      this.score = 0
    }
  },
  computed: {
    getAnswerQuestion() {
      let answerQestion = {
        question: this.$store.state.question,
        correctAnswer: this.$store.state.correctAnswer
      }
      return answerQestion
    },
    getUsers() {
      return this.$store.state.users
    },
  },
}
</script>

<style>

</style>