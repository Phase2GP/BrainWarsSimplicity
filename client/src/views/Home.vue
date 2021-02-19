<template>
    <div
      class="container is-fluid"
      id="landingpage"
      style="height: 100vh; margin: 0; padding: 0;"
    >
      <nav
        class="navbar is-light"
        role="navigation"
        aria-label="main navigation"
        style="position: sticky;"
      >
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="https://bulma.io"
            style="align-items: center;"
          >
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
        </div>
      </nav>
      <!--   ROOM LIST   -->
      <div class="container is-fluid" style="justify-content: space-around">
        <section class="section" style="margin: 30px; height: 100vh;">
          <div class="columns is-centered">
            <!-- COLUMN FOR ROOM LIST -->
            <div
              class="column is-one-third is-centered"
              style="height: 90vh; padding: 0 40px;"
            >
              <div class="box" style="height: 100%; text-align: center;">
                <h2 class="title is-2">User Lists</h2>
                <!-- LIST ROOMS -->
                <div v-if="this.getUsers.length > 0">
                  <div v-for="(user, i) in this.getUsers" :key=i class="card block">
                    <header class="card-header">
                      <p class="card-header-title">
                        {{user.name}}
                      </p>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        Score: {{user.score}}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- LIST ROOMS -->
                
              </div>
            </div>

            <!-- COLUMN FOR CREATE ROOM -->
            <div class="column is-centered" style="padding: 0 40px;">
              <div class="container" style="height: 100%; text-align: center;">
                <div
                  class="container is-fluid"
                  style="width: 100%;height: 100%; align-items: center;align-content: center;display: flex; justify-content: center;"
                >
                <div class="container block">
                  <div class="container is-fluid block">
                    <h1 class="title">{{getAnswerQuestion.question}}</h1>
                  </div>

                  <br />
                  <div class="container is-fluid block">
                    <input type="text" class="input mb-3" v-model="userAnswer">
                    <button class="button is-info is-outlined is-medium block" @click.prevent='changeQuestion'>submit</button>
                  </div>
                  <div class="container is-fluid block">
                    <div v-if="Array.isArray(this.getUsers) === false">
                      <div v-if="this.getUsers === this.$store.state.activeUser.name">
                        <h1>Congratulation {{this.getUsers}}</h1>
                        <button @click.prevent="clearAll">Done!</button>
                      </div>
                      <div v-if="this.getUsers !== this.$store.state.activeUser.name">
                        <h1>You lose!</h1>
                        <button @click.prevent="clearAll">Done!</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
 name: 'Home',
  data () {
    return {
      userAnswer: '',
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
        name: this.$store.state.activeUser.name,
        currentScore: this.score
      }
      this.$socket.emit('updateScore', dataUser)
      this.$socket.emit('newQuestion', random)
      this.userAnswer = ''
    },

    clearAll(){
      this.$socket.emit('clearAll')
      this.score = 0
      this.$router.push('/')
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
    *,
    html {
      margin: 0;
      padding: 0;
    }
    .body {
      margin: 0;
      padding: 0;
    }
    .box {
      flex: 1 1 auto;
      overflow-y: auto;
    }
</style>
