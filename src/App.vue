<template>
  <v-app>
    <v-content>
      <v-layout>
        <img src="./assets/logo.svg" alt="Lucky Draw System" class="logo"/>
      </v-layout>
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
$mainColor: rgba(64, 172, 119, 1);
$subColor: rgb(126, 202, 165);

.logo {
  width: 100px;
  height: 100px;
  margin: 100px auto 20px;
}
.btn {
  width: 200px;
  font-size: 20px;
  margin: 30px auto;
}
.header {
  color: $mainColor;
  width: 100%;
  text-align: center;
}
.subtitle {
  color: $subColor;
  width: 100%;
  text-align: center;
}
.headline {
  color: $mainColor;
}
</style>
