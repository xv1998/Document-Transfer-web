<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0">
      <a-row>
        <a-col :xs="{ span: 18, offset: 2 }" :sm="{ span: 32, offset: 1 }">
          <a-col>
            <a-menu
              theme="light"
              mode="horizontal"
              :style="{ lineHeight: '64px' }"
              v-model="keys"
            >
              <a-menu-item key="1">
                <router-link :to="{ path: 'upload'}">
                  <a-icon type="home" />
                  文件上传
                </router-link>
              </a-menu-item>
              <a-menu-item key="2">
                <router-link :to="{ path: 'download'}">
                  <a-icon type="download" />
                  文件下载
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<script>
// import Login from "../user/Login";
// import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Header",
  props: {
    selectKeys: {
      default() {
        return ["1"];
      },
    },
  },
  data() {
    return {
      keys: this.selectKeys,
    };
  },

  methods: {
    handleCancel() {
      this.visible = false;
      this.$refs.login.clearInput();
    },
    // ...mapActions(["getMessageCount"]),
    // ...mapMutations(["setIsLogin"]),
  },

};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
