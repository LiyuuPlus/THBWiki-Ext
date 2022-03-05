<template>
  <p>2345</p>
</template>
<script>
import { createTab, getLang } from "../../../js/browser/api";
export default {
  name: "RemindTab",
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
      console.log("已读提醒");
    },
  },
};
</script>
<style></style>
