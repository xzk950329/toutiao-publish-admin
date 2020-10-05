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
      <el-form ref="publish-form" :model="article" label-width="60px" :rules="formRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
         <el-form-item label="内容" prop="content">
           <!-- 富文本编辑 -->
           <el-tiptap
           v-model="article.content"
           :extensions="extensions"
           height="350"
           placeholder="请输入文章内容"
           />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  Image,
  TextColor
} from 'element-tiptap'
import { getArticleChannel, addArticle, getOneArticle, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
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
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new HorizontalRule(),
        new Fullscreen(),
        new Preview(),
        new Image({
          // 自定义图片
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            // 第一个return 是返回promise对象
            return uploadImage(fd).then(res => {
              // 返回最后的结果
              return res.data.data.url
            })
          }
        }),
        new TextColor()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
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
      // 得到验证结果
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过 提交表单
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
      })
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
