<template>
  <v-container>
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

</style>

