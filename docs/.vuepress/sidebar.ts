import {sidebar} from "vuepress-theme-hope";

export default sidebar([
    {
        icon: "repo",
        text: "程序员练级攻略",
        link: "/guide/",
    },
    {
        icon: "repo",
        text: "学习之道",
        link: "/guide/how-to-learn",
    },
    {
        icon: "note",
        text: "技术专题",
        prefix: "/tech/",
        link: "/tech/",
        children: "structure"
    },
    {
        text: "ARTS",
        icon: "blog",
        prefix: "/ARTS/",
        children: "structure"
    },
    {
        icon: "ask",
        text: "Q&A",
        link: "/questions/",
        prefix: "/questions/",
        children: "structure"
    },
]);
