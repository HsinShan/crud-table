<template>
  <v-container>
    <v-layout>
      <slot-machine
        :list="options"
        :trigger="trigger"
        :height="250"
        :width="500"
        @onComplete="onComplete"
        :reponsive="true"
        class="slotGame"
      ></slot-machine>
    </v-layout>
    <v-layout>
      <v-btn color="info" v-if="!isEnd" class="teal accent-3 btn" @click="startSpin()">start</v-btn>
      <v-btn v-else class="yellow lighten-1 btn" @click="finish()">OK</v-btn>
    </v-layout>
    <v-dialog v-model="isOpen" max-width="400">
      <v-card v-if="winnerInfo">
        <v-card-title class="headline">Winner is {{winner}}</v-card-title>
        <v-card-text>
          <h4>Winner's Information</h4>
          <p>No. :{{winnerInfo.id}}</p>
          <p>Name :{{winnerInfo.name}}</p>
          <p>Phone. :{{winnerInfo.phone}}</p>
          <p>Email :{{winnerInfo.email}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="goBack()">Restart</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { SlotMachine } from "@puckwang/vue-slot-machine";

export default {
  components: { "slot-machine": SlotMachine },
  data() {
    return {
      participants: [],
      options: [],
      trigger: null,
      winner: null,
      winnerInfo: null,
      isEnd: false,
      isOpen: false
    };
  },
  created() {
    this.$bus.on("participantList", list => {
      this.participants = list;
      this.participants.map(item => {
        this.options.push({
          color:
            "#" +
            Math.random()
              .toString()
              .slice(2, 8),
          text: item.name
        });
      });
    });
  },
  methods: {
    startSpin() {
      this.trigger = "Go";
    },
    onComplete(name) {
      this.winner = name.text;
      this.isEnd = true;
      this.winnerInfo = this.participants.find(participant => {
        return (participant.name = name.text);
      });
    },
    finish() {
      this.isOpen = true;
    },
    goBack() {
      this.$router.push({ name: "CrudTable" });
    }
  },
  beforeDestroy() {
    this.$bus.on("participantList", this.participants);
  }
};
</script>
<style lang="scss" scoped>
.slotGame {
  margin: auto;
}
</style>

