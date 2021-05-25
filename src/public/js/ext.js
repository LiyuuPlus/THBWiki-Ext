/** 获得参数 */
var queryString = new QueryString();
var action = queryString.GetValue("action");
var title = decodeURI(queryString.GetValue("title"));

/** 获得状态 */
var editstatus = action == "edit";
var submitstatus = action == "submit";
var lyricstatus = title.indexOf("歌词:") >= 0 ? true : false;

/** 加载样式 */
var loadCssCode = (code) => {
  var style = document.createElement("style");
  style.rel = "stylesheet";
  style.appendChild(document.createTextNode(code));
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
};

/** 加载脚本 */
var loadScript = (code) => {
  var script = document.createElement("script");
  script.innerHTML = code;
  document.body.appendChild(script);
};

/** 变量定义 */
var background = true;
var custombackground = false;
var custombgurl = "";
var blurbackground = false;
var tag = true;
var netease = false;
var aplayer = false;
var custombanner = false;
var custombnop = "";
var custombnurl = "";
var inpageedit = false;

// 临时变量
var img = new Image();

/** 设置获取 */
chrome.storage.local.get(["options"], (res) => {
  if (res.options) {
    background = res.options.background;
    custombackground = res.options.custombackground;
    custombgurl = res.options.custombgurl || "";
    blurbackground = res.options.blurbackground;
    tag = res.options.tag;
    netease = res.options.netease;
    aplayer = res.options.aplayer;
    custombanner = res.options.custombanner;
    custombnop = res.options.custombnop || "";
    custombnurl = res.options.custombnurl || "";
    inpageedit = res.options.inpageedit;
  }
});

var setBG = () => {
  var css = `
    body{
        background-color:#ffffff00!important;
    }
    
    #mw-page-base,
    #mw-head-base,
    #mw-panel{
        --foreground-color-high:auto!important;
        background-color: var(--foreground-color-high)!important;
    }

    #mw-page-base{
        -webkit-box-shadow: unset;
        -moz-box-shadow: unset;
        box-shadow: unset;
    }
    
    #mw-panel{
        --foreground-color-high:#ffffffcc!important;
        background-color: var(--foreground-color-high)!important;
        padding-top: 0;
        top: 178px;
    }

    #p-logo{
        background-color: transparent!important;
        top: -178px;
    }

    .mw-wiki-logo{
        filter: drop-shadow(0px 0px 0.4rem #000);
    }

    #p-personal,
    #simpleSearch{
        background-color: #ffffff94!important;
    }

    #simpleSearch #searchButton,
    #simpleSearch #mw-searchButton{
        background-color: #e8e8e869;
    }
    
    #mw-panel .portal{
        background-color:#ffffff00!important;
    }
    
    #footer{
        background-color: #ffffffcc!important;
    }
    
    #p-personal{
        padding-right: 1rem;
    }
    
    #p-personal ul{
        padding-left: 0;
    }
    
    #content
    {
        background-color: #ffffffb3!important
    }
    
    .portal ul>li
    {
        background-color: #ffffff00!important;
    }
    
    .portal li ul li,
    div.vectorMenu div.menu
    {
        background-color: #ffffff45!important
    }
    
    
    .mw-body #toc, .mw-body .toc,
    div.thumbinner,
    .disambig-box,
    .page-content-header,
    .catlinks,
    .ambox,
    pre,
    .mw-code,
    .template-documentation,
    #a-garakuta,
    #a-game,
    #a-music,
    #a-series,
    #a-doujin,
    #a-news,
    #a-other,
    #a-link,
    #a-about,
    .thumbimage{
        border-radius: 10px;
    }
    
    .mw-body #toc, .mw-body .toc,
    .mw-body table.wikitable,
    div.thumbinner,
    .disambig-box,
    .page-content-header,
    #mw-hidesidebar,
    .catlinks,
    .ambox,
    pre,
    .mw-code{
        background-color: #ffffff6b!important;
    }
    
    table.tt-type-dialogue tr.tt-header>td.tt-ja,
    table.tt-type-dialogue tr.tt-header>td.tt-zh,
    td.tt-char, td.tt-status,
    table.tt-type-omake tr.tt-header>td,
    table.tt-type-omake tr.tt-content-header>td,
    table.tt-type-omake tr.tt-manual-header>td,
    table.tt-type-omake td.tt-pic,
    table.tt-type-omaketxt tr.tt-header>td,
    table.tt-type-omaketxt tr.tt-content-header>td,
    table.tt-type-omaketxt tr.tt-manual-header>td,
    table.tt-type-omaketxt td.tt-pic,
    table.tt-type-setting tr.tt-header>td,
    table.tt-type-setting tr.tt-content-header>td,
    tr.tt-lyrics-header>td{
        background-color: #e8e8e87a !important;
    }

    #footer
    {
        background-color: #ffffffc9!important;
    }
    
    .mw-body table.wikitable th{
        background-color: #fffbfb69!important;
    }
    
    #a-donate,
    .user-relationship-container img,
    #profile-image img{
        border-radius: 5px;
    }
    
    #p-personal{
        border-radius: 1rem;
    }
    
    .page-首页 #content{
        background-color: #ffffff6e!important;
    }
    
    .bg-g2{
        background-color: #d2ecd594!important;
    }
    
    div#ExtFixedHeader h2, 
    div#ExtFixedHeader h3{
        background-color: rgba(244, 244, 244, 0.78)!important;
    }

    @keyframes show{
        from{
          opacity: 0;
        }
    }

    .comment-body textarea, .comment-preview{
        background: #ffffff7d;
    }

    .tocfloat .tocfloatcontent {
        background-color: #ffffffd6;
    }
    `;

  loadCssCode(css);
};

var setTHBExtBG = (url) => {
  setBG();
  var bgcss = `
    .THBExtBG {
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: -3;
        display: block;
        user-select: none;
        bottom: 0;
        position: fixed;
    }
    
    .THBExtBG img {
        position: fixed;
        top: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        animation: 2s ease 0s 1 normal none running show;
    }
    `;

  loadCssCode(bgcss);
  $("body").append(
    $(`<div class="THBExtBG"><img id="THBG" src="${url}"></img></div>`)
  );
};

var setTHBExtBlurBG = (url) => {
  var css = `
    #mw-panel{
        --foreground-color-high:#ffffff94!important;
    }
    
    #mw-panel,
    #content,
    #footer
    {
        background-color: #ffffff80!important;
    }

    .page-首页 #content{
        background-color: #fff0!important;
        backdrop-filter: unset;
    }
    
    #a-donate table{
        background-color: #fff0!important;
    }

    #p-personal,
    #simpleSearch,
    #a-garakuta::before,
    #a-game::before,
    #a-music::before,
    #a-series::before,
    #a-doujin::before,
    #a-news::before,
    #a-other::before,
    #a-link::before,
    #a-about::before{
        background-color: #ffffff85!important;
    }

    .bg-g2{
        background-color: #d2ecd594!important;
    }

    div#ExtFixedHeader h2, 
    div#ExtFixedHeader h3{
        background-color: #f4f4f44a!important;
        backdrop-filter: blur(5px);
        transform: translate3d(0px, 0px, 0px);
    }

    .portal li ul li {
        background-color: #ffffff94!important;
    }

    .mw-body table.wikitable th{
        background-color: #fffbfb52!important;
    }
    
    .tocfloat .tocfloatcontent,
    div.vectorMenu div.menu,
    #p-personal,
    #simpleSearch,
    #a-donate table,
    #a-garakuta,
    #a-game,
    #a-music,
    #a-series,
    #a-doujin,
    #a-news,
    #a-other,
    #a-link,
    #a-about,
    #mw-panel,
    #content,
    #footer{
        backdrop-filter: blur(5px);
        transform: translate3d(0px, 0px, 0px);
    }

    .comment-user, .comment-user a {
        color: #616161;
    }

    .comment-time{
        color: #6f6e6e;
    }

    .tocfloat .tocfloatcontent {
        background-color: #ffffffa6!important;
    }
    `;

  setTHBExtBG(url);
  loadCssCode(css);
};

$().ready(() => {
  /*$("#p-namespaces").append($(`<ul id="thbext" class="vectorTabs" :data-lastVer="ver" :data-curVer="extVer">
                           <li id="ca-nstab-changeLog" @click="showChangeLog"><span ><a>${getLang("extName")} ${getLang("THBChangelog")}</a></span></li>
                           <li id="ca-nstab-update" v-if="update" @click="goToSite"><span><a>更新我的THBWiki</a></span></li>
                           <li id="ca-nstab-saveBackground" @click="ViewPic" v-if="background"><span><a>${getLang("ViewBG")}</a></span></li>
                           <template v-if="background">
                               <el-image :src="bgsrc" :preview-src-list="bglist" style="width: 1px; height: 1px" ref="bg_preview"></el-image>
                           </template>
                       </ul>`));*/
  $("#left-navigation").append(
    $(`<div id="p-thbext" role="navigation" class="vectorMenu" aria-labelledby="p-thbext-label">
    <el-badge is-dot class="p-menu" :hidden="!update">
        <h3 id="p-thbext-label" tabindex="0" :data-lastVer="ver" :data-curVer="extVer"> 
            <span>${getLang("extName")}</span><a href="#" tabindex="-1"></a>
        </h3>
    </el-badge>
    <div class="menu">
        <ul>
            <li id="ca-changeLog" @click="showChangeLog"><span ><a>${getLang(
              "extName"
            )} ${getLang("THBChangelog")}</a></span></li>
            <li id="ca-update" v-if="update" @click="goToSite"><span><a>更新${getLang(
              "extName"
            )}</a></span></li>
            <li id="ca-saveBackground" @click="ViewPic" v-if="background"><span><a>${getLang(
              "ViewBG"
            )}</a></span></li>
        </ul>
    </div>
    <template v-if="background">
        <el-image :src="bgsrc" :preview-src-list="bglist" style="width: 1px; height: 1px" ref="bg_preview"></el-image>
    </template>
</div>`)
  );
  new Vue({
    el: "#p-thbext",
    data() {
      return {
        homepage: "",
        extVer: "",
        ver: "",
        check: false,
        update: false,
        background: false,
        bgsrc: "",
        bglist: [],
      };
    },
    created() {
      $.get(
        chrome.extension.getURL("manifest.json"),
        (info) => {
          chrome.storage.local.get(["info"], (res) => {
            if (res.info) {
              this.ver = res.info.ver;
            } else {
              this.ver = "0.0.0";
            }
            this.extVer = info.version;
            this.homepage = info.homepage_url;
          });
        },
        "json"
      );
      // 仅unicorn皮肤生效
      if (background && $("body").hasClass("skin-unicorn")) {
        this.showBackground();
      }
    },
    updated() {
      if (!this.check) {
        this.checkUpdate();
      }
    },
    methods: {
      showChangeLog() {
        getVer({ curVer: this.extVer }).then((res) => {
          this.$alert(res, `${getLang("extName")} ${getLang("THBChangelog")}`, {
            dangerouslyUseHTMLString: true,
            confirmButtonText: getLang("Yes"),
          });
        });
      },
      checkUpdate() {
        //过于花里胡哨的提示
        var spLen = 10 - this.extVer.length;
        var sp = "";
        for (let i = 0; i < spLen; i++) {
          sp += " ";
        }
        console.log(
          `%c    _____   _   _   ____                    
    |_   _| | | | | | __ )                  
      | |   | |_| | |  _ \                   
      | |   |  _  | | |_) |                 
      |_|   |_| |_| |____/   ver. ${this.extVer}${sp}
                                            `,
          "background-color:#000;color:#fff;text-shadow: -1px 0 0.4rem #2196f3, 0 1px 0.4rem #2196f3, 1px 0 0.4rem #2196f3, 0 -1px 0.4rem #2196f3;"
        );
        this.isNewVer(this.ver, this.extVer);
        getVer({ upVer: this.extVer }).then((ret) => {
          this.update = this.extVer != ret;
          console.log(
            this.extVer,
            ret,
            this.extVer >= ret
              ? "扩展版本已是最新"
              : `检测到扩展有更新，最新扩展版本为${ret}`
          );
        });
        this.check = true;
      },
      goToSite() {
        window.location.href = `${this.homepage}/releases`;
      },
      isNewVer(curVer, newVer) {
        if (curVer < newVer) {
          console.log(
            curVer,
            newVer,
            `检测到扩展已更新，当前扩展版本为${newVer}`
          );
        }
        if (curVer && newVer && curVer < newVer) {
          getVer({ ver: newVer }).then((ret) => {
            this.$alert(
              ret,
              `${getLang("extName")} ${newVer}${getLang("THBChangelog")}`,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: getLang("yes"),
                callback: (action) => {
                  if (action == "confirm") {
                    chrome.storage.local.set({ info: { ver: newVer } });
                  }
                },
              }
            );
          });
        }
      },
      showBackground() {
        let defurl = `${apiurl}Background`;
        img.onload = () => {
          if (blurbackground) {
            setTHBExtBlurBG(img.src);
          } else {
            setTHBExtBG(img.src);
          }
          this.bgsrc = img.src;
          this.bglist = [img.src];
          this.background = true;
        };
        if (custombackground) {
          var url = custombgurl || defurl;
          img.src = url;
        } else {
          //根据词条判断背景
          var word = $("#firstHeading").text().replace(/ /g, "_");
          var url = `${defurl}?char=${word}&type=1`;
          $.get(url, {}, (res) => {
            if (res.status == 0) {
              img.src = res.data;
            }
          });
        }
      },
      ViewPic() {
        this.$refs.bg_preview.showViewer = true;
      },
    },
  });

  if (custombanner) {
    let url = "";
    if (custombnop == "customer") {
      url = custombnurl;
    } else {
      url = custombnop;
    }
    if (url) {
      if ($("#ca-nstab-main").text() == "首页") {
        // 仅unicorn和vampire皮肤生效
        var skins = ["skin-unicorn", "skin-vampire"];
        var hasSkin = false;
        for (var index in skins) {
          hasSkin = $(`.${skins[index]}`).length > 0;
          if (hasSkin) break;
        }
        if (hasSkin) {
          loadCssCode(
            "#siteNotice{text-shadow: #252525 -1px -1px 1px, #252525 1px -1px 1px, #252525 -1px 1px 1px, #252525 1px 1px 1px;color: #CBA461;}"
          );
          loadCssCode(
            `.page-首页 div#content.mw-body{background-image:url(${url})!important;}`
          );
        }
        // 如果不是在首页而是在首页的编辑页或者历史页的时候，不显示banner
        if (action) {
          loadCssCode(
            `.page-首页 div#content.mw-body{background-image:none!important;}`
          );
        }
      }
    }
  }

  if (inpageedit) {
    var script = `!(function() {
  // RLQ是MediaWiki保存异步执行函数的数组
  window.RLQ = RLQ || [];
  RLQ.push(() => {
    // 等待jQuery加载完毕
    var _count = 0;
    var _interval = setInterval(() => {
      _count++;
      if (typeof jQuery !== "undefined") {
        // jQuery加载完毕
        clearInterval(_interval);
        // 防止网站并不是MediaWiki时报错
        try {
          mw.loader.load("https://cdn.jsdelivr.net/npm/mediawiki-inpageedit@latest/dist/InPageEdit.min.js");
        } catch (e) {}
      } else if (_count > 30 * 5) {
        // 加载超时
        clearInterval(_interval);
      }
    }, 200);
  });
})();`;
    loadScript(script);
  }

  // //替换底部标签
  // if ($("#mw-normal-catlinks ul").length > 0) {
  //     $("#mw-normal-catlinks ul li").each(function () {
  //         if ($(this).hasClass(".noprint")) return;
  //         var a = $(this).find("a");
  //         var name = a.text();
  //         var title = a.attr("title");
  //         var href = a.attr("href");
  //         $(this).html(`<el-link type='primary' href='${href}' title='${title}'>${name}</el-link>`);
  //     });
  //     new Vue({
  //         el: "#catlinks",
  //         data() {

  //         }
  //     });
  // }

  if ($("#toc").length > 0) {
    var parClass = $("#toc").parent().attr("class");
    var toc = $(`
    <div class="tocfloat">
        <div class="tocfloatlabel">显示目录</div>
    </div>
    `);
    var notoc = $(`
    <div id="NOTOC" class="tocfloatcontent mw-parser-output ${parClass}">
    </div>
    `);
    notoc.append($("#toc").children().clone());
    toc.append(notoc);
    $("body").append(toc);
  }

  //提交页面
  if (submitstatus) {
    setTimeout(() => {
      //验证码自动获取
      if ($("label[for='wpCaptchaWord']").length > 0) {
        var question = $("label[for='wpCaptchaWord']").text();
        getCaptcha(question).then((res) => {
          $("input[name='wpCaptchaWord']").val(res);
        });
      }
    }, 1000);
  }
  //修改页面
  else if (editstatus) {
    var toolbarReady = null;
    toolbarReady = setInterval(() => {
      if ($(".wikiEditor-ui-toolbar .tabs").length > 0) {
        clearInterval(toolbarReady);

        // 哔哩哔哩BV号转换
        $(".wikiEditor-ui-toolbar .tabs").append(
          $(
            `<span class='tab tab-bilibili' rel='bilibili'><a href='#' role='button' aria-pressed='false' aria-controls='wikiEditor-section-bilibili' class=''>插入转换后的哔哩哔哩BV号</a></span>`
          )
        );

        $(".tab-bilibili").on("click", function () {
          let bvid = prompt("请输入BV号（非完整地址）", "");

          let table =
            "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
          let tr = {};
          for (let i = 0; i < 58; i++) {
            tr[table[i]] = i;
          }
          let s = [11, 10, 3, 8, 4, 6];
          let xor = 177451812,
            add = 8728348608;

          let r = 0;
          for (let i = 0; i < 6; i++) {
            r += tr[bvid[s[i]]] * Math.pow(58, i);
          }
          let avid = (r - add) ^ xor;
          insertText($("textarea")[0], avid);
          return false;
        });
      }
    }, 1000);
    var fundiv = "";
    //歌词修改
    if (lyricstatus) {
      if (netease) {
        let subtitle = title.substring("歌词:".length);
        let groupname =
          subtitle.indexOf("（") > 0
            ? subtitle.substring(
                subtitle.indexOf("（") + 1,
                subtitle.length - "）".length
              )
            : "";
        let songname = subtitle.replace("（" + groupname + "）", "");
        //添加网易云音乐歌词获取
        fundiv += `<pre><el-button type="info" @click="getNetLyric('${songname}','${groupname}')">网易云歌词获取</el-button><el-card class="box-card" v-if="songs.length>0"><div v-for="song in songs">{{song.name}}　<strong>{{song.album.name}}</strong>　<el-button type="success" @click="clickSong(song.id)" size="mini">选择</el-button></div></el-card><transition name="el-fade-in-linear"><div v-if="lyricUrl"><iframe id="lyricframe" allowTransparency="true" style="background-color:#66ccff;width:100%" :src="lyricUrl"></iframe><el-button type="danger" @click="closeNetLyric">关闭</el-button></div></transition></pre>`;
      }
    }
    // fundiv += `<pre><el-button type="info" :disabled="text?false:'disabled'" @click="loadTmpText(true)">加载草稿</el-button><el-button type="primary" @click="saveTmpText">保存草稿</el-button> 上一次保存草稿时间：{{lasttime}}</pre>`
    var div = `<div id='ext-editform'>${fundiv}</div>`;
    $(".mw-editform").before($(div));
    new Vue({
      el: "#ext-editform",
      data() {
        return {
          lyricUrl: "",
          songs: [],
          text: "",
          // lasttime: null
        };
      },
      created() {
        // this.lasttime = new Date(localStorage.getItem(`${title}-time`) || null).Format("yyyy-MM-dd hh:mm:ss");
        // this.loadTmpText();
      },
      methods: {
        getNetLyric(songname, groupname) {
          getNetSearch({ limit: 5, name: `${songname}+${groupname}` }).then(
            (res) => {
              this.songs = res.songs;
            }
          );
        },
        clickSong(id) {
          this.lyricUrl = `${apiurl}NetLyric?id=${id}&format=thb`;
        },
        closeNetLyric() {
          this.lyricUrl = "";
        },
        // loadTmpText(apply) {
        //     this.text = localStorage.getItem(title) || '';
        //     if (apply) {
        //         $("#wpTextbox1").val(this.text);
        //     }
        // },
        // saveTmpText() {
        //     this.text = $("#wpTextbox1").text();
        //     localStorage.setItem(title, this.text);
        //     this.lasttime = new Date();
        //     localStorage.setItem(`${title}-time`, this.lasttime);
        // }
      },
    });
  } else {
    //短链替换
    if ($("#mw-indicator-0 a").length > 0) {
      if ($("#profile-toggle-button").length > 0) {
        $("#profile-toggle-button").css("margin-top", "2rem");
      }
      var sortlink = $("#mw-indicator-0 a").attr("href");
      $("#mw-indicator-0 a").remove();
      $("#mw-indicator-0").append(
        $(
          "<el-button type='primary' @click='copySortLink'>复制短链接</el-button>"
        )
      );
      new Vue({
        el: "#mw-indicator-0",
        data() {
          return {
            sortlink: "",
            lyricUrl: "",
            songs: [],
          };
        },
        created() {
          this.sortlink = sortlink;
        },
        methods: {
          copySortLink() {
            var link = `${window.location.protocol}//${window.location.host}${this.sortlink}`;
            var res = copyToClipboardText(link);
            if (res) {
              this.$message({
                message: "复制短链接成功！",
                type: "success",
                showClose: true,
              });
            } else {
              this.$message.error("复制短链接失败！");
            }
          },
        },
      });
    }

    if (tag) {
      //修改歧义分类
      var understate = "";
      if ($("#firstHeading .understate").length > 0) {
        understate = $("#firstHeading .understate")
          .text()
          .replace(/\（|）/g, "");
        $("#firstHeading .understate").remove();
      }
      if ($(".searchaux").length > 0) {
        understate = $(".searchaux").attr("title");
      }
      var parseState = (name) => {
        var arr = {
          社团: "同人社团",
          人物: "现实人物",
          展会: "同人展会",
          角色: "新作角色",
          小说: "官方小说",
          漫画: "官方漫画",
        };
        return arr[name] || name;
      };
      if (understate) {
        var type = "";
        understate = parseState(understate);
        switch (understate) {
          case "同人专辑":
          case "同人视频":
          case "同人软件":
          case "同人志":
          case "商业游戏":
          case "周边":
            type = "primary";
            break;
          case "同人社团":
          case "现实人物":
          case "同人展会":
            type = "success";
            break;
          case "新作角色":
          case "旧作角色":
          case "同人角色":
          case "相关角色":
            type = "info";
            break;
          case "弹幕游戏":
          case "格斗游戏":
          case "原曲":
          case "官方小说":
          case "官方漫画":
            type = "danger";
            break;
          default:
            type = "warning";
            break;
        }
        $("#firstHeading").append(
          $(
            `<el-tag effect='dark' type='${type}' style='margin-left: 0.5rem;'>${understate}</el-tag>`
          )
        );
      }
      new Vue({
        el: "#firstHeading",
        data() {},
      });
    }

    if (aplayer) {
      var understate = $(".searchaux").attr("title");
      if (understate == "同人专辑") {
        var circle = "";
        var album = "";
        $(".doujininfo tr").each((i, v) => {
          let circleflag = false;
          let albumflag = false;
          $(v)
            .children()
            .each((i1, v1) => {
              let label = $(v1).text();
              if (albumflag && !album) {
                album = label.trim();
              } else if (circleflag && !circle) {
                circle = label.trim();
              }
              if (label == "名称") {
                albumflag = true;
              } else if (label == "制作方") {
                circleflag = true;
              }
            });
        });
        if (album && circle) {
          $(".musicTable").attr("id", "musicapp");
          $(".musicTable tr")
            .eq(0)
            .before(
              $(
                `<tr v-show="songs.length > 0"><td colspan="4"><div id="aplayer"></td></tr>`
              )
            );
          // $(".musicTable .title").each((i, v) => {
          //     var name = $(v).text();
          //     $(v).find(".thcsearchlinks").before($(`<el-button type="success" size="mini" v-show="songs.filter(v => v.name == '${name}').length > 0">点击播放</el-button>`));
          // });
          new Vue({
            el: "#musicapp",
            data() {
              return {
                songs: [],
                aplayer: null,
              };
            },
            watch: {
              songs(newval, oldval) {
                if (newval.length > 0) {
                  var musics = [];
                  newval.forEach((v, i) => {
                    musics.push({
                      title: v.name,
                      artist: v.ar[0].name,
                      cover: v.al.picUrl,
                      url: `http://music.163.com/song/media/outer/url?id=${v.id}.mp3`,
                      lrc: `${apiurl}NetLyric?id=${v.id}`,
                    });
                  });
                  this.aplayer = new APlayer({
                    container: $("#aplayer")[0],
                    listFolded: false,
                    fixed: false,
                    audio: musics,
                    lrcType: 3,
                    mini: false,
                  });
                } else {
                  this.aplayer = null;
                }
              },
            },
            created() {
              this.getNetMusic();
            },
            methods: {
              getNetMusic() {
                getNetAlbum({ name: album, ar: circle }).then((res) => {
                  this.songs = res.songs;
                });
              },
            },
          });
        }
      }
    }
  }
});
