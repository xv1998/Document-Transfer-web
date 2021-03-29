<template>
  <a-row>
    <a-col :span="24" :style="{ marginTop: '36px' }"> </a-col>
          <a-row>
            <a-col :xs="{ span: 20 }" :sm="{ span: 32, offset: 1 }">
              <a-input-search
                placeholder="请输入提取码"
                v-model="code"
                size="large"
                enter-button
                @search="handleSearch"
                :style="{ marginBottom: '20px' }"
              ></a-input-search>
            </a-col>
          </a-row>
          <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="listData"
            :loading="loading"
            :locale="{ emptyText: '暂无文件' }"
          >
            <a-list-item slot="renderItem" key="item.fid" slot-scope="item">
              <div slot="actions">
                <a-row :style="{ height: '20px' }">
                  <a-icon type="file" :style="{ marginRight: '8px' }"></a-icon
                  ><span :style="{ marginRight: '10px' }">{{
                    item.fileName
                  }}</span>
                  <span :style="{ marginRight: '10px' }">{{
                    parseFileSize(item.size)
                  }}</span>
                  <a-icon
                    type="download"
                    :style="{ marginRight: '8px' }"
                  ></a-icon
                  ><span :style="{ marginRight: '10px' }"
                    ><a @click="download(item.cid)">点击下载</a></span
                  >
                </a-row>
              </div>
              <a-list-item-meta>
                <a slot="title"
                  ><a-tag>{{parseTag(item.filename)}}</a-tag> {{ item.filename }}</a
                >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
  </a-row>
</template>
<script>
// import Content from "./common/Content";
import {LEN_TAG} from '../common/constants'
import qs from "qs";
const SIZE = 1024;
export default {
  name: "Download",
  components: {
    // Content,
  },
  mounted() {},
  data() {
    return {
      listData: [],
      loading: false,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      },
      code: "",
    };
  },
  methods: {
    async handleSearch() {
      await this.getFileListData();
      this.loading = false;
    },
    parseTag(name){
      return (name.match(/(?<=\.)(\w+)/g) || []).slice(-1)[0];
    },
    parseFileSize(len = ''){
      let size = 0;
      let count = 0;
      let length = +len;
      while(length > SIZE ){
        size = (length / SIZE).toFixed(1);
        length /= SIZE;
        count++;
      }
      return size + LEN_TAG[count];
    },
    getFileListData() {
      return new Promise((resolve, reject) => {
        (this.loading = true),
          this.$axios
            .post("/file/getlist", qs.stringify({ fid: this.code}))
            .then(({data: {code, data, message}}) => {
              if(code !== 0) reject(message);
              console.log("文件列表", data.list)              
              this.listData = data.list || [];
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
      });
    },
    getFileId(id) {
      return this.listData.filter((r) => {
        if (r.fid === id) return true;
      });
    },
    download(id) {
      this.$axios({
        method: "get",
        url:
          "/file/download?code=" +
          encodeURIComponent(id),
        responseType: "blob",
      }).then((res) => {
        // 接收文件流，触发浏览器下载行为
        console.log("下载完成", res);
        const content = res.data;
        const blob = new Blob([content], {
          type: "application/actet-stream;charset=utf-8",
        });
        const contentDisposition = res.headers["content-disposition"];
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        var fileName = decodeURIComponent(result[1] || "");
        const link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      });
    },
  },
};
</script>
<style></style>
