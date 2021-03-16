<template>
  <a-row>
    <a-col :span="24" :style="{ marginTop: '36px' }"> </a-col>
    <a-col :span="18" :offset="3">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :multiple="true"
      >
        <a-form-model-item label="选择文件" prop="file" ref="file">
          <a-upload-dragger
            :before-upload="beforeUpload"
            name="file"
            :file-list="form.file"
            action="/api/user/uploadfile"
            @change="handleChange"
            :preview-file="previewFile"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击或拖拽上传文件</p>
            <p class="ant-upload-hint">仅可选择单个文件</p>
          </a-upload-dragger>
        </a-form-model-item>
        <a-form-model-item label="上传进度" v-show="show">
          <a-progress :percent="percent" :status="status"></a-progress>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 提交 </a-button>
          <a-button style="margin-left: 10px" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-col>
  </a-row>
</template>

<script>
const SIZE = 1024 * 1024 * 2; // 切片大小 2M

export default {
  name: 'FileUpload',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      show: false,
      percent: 0,
      clock: null,
      status: "active",
      form: {
        file: [],
        worker: null
      },
      rules: {
        file: [{ required: true, message: "请选择文件", trigger: "submit" }],
      }
    };
  },
  mounted() {},

  methods: {
    beforeUpload(file) {
      this.form.file = [...this.form.file, file];
      console.log("获取到的文件",this.form.file)
      return false;
    },
    // 创建文件切片
    createFileChunk(file, size = SIZE) {
      let chunkList = [];
      let start = 0;
      while (file.size > start) {
        chunkList.push({ chunk: file.slice(start, start + size) });
        start += size;
      }
      return chunkList;
    },
    // 计算切片hash值
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        console.time()
        this.form.worker = new Worker("/hash.js");
        this.form.worker.postMessage({ fileChunkList });
        this.form.worker.onmessage = (e) => {
          const { hash } = e.data;
          if (hash) {
            console.timeEnd()
            resolve(hash);
          }
        };
      });
    },
    async handleUpload(file) {
      const fileChunkList = this.createFileChunk(file);
      const hash = await this.calculateHash(fileChunkList);
      const list = fileChunkList.map(({ chunk }, index) => ({
        chunk,
        hash,
        chunkHash: hash + "-" + index,
        fileName: file.name,
      }));
      console.log("切片信息：", list, this.form, fileChunkList);
      const fileExit = await this.verifyUpload(file.name,hash);
      if(!fileExit){
        await this.uploadChunks(list);
        await this.mergeRequest(hash, file.name);
      }else {
        this.show = true;
        this.status = "active";
        this.percent = 100;
        this.clock = setTimeout(()=> {
          this.resetProgress();
          this.resetForm()
        }, 1000)
      }
    },
    // 上传前验证是否之前已上传过
    async verifyUpload(filename, filehash) {
      const {data: { isExit : exit}} = await this.$axios.get("/file/verify", {
        params: {
          hash: filehash,
          fileName: filename,
        },
      });
      if(exit){
        this.percent = 100;
        return true
      }else return false
    },
    // 上传切片
    async uploadChunks(list = []) {
      const formList = list
        .map(({ chunk, hash, fileName, chunkHash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("chunkhash", chunkHash);
          formData.append("hash", hash);
          formData.append("filename", fileName);
          return { formData };
        })
        .map(async ({ formData }) => {
          this.$axios.post("/file/upload", formData, {
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                  var complete =
                    ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                  this.percent = complete;
                  if (complete >= 100) {
                    this.resetProgress();
                  }
                }
              }
          })
          .then((res) => {
              if (res.data.code === 0) {
                this.resetForm();
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
        });
      this.status = "active";
      this.show = true;
      await Promise.all(formList); // 并发上传
    },
    // 合并请求
    async mergeRequest(hash = "", fileName = "") {
      this.$axios
        .get("/file/merge", {
          params: {
            hash,
            fileName,
          },
        })
        .then((res) => {
          console.log("合并完成", res);
        });
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.file.forEach(item => {
            this.handleUpload(item)
          })
        }
      })
    },
    handleChange() {
      // let fileList = [...info.fileList];
      //  Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      // fileList = fileList.slice(-1);

      // this.form.file = fileList;
    },
    previewFile() {
      return false;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    resetProgress() {
      this.show = false;
      this.percent = 0;
    },
  },
  beforeDestroy(){
    clearTimeout(this.clock);
    this.clock = null;
  }
};
</script>
