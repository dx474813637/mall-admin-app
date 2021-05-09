<template>
  <a-table
    :columns="columns"
    :data-source="list"
    :pagination="pagination"
    :row-key="record => record.id"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="id" slot-scope="id"> {{ id }} </template>
    <span slot="action">
      action
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    
    scopedSlots: { customRender: "id" }
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
    
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
    
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    customRender: (text) => {
        if(text == 1) {
            return '上架'
        }else {
            return '下架'
        }
    }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    
  }
];

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        [];
      }
    },
    pagination: {
        type: Object,
        default: () => {
            return {}
        }
    }
  },
  watch: {
      list() {
          this.loading = false
      }
  },
  data() {
    return {
      data: [],
      loading: false,
      columns
    };
  },
  mounted() {
    // this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
        this.loading = true
      this.$emit('tableChange', pagination)
    }
  }
};
</script>
