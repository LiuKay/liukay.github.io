import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as t,d as r}from"./app.70b19812.js";const i={},h=r('<h1 id="\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u6570\u636E\u7ED3\u6784</h1><h2 id="\u7EA2\u9ED1\u6811" tabindex="-1"><a class="header-anchor" href="#\u7EA2\u9ED1\u6811" aria-hidden="true">#</a> \u7EA2\u9ED1\u6811</h2><p>HashMap</p><h2 id="\u8DF3\u8868" tabindex="-1"><a class="header-anchor" href="#\u8DF3\u8868" aria-hidden="true">#</a> \u8DF3\u8868</h2><p>Redis \u5B9E\u73B0 REIDS_HASH \u5E95\u5C42\u4F1A\u7528</p><h3 id="\u67E5\u8BE2\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u8FC7\u7A0B" aria-hidden="true">#</a> \u67E5\u8BE2\u8FC7\u7A0B\uFF1A</h3><p>temp = head</p><ol><li>\u4ECE temp \u51FA\u53D1\uFF0C\u5982\u679C\u5F53\u524D\u8282\u70B9\u7684 key == target\uFF0C\u8FD4\u56DE target</li><li>key !=target &amp;&amp; right ==null, temp = temp.down</li><li>key != target &amp;&amp; right !=null &amp;&amp; right &lt; key, temp = temp.right</li><li>key != target &amp;&amp; right !=null &amp;&amp; right &gt; key, temp = temp.down</li></ol><h3 id="\u5220\u9664\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u8FC7\u7A0B" aria-hidden="true">#</a> \u5220\u9664\u8FC7\u7A0B\uFF1A</h3><ol><li>right == null, temp = temp.down</li><li>right !=null &amp;&amp; key == right, delete right, temp = temp.down</li><li>right != null &amp;&amp; key &gt; right, temp = temp.right</li><li>right != null &amp;&amp; key &lt; right, temp = temp.down</li></ol><h3 id="\u63D2\u5165\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u63D2\u5165\u8FC7\u7A0B" aria-hidden="true">#</a> \u63D2\u5165\u8FC7\u7A0B\uFF1A</h3><h2 id="b-\u6811" tabindex="-1"><a class="header-anchor" href="#b-\u6811" aria-hidden="true">#</a> B+ \u6811</h2><p>MySQL \u7D22\u5F15\u5E95\u5C42</p><h3 id="\u5404\u79CD\u4E2D\u95F4\u4EF6\u5E38\u7528\u7684\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u5404\u79CD\u4E2D\u95F4\u4EF6\u5E38\u7528\u7684\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u5404\u79CD\u4E2D\u95F4\u4EF6\u5E38\u7528\u7684\u6570\u636E\u7ED3\u6784</h3>',14),d=[h];function l(n,p){return a(),t("div",null,d)}const o=e(i,[["render",l],["__file","DataStructure.html.vue"]]);export{o as default};