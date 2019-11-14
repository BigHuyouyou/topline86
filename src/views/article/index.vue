<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="searchFormRef" :model="searchForm">
          <el-form-item label="文章状态：">
            <el-radio-group v-model="searchForm.status" @change="getArticleList()">
              <el-radio v-model="searchForm.status" label>全部</el-radio>
              <el-radio v-model="searchForm.status" label="0">草稿</el-radio>
              <el-radio v-model="searchForm.status" label="1">待审核</el-radio>
              <el-radio v-model="searchForm.status" label="2">审核通过</el-radio>
              <el-radio v-model="searchForm.status" label="3">审核失败</el-radio>
              <el-radio v-model="searchForm.status" label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select
            v-model="searchForm.channel_id"
            placeholder="请选择"
            clearable
            @change="getArticleList()"
            >
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- --------------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
         <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <div class="text item">
        <el-table :data="articleList" style="width:100%;">
        <el-table-column label="图标">
          <img :src="stData.row.cover.images[0]" slot-scope="stData" alt="没有图标" width="150px" height="100px">
        </el-table-column>
        <el-table-column label="标题" prop="title" width="300"></el-table-column>
        <el-table-column label="状态" prop="status" width="100">
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status===0">草稿</el-tag>
            <el-tag v-else-if="stData.row.status===1" type="success">待审核</el-tag>
            <el-tag v-else-if="stData.row.status===2" type="info">审核通过</el-tag>
            <el-tag v-else-if="stData.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-else type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate" width="160"></el-table-column>
        <el-table-column label="操作" width="300" >
          <template slot-scope="stData">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini" @click="del(stData.row.id)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.page"
      :page-sizes="[10, 15, 20, 40]"
      :page-size="searchForm.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tot">
    </el-pagination>
  </div>
</template>

<script>
export default {

  name: 'ArticleList',
  created () {
    this.getChannelList()
    this.getArticleList()
  },
  watch: {
    //   对timetotime成员进行监听
    timetotime (newv, oldv) {
      // console.log(newv, 'dsadasd')
      // console.log(oldv, 'dasdsadsad')
      if (newv) {
        // 拆分时间给到表单
        this.searchForm.begin_pubdate = newv[0]
        this.searchForm.end_pubdate = newv[1]
      } else {
        // 清除表单时间信息
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
      this.getArticleList()
    }
    // 筛选功能第一种方法   第二种方法是el-radio-group
    // searchForm: {
    //   deep: true,
    //   handler: function (newV, oldV) {
    //     console.log(newV.status)
    //     this.searchForm.status = newV.status
    //     this.getArticleList()
    //   }
    // }
  },

  data () {
    return {
      searchForm: {
        status: '', // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        begin_pubdate: '', // 文章发布开始时间
        end_pubdate: '', // 文章发布结束时间
        channel_id: '', // 频道
        page: 1,
        per_page: 10
      },
      channelList: [],
      timetotime: [],
      articleList: [],
      tot: 0// 总记录条数

    }
  },

  methods: {
    getChannelList () {
      var pro = this.$http.get('/channels')
      pro
        .then(result => {
          console.log(result)
          if (result.data.message === 'OK') {
            this.channelList = result.data.data.channels
          }
        })
        .catch(err => {
          return this.$message.error('获得文章频道错误：' + err)
        })
    },
    getArticleList () {
      // 把searchForm内部为空的成员都过滤掉
      var searchData = {}
      for (var i in this.searchForm) {
        // i:代表对象的成员属性名称, status、channel_id、begin_pudate等等
        if (this.searchForm[i]) {
          // 成员值非空
          searchData[i] = this.searchForm[i]
        }
      }

      let pro = this.$http.get('/articles', { params: searchData })
      pro
        .then(result => {
          console.log(result)
          if (result.data.message === 'OK') {
            // 把文章赋予给articleList成员
            this.articleList = result.data.data.results
            // 把total_count中条数信息赋予给tot成员
            this.tot = result.data.data.total_count
          }
        })
        .catch(err => {
          return this.$message.error('获得文章列表错误：' + err)
        })
    },
    handleCurrentChange (val) {
      // val改变后页码的值
      this.searchForm.page = val
      this.getArticleList()
    },
    handleSizeChange (val) {
      this.searchForm.per_page = val
      this.getArticleList()
    },
    del (id) {
      this.$confirm('确认要删除该数据吗？', '删除', {
        confrimButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let pro = this.$http.delete(`/articles/${id}`)
        pro
          .then(result => {
            // console.log(result)
            this.$message.success('文章删除成功！')
            this.getArticleList()
          })
          .catch(err => {
            return this.$message.error('删除文章失败：' + err)
          })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{margin-bottom:15px;}
.el-pagination{
  margin-top: 15px;
}
</style>
