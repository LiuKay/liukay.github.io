export const data = JSON.parse("{\"key\":\"v-01560935\",\"path\":\"/timeline/\",\"title\":\"时间轴\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"时间轴\",\"blog\":{\"type\":\"type\",\"key\":\"timeline\"},\"layout\":\"Blog\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null}")

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
