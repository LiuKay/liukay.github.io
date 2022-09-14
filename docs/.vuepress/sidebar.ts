import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  { text: "主页", icon: "home", link: "/" },
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
    children:[
      {
        text: "JVM",
        icon: "edit",
        link: "JVM"
      },
      {
        text: "Redis",
        icon: "edit",
        link: "Redis"
      },
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
      {
        text: "JVM byte code",
        icon: "edit",
        link: "jvm-byte-code"
      },
      {
        text: "IO Models",
        icon: "edit",
        link: "IO_Models"
      },
    ],
  },
  {
    icon: "ask",
    text: "Q&A",
    link: "/guide/",
  },
]);
