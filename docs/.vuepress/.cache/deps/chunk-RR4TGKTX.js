import {
  client_exports
} from "./chunk-ANKY43RT.js";
import {
  isLinkHttp
} from "./chunk-MOAPKBNV.js";
import {
  h,
  resolveComponent
} from "./chunk-ZYRIB4P5.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/components/Icon.js
var Icon = (props) => {
  const { icon = "" } = props;
  return isLinkHttp(icon) ? h("img", { class: "icon", src: icon }) : icon.startsWith("/") ? h("img", { class: "icon", src: (0, client_exports.withBase)(icon) }) : h(resolveComponent("FontIcon"), props);
};
Icon.displayName = "Icon";
var Icon_default = Icon;

export {
  Icon_default
};
//# sourceMappingURL=chunk-RR4TGKTX.js.map
