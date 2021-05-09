<template>
  <div class="header-nav">
    <div class="nav-item">
      <a-button type="primary" @click="toggleCollapsed">
        <a-icon :type="$store.state.menuCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>
    <div class="nav-item">
      <a-breadcrumb>
        <a-breadcrumb-item>{{currentRoutes[0].meta.title}}</a-breadcrumb-item>
        <a-breadcrumb-item><router-link :to="{name: currentRoutes[1].name}">{{currentRoutes[1].meta.title}}</router-link></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="nav-right-user">
        <li class="item">用户名：{{$store.state.userInfo.username}}<a-icon type="caret-down" /></li>
        <li class="item" @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return{
      currentRoutes: this.$router.currentRoute.matched
    }
  },
  watch: {
    $route() {
      this.currentRoutes = this.$router.currentRoute.matched;
    }
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('handleChangeMenuCollapsed');
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
};
</script>

<style></style>
