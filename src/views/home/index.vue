<template>
  <el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>
      <div id="lt">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </div>
      <div id="rt">
        <el-input type="text" placeholder="请输入搜索的文章内容" style="width:300px;">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <span style="margin:0 10px;">消息</span>

        <el-dropdown>
             <span class="el-dropdown-link">
             <img :src="photo" alt="" width="40px" height="40px">
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>
      </div>
   </el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  .el-aside{
    background-color: #323745;
}
.el-header{
  background-color: orange;
  display: flex;
  justify-content:space-between;
  padding: 0 10px;
  #lt{
    height: 100%;
    width: 40%;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  #rt{
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-dropdown-link {
        display: flex;
        align-items: center;
      }
  }
}
.el-main{
  background-color:  #f2f3f5
}

}

</style>
