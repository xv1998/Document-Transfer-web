<template>
  <div class="tem_bd">
    <Nav v-model="actId" class="nav_bd" @change="changeNav"/>
    <keep-alive>
      <router-view class="content_bd"/>
    </keep-alive>
  </div>
</template>
<script>
import Nav from '../components/Nav';
import { NAV_SEND, NAV_LABEL, NAV_ANCHOR} from '../common/constants';
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
  methods: {
    changeNav(val = '1') {
      let name = NAV_LABEL[~~val] || NAV_SEND;
      this.$router.replace({
        name
      })
    }
  },
  mounted(){
    this.actId = `${NAV_ANCHOR[this.$route.name]}` || '1';
  }
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
.content_bd{
  padding: 20px;
}
</style>
