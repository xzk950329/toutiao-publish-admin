<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user">
      <div class="login-head"></div>
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
       <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="login-btn" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false, // 协议选中状态
      loginLoading: false // 登录到loading状态
    }
  },
  methods: {
    onLogin () {
      const user = this.user
      // 表单验证
      // 验证通过，提交登录
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 设置POST请求体
        data: user
      }).then(res => {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败，手机号或验证码错误')
        // 关闭loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form {
    background-color: #ffffff;
    padding: 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
    .login-head {
    height: 45px;
    width: 210px;
    background: url("./logo_index.png") no-repeat;
    background-size: cover;
    margin-bottom: 10px;
    margin-left: 30px;
  }
  }
}
</style>
