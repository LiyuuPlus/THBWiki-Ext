<template>
  <el-row>
    <el-col :span="24">
      <el-autocomplete
        :placeholder="Str_Search"
        v-model="Search"
        style="width: 100%"
        @keyup.enter.native="searchTHB"
        :fetch-suggestions="searchTHBSuggest"
        :trigger-on-focus="false"
        @select="searchSelect"
        :highlight-first-item="true"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchTHB">
        </el-button>
        <template slot-scope="{ item }">
          <div class="thb-suggest">
            <div class="name" v-html="item.name"></div>
            <span class="content" v-text="item.content"></span>
          </div>
        </template>
      </el-autocomplete>
    </el-col>
  </el-row>
</template>
<script>
import { createTab, getLang } from "../../js/browser/api";
import { searchSuggest } from "../../js/utils/thb";
export default {
  name: "SearchBar",
  props: {},
  data() {
    return {
      Search: "",
    };
  },
  computed: {
    // i18n处理
    Str_Search() {
      return getLang("search");
    },
  },
  watch: {},
  created() {},
  methods: {
    searchTHB() {
      createTab(
        `https://thwiki.cc/index.php?search=${encodeURIComponent(
          this.Search
        )}&go=1`
      );
    },
    searchTHBSuggest(querystring, cb) {
      searchSuggest(querystring).then((res) => {
        res = res.map((v) => {
          v.name = v.name.replace(
            new RegExp(querystring, "gi"),
            `<font color='#f2b040'>$&</font>`
          );
          return v;
        });
        return cb(res);
      });
    },
    searchSelect(item) {
      createTab(item.url);
    },
  },
};
</script>
<style>
.thb-suggest{
  line-height: normal;
  padding: 4px 7px;
}

.thb-suggest .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.thb-suggest .content {
  font-size: 12px;
  color: #b4b4b4;
}
</style>
