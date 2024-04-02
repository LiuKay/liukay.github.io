import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  author: {
    name: "Kaybee",
    url: "https://github.com/LiuKay",
  },

  hotReload:true,

  iconAssets: "iconfont",

  logo: "/a.jpg",

  repo: "LiuKay/liukay.github.io",

  docsRepo: "LiuKay/liukay.github.io",

  docsBranch: "main",

  docsDir: "docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "To measure is to know.",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime"],

  blog: {
    description: "A BackEnd programmer",
    intro: "/intro.html",
    medias: {
      Email: "passionno1@qq.com",
      Gitee: "https://gitee.com/kaybee",
      GitHub: "https://github.com/LiuKay",
      Gmail: "notserious41@gmail.com",
      Wechat: "kaybee666",
    },
  },

  plugins: {
    blog: {
      excerpt: true,
    },

    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "LiuKay/KaybeeNotes",
      repoId: "R_kgDOGYbmGQ",
      category: "Announcements",
      categoryId: "DIC_kwDOGYbmGc4CRcof",
    },

    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      hint: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imgSize: true,
      include: true,
      imgLazyload: true,
      mark: true,
      mermaid: true,
      obsidianImgSize:true,
      playground: {
        presets: ["ts", "vue"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      katex: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
