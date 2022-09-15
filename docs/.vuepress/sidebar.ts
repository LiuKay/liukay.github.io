import {sidebar} from "vuepress-theme-hope";

export default sidebar([
    {text: "主页", icon: "home", link: "/"},
    {
        icon: "repo",
        text: "程序员练级攻略",
        link: "/guide/",
    },
    {
        icon: "note",
        text: "技术专题",
        prefix: "/tech/",
        link: "/tech/",
        children: [
            "JVM",
            "Redis",
            {
                text: "分布式系统",
                icon: "edit",
                prefix: "distribution-system/",
                children: [
                    "distributed-transaction"
                ]
            }
        ],
    },
    {
        text: "博客归档",
        icon: "blog",
        prefix: "/posts/",
        children: [
            "jvm-byte-code",
            "IO-Models",
            "OAuth2.0-workflow",
            "the-key-to-accelerating-your-coding-skills",
            "jvm-memory-in-container",
            "reactor-model",
            "uml-class",
            "java-fat-jar",
        ],
    },
    {
        icon: "ask",
        text: "Q&A",
        link: "/questions/",
        prefix: "/questions/",
    },
]);
