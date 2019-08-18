<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    @click="handeClick"
    :disabled="!canClick"
  >{{showText}}</el-button>
</template>

<script>
import { value, computed, onMounted } from "vue-function-api";
import { setInterval, clearInterval } from "timers";

const time = 30;

export default {
  name: "CountButton",
  props: ["text"],
  setup(props, ctx) {
    const canClick = value(true);
    const number = value(0);

    const handeClick = () => {
      number.value = time;
      canClick.value = false;
      ctx.emit("on-click");

      let timer = setInterval(() => {
        number.value--;
        if (number.value === 0) {
          canClick.value = true;
          clearInterval(timer);
        }
      }, 1000);
    };

    onMounted(() => {
      handeClick();
    });

    let showText = computed(() => {
      if (canClick.value) return props.text;
      return `${number.value} 秒后重试`;
    });

    return {
      canClick,
      showText,
      handeClick
    };
  }
};
</script>

<style>
</style>