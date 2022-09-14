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
        text: "Articles 1-4",
        icon: "note",
        collapsable: true,
        prefix: "article/",
        children: ["article1", "article2", "article3", "article4"],
      },
    ],
  },
  {
    icon: "ask",
    text: "Q&A",
    link: "/guide/",
  },
]);
