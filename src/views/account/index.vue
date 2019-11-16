<template>
    <!--卡片区-->
  <el-card class="box-card">
    <!--命名插槽，头部内容设置-->
    <div slot="header" class="clearfix">
      <span>账户信息</span>
    </div>
    <!--匿名插槽，卡片主体内容-->
    <div class="text item cardbody">
      <div id="lt">
        <el-form ref="accountFormRef" :model="accountForm" label-width="100px" :rules="accountFormRules">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="accountForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input type="textarea" v-model="accountForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-button type="primary" @click="editAccount">更新账户</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="rt">
        <el-upload
        action=""
        :show-file-list="false"
        :http-request="httpRequest"
        >
        <img v-if="accountForm.photo" :src="accountForm.photo"
        alt="" class="avatar" width="210" height="210">
        </el-upload>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Account',
  created () {
    this.getAccountInfo()
    // this.editAccount()
  },
  data () {
    return {
      accountForm: {
        // 各个成员来自api参考【2.4 编辑用户资料】
        id: '', // id
        name: '', // 名称
        mobile: '', // 手机号码
        email: '', // 邮箱
        intro: '', // 简介
        photo: ''
      },
      accountFormRules: {
        name: [
          { required: true, message: '名字必填' },
          {
            min: 1,
            max: 7,
            message: '名字长度介于1-7个字符'
          }
        ],
        email: [
          { required: true, message: '邮箱必填' },
          { type: 'email', message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    getAccountInfo () {
      let pro = this.$http.get('/user/profile')
      pro
        .then(result => {
          this.accountForm = result.data.data
        })
        .catch(err => {
          return this.$message.error('获得账号信息失败' + err)
        })
    },
    editAccount () {
      this.$refs.accountFormRef.validate(valid => {
        if (valid) {
          let pro = this.$http.patch('/user/profile', this.accountForm)
          pro
            .then(result => {
              // console.log(result)
              if (result.data.message === 'OK') {
                this.$message.success('修改账号成功')
              }
            })
            .catch(err => {
              return this.$message.error('修改失败' + err)
            })
        }
      })
    },
    httpRequest (resourse) {
      let fd = new FormData()
      fd.append('photo', resourse.file)
      let pro = this.$http.patch('/user/photo', fd)
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.accountForm.photo = result.data.data.photo
            this.$message.success('更新头像成功')
          }
        })
        .catch(err => {
          return this.$message.error('更新头像失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 给表单 和 头像区域做布局样式设计
.cardbody {
  display: flex;
  justify-content: space-between;
  #lt {
    width: 40%;
    background-color: pink;
  }
  #rt {
    width: 30%;
    background-color: lightgreen;
  }
}
</style>
