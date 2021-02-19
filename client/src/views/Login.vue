<template>
  <div
    class="container is-fluid"
    id="landingpage"
    style="height: 100vh; margin: 0; padding: 0;">
    <!-- COLUMN FOR CREATE ROOM -->
      <div class="container" style="height: 100%; text-align: center;">
        <div
          class="container is-fluid"
          style="width: 100%;height: 100%; align-items: center;align-content: center;display: flex; justify-content: center;">
          <form
            class="box"
            style="max-width: 50%; height: 60vh; align-content: center;">
            <div class="field">
              <label class="label">Enter your username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="bestplayer101"
                  v-model="user"/>
              </div>
            </div>
            <button class="button is-primary" @click.prevent="addUser">Join game</button>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      user: '',
    }
  },
  methods: {
    addUser(){
      let data = {
        name: this.user,
        score: 0
      }
      this.status = true
      this.$store.dispatch('addSingleUser', data)
      this.$socket.emit('addUser', data)
      this.$router.push('/home')
    },
  }
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