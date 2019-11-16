<template>
  <el-container>
  <el-aside :width="isCollapse?'65px':'200px'">
    <!-- ----------------------- -->
    <el-menu
    router
    background-color="#333744"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :collapse-transition="false">
      <el-menu-item index="1" :style="{width:isCollapse?'65px':'200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2" :style="{width:isCollapse?'65px':'200px'}">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/articleadd">发布文章</el-menu-item>
        <el-menu-item index="/article">文章列表</el-menu-item>
        <el-menu-item index="2-3">评论列表</el-menu-item>
        <el-menu-item index="2-4">素材管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" :style="{width:isCollapse?'65px':'200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/account" :style="{width:isCollapse?'65px':'200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>

    </el-menu>
    <!-- ------------------------- -->
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->

  <!-- ------------------- -->
  </el-aside>
  <el-container>
    <el-header>
      <div id="lt">
        <i
        slot="prefix"
        :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
        style="cursor:pointer;"
        @click="isCollapse=!isCollapse"
        ></i>
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
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
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
