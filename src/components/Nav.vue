<template>
  <el-menu
      :default-active="actId"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">发送文件</el-menu-item>
      <el-menu-item index="2">接受文件</el-menu-item>
      <el-menu-item index="3">发送记录</el-menu-item>
    </el-menu>
</template>
<script>
export default {
  name: 'Nav',
  model:{
    prop: 'actId',
    event: 'change'
  },
  props:{
    actId: {
      type: String,
      default: '1'
    }
  },
  methods: {
    handleSelect(val = '1') {
      this.$emit('change', val);
    }
  }
}
</script>