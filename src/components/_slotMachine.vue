<template>
  <div class="slotMachineDiv" ref="slotMachineDiv">
    <div ref="slotMachine"></div>
  </div>
</template>

<script>
import Konva from "konva";
export default {
  props: {
    list: {
      type: Array,
      default: null
    },
    trigger: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: -1
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      canvasConfig: {
        height: null,
        width: null,
        centerY: 0
      },
      itemConfig: {
        x: 0,
        y: 0,
        fontSize: 0,
        spacing: 0,
        width: 0,
        height: 0, // 產生時所需的高
        startY: 0, // 產生時的起始位置
        align: "center",
        wrap: "none",
        ellipsis: true
      },
      animation: null,
      stopping: false,
      currentItem: null,
      acc: 100,
      stage: null,
      layer: null
    };
  },
  methods: {
    initSetting() {
      this.canvasConfig.height = this.height;
      this.canvasConfig.width = this.width;
      this.canvasConfig.centerY = this.canvasConfig.height / 2;
    },
    refreshTextSetting() {
      this.itemConfig.width = this.canvasConfig.width;
      this.itemConfig.fontSize = Math.ceil(this.canvasConfig.height / 5);
      this.itemConfig.height = Math.ceil(this.itemConfig.fontSize);
      this.itemConfig.startY = -this.itemConfig.height;
    },
    initCanvas() {
      this.stage = new Konva.Stage({
        container: this.$refs["slotMachine"],
        width: this.canvasConfig.width,
        height: this.canvasConfig.height
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      if (this.responsive) {
        this.$refs["slotMachine"].children[0].style.width = "100%";
        this.$refs["slotMachine"].children[0].style.height = "auto";
        this.$refs["slotMachine"].children[0].style["padding-bottom"] = `${(this
          .canvasConfig.height /
          this.canvasConfig.width) *
          100}%`;
        this.$refs["slotMachine"].children[0].children[0].style.width = "100%";
        this.$refs["slotMachine"].children[0].children[0].style.height = "100%";
      }
    },
    drawBorder() {
      this.layer.add(
        new Konva.Line({
          x: 0,
          y: 0,
          points: [
            0,
            this.canvasConfig.centerY + this.itemConfig.height / 2,
            this.canvasConfig.width,
            this.canvasConfig.centerY + this.itemConfig.height / 2
          ],
          stroke: "#999",
          dash: [1],
          opacity: 0.5
        })
      );
      this.layer.add(
        new Konva.Line({
          x: 0,
          y: 0,
          points: [
            0,
            this.canvasConfig.centerY - this.itemConfig.height / 2,
            this.canvasConfig.width,
            this.canvasConfig.centerY - this.itemConfig.height / 2
          ],
          stroke: "#999",
          dash: [1],
          opacity: 0.5
        })
      );
      this.layer.add(
        new Konva.Rect({
          x: 0,
          y: 0,
          width: this.canvasConfig.width,
          height: this.canvasConfig.height,
          stroke: "yellow",
          strokeWidth: 5
        })
      );
      this.stage.draw();
    },
    drawItems() {
      this.items.forEach(e => {
        e.remove();
      });
      this.items = [];
      let list =
        this.list.length > 3 ? [...this.list] : [...this.list, ...this.list];
      list.forEach((e, index) => {
        let text = new Konva.Text(
          Object.assign(this.itemConfig, {
            text: e.text,
            fill: e.color || "#000",
            y: index * this.itemConfig.height + this.itemConfig.startY,
            data: e
          })
        );
        this.layer.add(text);
        this.items.push(text);
      });
      this.stage.draw();
    },
    drawAll() {
      this.layer.children.forEach(e => e.remove());
      this.drawItems();
      this.drawBorder();
    },
    start() {
      this.acc = 100;
      this.stopping = false;
      this.currentItem =
        this.currentIndex === -1
          ? this.items[this.random(0, this.items.length - 1)]
          : this.items[this.currentIndex];
      this.animation.start();
    },
    complete() {
      this.$emit("onComplete", this.currentItem.attrs.data);
    },
    moveItems(acc) {
      this.items.forEach(e => {
        let y =
          ((acc + e.y() - this.itemConfig.startY) %
            (this.items.length * this.itemConfig.height)) +
          this.itemConfig.startY;
        e.setY(y);
      });
    },
    tweenMoveItems(distance) {
      this.items.forEach(e => {
        let tween = new Konva.Tween({
          node: e,
          duration: 0.1,
          y: e.y() + distance
        });
        tween.play();
      });
    },
    createAnimation() {
      let self = this;
      this.animation = new Konva.Animation(function() {
        self.moveItems(self.acc);
        if (!self.stopping && self.acc > 25) {
          self.acc = Math.max(self.acc - Math.random(), 25);
        } else {
          self.stopping = true;
        }
        if (
          self.stopping &&
          self.currentItem.y() > 0 &&
          self.currentItem.y() < self.canvasConfig.centerY
        ) {
          self.tweenMoveItems(
            self.canvasConfig.centerY -
              (self.currentItem.y() + self.itemConfig.fontSize / 2.5)
          );
          self.acc = 0;
          self.animation.stop();
          self.complete();
        } else if (
          self.stopping &&
          self.currentItem.y() > self.canvasConfig.centerY
        ) {
          self.acc = Math.max(self.acc - (Math.random() % 0.2), 5);
        }
      }, this.layer);
    },
    random(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  },
  watch: {
    trigger() {
      this.start();
    },
    list() {
      if (this.stage != null) {
        this.drawAll();
      }
    }
  },
  mounted() {
    this.initSetting();
    this.initCanvas();
    this.refreshTextSetting();
    this.createAnimation();
    this.drawAll();
  }
};
</script>

<style scoped lang="scss">
.slotMachineDiv {
  position: relative;
}
</style>

