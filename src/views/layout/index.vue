<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <Aside class="aside-menu" :isCollapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header class="header-cotainer">
        <div class="header-left">
          <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="changeIsCollapse"
          ></i>
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
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
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
      user: {}, // 当前登录用户信息
      isCollapse: false
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
    },

    changeIsCollapse () {
      this.isCollapse = !this.isCollapse
    },

    onLogout () {
      // 把用户的登录状态清除
      this.$confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
      // window.localStorage.removeItem('user')
      // this.$router.push('/login')
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
    font-size: 20px;
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
