<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm">
        <img src="./logo_index.png" alt="">
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.code" placeholder="请输入校验码"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left;">
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary"  @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        xieyi: false
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: gray;
  background-image: url(./login_bg.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 345px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img{
      width: 50%;
      margin: 20px auto;
    }
    .el-form{
      width: 75%;
    }
  }
}
</style>
