<template><div><h1 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h1>
<h2 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h2>
<p>HashMap</p>
<h2 id="跳表" tabindex="-1"><a class="header-anchor" href="#跳表" aria-hidden="true">#</a> 跳表</h2>
<p>Redis 实现 REIDS_HASH 底层会用</p>
<h3 id="查询过程" tabindex="-1"><a class="header-anchor" href="#查询过程" aria-hidden="true">#</a> 查询过程：</h3>
<p>temp = head</p>
<ol>
<li>从 temp 出发，如果当前节点的 key == target，返回 target</li>
<li>key !=target &amp;&amp; right ==null, temp = temp.down</li>
<li>key != target &amp;&amp; right !=null &amp;&amp; right &lt; key, temp = temp.right</li>
<li>key != target &amp;&amp; right !=null &amp;&amp; right &gt; key, temp = temp.down</li>
</ol>
<h3 id="删除过程" tabindex="-1"><a class="header-anchor" href="#删除过程" aria-hidden="true">#</a> 删除过程：</h3>
<ol>
<li>right == null, temp = temp.down</li>
<li>right !=null &amp;&amp; key == right, delete right, temp = temp.down</li>
<li>right != null &amp;&amp; key &gt; right, temp = temp.right</li>
<li>right != null &amp;&amp; key &lt; right, temp = temp.down</li>
</ol>
<h3 id="插入过程" tabindex="-1"><a class="header-anchor" href="#插入过程" aria-hidden="true">#</a> 插入过程：</h3>
<h2 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树" aria-hidden="true">#</a> B+ 树</h2>
<p>MySQL 索引底层</p>
<h3 id="各种中间件常用的数据结构" tabindex="-1"><a class="header-anchor" href="#各种中间件常用的数据结构" aria-hidden="true">#</a> 各种中间件常用的数据结构</h3>
</div></template>


