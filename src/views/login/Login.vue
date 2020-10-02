<template>
  <div class="login-container">
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <!--
        配置表单验证
      -->
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
       <el-form-item  prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="login-btn" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import request from '@/utils/request'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录到loading状态
      formRules: { // 表单验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过：callback（）
            // 验证失败：callback（new Error（'错误消息'））
            validator (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 验证通过，提交登录
      this.loginLoading = true
      login(this.user).then(res => {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
        // 将接口返回的用户数据放到本地存储，方便应用数据共享,本地存储稚嫩存储字符串
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 跳转首页
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败，手机号或验证码错误')
        // 关闭loading
        this.loginLoading = false
      })
    },
    onLogin () {
      // 表单验证 validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        if (!valid) { // 验证不通过
          return
        }
        // 验证通过 请求登录
        this.login()
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
