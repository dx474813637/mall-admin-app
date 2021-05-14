<template>
  <div class="wrap">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="title" label="商品标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>

      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model="form.category"
          placeholder="please select your category"
          @change="handleChangeCategory"
        >
          <a-select-option
            v-for="(item) in $store.state.category"
            :key="item.id"
            :value="item.id"
          >{{item.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品子类目" prop="items">
        <a-select
          mode="multiple"
          :default-value="itemsArr"
          style="width: 100%"
          placeholder="Please select"
          @change="handleChangeItems"
          :key="key"
        >
          <a-select-option v-for="(item, index) in cateItems" :key="index" :value="item">{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          :default-value="form.tags"
          style="width: 100%"
          placeholder="Please select"
          @change="handleChangeTags"
          :key="key"
        >
          <a-select-option v-for="(item, index) in tagsAll" :key="index" :value="item">{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="price" label="商品价格" prop="price">
        <a-input-number :min="0" v-model="form.price" :step="0.01" @change="onChangePrice" />
      </a-form-model-item>
      <a-form-model-item ref="price_off" label="商品折扣价" prop="price_off">
        <a-input-number :min="0" v-model="form.price_off" :step="0.01" @change="onChangePriceOff" />
      </a-form-model-item>
      <a-form-model-item ref="unit" label="商品单位" prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
        <a-input-number :min="0" v-model="form.inventory" :step="1" />
      </a-form-model-item>
      <a-form-model-item label="上架状态" prop="status">
        <a-switch v-model="status" />
      </a-form-model-item>
      <a-form-model-item label="商品图片" prop="images">
        <div class="clearfix">
          <a-upload
            action="https://mallapi.duyiedu.com/upload/images"
            list-type="picture-card"
            :data="file => {
              return {
                'appkey': $store.state.userInfo.appkey,
                'avatar': file
              }
            }"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">Reset</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import api from "@/api/category";
import api2 from "@/api/product";
export default {
  data() {
    return {
      id: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        title: "",
        desc: "",
        category: undefined,
        c_items: "",
        tags: [],
        price: undefined,
        price_off: undefined,
        unit: "",
        status: 0,
        images: [],
        inventory: undefined
      },
      key: new Date().getTime(),
      cateCurIndex: undefined,
      rules: {
        title: [
          {
            required: true,
            message: "Please input title",
            trigger: ["blur", "change"]
          }
        ],
        category: [
          {
            required: true,
            message: "Please select category",
            trigger: "change"
          }
        ],
        tags: [
          { required: true, message: "Please select tags", trigger: "change" }
        ],
        price: [
          { required: true, message: "Please input price", trigger: "blur" }
        ],
        price_off: [
          { required: true, message: "Please input price", trigger: "blur" }
        ],
        unit: [
          {
            required: true,
            message: "Please input unit",
            trigger: ["blur", "change"]
          }
        ],
        inventory: [
          { required: true, message: "Please input inventory", trigger: "blur" }
        ],
        images: [
          { required: true, message: "Please upload images", trigger: "change" }
        ]
      },
      previewVisible: false,
      previewImage: "",
      status: false,
      tagsArr: [],
      tagsAll: ["包邮", "限时秒杀", "24小时发货", "最快次日达"],
      itemsArr: [],
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ]
    };
  },
  async created() {
    if (this.$store.state.category.length == 0) {
      let res = await api.category();
      this.$store.dispatch("changeCategory", res.data.data);
    }
  },
  computed: {
    cateItems() {
      if (this.cateCurIndex === undefined) return [];
      return this.$store.state.category[this.cateCurIndex].c_items;
    }
  },
  watch: {
    status: {
      immediate: true,
      handler(newV) {
        this.form.status = newV ? 1 : 0;
      }
    },
    fileList: {
      immediate: true,
      handler(list) {
        console.log(list)
        this.form.images = list.map(ele => ele.url);
      }
    },
    id: {
      immediate: true,
      handler(newV) {
        if(newV) {
          this.getEditData()
        }
      }
    },
    // tagsArr(newV) {
    //   this.form.tags = 
    // }
  },
  methods: {
    getEditData() {
      api2.productDetail(this.id).then(res => {
        this.form = res.data
        this.fileList = res.data.images.map((ele, index) => {
          return {
            uid: `${index}`,
            name: `${index}.png`,
            status: 'done',
            url: ele
          }
        })
        this.cateCurIndex = res.data.category - 1
        this.status = res.data.status ? true: false;
        this.itemsArr = res.data.c_item.split(',')
        this.key = new Date().getTime()

      })
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log(this.form);
          if(this.id) {
            api2.productEdit({...this.form, _id: this.id}).then(res => {
              if (res.status == "success") {
                this.$message.success("更新商品成功");
                this.$router.push('/product/list')
              } else {
                this.$message.warning(res.msg);
              }
            });
          }else {
            api2.productAdd(this.form).then(res => {
              if (res.status == "success") {
                this.$message.success("添加商品成功");
              } else {
                this.$message.warning(res.msg);
              }
            });
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChangeCategory(value) {
      console.log(value);
      this.cateCurIndex = value - 1;
    },
    handleChangeItems(value) {
      this.form.c_items = value;
      console.log(`selected ${value}`);
    },
    handleChangeTags(value) {
      this.form.tags.push(value);
      console.log(`selected ${value}`);
    },
    onChangePrice(value) {
      console.log("changed", value);
    },
    onChangePriceOff(value) {
      console.log("changed", value);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name == "ProductEdit") {
        vm.id = to.params.id;
      }
    });
  }
};
</script>


<style scoped lang="less">
.wrap {
  padding: 30px 0;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>