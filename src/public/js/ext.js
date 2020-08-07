QueryString = {
    data: {},
    Initial: function () {
        var aPairs, aTmp;
        var queryString = new String(window.location.search);
        queryString = queryString.substr(1, queryString.length);
        aPairs = queryString.split("&");
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            this.data[aTmp[0]] = aTmp[1];
        }
    },
    GetValue: function (key) {
        return this.data[key];
    }
}
QueryString.Initial();

//Get Query
var action = QueryString.GetValue("action");
var title = decodeURI(QueryString.GetValue("title"));

//Get Status
var editstatus = (action == "edit") ? true : false;
var lyricstatus = (title.indexOf("歌词:") >= 0) ? true : false;

var apiurl = "https://www.alicem.top/KamiAPI/";

var loadCssCode = (code) => {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    //for Chrome Firefox Opera Safari
    style.appendChild(document.createTextNode(code));
    //for IE
    //style.styleSheet.cssText = code;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}

var setbg = () => {
    var css = `body{
        background-color:#ffffff00!important;
    }
    
    #mw-page-base,#mw-head-base,#mw-panel{
        --foreground-color-high:auto!important;
    }
    
    #mw-panel{
        --foreground-color-high:#ffffffb9!important;
    }
    #mw-panel .portal{
        background-color:#ffffff00!important;
    }
    
    #p-personal,#footer{
        background-color: #ffffffb9!important;
    }
    
    #content
    {
        background-color: #ffffffb9;
    }
    
    .portal ul>li
    {
        background-color: #ffffff00!important;
    }
    
    .portal li ul li
    {
        background-color: #ffffffff!important;
    }`;
    loadCssCode(css);
}

var setcharbg = (charname, ext = "jpg") => {
    setbg();
    loadCssCode(`.${charname}{background-image:url(${chrome.extension.getURL(`/public/images/char/${charname}.${ext}`)})!important;}`);
    $("html").addClass(`mainbg ${charname}`);
}

var setrandombg = (url) => {
    setbg();
    loadCssCode(`.randombg{background-image:url(${url})!important;}`);
    $("html").addClass(`mainbg randombg`);
}
var background;
var custombackground;
var custombgurl;
var tag;
var netease;

chrome.storage.local.get(['options'], (res) => {
    background = res.options.background;
    custombackground = res.options.custombackground;
    custombgurl = res.options.custombgurl;
    tag = res.options.tag;
    netease = res.options.netease;
});

$().ready(() => {
    if (background && $("body").hasClass("skin-unicorn")) {
        if (custombackground) {
            setrandombg(custombgurl || "https://img.paulzzh.tech/touhou/random");
        }
        else {
            //根据词条判断背景
            var word = $("#firstHeading").text();
            switch (word) {
                case "博丽灵梦（旧作角色）":
                    setcharbg("reimuold");
                    break;
                case "雾雨魔理沙（旧作角色）":
                    setcharbg("marisaold");
                    break;
                case "魅魔":
                    setcharbg("mima");
                    break;
                case "艾丽":
                    setcharbg("elly");
                    break;
                case "幽香":
                    setcharbg("yuka");
                    break;
                case "爱丽丝（旧作角色）":
                    setcharbg("alice");
                    break;
                case "神绮":
                    setcharbg("shinki");
                    break;
                case "博丽灵梦":
                    setcharbg("reimu");
                    break;
                case "雾雨魔理沙":
                    setcharbg("marisa");
                    break;
                case "琪露诺":
                    setcharbg("cirno");
                    break;
                case "蕾米莉亚·斯卡蕾特":
                    setcharbg("remilia");
                    break;
                case "芙兰朵露·斯卡蕾特":
                    setcharbg("flandre");
                    break;
                case "爱丽丝·玛格特洛依德":
                    setcharbg("alicem");
                    break;
                case "魂魄妖梦":
                    setcharbg("youmu", "png");
                    break;
                case "西行寺幽幽子":
                    setcharbg("yuyuko", "png");
                    break;
                case "八云紫":
                    setcharbg("yukari");
                    break;
                case "宇佐见莲子":
                case "玛艾露贝莉·赫恩":
                    setcharbg("renko-merry","png");
                    break;
                case "伊吹萃香":
                    setcharbg("suika");
                    break;
                case "因幡天为 / 因幡帝":
                    setcharbg("tewi");
                    break;
                case "铃仙·优昙华院·因幡":
                    setcharbg("reisen");
                    break;
                case "四季映姬·夜摩仙那度":
                    setcharbg("shikieiki", "png");
                    break;
                case "东风谷早苗":
                    setcharbg("sanae", "png");
                    break;
                case "古明地恋":
                    setcharbg("koishi");
                    break;
                case "今泉影狼":
                    setcharbg("kagerou");
                    break;
                case "奥野田美宵":
                    setcharbg("miyoi", "png");
                    break;
                default:
                    setrandombg("https://img.paulzzh.tech/touhou/random");
                    break;
            }
        }
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

    //修改页面
    if (editstatus) {
        //歌词修改
        if (lyricstatus) {
            if (netease) {
                var subtitle = title.substring("歌词:".length);
                var groupname = (subtitle.indexOf("（") > 0) ? subtitle.substring(subtitle.indexOf("（") + 1, subtitle.length - "）".length) : "";
                var songname = subtitle.replace("（" + groupname + "）", "");
                //添加网易云音乐歌词获取
                $(".mw-editform").before($("<div id='netease'><pre><el-button type='info' @click='getNetLyric'>网易云歌词获取</el-button><el-card class='box-card' v-if='songs.length>0'><div v-for='song in songs'>{{song.name}}　<strong>{{song.album.name}}</strong>　<el-button type='success' @click='clickSong(song.id)' size='mini'>选择</el-button></div></el-card><transition name='el-fade-in-linear'><div v-if='lyricUrl'><iframe id='lyricframe' allowTransparency='true' style='background-color:#66ccff;width:100%' :src=\"lyricUrl\"></iframe><el-button type='danger' @click='closeNetLyric'>关闭</el-button></div></transition></pre></div>"));
                new Vue({
                    el: "#netease",
                    data() {
                        return {
                            lyricUrl: '',
                            songs: []
                        }
                    },
                    methods: {
                        getNetLyric() {
                            $.get(apiurl + "netname.php?limit=3&name=" + songname + "+" + groupname, (res) => {
                                this.songs = res.result.songs;
                            });
                        },
                        clickSong(id) {
                            this.lyricUrl = apiurl + "netlyric.php?id=" + id;
                        },
                        closeNetLyric() {
                            this.lyricUrl = "";
                        },
                    }
                });
            }
        }
    }
    else {
        //短链替换
        if ($("#mw-indicator-0 a").length > 0) {
            if ($("#profile-toggle-button").length > 0) {
                $("#profile-toggle-button").css("margin-top", "2rem");
            }
            var sortlink = $("#mw-indicator-0 a").attr("href");
            $("#mw-indicator-0 a").remove();
            $("#mw-indicator-0").append($("<el-button type='primary' @click='copySortLink'>复制短链接</el-button>"));
            new Vue({
                el: "#mw-indicator-0",
                data() {
                    return {
                        sortlink: '',
                        lyricUrl: '',
                        songs: []
                    }
                },
                created() {
                    this.sortlink = sortlink;
                },
                methods: {
                    copySortLink() {
                        var link = `${window.location.protocol}\\\\${window.location.host}\\${this.sortlink}`;
                        var res = copyToClipboardText(link);
                        if (res) {
                            this.$message({
                                message: "复制短链接成功！",
                                type: 'success'
                            });
                        }
                        else {
                            this.$message.error('复制短链接失败！');
                        }
                    }
                }
            });
        }

        if (tag) {
            //修改歧义分类
            var understate = "";
            if ($(".understate").length > 0) {
                understate = $(".understate").text().replace(/\（|）/g, '');
                $(".understate").remove();
            }
            else {
                if ($(".page-content-header.doujin-album").length > 0) {
                    understate = "同人专辑";
                }
                else if ($(".page-content-header.music").length > 0) {
                    understate = "原作音乐";
                }
                else if ($(".page-content-header.circle").length > 0) {
                    understate = "同人社团";
                }
                else if ($(".page-content-header.doujin-character").length > 0) {
                    understate = "二次同人角色";
                }
                else if ($(".page-content-header.character").length > 0) {
                    understate = "新作角色";
                }
                else if ($(".page-content-header.past-character").length > 0) {
                    understate = "旧作角色";
                }
            }
            if (understate) {
                var type = "";
                switch (understate) {
                    case "同人专辑":
                    case "同人视频":
                        type = "primary";
                        break;
                    case "同人社团":
                        type = "success";
                        break;
                    case "人物":
                    case "二次同人角色":
                        type = "info";
                        break;
                    case "新作角色":
                    case "旧作角色":
                    default:
                        type = "warning";
                        break;
                }
                $("#firstHeading").append($(`<el-tag effect='dark' type='${type}' style='margin-left: 0.5rem;'>${understate}</el-tag>`));
            }
            new Vue({
                el: "#firstHeading",
                data() {

                }
            });
        }
    }
});