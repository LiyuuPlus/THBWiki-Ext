QueryString = {
    data: {},
    Initial: function() {
        var aPairs, aTmp;
        var queryString = new String(window.location.search);
        queryString = queryString.substr(1, queryString.length);
        aPairs = queryString.split("&");
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            this.data[aTmp[0]] = aTmp[1];
        }
    },
    GetValue: function(key) {
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

    if (editstatus) {
        if (lyricstatus) {
            var subtitle = title.substring("歌词:".length);
            var groupname = (subtitle.indexOf("（") > 0) ? subtitle.substring(subtitle.indexOf("（") + 1, subtitle.length - "）".length) : "";
            var songname = subtitle.replace("（" + groupname + "）", "");
            $(".mw-editform").before($("<div id='testapp'><pre><button type='button' @click='getNetLyric'>网易云歌词获取</button><ul><li v-for='song in songs'>{{song.name}}　<strong>{{song.album.name}}</strong>　<button type='button' @click='clickSong(song.id)'>选择</button></li></ul><div v-if='lyricUrl'><iframe allowTransparency='true' style='background-color:#66ccff;width:100%' :src=\"lyricUrl\"></iframe><button type='button' @click='closeNetLyric'>关闭</button></div></pre></div>"));
            new Vue({
                el: "#testapp",
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
                    }
                }
            });
        }
    }
})