<template>
  <div>
    <a-row>
      <a-col>
        <a-menu
          style="maxwidth: 256px"
          :selectedKeys="selectedKeys"
          :openKeys.sync="keys"
          mode="inline"
          :inlineCollapsed="collapsed"
        >
          <a-sub-menu key="sub1">
            <span slot="title"
              ><a-icon type="file" /><span>文件管理</span></span
            >
            <a-menu-item key="1"
              ><router-link :to="{ path: 'upload' }">
                文件上传
              </router-link>
            </a-menu-item>
            <a-menu-item key="2"
              ><router-link :to="{ path: 'other' }">
                我的文件
              </router-link></a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  props: {
    openKeys: {
      default() {
        return ["sub1"];
      },
    },
    selectedKeys: {
      default() {
        return ["1"];
      },
    },
  },
  data() {
    return {
      keys: this.openKeys,
      collapsed: false,
      screenWidth: document.body.clientWidth,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },

  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
      if (this.screenWidth <= 734) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
    };
  },
};
</script>
