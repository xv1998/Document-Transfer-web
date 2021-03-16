<template>
  <div>
    <a-layout>
      <Content>
        <template v-slot:content>
          <a-back-top />
          <a-row>
            <a-col :span="12">
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
            <a-list-item slot="renderItem" key="item.id" slot-scope="item">
              <div slot="actions">
                <a-row :style="{ height: '20px' }">
                  <a-icon type="user" :style="{ marginRight: '8px' }"></a-icon
                  ><span :style="{ marginRight: '8px' }">{{
                    item.username
                  }}</span>
                  <a-icon
                    type="history"
                    :style="{ marginRight: '8px' }"
                  ></a-icon
                  ><span :style="{ marginRight: '8px' }">{{
                    item.download_times
                  }}</span>
                  <a-icon
                    type="download"
                    :style="{ marginRight: '8px' }"
                  ></a-icon
                  ><span :style="{ marginRight: '8px' }"
                    ><a @click="download(item.id)">点击下载</a></span
                  >
                </a-row>
              </div>
              <a-list-item-meta :description="item.description">
                <a slot="title"
                  ><a-tag>{{ item.type }}</a-tag> {{ item.file_name }}</a
                >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </template>
      </Content>
    </a-layout>
  </div>
</template>
<script>
import Content from "./common/Content";
import qs from "qs";

export default {
  name: "Download",
  components: {
    Content,
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
      const res = await this.getFileListData();
      console.log("code换取文件列表",res)
    },
    getFileListData() {
      return new Promise((resolve, reject) => {
        (this.loading = true),
          this.$axios
            .post("/file/getlist", qs.stringify({ code: this.code}))
            .then((res) => {
              this.listData = res.data;
              this.loading = false;
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
      });
    },
    // set_data() {
    //   return new Promise((resolve, reject) => {
    //     (this.loading = true),
    //       this.$axios
    //         .post("/api/search", qs.stringify({ q: this.q, type: "file" }))
    //         .then((res) => {
    //           this.listData = res.data;
    //           this.loading = false;
    //           resolve();
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           reject();
    //         });
    //   });
    // },
    get_all() {
      this.$axios
        .get("/api/file/get_all")
        .then((res) => {
          this.listData = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.listData = [];
        });
    },
    onSearch() {
      let router = this.$router.resolve({
        path: "/download",
        query: { q: this.q.trim() },
      });
      window.location.href = router.href;
    },
    getFilename(id) {
      return this.listData.filter((r) => {
        if (r.id === id) return true;
      });
    },
    download(id) {
      let file = this.getFilename(id)[0];
      let filename = file.file_name;
      let suffix = "";
      try {
        suffix = file.path.split(".")[1];
      } catch {
        suffix = "";
      }
      let link = document.createElement("a");
      if (suffix === "") {
        link.download = filename;
      } else {
        link.download = filename + "." + suffix;
      }
      link.href = "/api/file/download?file_id=" + id;
      link.click();
      link.remove();
    },
  },
};
</script>
<style></style>
