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
                        <el-button type="primary" @click="onUpdataUser">保存</el-button>
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
        @opened="onDialogOpen"
        @closed="onDialogClosed"
       >
        <div class="preview-img-wrap">
          <img
            :src="previewImage"
            class="preview-img"
            ref="previewImg"
          >
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onUpdataPhoto">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
import { getUserProfile, updataUserPhoto, updataUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
      previewImage: '', // 预览图片
      cropper: null // 裁切器示例
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    onUpdataUser () {
      // 表单验证
      // 提交表单
      const { name, intro, email } = this.user
      updataUserProfile({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 发布全局消息通知
        globalBus.$emit('update-user', this.user)
      })
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
    },

    onDialogOpen () {
      // 图片裁切器必须在图片可见时初始化才有效,所以放在了dialog动画结束之后
      const image = this.$refs.previewImg
      this.cropper = new Cropper(image, {
        aspectRatio: 1
      })
    },
    // dialog关闭后销毁裁切器
    onDialogClosed () {
      this.cropper.destroy()
    },

    // 更新头像
    onUpdataPhoto () {
      // 获取裁切的图片
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 提交
        updataUserPhoto(fd).then(res => {
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图
          this.user.photo = window.URL.createObjectURL(file)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.preview-img-wrap {
  .preview-img {
    /* Ensure the size of the image fit the container perfectly */
      display: block;
      /* This rule is very important, please don't ignore this */
      max-width: 100%;
      height: 200px;
  }
}
</style>
