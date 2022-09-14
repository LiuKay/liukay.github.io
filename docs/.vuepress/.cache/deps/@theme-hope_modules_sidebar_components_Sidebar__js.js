import {
  DropTransition_default
} from "./chunk-VLM4QD67.js";
import {
  isActiveSidebarItem,
  isMatchedSidebarItem,
  renderChildren,
  renderItem,
  useSidebarItems
} from "./chunk-JS35ZHFO.js";
import {
  useThemeLocaleData
} from "./chunk-SOFK3LWB.js";
import "./chunk-3CKMXA7P.js";
import "./chunk-TU22QCLP.js";
import {
  Icon_default
} from "./chunk-RR4TGKTX.js";
import "./chunk-ANKY43RT.js";
import "./chunk-MOAPKBNV.js";
import {
  RouterLink,
  useRoute
} from "./chunk-TYRIGETP.js";
import "./chunk-E7KEG4JQ.js";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  watch
} from "./chunk-ZYRIB4P5.js";
import "./chunk-YTQSFUAA.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/components/SidebarChild.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/styles/sidebar-child.scss";
var SidebarChild_default = defineComponent({
  name: "SidebarChild",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    return () => [
      renderItem(props.config, {
        class: [
          "sidebar-link",
          `sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) }
        ],
        exact: true
      }),
      renderChildren(props.config.children)
    ];
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/components/SidebarGroup.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/styles/sidebar-group.scss";
var SidebarGroup_default = defineComponent({
  name: "SidebarGroup",
  props: {
    config: {
      type: Object,
      required: true
    },
    open: { type: Boolean, required: true }
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));
    const exact = computed(() => isActiveSidebarItem(route, props.config, true));
    return () => {
      const { collapsable, children = [], icon, link, text } = props.config;
      return [
        h("section", { class: "sidebar-group" }, [
          h(collapsable ? "button" : "p", {
            class: [
              "sidebar-heading",
              {
                clickable: collapsable || link,
                exact: exact.value,
                active: active.value
              }
            ],
            ...collapsable ? {
              onClick: () => emit("toggle"),
              onKeydown: (event) => {
                if (event.key === "Enter")
                  emit("toggle");
              }
            } : {}
          }, [
            h(Icon_default, { icon }),
            link ? h(RouterLink, { to: link, class: "title" }, () => text) : h("span", { class: "title" }, text),
            collapsable ? h("span", { class: ["arrow", props.open ? "down" : "right"] }) : null
          ]),
          h(DropTransition_default, () => props.open || !collapsable ? h(SidebarLinks_default, { config: children }) : null)
        ])
      ];
    };
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/components/SidebarLinks.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/styles/sidebar-links.scss";
var SidebarLinks_default = defineComponent({
  name: "SidebarLinks",
  props: {
    config: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(-1);
    const toggleGroup = (index) => {
      openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
    };
    watch(() => [route.path, props.config], () => {
      const index = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
      openGroupIndex.value = index;
    }, { immediate: true });
    return () => h("ul", { class: "sidebar-links" }, props.config.map((config, index) => h("li", config.type === "group" ? h(SidebarGroup_default, {
      config,
      open: index === openGroupIndex.value,
      onToggle: () => toggleGroup(index)
    }) : h(SidebarChild_default, { config }))));
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/components/Sidebar.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/styles/sidebar.scss";
var Sidebar_default = defineComponent({
  name: "SideBar",
  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();
    const sidebar = ref(null);
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        const activeSidebarItem = document.querySelector(`.sidebar a.sidebar-link[href="${route.path}${hash}"]`);
        if (!activeSidebarItem)
          return;
        const { top: sidebarTop, height: sidebarHeight } = sidebar.value.getBoundingClientRect();
        const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
        if (activeSidebarItemTop < sidebarTop)
          activeSidebarItem.scrollIntoView(true);
        else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight)
          activeSidebarItem.scrollIntoView(false);
      });
    });
    return () => {
      var _a, _b, _c;
      return h("aside", {
        class: ["sidebar", { "hide-icon": !themeLocale.value.sidebarIcon }],
        ref: sidebar
      }, [
        (_a = slots["top"]) == null ? void 0 : _a.call(slots),
        ((_b = slots["default"]) == null ? void 0 : _b.call(slots)) || h(SidebarLinks_default, { config: sidebarItems.value }),
        (_c = slots["bottom"]) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});

// dep:@theme-hope_modules_sidebar_components_Sidebar__js
var theme_hope_modules_sidebar_components_Sidebar_js_default = Sidebar_default;
export {
  theme_hope_modules_sidebar_components_Sidebar_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_sidebar_components_Sidebar__js.js.map
