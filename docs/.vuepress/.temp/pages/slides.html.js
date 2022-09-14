export const data = JSON.parse("{\"key\":\"v-2e3eac9e\",\"path\":\"/slides.html\",\"title\":\"Slide page\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Slide page\",\"icon\":\"slides\",\"layout\":\"Slide\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":3.24,\"words\":973},\"filePathRelative\":\"slides.md\"}")

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
