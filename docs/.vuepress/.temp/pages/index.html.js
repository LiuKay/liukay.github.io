export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"Blog Home\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"layout\":\"Blog\",\"icon\":\"home\",\"title\":\"Blog Home\",\"heroImage\":\"/logo.svg\",\"heroText\":\"Kaybee's Blog\",\"tagline\":\"To measure is to know.\",\"heroFullScreen\":false,\"projects\":[{\"icon\":\"project\",\"name\":\"project name\",\"desc\":\"project detailed description\",\"link\":\"https://your.project.link\"},{\"icon\":\"link\",\"name\":\"link name\",\"desc\":\"link detailed description\",\"link\":\"https://link.address\"},{\"icon\":\"book\",\"name\":\"book name\",\"desc\":\"Detailed description of the book\",\"link\":\"https://link.to.your.book\"},{\"icon\":\"article\",\"name\":\"article name\",\"desc\":\"Detailed description of the article\",\"link\":\"https://link.to.your.article\"}],\"footer\":\"To measure is to know.\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.37,\"words\":110},\"filePathRelative\":\"README.md\"}")

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
