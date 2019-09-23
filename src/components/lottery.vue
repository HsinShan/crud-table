<template>
  <v-container>
    <slot-machine
        :list="options"
        :trigger="trigger"
        :height="300"
        :width="300"
        @onComplete="onComplete">
    </slot-machine>
    <v-btn small color="info" class="green accent-3 addBtn" @click="startSpin()">start</v-btn>
  </v-container>
</template>

<script>
import { SlotMachine } from '@puckwang/vue-slot-machine';

export default {
  components: { "slot-machine": SlotMachine },
  data() {
    return {
      participants: [],
      options: [],
      trigger: null,
      winner: null
    };
  },
  created () {
    this.$bus.on('participantList', (list)=>{
      this.participants = list
      this.participants.map((item)=> {
        this.options.push({
          color: "#" + Math.random().toString().slice(2,8),
          text: item.name
        })
      });
    })
  },
  methods: {
    startSpin () {
      this.trigger = "Go"
    },
    onComplete(name) { 
      this.winner = name
    }
  },
  beforeDestroy () {
    this.$bus.on('participantList',this.participants)
  },
};
</script>
<style lang="scss" scoped>

</style>

