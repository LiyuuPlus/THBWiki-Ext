<template>
  <p>{{ examData }} {{ prop }}</p>
</template>
<script>
export default {
  name: "MsgTab",
  props: {
    paramProp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      examData: this.$vnode.componentOptions?.tag,
    };
  },
  computed: {
    // 计算属性
    prop() {
      return this.paramProp || "prop";
    },
    // i18n处理
  },
  watch: {
    prop(newVal) {
      console.log(`prop更变为${newVal}`);
    },
  },
  created() {
    console.log("初始化事件");
  },
  mounted() {
    this.$nextTick(() => {
      this.$on("init", this.init);
    });
  },
  updated() {
    console.log("数据挂载事件");
  },
  methods: {
    init() {
      console.log(`${this.$vnode.componentOptions?.tag} 刷新事件`);
    },
  },
};
</script>
<style></style>
