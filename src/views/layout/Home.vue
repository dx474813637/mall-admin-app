<template>
  <div class="home">
    <LeftMenu />
    <div class="home-view" :class="{'menu-fold': $store.state.menuCollapsed}">
      <SliderNav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/views/layout/components/LeftMenu.vue';
import SliderNav from '@/views/layout/components/SliderNav.vue';

export default {
  name: 'Home',
  data() {
    return {
      collapsed: false,
      key: new Date().getTime()
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime()
    }
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");

</style>
