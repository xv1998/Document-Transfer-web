<template>
  <div class="send_bd">
    <el-col :span="100">
      <el-card shadow="hover">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-progress="handleProgress"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-card>
    </el-col>
  </div>
</template>
<script>
export default {
  name: "sendPage",
  data() {
    return {
      fileList: [],
    };
  },
  mounted() {
    // this.axios.get('/api').then(res=>{
    //   console.log("阿斯顿阿斯顿",res)
    // }).catch(e=>{
    //   console.log("请求失败",e)
    // })
  },
  methods: {
    submitUpload() {
      
      console.log("文件列表",this.fileList);
      
      // this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("文件移除",file, fileList);
    },
    handlePreview(file) {
      console.log("文件预览",file);
    },
    handleProgress(event, file, fileList) {
      console.log("文件上传中", event,file,fileList)
    }
  },
};
</script>
<style scoped>
.send_bd{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
