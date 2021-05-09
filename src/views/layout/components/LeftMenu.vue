<template>
  <div class="home-list">
    <a-menu
      :default-selected-keys="[currentRoutes[1].name]"
      :default-open-keys="[currentRoutes[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.menuCollapsed"
    >
      <!-- :selectedKeys="selectedKeys" -->
      <a-sub-menu v-for="(item) in $store.state.menuRoutes" :key="item.name">
        <span slot="title"><a-icon :type="item.meta.icon" /><span>{{item.meta.title}}</span></span>
        <template v-if="item.children">
          <a-menu-item v-for="(ele) in item.children" :key="ele.name">
            <router-link :to="{name: ele.name}">
              <a-icon :type="ele.meta.icon" />{{ele.meta.title}}
            </router-link>
            
          </a-menu-item>
        </template>
        
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return{
      currentRoutes: this.$router.currentRoute.matched,
      selectedKeys: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.currentRoutes = this.$router.currentRoute.matched;
        this.selectedKeys = [this.currentRoutes[1].name]
      }
    }
  },
  methods: {
    handle({ item, key, keyPath }) {
      console.log(key)
    }
  }
};
</script>

<style></style>
