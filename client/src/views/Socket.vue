<template>
  <div>
    <h1>Test Socket</h1>
  </div>
</template>

<script>
export default {
  name: 'Socket',
  sockets: {
    init (payload) {
      console.log(payload)
    }
  }
}
</script>

<style>

</style>