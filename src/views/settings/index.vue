<template>
  <div class="settings-container">
          <el-card class="box-card">
        <div slot="header" class="clearfix">
           <!-- 面包屑路劲导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
         </div>
         <el-row>
           <el-col :span="15">
                <el-form ref="form" :model="user" label-width="70px">
                    <el-form-item label="编号">
                        {{user.id}}
                    </el-form-item>
                    <el-form-item label="手机">
                       {{user.mobile}}
                    </el-form-item>
                    <el-form-item label="媒体名称">
                        <el-input type="textarea" v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍">
                        <el-input v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-form>
           </el-col>
            <el-col :span="4" :offset="2">
                <!-- 隐藏input 调用input点击click -->
               <!--  <p @click="$refs.file.click()"> -->
               <!--  点击修改头像
                </p> -->
                <label for="file">
                  <el-avatar
                    shape="square"
                    :size="150"
                    fit="cover"
                    :src="user.photo"
                    ></el-avatar>
                    <p>修改头像</p>
                  </label>
                <input id="file" type="file" hidden @change="onFileChange" ref="file">
            </el-col>
         </el-row>
    </el-card>
    <!-- 修改头像 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
       >
        <img :src="previewImage" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'Settings',
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false, // 控制上传图片裁切预览状态
      previewImage: '' // 预览图片
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    onSubmit () {
      console.log('submit!')
    },

    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },

    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 预览用户选择的图片
      this.dialogVisible = true
      // 解决相同文件不触发change事件问题
      this.$refs.file.value = ''
    }
  }
}
</script>

<style>

</style>
