<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路劲导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
            label="全部"
            :value="null"
            ></el-option>

            <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="channel in channels"
            :key="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-DD"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
             <!-- button 按钮会默认传递一个没有用的参数 -->
          <el-button type="primary"
          @click="loadArticle(1)"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       根据筛选条件查询到{{totalCount}}条结果
      </div>
         <!-- 数据列表 -->
    <el-table :data="articles" stripe style="width: 100%" class="list-table" size="mini" v-loading="loading">
      <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" class="article-cover" v-if="scope.row.cover.images[0]">
            <img src="./xx.jpg" class="article-cover" v-else>
          </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="状态">
          <!-- 如果选哟啊在自定义模板中使用当前遍历项 template上声明slot-scope -->
          <template slot-scope="scope">
              <el-tag :type="atticleStatus[scope.row.status].type">
                  {{ atticleStatus[scope.row.status].text }}
              </el-tag>
              <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
              <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
              <el-tag v-else type="info">已删除</el-tag> -->
          </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
      <el-table-column label="操作">
        <template>
            <el-button
            icon="el-icon-edit"
            circle
            type="primary"
            size="mini">
            </el-button>
            <el-button
            size="mini"
            icon="el-icon-delete"
            circle
            type="danger"
           ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
    layout="prev, pager, next"
    background :total="totalCount"
    @current-change="onCurrentChange"
    :page-size="pageSize"
    :disabled="isDisable">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannel } from '@/api/article'
export default {
  name: 'Article',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      totalCount: 0, // 总条数
      pageSize: 10, // 每页大小
      status: null, // 查询文章状态
      channels: [], // 文章请求列表
      channelId: null, // 查询文章的频道
      rangeDate: [], // 筛选时间范围日期
      loading: true, // 表格数据加载中
      isDisable: false, // 页面加载时期禁用分页器
      atticleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ]
    }
  },

  created () {
    this.loadChannels()
    this.loadArticle()
  },

  methods: {
    loadChannels () {
      getArticleChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle (page = 1) {
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
        this.isDisable = false
      })
    },
    onCurrentChange (page) {
      this.loading = true
      this.isDisable = true
      this.loadArticle(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
    margin-bottom: 30px
}
.list-table {
    margin-bottom: 20px
}
.article-cover{
 width: 60px;
 background-size: cover
}
</style>
