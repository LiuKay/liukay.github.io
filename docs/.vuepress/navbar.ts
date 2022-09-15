import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "主页", icon: "home", link: "/" },
  { text: "程序员练级攻略", icon: "repo", link: "/guide/" },
  {
    text: "技术专题",
    icon: "note",
    prefix: "/tech/" ,
    children: [
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
        link: "distribution-system",
      },
    ],
  },
  {
    text: "博客归档",
    icon: "blog",
    link: "/posts",
  },
  {
    icon: "ask",
    text: "Q&A",
    link: "/questions/",
  },
]);
