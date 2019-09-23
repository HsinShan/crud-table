<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({})
};
</script>

<style lang="scss">
.btn {
  width: 200px;
  font-size: 20px;
  margin: 30px auto;
}
.header {
  color: rgba(64, 172, 119, 1);
  width: 100%;
  text-align: center;
}
.subtitle {
  color: rgb(126, 202, 165);
  width: 100%;
  text-align: center;
}
</style>
