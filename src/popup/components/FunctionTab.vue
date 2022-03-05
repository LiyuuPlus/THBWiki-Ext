<template>
  <el-row>
    <el-col :span="24">
      <el-tabs
        v-model="Tab"
        @tab-click="changeTab"
        tab-position="left"
        style="height: 300px"
      >
        <el-tab-pane
          :label="com.name"
          :name="com.id"
          v-for="com in coms"
          :key="com.id"
        >
          <component :is="com.id" :ref="com.id" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import Vue from "vue";
import { createTab, getLang } from "../../js/browser/api";
import { getJsonValToArray } from "../../js/utils/common";
import functions from "./functions";
export default {
  name: "FunctionTab",
  props: {},
  data() {
    return {
      Tab: "",
      coms: [],
      isLoading: true,
    };
  },
  computed: {
    // i18n处理
  },
  watch: {
    coms(newVal) {
      if (newVal.length > 0) {
        let tabName = newVal[0].id;
        this.Tab = tabName;
      } else {
        this.Tab = "";
      }
    },
  },
  created() {
    let components = this.loadCom();
    this.coms = components.keys;
  },
  mounted() {},
  updated() {
    // 初始化完成后给子组件发送刷新命令
    if (
      Object.keys(this.$refs).length == this.coms.length &&
      this.isLoading &&
      this.Tab
    ) {
      this.$refs[this.Tab][0].$emit("init");
      this.isLoading = false;
    }
  },
  methods: {
    loadCom() {
      let enabledCom = [];
      Object.keys(functions).map((key) => {
        let fun = functions[key];
        if (fun.enabled && fun.type === "page") {
          Vue.component(key, () => import(`${fun.src}`));
          enabledCom.push({
            key: { id: key, name: fun.name },
            sort: fun.sort,
          });
        }
      });
      let coms = {};
      enabledCom.sort((a, b) => a.sort - b.sort);
      enabledCom.map((com) => {
        coms[com.key.id] = com;
      });
      return {
        keys: getJsonValToArray(enabledCom, "key"),
        coms,
      };
    },
    changeTab(tab, event) {
      this.Tab = tab.name;
      // 切换标签后给目标标签发送刷新命令
      this.$refs[tab.name][0].$emit("init");
    },
  },
};
</script>
<style></style>
