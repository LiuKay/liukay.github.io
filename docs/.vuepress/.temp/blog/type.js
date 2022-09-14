export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-184f4da6","v-fffb8e28","v-667a151c","v-6a7fcaa0","v-90af7268","v-637d4c10","v-c9912696","v-46b1aa92","v-15551100","v-2ad43d5e","v-5e0b07be","v-a1410f02","v-7d02f80e","v-43304cbc","v-79e65ad2"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":["v-5deafbd7","v-0c0c61ab","v-0538ff2f"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]}}}

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
