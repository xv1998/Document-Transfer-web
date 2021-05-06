<template>
    <span>{{time}}</span>
</template>
<script>
export default {
  name: "CountDown",
  data() {
    return {
      time: "",
      flag: false,
      clock: null
    };
  },
  mounted() {
    this.time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(this.time);
      }
      this.timeDown();
    }, 500);
  },
  props: {
    endTime: {
      type: Number,
      default: new Date().getTime()
    }
  },
  watch:{
    endTime(item){
      console.log('aaaaaaaaaa',item)
      if(this.clock){
        clearInterval(this.clock);
      }
      this.clock = setInterval(() => {
        if (this.flag == true) {
          clearInterval(this.clock);
        }
        this.timeDown();
      }, 500);
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime*1000);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.time = `${h}:${m}:${s}`; // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>
 
<style scoped>
</style>
