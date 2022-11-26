import {sidebar} from "vuepress-theme-hope";

export default sidebar([
    {text: "主页", icon: "home", link: "/"},
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
        children: [
            "JVM",
            "Redis",
            "java-thread",
            {
                text: "分布式系统",
                prefix: "distribution-system/",
                children: [
                    "distributed-transaction"
                ]
            }
        ],
    },
    {
        text: "ARTS",
        icon: "blog",
        prefix: "/ARTS/",
        children: [
            "jvm-byte-code",
            "IO-Models",
            "OAuth2.0-workflow",
            "the-key-to-accelerating-your-coding-skills",
            "jvm-memory-in-container",
            "reactor-model",
            "uml-class",
            "java-fat-jar",
            "pwsh-env"
        ],
    },
    {
        icon: "ask",
        text: "Q&A",
        link: "/questions/",
        prefix: "/questions/",
    },
]);
