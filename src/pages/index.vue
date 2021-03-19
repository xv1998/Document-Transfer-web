<template>
  <div>
    <a-layout>
      <Header :select-keys="[]"/>
      <a-layout-content
        :style="{width:'90%', margin: 'auto', marginTop: '20px'}"
      >
        <a-row>
          <a-col :span="5">
            <Sidebar :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys" />
          </a-col>
          <a-col :span="18">
            <a-layout-content :style="{backgroundColor: 'white', minHeight: '578px', marginLeft: '20px'}">
              <router-view></router-view>
            </a-layout-content>
          </a-col>
        </a-row>
      </a-layout-content>
      <!-- <Footer /> -->
    </a-layout>
  </div>
</template>

<script>
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

export default {
  name: "index",
    props:{
        openKeys:{
                default(){
                  return ['sub1']
                }
            },
            selectedKeys:{
                default(){
                  return ['1']
                }
            }
    },
  components: {
    Header,
    Sidebar
  },

  data() {
    return {
      thisOpenKeys:this.openKeys,
      thisSelectedKeys: this.selectedKeys
      };

    }

};
</script>

<style scoped>
</style>
