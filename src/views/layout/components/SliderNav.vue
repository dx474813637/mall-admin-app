<template>
  <div class="header-nav">
    <div class="nav-item">
      <a-button type="primary" @click="toggleCollapsed">
        <a-icon :type="$store.state.menuCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>
    <div class="nav-item">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="nav-right-user">
        <li class="item">用户名：dasnjk63<a-icon type="caret-down" /></li>
        <li class="item">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('handleChangeMenuCollapsed');
    },
  },
};
</script>

<style></style>
