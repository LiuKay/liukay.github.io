<template><div><p>参考：<a href="https://dzone.com/articles/best-practices-java-memory-arguments-for-container" target="_blank" rel="noopener noreferrer">Best Practices: Java Memory Arguments for Containers - DZone Java<ExternalLinkIcon/></a></p>
<p><strong>TL;DR</strong></p>
<p>简而言之，在容器内有3组参数来设置 JVM 的最大堆内存：</p>
<ol>
<li>-XX:MaxRAMFraction, -XX:MinRAMFraction</li>
<li>-XX:MaxRAMPercentage, -XX:MinRAMPercentage</li>
<li>-Xmx</li>
</ol>
<p>应该怎么使用？</p>
<h3 id="_1-xx-maxramfraction-xx-minramfraction" tabindex="-1"><a class="header-anchor" href="#_1-xx-maxramfraction-xx-minramfraction" aria-hidden="true">#</a> 1 -XX:MaxRAMFraction, -XX:MinRAMFraction：</h3>
<h5 id="支持版本-only-java-8-update-131-to-java-8-update-190" tabindex="-1"><a class="header-anchor" href="#支持版本-only-java-8-update-131-to-java-8-update-190" aria-hidden="true">#</a> 支持版本：only Java 8 update 131 to Java 8 update 190</h5>
<p>局限：</p>
<ol>
<li>同时要设置参数<code v-pre>-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap</code>，代表 JVM 将以容器的内存设置为准来分配最大堆内存，不然就会以宿主机的内存为准分配最大堆内存</li>
<li>-XX:MaxRAMFraction 只能识别整数的设置，如果设置<code v-pre>-XX:MaxRAMFraction=2.5</code>将会无法启动 JVM</li>
<li>后续的 JDK 版本就不支持了</li>
</ol>
<p>举例：</p>
<p>如果容器分配内存为 1GB, 设置 -XX:MaxRAMFraction=2，则 JVM 最大堆内存分配约为最大可用内存的 1/2(约512G).</p>
<h3 id="_2-xx-maxrampercentage-xx-minrampercentage" tabindex="-1"><a class="header-anchor" href="#_2-xx-maxrampercentage-xx-minrampercentage" aria-hidden="true">#</a> 2 -XX:MaxRAMPercentage, -XX:MinRAMPercentage</h3>
<h5 id="支持版本-from-java-8-update-191-and-above" tabindex="-1"><a class="header-anchor" href="#支持版本-from-java-8-update-191-and-above" aria-hidden="true">#</a> 支持版本：from Java 8 update 191 and above.</h5>
<p><code v-pre>-XX:+UseContainerSupport</code>这个参数这这些支持的版本中已经默认开启了，不需要再显示设置。</p>
<p>局限：不支持更老的版本</p>
<p>举例：</p>
<p>如果容器分配内存为 1GB, 设置 -XX:MaxRAMPercentage=50，则 JVM最大堆为 1GB*50%</p>
<h3 id="_3-xmx" tabindex="-1"><a class="header-anchor" href="#_3-xmx" aria-hidden="true">#</a> 3 -Xmx：</h3>
<p>直接设置 JVM 的最大堆内存值</p>
<h5 id="支持版本-all" tabindex="-1"><a class="header-anchor" href="#支持版本-all" aria-hidden="true">#</a> 支持版本：all</h5>
<p>局限：</p>
<ol>
<li>如果你直接使用 -Xmx 来设置最大堆内存，当 JVM 内存超过 容器的内存限制，会遇到 OOM 或直接被 Kill掉</li>
</ol>
<h3 id="实践建议" tabindex="-1"><a class="header-anchor" href="#实践建议" aria-hidden="true">#</a> 实践建议</h3>
<ol>
<li>不管怎么设置最大堆的内存，记得留至少 25% 或更多的内存，因为JVM 运行时不止有堆内存，还有每个线程栈，内地内存，socket buffer 等等内存消耗</li>
<li>如果一个容器里面只有一个 Java 应用在跑，把初始堆大小和最大堆大小设置为一样，避免 JVM扩容导致 JVM 暂停。如果初始内存设置的内存大于容器限制，JVM 甚至不会启动，在一开始就发现问题</li>
</ol>
</div></template>


