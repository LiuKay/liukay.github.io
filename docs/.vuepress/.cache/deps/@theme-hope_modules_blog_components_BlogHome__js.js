import {
  InfoPanel_default
} from "./chunk-OG7ATMMH.js";
import "./chunk-6G66KAQ2.js";
import "./chunk-BZK53SBU.js";
import {
  ArticleList_default
} from "./chunk-AM5WJU42.js";
import {
  ArticleIcon,
  BookIcon,
  FriendIcon,
  LinkIcon,
  ProjectIcon,
  SlideDownIcon
} from "./chunk-C53IDWNR.js";
import {
  useArticles
} from "./chunk-6IMDYG4I.js";
import {
  DropTransition_default
} from "./chunk-VLM4QD67.js";
import "./chunk-UNCQBZMQ.js";
import {
  MarkdownContent_default
} from "./chunk-4UCK7AAQ.js";
import "./chunk-GBR5JPQZ.js";
import {
  useNavigate,
  usePure
} from "./chunk-SOFK3LWB.js";
import "./chunk-3CKMXA7P.js";
import {
  Icon_default
} from "./chunk-RR4TGKTX.js";
import {
  client_exports
} from "./chunk-ANKY43RT.js";
import "./chunk-MOAPKBNV.js";
import "./chunk-TYRIGETP.js";
import "./chunk-E7KEG4JQ.js";
import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent
} from "./chunk-ZYRIB4P5.js";
import "./chunk-YTQSFUAA.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/BlogHero.js
import defaultHeroBgImagePath from "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/assets/hero.jpg";
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/blog-hero.scss";
var BlogHero_default = defineComponent({
  name: "BlogHero",
  setup(_props, { slots }) {
    const title = (0, client_exports.usePageHeadTitle)();
    const frontmatter = (0, client_exports.usePageFrontmatter)();
    const hero = ref(null);
    const heroImage = computed(() => frontmatter.value.heroImage || null);
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen || false);
    const heroImageStyle = computed(() => {
      const defaultStyle = {
        maxHeight: "180px",
        margin: frontmatter.value.heroText === false ? "6rem auto 1.5rem" : "1rem auto"
      };
      return {
        ...defaultStyle,
        ...frontmatter.value.heroImageStyle
      };
    });
    const bgImage = computed(() => {
      var _a;
      return frontmatter.value.bgImage ? (0, client_exports.withBase)(frontmatter.value.bgImage) : (_a = frontmatter.value.bgImage) != null ? _a : defaultHeroBgImagePath;
    });
    const bgImageStyle = computed(() => {
      const defaultStyle = {
        height: "350px",
        textAlign: "center",
        overflow: "hidden"
      };
      return {
        ...defaultStyle,
        ...frontmatter.value.bgImageStyle
      };
    });
    return () => {
      var _a;
      return frontmatter.value.hero !== false ? h("div", {
        ref: hero,
        class: ["blog-hero", { fullscreen: isFullScreen.value }],
        style: bgImageStyle.value
      }, [
        bgImage.value ? h("div", {
          class: "mask",
          style: {
            background: `url(${bgImage.value}) center/cover no-repeat`
          }
        }) : null,
        ((_a = slots["heroImage"]) == null ? void 0 : _a.call(slots)) || h(DropTransition_default, { appear: true, delay: 0.04 }, () => heroImage.value ? h("img", {
          class: "hero-image",
          style: heroImageStyle.value,
          src: (0, client_exports.withBase)(heroImage.value),
          alt: frontmatter.value.heroAlt || "hero image"
        }) : null),
        h(DropTransition_default, { appear: true, delay: 0.08 }, () => frontmatter.value.heroText !== false ? h("h1", frontmatter.value.heroText || title.value) : null),
        h(DropTransition_default, { appear: true, delay: 0.12 }, () => frontmatter.value.tagline ? h("p", {
          class: "description",
          innerHTML: frontmatter.value.tagline
        }) : null),
        isFullScreen.value ? h("button", {
          class: "slide-down-button",
          onClick: () => {
            window.scrollTo({
              top: hero.value.clientHeight,
              behavior: "smooth"
            });
          }
        }, [h(SlideDownIcon), h(SlideDownIcon)]) : null
      ]) : null;
    };
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/ProjectPanel.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/project-panel.scss";
var AVAILABLE_PROJECT_TYPES = [
  "link",
  "article",
  "book",
  "project",
  "friend"
];
var ProjectPanel_default = defineComponent({
  name: "ProjectPanel",
  components: { ArticleIcon, BookIcon, FriendIcon, LinkIcon, ProjectIcon },
  setup() {
    const frontmatter = (0, client_exports.usePageFrontmatter)();
    const pure = usePure();
    const navigate = useNavigate();
    const renderIcon = (icon = "", alt = "icon") => {
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h(resolveComponent(`${icon}-icon`));
      if (icon.match(/^https?:\/\//))
        return h("img", { src: icon, alt, class: "image" });
      if (icon.startsWith("/"))
        return h("img", { src: (0, client_exports.withBase)(icon), alt, class: "image" });
      return h(Icon_default, { icon });
    };
    return () => {
      var _a;
      return ((_a = frontmatter.value.projects) == null ? void 0 : _a.length) ? h("div", { class: "project-panel" }, frontmatter.value.projects.map(({ icon, link, name, desc }, index) => h("div", {
        class: [
          "project",
          { [`project${index % 9}`]: !pure.value }
        ],
        onClick: () => navigate(link)
      }, [
        renderIcon(icon, name),
        h("div", { class: "name" }, name),
        h("div", { class: "desc" }, desc)
      ]))) : null;
    };
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/BlogHome.js
import "D:/KaybeeNotes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/home.scss";
var BlogHome_default = defineComponent({
  name: "BlogHome",
  setup() {
    const articles = useArticles();
    return () => h("div", { class: "page blog" }, [
      h(BlogHero_default),
      h("div", { class: "blog-page-wrapper" }, [
        h("main", { class: "blog-home", id: "main-content" }, [
          h(DropTransition_default, { appear: true, delay: 0.16 }, () => h(ProjectPanel_default)),
          h(DropTransition_default, { appear: true, delay: 0.24 }, () => h(ArticleList_default, { items: articles.value.items }))
        ]),
        h(DropTransition_default, { appear: true, delay: 0.16 }, () => h(InfoPanel_default))
      ]),
      h(DropTransition_default, { appear: true, delay: 0.28 }, () => h(MarkdownContent_default))
    ]);
  }
});

// dep:@theme-hope_modules_blog_components_BlogHome__js
var theme_hope_modules_blog_components_BlogHome_js_default = BlogHome_default;
export {
  theme_hope_modules_blog_components_BlogHome_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_blog_components_BlogHome__js.js.map
