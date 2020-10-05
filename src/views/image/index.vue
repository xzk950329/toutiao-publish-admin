<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路劲导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group
        v-model="collect"
        @change="onCollectChange"
        size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
        :lg="4" :xs="12" :sm="6" :md="6"
        v-for="img in images"
        :key="img.id"
        class="image-item"
        >
          <el-image
          style="height: 200px"
          :src="img.url"
          fit="cover">
          </el-image>
          <div class="image-action">
            <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="onClick(img)"
            size="mini"
            :loading="img.loading"
            circle></el-button>
            <el-button
            type="info"
            size="mini"
            icon="el-icon-delete-solid"
            circle
            @click="onDelete(img)"
            ></el-button>
           <!--  <i
            v-loading="true"
            :class="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="onClick(img)"
            ></i> -->
            <!-- <i class="el-icon-delete-solid"></i> -->
          </div>
        </el-col>
      </el-row>
      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onPageChange"
        :page-size="pageSize"
        :current-page.sync="page"
        :total="totalCount">
      </el-pagination>
    </el-card>
  <el-dialog title="上传素材"
  :append-to-body="true"
  :visible.sync="dialogUploadVisible">
  <!-- upload组件
          请求方法：默认POST
          请求路径: action
          请求头：headers
   -->
    <el-upload
      :show-file-list="false"
      class="upload-demo"
      drag
      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      :headers="uploadHeaders"
      name="image"
      :on-success="onUploadSuccess"
      multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 10,
      page: 1
    }
  },

  created () {
    // 页面初始化  加载第一页
    this.loadImages(1)
  },

  methods: {
    async loadImages (page) {
      // 重置高亮页码，防止页码与数据不对应
      this.page = page
      const res = await getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      })
      const results = res.data.data.results
      results.forEach(img => {
        // 手动往img对象中添加数据 来控制收藏按钮
        img.loading = false
      })
      this.images = results
      this.totalCount = res.data.data.total_count
    },

    onCollectChange () {
      this.loadImages(1)
    },

    onUploadSuccess () {
      this.dialogUploadVisible = false
      // 更新列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },

    onPageChange (page) {
      this.loadImages(page)
    },

    // 图片收藏控制
    async onClick (img) {
      img.loading = true
      await collectImage(img.id, !img.is_collected)
      img.is_collected = !img.is_collected
      img.loading = false
    },

    // 删除素材
    async onDelete (img) {
      await deleteImage(img.id)
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '已删除'
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item{
  position: relative;
}
.image-action {
    background-color: rgba(204, 204, 204, .5);
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 5px;
    right: 5px;
    font-size: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: black;
}
</style>
