import {
  usePreferredDark,
  useStorage,
  useThemeData
} from "./chunk-SOFK3LWB.js";
import {
  computed,
  inject,
  onMounted,
  watch
} from "./chunk-ZYRIB4P5.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/outlook/composables/darkmode.js
var darkModeSymbol = Symbol.for("darkMode");
var useDarkMode = () => {
  const darkmode = inject(darkModeSymbol);
  if (!darkmode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return darkmode;
};
var injectDarkMode = (app) => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const darkmodeStorage = useStorage("vuepress-theme-hope-scheme", "auto");
  const isDarkMode = computed(() => {
    const { darkmode } = themeData.value;
    return darkmode === "disable" ? false : darkmode === "enable" ? true : darkmode === "auto" ? isDarkPreferred.value : darkmode === "toggle" ? darkmodeStorage.value === "dark" : darkmodeStorage.value === "dark" || darkmodeStorage.value === "auto" && isDarkPreferred.value;
  });
  app.provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });
  Object.defineProperties(app.config.globalProperties, {
    $isDarkMode: { get: () => isDarkMode.value }
  });
};
var setupDarkMode = () => {
  const { isDarkMode } = useDarkMode();
  const updateDOM = (isDark = isDarkMode.value) => {
    const html = window == null ? void 0 : window.document.querySelector("html");
    html == null ? void 0 : html.setAttribute("data-theme", isDark ? "dark" : "light");
  };
  onMounted(() => {
    watch(isDarkMode, updateDOM, { immediate: true });
  });
};

export {
  darkModeSymbol,
  useDarkMode,
  injectDarkMode,
  setupDarkMode
};
//# sourceMappingURL=chunk-4OOB5VUO.js.map
