<template>
  <div class="login-w">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" type="text" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          placeholder="new password"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Code" prop="code">
        <a-input v-model="ruleForm.code" type="text" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="handleGetCode"
          :loading="getCodeBtnStatus"
          :disabled="getBtnFlag"
        >Get captcha {{ getBtnFlag || getCodeBtnStatus ? `(${btnFlagCount}s)` : "" }}</a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">找回密码</a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">重置</a-button>
        <a-button style="margin-left: 10px" @click="goto('/login')">返回登录</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the email'));
      } else if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('Please input the email 邮箱格式不对'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the code'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: '',
        password: '',
        code: '',
      },
      getCodeBtnStatus: false,
      getBtnFlag: false,
      btnFlagCount: 60,
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        code: [{ validator: validateCode, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    handleGetCode() {
      if (this.ruleForm.email === '') {
        this.$message.error({
          content: '请输入邮箱',
          key: 'codebtn',
          duration: 2,
        });
        return;
      }

      let timer = null;
      this.getCodeBtnStatus = true;
      api.getCode({ email: this.ruleForm.email }).then(
        (res) => {
          console.log(res);

          timer = setInterval(() => {
            this.btnFlagCount -= 1;
            if (this.btnFlagCount === 0) {
              clearTimeout(timer);
              this.btnFlagCount = 60;
            }
          }, 1000);

          this.getCodeBtnStatus = false;
          this.getBtnFlag = true;
          this.$message.success({
            content: res.msg,
            key: 'codebtn',
            duration: 2,
          });
        },
        (err) => {
          this.$message.error({ content: err, key: 'codebtn', duration: 2 });
          this.getCodeBtnStatus = false;
        },
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.loading({ content: '数据请求中...', key: 'forget' });
          api.forget(this.ruleForm).then(
            (res) => {
              console.log(res);
              this.$message
                .success({
                  content: '密码找回成功，正在跳转登录...',
                  key: 'forget',
                  duration: 2,
                })
                .then(() => {
                  this.$router.push('/login');
                });
            },
            (err) => {
              this.$message.error({ content: err, key: 'forget', duration: 2 });
            },
          );
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/assets/css/login.less");
</style>
