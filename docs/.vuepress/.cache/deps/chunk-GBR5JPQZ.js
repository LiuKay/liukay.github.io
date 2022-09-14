import {
  isLinkHttp,
  removeEndingSlash
} from "./chunk-MOAPKBNV.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/utils/getAncestorLinks.js
var getAncestorLinks = (route, routeLocale) => {
  const routePaths = route.path.replace(routeLocale, "/").split("/");
  const links = [];
  let link = removeEndingSlash(routeLocale);
  routePaths.forEach((element, index) => {
    if (index !== routePaths.length - 1) {
      link += `${element}/`;
      links.push(link);
    } else if (element !== "") {
      link += element;
      links.push(link);
    }
  });
  return links;
};

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/utils/resolveRepoType.js
var resolveRepoType = (repo) => !isLinkHttp(repo) || /github\.com/.test(repo) ? "GitHub" : /bitbucket\.org/.test(repo) ? "Bitbucket" : /gitlab\.com/.test(repo) ? "GitLab" : /gitee\.com/.test(repo) ? "Gitee" : null;

export {
  getAncestorLinks,
  resolveRepoType
};
//# sourceMappingURL=chunk-GBR5JPQZ.js.map
