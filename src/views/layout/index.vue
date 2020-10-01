<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <Aside class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header-cotainer">
        <div class="header-left">
          <i class="el-icon-s-fold"></i>
          <span>北京字节跳动有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img :src="user.photo" alt="">
            <span>{{ user.name }}</span>
             <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },

  components: {
    Aside
  },

  created () {
    // 初始化组件后请求初始化资料
    this.loadUserProfile()
  },

  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu{
    height: 100%;
  }
}
.header-cotainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  .header-left {
    font-size: 14px;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
.main {
  background-color: #e9eef3;
}
</style>
