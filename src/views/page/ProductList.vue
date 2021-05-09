<template>
  <div>
    <search @search="handleSearch" :list="cList" />
    <product-list 
      :list="pList" 
      :pagination="pagination"
      @tableChange="handleTableChange" 
      :category="cList" 
      @editProduct="handleEdit"
      @deleteProduct="handleDelete"
    />
  </div>
</template>

<script>
import Search from '@/components/Search'
import ProductList from '@/components/ProductList'
import api from '@/api/product'
import api2 from '@/api/category'
export default {
  data() {
    return {
      pList: [],
      cList: [],
      paramsObj: {
        page: 1,
        size: 10
      },
      params: {},
      pagination: {}
    }
  },
  components: {
    Search,
    ProductList
  },
  async created() {
    let res = await api2.category()
    this.cList = res.data.data
    this.getData()
  },
  methods: {
    handleSearch(params) {
      this.params = params
      this.paramsObj.page = 1
      this.getData(params)
    },
    getData(params) {
      api.productsAll({...params, ...this.paramsObj})
      .then(res => {
        this.pList = res.data.data.map(ele => {
          ele.categoryName = this.cList.filter(item => item.id == ele.category )[0].name
          return ele
        })
        this.pagination = {
          total: res.data.total,
          current: this.paramsObj.page
        }
      })
    },
    handleTableChange(obj) {
      this.pagination = obj
      this.paramsObj.page = obj.current
      this.getData(this.params)
    },
    handleEdit(obj) {
      // console.log(obj)
      this.$router.push(`/product/edit/${obj.id}`)
    },
    handleDelete(obj) {
      this.$confirm({
        title: '删除确认提示框',
        content: `是否删除id：${obj.id}，标题：${obj.title}的商品吗？`,
        okText: '确认删除',
        cancelText: '取消',
        onOk: () => {
          api.productDelete(obj.id).then(res => {
            this.$message.success('商品删除成功！');
            this.getData()
          })
        }
      });
      
    }
  }
}
</script>

<style>

</style>