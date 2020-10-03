<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路劲导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改' : '发布'}}文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="50px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
         <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择频道" v-model="article.channel_id">
            <el-option
            :label="channel.name"
            v-for="channel in channels"
            :key="channel.id"
            :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannel, addArticle, getOneArticle, updateArticle } from '@/api/article'
export default {
  name: 'Publish',
  data () {
    return {
      channels: [], // 频道
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面的类型 -1自动 0无图 1一张图 3三张图
          images: [] // 封面图片地址
        },
        channel_id: null
      }
    }
  },

  created () {
    this.loadChannels()
    // 编辑修改使用的是同一个组件
    if (this.$route.query.id) {
      this.loadArtic()
    }
  },

  methods: {
    onPublish (draf) {
      const articleId = this.$route.query.id
      if (articleId) {
        // 执行修改操作
        updateArticle(articleId, this.article, draf = false)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push('/article')
      } else {
        addArticle(this.article, draf).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        })
      }
    },

    loadChannels () {
      getArticleChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },

    // 获取要修改的文章
    async loadArtic () {
      const res = await getOneArticle(this.$route.query.id)
      this.article = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
</style>
