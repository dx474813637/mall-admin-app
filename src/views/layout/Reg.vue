<template>
  <div class="login-w">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" type="text" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="username" prop="username">
        <a-input v-model="ruleForm.username" type="text" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
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
          >Get captcha {{ getBtnFlag || getCodeBtnStatus ? `(${btnFlagCount}s)` : "" }}</a-button
        >
      </a-form-model-item>
      <a-form-model-item label="Resources" prop="role">
        <a-radio-group v-model="ruleForm.role">
          <a-radio value="customer">
            customer
          </a-radio>
          <a-radio value="admin">
            admin
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
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
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username'));
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
        username: '',
        password: '',
        code: '',
        role: 'customer',
      },
      getCodeBtnStatus: false,
      getBtnFlag: false,
      btnFlagCount: 60,
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        username: [{ validator: validateUsername, trigger: 'change' }],
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
    handleGetCode() {
      if (this.ruleForm.email === '') {
        this.$message.error({ content: '请输入邮箱', key: 'codebtn', duration: 2 });
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
          this.$message.loading({ content: '账户注册中...', key: 'reg' });
          api.reg(this.ruleForm).then(
            (res) => {
              console.log(res);
              this.$message
                .success({
                  content: '注册成功，正在跳转登录...',
                  key: 'reg',
                  duration: 2,
                })
                .then(() => {
                  this.$router.push('/login');
                });
            },
            (err) => {
              this.$message.error({ content: err, key: 'reg', duration: 2 });
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
