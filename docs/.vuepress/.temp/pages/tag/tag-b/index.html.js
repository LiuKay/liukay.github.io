export const data = JSON.parse("{\"key\":\"v-06bbb224\",\"path\":\"/tag/tag-b/\",\"title\":\"tag B 标签\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"tag B 标签\",\"blog\":{\"type\":\"category\",\"name\":\"tag B\",\"key\":\"tag\"},\"layout\":\"Blog\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null}")

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
