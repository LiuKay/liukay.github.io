import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "主页", icon: "home", link: "/" },
  { text: "程序员练级攻略", icon: "repo", link: "/guide/" },
  {
    text: "技术专题",
    icon: "note",
    link: "/tech/" ,
  },
  {
    text: "ARTS",
    icon: "blog",
    link: "/ARTS/",
  },
  {
    text: "杂项",
    icon: "blog",
    link: "/others/",
  }
]);
