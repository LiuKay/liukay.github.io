export const data = JSON.parse("{\"key\":\"v-5deafbd7\",\"path\":\"/posts/article12.html\",\"title\":\"Article 12\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"edit\",\"date\":\"2022-01-12T00:00:00.000Z\",\"category\":[\"CategoryA\",\"CategoryB\"],\"tag\":[\"tag A\",\"tag B\"],\"star\":true},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"Heading 2\",\"slug\":\"heading-2\",\"link\":\"#heading-2\",\"children\":[{\"level\":3,\"title\":\"Heading 3\",\"slug\":\"heading-3\",\"link\":\"#heading-3\",\"children\":[]}]}],\"readingTime\":{\"minutes\":0.1,\"words\":30},\"filePathRelative\":\"posts/article12.md\",\"localizedDate\":\"2022年1月12日\"}")

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
