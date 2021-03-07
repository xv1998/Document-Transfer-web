<template>
  <div class="send_bd">
    <el-col :span="100">
      <el-card shadow="hover">
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :multiple="true"
          :before-upload="beforeUpload"
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
    <input type="file" @change="handleFileChange">
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>
<script>
const SIZE = 1024*1024*2 // 切片大小 2M 
// const SIZE = 1024 *1024*6 // 切片大小 2.6G 

export default {
  name: "sendPage",
  data() {
    return {
      fileList: [],
      container:{
        file: null
      }
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
      this.$refs.upload.submit();
    },
    beforeUpload() {
      // let fd = new FormData();
      // fd.append('filename', file);
      // console.log("==上传数据===",fd)
      // this.axios.post("/upload", fd).then(res => {
      //   console.log("请求后台",res)
      // })
      return false;
    },
    handleRemove(file, fileList) {
      console.log("文件移除",file, fileList);
    },
    handlePreview(file) {
      console.log("文件预览",file);
    },
    handleProgress(event, file, fileList) {
      console.log("文件上传中", event,file,fileList)
    },
    // 文件选择监听
    handleFileChange(e) {
      const [file] = e.target.files;
      if(!file) return;
      this.container.file = file;
    },
    async handleUpload() {
      if(!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.container.hash= await this.calculateHash(fileChunkList);
      const list = fileChunkList.map(({file}, index) => ({
        chunk: file,
        fileHash: this.container.hash,
        hash: this.container.file.name + '-' + index
      }))
      console.log("切片信息：", list, this.container,fileChunkList);
      await this.uploadChunks(list);
      await this.mergeRequest(); 
    },
    // 创建文件切片
    createFileChunk(file, size = SIZE)  {
      let chunkList = [];
      let start = 0;
      while(file.size > start){
        chunkList.push({file: file.slice(start, start + size)});
        start += size;
      }
      return chunkList;
    },
    // 计算切片hash值
    calculateHash(fileChunkList) {
      return new Promise((resolve)=> {
        this.container.worker = new Worker('/hash.js');
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
          const { hash } = e.data;
          if(hash) {
            resolve(hash)
          }
        }
      })
    },
    // 上传切片
    async uploadChunks(list = []) {
      const formList = list.map(({chunk, hash})=> {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', this.container.file.name);
        return {formData};
      }).map(async ({formData}) => {
        this.axios.post("/file/upload", formData);
      })
      await Promise.all(formList); // 并发上传
    },
    // 合并请求
    async mergeRequest() {
      this.axios.get("/file/merge", {
        params: {
          size: this.container.file.size,
          fileHash: this.container.hash,
          fileName: this.container.file.name
        }
      }).then(res => {
        console.log("合并完成",res)
      })
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
