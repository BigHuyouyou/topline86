<template>
  <el-select
    v-model="cid"
    placeholder="请选择"
    clearable
    >
    <el-option
    v-for="item in channelList"
    :key="item.id"
    :label="item.name"
    :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ChannelCom',
  data () {
    return {
      cid: '',
      channelList: [] // 频道
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    getChannelList () {
      var pro = this.$http.get('/channels')
      pro
        .then(result => {
        //   console.log(result)
          if (result.data.message === 'OK') {
            this.channelList = result.data.data.channels
          }
        })
        .catch(err => {
          return this.$message.error('获得文章频道错误' + err)
        })
    }
  },
  props: {
    chid: {
      default: 0
    }
  },
  watch: {
    cid: function (newV, oldV) {
      // this.chid = newV
      this.$emit('slt', newV)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
