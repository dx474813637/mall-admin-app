<template>
  <div>
    <search @search="handleSearch" :list="cList" />
    <product-list :list="pList" :pagination="pagination" @tableChange="handleTableChange" :category="cList" />
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
    }
  }
}
</script>

<style>

</style>