<template>
  <div>
    <el-radio-group v-model="radio" @change="handleChangeTab" class="radio">
      <el-radio label="link">链接</el-radio>
      <el-radio label="code">取件码</el-radio>
    </el-radio-group>
    <div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "receivePage",
  data() {
    return {
      radio: "link",
      input: "",
    };
  },
  methods: {
    handleChangeTab(val = "link") {
      console.log("切换获取方式", val);
    }
  },
};
</script>
<style scoped>
.radio {
  margin: 20px 0;
}
</style>
