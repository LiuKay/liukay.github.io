import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Kaybee's Notes",
  description: "A demo for vuepress-theme-hope",

  base: "/",

  theme,
});
