<template>
  <div class="tem_bd">
    <Nav v-model="actId" class="nav_bd"/>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Nav from '../components/Nav';
export default {
  name: "home",
  components: {
    Nav
  },
  data() {
    return {
      actId: "1",
    };
  },
  watch:{
    actId(val){
      console.log("切换",val)
    }
  },
  methods: {
  },
};
</script>
<style scoped>
.tem_bd{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav_bd{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
