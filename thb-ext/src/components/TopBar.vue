<template>
  <el-row>
    <el-col :span="24">
      <el-row :gutter="20">
        <el-col :span="6" style="padding-left: 10px; padding-right: 10px">
          <div class="grid-content">
            <el-button @click="enterTHB" type="info">THBWiki</el-button>
            <p>{{ Str_Version }}{{ Version }}</p>
          </div>
        </el-col>
        <template v-if="User.isLogin">
          <el-col :span="8">
            <div class="grid-content" id="userinfo">
              <div id="username">
                <template v-if="User.userinfo.name">
                  <!-- todo -->
                  <div>
                    <el-avatar size="large" :src="User.userinfo.avatar">
                    </el-avatar>
                  </div>
                </template>
                <el-link
                  @click.native="enterTHB"
                  v-text="User.userinfo.name"
                  style="margin-top: -3.7rem; margin-left: 3rem"
                ></el-link>
              </div>
              <template v-if="User.achievementinfo.titlename">
                <p style="margin-top: -1rem; margin-bottom: 0rem">
                  <a
                    :title="User.achievementinfo.titledesc"
                    v-text="User.achievementinfo.titlename"
                    style="color: #409eff"
                  ></a>
                </p>
              </template>
              <p
                style="margin-top: 0rem; margin-bottom: 0rem"
                v-html="UserRealName"
              ></p>
            </div>
          </el-col>
          <el-col :span="10">
            <div
              class="grid-content"
              id="userextinfo"
              style="margin-top: -0.6rem"
            >
              <p>
                {{ Str_RegTime }}<b>{{ User.userinfo.registrationdate }}</b>
              </p>
              <p>
                {{ Str_Group }}<b>{{ User.userinfo.group }}</b>
              </p>
              <p>
                {{ Str_EditCount }}<b>{{ User.userinfo.editcount }}</b>
              </p>
            </div>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="8">
            <div class="grid-content" id="userextinfo">
              <el-button
                @click="enterTHB('user')"
                type="primary"
                v-text="Str_LoginTHB"
              ></el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { createTab, getLang } from "../js/browser/api";
import { getWikiParseText } from "../js/utils/thb";

export default {
  name: "TopBar",
  props: {
    paraUser: {
      type: Object,
      default: () => {},
    },
    paraVersion: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      Chars: [],
      count: 0,
    };
  },
  created() {
    getWikiParseText("用户Wiki:Suika_Sakura/角色名").then((res) => {
      this.Chars = JSON.parse(res);
    });
  },
  updated() {
    for (let i = 0; i <= document.getElementsByTagName("a").length; i++) {
      let a = document.getElementsByTagName("a")[i];
      if (a && a.href) {
        a.onclick = () => {
          createTab(a.href);
        };
      }
    }
  },
  computed: {
    // 参数处理
    User() {
      return Object.assign({}, this.paraUser);
    },
    Version() {
      return this.paraVersion || "";
    },

    // 转义处理
    UserRealName() {
      return this.ParseWiki(this.User.userinfo.realname);
    },

    // i18n处理
    Str_Version() {
      return getLang("extVersion");
    },
    Str_LoginTHB() {
      return getLang("LoginTHB");
    },
    Str_RegTime() {
      return getLang("RegTime");
    },
    Str_Group() {
      return getLang("Group");
    },
    Str_EditCount() {
      return getLang("EditCount");
    },
  },
  methods: {
    enterTHB(type) {
      switch (type) {
        case "user":
          createTab(
            this.User.isLogin
              ? `https://thwiki.cc/用户:${this.User.userinfo.name}`
              : "https://thwiki.cc/特殊:用户登录"
          );
          break;
        default:
          createTab("https://thwiki.cc");
          break;
      }
    },
    ParseWiki(content) {
      let templMatch = content.match(/\{\{(.*)\}\}/g);
      if (templMatch) {
        templMatch.forEach((v) => {
          let tmp = v;
          tmp = tmp.substring(2, tmp.length - 2);
          tmp = this.ParseWiki(tmp);
          let kv = tmp.split("|");

          let newvalue = "";
          if (kv.length == 1) {
            let key = kv[0];
            if (this.Chars[`${key.toLowerCase()}`]) {
              newvalue = this.Chars[`${key.toLowerCase()}`];
            }
          } else if (kv.length > 1) {
            let key = kv[0];
            switch (key) {
              case "黑幕":
                {
                  let value = kv[1];
                  newvalue = `<span class="mask" title="你知道的太多了">${value}</span>`;
                }
                break;
            }
          } else {
            return;
          }
          if (newvalue) {
            content = content.replace(v, newvalue);
          }
        });
      }
      let linkMatch = content.match(/\[\[(.*)\]\]/g);
      if (linkMatch) {
        linkMatch.forEach((v) => {
          let tmp = v;
          tmp = tmp.substring(2, tmp.length - 2);
          tmp = this.ParseWiki(tmp);
          let kv = tmp.split("|");

          let newvalue = "";
          if (kv.length == 1) {
            let key = kv[0];
            newvalue = `<a class='el-link el-link--default' title='${key}' href='https://thwiki.cc/${key}'>${key}</a>`;
          } else if (kv.length > 1) {
            let key = kv[0];
            let value = kv[1];
            newvalue = `<a class='el-link el-link--default' title='${key}' href='https://thwiki.cc/${key}'>${value}</a>`;
          } else {
            return;
          }
          if (newvalue) {
            content = content.replace(v, newvalue);
          }
        });
      }
      return content;
    },
  },
};
</script>
<style>
.mask {
  background-color: #252525;
  color: #252525;
  transition: color 0.5s;
}

.mask a {
  color: #252525 !important;
}

.mask:hover {
  color: #ffffff;
}

.mask:hover a:hover {
  color: #409eff !important;
}
</style>
