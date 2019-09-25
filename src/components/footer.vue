<template>
  <v-bottom-navigation class="bottomNav">
    <div>
    More Projects made by Shirley: <a href="http://shirleytech.herokuapp.com/portfolio/"  class="link">Shirley's Collection</a>
    </div>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
.bottomNav {
  box-shadow: 0 0 4px 2px $lighterGreen !important;
  height: 40px;
  line-height: 3;
  position: fixed;
  bottom: 0;
  z-index: 1;
  .link {
    color: $mainColor;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>

