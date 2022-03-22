<template>
  <div id="app">
    <transition name="slide-fade"  class="layout-content">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">

</style>
