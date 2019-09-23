<template>
  <v-container>
    <h1 class="header">Lucky Draw System</h1>
    <h3>Easy, Convenient, and Funny!</h3>
    <v-btn small color="info" class="green accent-3 addBtn" @click="goNext()">Enter</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goNext () {
      this.$router.push({name: 'CrudTable'})
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  color: rgba(64, 172, 119, 1);
  width: 100%;
  text-align: center;
}
</style>

