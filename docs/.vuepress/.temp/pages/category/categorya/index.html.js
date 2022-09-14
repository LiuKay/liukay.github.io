export const data = JSON.parse("{\"key\":\"v-3e5b7b84\",\"path\":\"/category/categorya/\",\"title\":\"CategoryA 分类\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"CategoryA 分类\",\"blog\":{\"type\":\"category\",\"name\":\"CategoryA\",\"key\":\"category\"},\"layout\":\"Blog\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
