import { getLang } from "../../js/browser/api";

export default {
    "UnreadTab": {
        name:getLang("UnreadNotification"),
        type:"page",
        sort: 0,
        src: "./Tabs/UnreadTab.vue",
        function: null,
        enabled: true
    },
    "RemindTab": {
        name:getLang("RemindNotification"),
        type:"page",
        sort:1,
        src: "./Tabs/RemindTab.vue",
        function: null,
        enabled: true
    },
    "MsgTab": {
        name:getLang("MsgNotification"),
        type:"page",
        sort: 2,
        src: "./Tabs/MsgTab.vue",
        function: null,
        enabled: true
    },
}