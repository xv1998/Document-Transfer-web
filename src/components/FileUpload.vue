<template>
  <a-row>
    <a-col :span="24" :style="{ marginTop: '36px' }">
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
          </a-upload-dragger>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          访问密码：<a-switch
            :style="{ margin: '10px' }"
            @change="getPassword"
          />
          {{ form.pwd ? form.pwd : "" }}
        </a-form-model-item>
        <a-form-model-item label="上传总进度" v-show="show">
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
    <a-col
      :span="24"
      class="cube-container"
      :style="{ width: cubeWidth + 'px' }"
    >
      <div class="cube" v-for="chunk in chunks" :key="chunk.index">
        <div :class="getCubeClass(chunk)">
          {{ chunk.index }}
        </div>
      </div>
    </a-col>
    <a-modal :visible="modal1Visible" ok-text="复制提取码" cancel-text="取消" @ok="handleCopyCode" @cancel="handleCancel">
      <p>提取码：{{form.fid}}</p>
      文件有效时：<CountDown :endTime="form.time" />
    </a-modal>
    <!-- <div class="cube-container" :style="{width:cubeWidth+'px'}">
        <div class="cube" 
          v-for="chunk in chunks" 
          :key="chunk.index">
          <div           
            :class="{
            'uploading':chunk.progress>0&&chunk.progress<100, 
            'success':chunk.progress==100,
            'error':chunk.progress<0,
            }" 
            :style="{height:chunk.progress+'%'}"
            >
            {{chunk.index}}
            <i v-if="chunk.progress<100" class="el-icon-loading" style="color:#F56C6C;"></i>
          </div>
        </div>
      </div> -->
  </a-row>
</template>

<script>
import CountDown from './CountDown'
// import qs from "qs";
const SIZE = 1024 * 1024 * 2; // 切片大小 2M

const Status = { 
  wait: "wait",
  pause: "pause",
  uploading: "uploading",
  error: "error",
  done: "done",
};
export default {
  name: "FileUpload",
  components:{
    CountDown
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      show: false,
      modal1Visible: false,
      clock: null,
      chunks: [],
      chunksLength: 0,
      form: {
        file: [],
        worker: null,
        fid: null,
        size: 0,
        pwd: "",
        time: new Date().getTime() + 3600000
      },
      rules: {
        file: [{ required: true, message: "请选择文件", trigger: "submit" }],
      },
    };
  },
  computed: {
    cubeWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 16;
    },
    status() {
      return this.percent === -1
        ? "exception"
        : this.percent === 100
        ? "success"
        : "active";
    },
    percent() {
      if (!this.form.file.length || !this.chunks.length) return 0;
      const loaded = this.chunks
        .map((item) => item.size * item.progress)
        .reduce((acc, cur) => acc + cur);
      let num = parseInt((loaded / this.form.size).toFixed(2));
      if (num === 100 && this.form.time) {
        this.ModalVisibleChange();
        console.timeEnd("upload");
      }
      return num;
    },
  },

  methods: {
    ModalVisibleChange(){
      this.modal1Visible = true;
    },
    handleCopyCode(){
      navigator.clipboard.writeText(this.form.fid);
      this.modal1Visible = false;
      this.resetForm();
      this.resetProgress();
    },
    handleCancel() {
      this.modal1Visible = false;
      this.resetForm();
      this.resetProgress();
    },
    getRandomNum(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getPassword(checked) {
      if (checked) {
        this.form.pwd = this.getRandomNum(9999, 1000).toString();
      } else this.form.pwd = "";
    },
    getCubeClass({ progress }) {
      if (progress > 0 && progress < 100) return "uploading";
      else if (progress === 100) return "success";
      else if (progress < 0) return "error";
    },
    beforeUpload(file) {
      this.form.file = [...this.form.file, file];
      console.log("获取到的文件", this.form.file);
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
    // 创建进度
    createProgressHandler(item, progressEvent) {
      if (progressEvent.lengthComputable) {
        var complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        item.progress = parseInt(complete);
      }
    },
    // 计算切片hash值
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        console.time();
        this.form.worker = new Worker("/hash.js");
        this.form.worker.postMessage({ fileChunkList });
        this.form.worker.onmessage = (e) => {
          const { hash } = e.data;
          if (hash) {
            console.timeEnd();
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
        index: index + this.chunksLength,
        size: chunk.size,
        progress: 0,
      }));
      this.chunksLength += fileChunkList.length;
      const fileExit = await this.verifyUpload(file.name, hash);
      if (fileExit) {
        list.forEach((item) => {
          item.progress = 100;
          item.status = Status.done;
        });
      }
      this.chunks.push(...list);
      if (!fileExit) {
        this.show = true;
        await this.uploadChunks(list);
        await this.mergeRequest(hash, file.name, file.size, this.form);
      }
    },
    async getUpid() {
      try {
        const { fid } = await this.$axios.get("/file/getupid", {
          params: {
            pwd: this.form.pwd,
          }});
        this.form.fid = fid;
      } catch (e) {
        this.$message.error("文件上传失败");
        throw new Error(e);
      }
    },
    // 上传前验证是否之前已上传过
    async verifyUpload(filename, filehash) {
      try {
        const { time, isExit } = await this.$axios.get("/file/verify", {
          params: {
            hash: filehash,
            fileName: filename,
            fid: this.form.fid,
          },
        });
        this.form.time = time;
        return isExit;
      } catch (e) {
        this.$message.error("文件上传失败");
        throw new Error(e);
      }
    },
    async sendRequest(list = [], max = 4, retry = 2) {
      return new Promise((resolve, reject) => {
        let counter = 0;
        let retryArr = [];
        const start = async () => {
          while (counter < list.length && max > 0) {
            max--; // 占用通道
            const i = list.findIndex(
              (v) => v.status === Status.wait || v.status === Status.error
            ); // 查找队列里处于等待态或者上传不成功的切片
            if (i === -1) break;
            list[i].status = Status.uploading; // 将切片状态改为上传中
            const formData = list[i].formData;
            const index = list[i].index;
            if (typeof retryArr[index] === "number") {
              console.log(index, "：开始重试", formData);
            }
            this.$axios
              .post("/file/upload", formData, {
                onUploadProgress: (progressEvent) =>
                  this.createProgressHandler(this.chunks[index], progressEvent),
              })
              .then(() => {
                list[i].status = Status.done;
                max++; // 释放通道
                counter++; // 成功上传数+1
                if (counter === list.length) {
                  resolve(); // 全部切片成功上传则直接返回
                } else {
                  start(); // 否则继续循环调用函数
                }
              })
              .catch(() => {
                list[i].status = Status.error;
                if (typeof retryArr[index] !== "number") {
                  retryArr[index] = 0;
                }
                retryArr[index]++;
                // 一个请求报错3次的
                if (retryArr[index] >= retry) {
                  return reject(); // 考虑abort所有别的
                }
                console.log(index, retryArr[index], "次报错");
                // 3次报错以内的 重启
                this.chunks[index].progress = -1; // 报错的进度条
                max++;
                start();
              });
          }
        };
        start();
      });
    },
    // 上传切片
    async uploadChunks(list = []) {
      const formList = list.map(
        ({ chunk, hash, fileName, chunkHash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("chunkhash", chunkHash);
          formData.append("hash", hash);
          formData.append("filename", fileName);
          return { formData, index, status: Status.wait };
        }
      );
      try {
        await this.sendRequest(formList);
      } catch (e) {
        this.$message.error("亲 上传失败了,考虑重试下呦");
        throw new Error(e);
      }
    },
    // 合并请求
    async mergeRequest(
      hash = "",
      fileName = "",
      size = 0,
      { fid = "", pwd = "" }
    ) {
      try {
        const {time} = await this.$axios.get("/file/merge", {
          params: {
            hash,
            fileName,
            fid,
            size,
            pwd,
          },
        });
        this.form.time = time;
      } catch (e) {
        this.$message.error("上传失败");
        throw new Error(e);
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.time("upload");
          await this.getUpid(this.form.file);
          this.form.file.forEach((item) => {
            this.form.size += item.originFileObj.size;
            this.handleUpload(item.originFileObj);
          });
        }
      });
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      this.form.file = fileList;
    },
    previewFile() {
      return false;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.chunks = [];
      this.chunksLength = 0;
      this.form = {
        file: [],
        worker: null,
        fid: null,
        size: 0,
        pwd: "",
        time: 0
      };
      this.resetProgress();
      console.log("重设", this.form);
    },
    resetProgress() {
      this.show = false;
      this.percent = 0;
    },
  },
  beforeDestroy() {
    clearTimeout(this.clock);
    this.clock = null;
  },
};
</script>
<style scoped>
.cube-container {
  width: 100px;
  overflow: hidden;
}
.cube {
  width: 14px;
  height: 14px;
  line-height: 12px;
  border: 1px solid black;
  background: #eee;
  float: left;
}
.cube .success {
  background: #67c23a;
}
.cube .uploading {
  background: #409eff;
}
.cube .error {
  background: #f56c6c;
}
</style>