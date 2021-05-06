<template>
  <div class="home-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name: '']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.menuCollapsed"
    >
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
  methods: {
  }
};
</script>

<style></style>
