<template>
  <v-app>
    <v-content>
      <v-layout>
        <img src="./assets/images/logo.svg" alt="Lucky Draw System" class="logo"/>
      </v-layout>
      <router-view />
    </v-content>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppFooter from "./components/footer"

export default {
  name: "App",
  components: { AppFooter },
  data: () => ({})
};
</script>

<style lang="scss">
@import "./assets/styles/variables.scss";

* {
  color: rgba(78, 75, 75, 0.933);
}

.v-content {
  margin-bottom: 40px;
}
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
