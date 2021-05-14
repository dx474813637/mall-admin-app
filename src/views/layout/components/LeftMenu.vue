<template>
  <div class="home-list">
    <a-menu
      mode="inline"
      theme="dark"
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      :inline-collapsed="$store.state.menuCollapsed"
    >
      <!-- :selectedKeys="selectedKeys"
      :default-selected-keys="[currentRoutes[1].name]"
      :default-open-keys="[currentRoutes[0].name]" -->
      <a-sub-menu v-for="(item) in $store.state.menuRoutes" :key="item.name" @titleClick="handletitleClick">
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
      selectedKeys: [],
      openKeys: [],
      key: new Date().getTime()
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.key = new Date().getTime()
        this.currentRoutes = this.$router.currentRoute.matched;
        this.openKeys = [this.currentRoutes[0].name] 
        this.selectedKeys = [this.currentRoutes[1].name]
      }
    }
  },
  methods: {
    handle({ item, key, selectedKeys }) {
      console.log({ item, key, selectedKeys })
      console.log(this.selectedKeys)
    },
    handleopenChange(openKeys) {
      console.log(openKeys)
    },
    handletitleClick({ key, domEvent }) {
      console.log({ key, domEvent })
      this.openKeys.push(key)
    }
  }
};
</script>

<style></style>
