<template>
  <p>123</p>
</template>
<script>
import { createTab, getLang } from "../../../js/browser/api";
export default {
  name: "UnreadTab",
  props: {},
  data() {
    return {};
  },
  computed: {
    // i18n处理
  },
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$on("init", this.init);
    });
  },
  methods: {
    init() {
        console.log("未读");
    },
  },
};
</script>
<style></style>
