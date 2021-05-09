<template>
  <a-form-model 
    layout="inline" 
    :model="formInline"
    @submit="handleSubmit" 
    @submit.native.prevent
   >
    <a-form-model-item label="检索关键字">
      <a-input v-model="formInline.searchWord"></a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select allowClear style="width: 200px" show-search v-model="formInline.category" placeholder="选择商品类目">
        <a-select-option v-for="(item) in list" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit">
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
  data() {
    return {
      formInline: {
        searchWord: "",
        category: ""
      },
    };
  },
  created() {
      
  },
  methods: {
    handleSubmit(e) {
      this.$emit('search', this.formInline)
    }
  }
};
</script>
