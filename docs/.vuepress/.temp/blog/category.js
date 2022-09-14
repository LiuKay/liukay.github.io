export const categoryMap = {"category":{"/":{"path":"/category/","map":{"CategoryA":{"path":"/category/categorya/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]},"CategoryB":{"path":"/category/categoryb/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce"]},"Guide":{"path":"/category/guide/","keys":["v-15551100"]}}}},"tag":{"/":{"path":"/tag/","map":{"tag A":{"path":"/tag/tag-a/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]},"tag B":{"path":"/tag/tag-b/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
