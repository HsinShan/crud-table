<template>
  <v-container>
    <h1 class="header">Lucky Draw System</h1>
    <h3 class="subtitle">Easy, Convenient, and Funny!</h3>
    <v-layout>
      <v-btn color="info" class="teal accent-3 btn" @click="goNext()">Enter</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goNext() {
      this.$router.push({ name: "CrudTable" });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  margin: 100px auto 20px;
}
</style>

