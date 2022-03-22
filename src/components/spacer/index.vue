<template>
  <div :class="[ heightClass ]"></div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      require: true,
      validator(value) {
        return value < 300;
      }
    }
  },
  computed: {
    heightClass() {
      return `height-${this.height}`;
    }
  }
}
</script>
<style lang="less" scoped>
.generate-columns(300);
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .height-@{i} {
    height: @i * 1px;
  }
  .generate-columns(@n, (@i + 1));
}
</style>