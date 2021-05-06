<template>
  <div class="login-w">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="Email" prop="email" :wrapper-col="{ span: 20 }">
        <a-input v-model="ruleForm.email" type="text" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password" :wrapper-col="{ span: 20 }">
        <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="goto('/reg')">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="goto('/forget')">
          找回密码
        </a-button>
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
    return {
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.loading({ content: '账户信息验证中', key: 'login' });
          api.login(this.ruleForm).then(
            (res) => {
              console.log(res);
              this.$store.dispatch('saveUserInfo', res.data);
              this.$message
                .success({
                  content: '登录成功，正在跳转首页...',
                  key: 'login',
                  duration: 2,
                })
                .then(() => {
                  this.$router.push('/');
                });
            },
            (err) => {
              this.$message.error({ content: err, key: 'login', duration: 2 });
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
    goto(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/assets/css/login.less");
</style>
