<template>
  <div>
    <TopBar :paraVersion="Version" :paraUser="User" />
    <SearchBar />
    <FunctionTab />
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import FunctionTab from "./components/FunctionTab";
import { Format } from "../js/utils/common";
import { checkLogin, getUserInfo } from "../js/utils/thb";
import { getExtURL, getLang } from "../js/browser/api";
import http from "../js/utils/http";
Date.prototype.Format = Format;

export default {
  name: "App",
  components: { TopBar,SearchBar,FunctionTab },
  data() {
    return {
      User: {
        isLogin: false,
        userinfo: {
          name: "",
          realname: "",
          htmlrealname: "",
          avatar: "https://thwiki.cc/favicon.ico",
        },
        achievementinfo: {
          titlename: "",
          titledesc: "",
        },
      },
      AchievementInfo: {},
      Version: "",
      rights: [
        "bot",
        "bureaucrat",
        "sysop",
        "textop",
        "confirm",
        "preconfirm",
        "autoconfirmed",
        "user",
      ],
    };
  },
  computed: {
  },
  created() {
    http.get(getExtURL("manifest.json")).then((ret) => {
      this.Version = ret.version;
    });
  },
  mounted() {
    checkLogin((ret) => {
      this.User.isLogin = ret ? true : false;
      if (this.User.isLogin) {
        this.User.userinfo.fullname = decodeURIComponent(ret).replace(
          /\+/g,
          " "
        );

        setTimeout(() => {
          getUserInfo().then((res) => {
            res.userinfo.groups = res.userinfo.groups.filter((v) => v != "*");
            //取得最高权限用户组
            for (let i = 0; i < this.rights.length; i++) {
              let right = this.rights[i];
              let group = res.userinfo.groups.filter((v) => v == right);
              if (group.length > 0) {
                res.userinfo.group = this.Str_Right(right);
                break;
              }
            }
            res.userinfo.registrationdate = new Date(
              res.userinfo.registrationdate
            ).Format("yyyy-MM-dd");
            res.userinfo.avatar = `https://upload.thwiki.cc/avatars/thwikicc_wiki_${
              res.userinfo.id
            }_l.jpg?r=${Math.round(new Date().getTime() / 1000)}`;
            this.User = Object.assign(this.User, res);
          });
        }, 200);
      }
      // this.getUnreadNotification();
    }, "popup");
  },
  updated() {},
  methods: {
    Str_Right(right) {
      return getLang("right_" + right);
    },
  },
};
</script>

<style>
html {
  width: 500px;
  height: 450px;
  overflow: hidden;
}
</style>
