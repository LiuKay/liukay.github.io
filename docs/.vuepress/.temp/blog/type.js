export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-184f4da6","v-fffb8e28","v-1be8912b","v-787112e8","v-57b420cc","v-b6e3733c","v-4dd62b46","v-0b124b73","v-12e10e29","v-18e4f9da","v-667a151c","v-6a7fcaa0","v-90af7268","v-637d4c10","v-c9912696","v-46b1aa92","v-15551100","v-2ad43d5e","v-5e0b07be","v-a1410f02","v-7d02f80e","v-43304cbc","v-79e65ad2"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":[]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
