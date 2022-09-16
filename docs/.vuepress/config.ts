import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Kaybee's Blog",
  description: "Kaybee's Blog",

  base: "/",

  theme,
});
