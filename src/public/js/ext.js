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

$().ready(() => {

    //修改页面
    if (editstatus) {
        //歌词修改
        if (lyricstatus) {
            var subtitle = title.substring("歌词:".length);
            var groupname = (subtitle.indexOf("（") > 0) ? subtitle.substring(subtitle.indexOf("（") + 1, subtitle.length - "）".length) : "";
            var songname = subtitle.replace("（" + groupname + "）", "");
            //添加网易云音乐歌词获取
            $(".mw-editform").before($("<div id='netease'><pre><el-button type='info' @click='getNetLyric'>网易云歌词获取</el-button><el-card class='box-card' v-if='songs.length>0'><div v-for='song in songs'>{{song.name}}　<strong>{{song.album.name}}</strong>　<el-button type='success' @click='clickSong(song.id)' size='mini'>选择</el-button></div></el-card><transition name='el-fade-in-linear'><div v-if='lyricUrl'><iframe id='lyricframe' allowTransparency='true' style='background-color:#66ccff;width:100%' :src=\"lyricUrl\"></iframe><el-button type='danger' @click='closeNetLyric'>关闭</el-button></div></transition></pre></div>"));
        }
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
    else {
        //短链替换
        if ($("#mw-indicator-0 a").length > 0) {
            if ($("#profile-toggle-button").length > 0) {
                $("#profile-toggle-button").css("margin-top", "2rem");
            }
            var sortlink = $("#mw-indicator-0 a").attr("href");
            $("#mw-indicator-0 a").remove();
            $("#mw-indicator-0").append($("<el-button type='primary' @click='copySortLink'>复制短链接</el-button>"));
        }

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
                default:
                    type = "warning";
                    break;
            }
            $("#firstHeading").append($(`<el-tag effect='dark' type='${type}' style='margin-left: 0.5rem;'>${understate}</el-tag>`));
        }

        //替换底部标签
        if ($("#mw-normal-catlinks ul").length > 0) {
            $("#mw-normal-catlinks ul li").each(function () {
                if ($(this).hasClass(".noprint")) return;
                var a = $(this).find("a");
                var name = a.text();
                var title = a.attr("title");
                var href = a.attr("href");
                $(this).html(`<el-link type='primary' href='${href}' title='${title}'>${name}</el-link>`);
            });
        }

        new Vue({
            el: "#content",
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
                },
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
                }
            }
        });
    }
});