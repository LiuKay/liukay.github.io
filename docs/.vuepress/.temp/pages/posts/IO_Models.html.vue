<template><div><h2 id="i-o-models" tabindex="-1"><a class="header-anchor" href="#i-o-models" aria-hidden="true">#</a> I/O Models</h2>
<p>在 Unix 下有 5 种 I/O 模型:</p>
<ul>
<li>阻塞 I/O</li>
<li>非阻塞 I/O</li>
<li>I/O 多路复用  (select and poll)</li>
<li>信号驱动的 I/O (SIGIO)</li>
<li>异步 I/O (the POSIX aio_ functions)</li>
</ul>
<blockquote>
<p>《Unix 网络编程》中介绍了这 5 种 I/O 模型，由于该书中的示例图比较模糊，我照着画了一遍，原书中使用的是 UDP datagram 作为请求的数据，我这里统写为 data.</p>
</blockquote>
<h3 id="_1-阻塞-i-o-blocking-i-o" tabindex="-1"><a class="header-anchor" href="#_1-阻塞-i-o-blocking-i-o" aria-hidden="true">#</a> 1. 阻塞 I/O - Blocking I/O</h3>
<p><img src="@source/posts/images/IO_blocking_model.png" alt="IO_blocking_model" loading="lazy"></p>
<p>在阻塞的 I/O 模型中，发起读取调用时，应用程序阻塞在 <code v-pre>recvfrom</code>方法上，recvfrom 方法会进行系统调用读取内核空间中的数据，当数据未就绪时，则会等待数据就绪；当数据就绪时，数据会从内核空间拷贝到用户空间，当拷贝完成后，<code v-pre>recvfrom</code>方法返回，应用程序继续处理数据。在这整个过程中，recvfrom 方法和支持该方法的系统调用一直处于阻塞状态（无法返回），直到请求的数据到达内核，并从内核拷贝到了应用内存中。</p>
<h3 id="_2-非阻塞-i-o-nonblocking-i-o" tabindex="-1"><a class="header-anchor" href="#_2-非阻塞-i-o-nonblocking-i-o" aria-hidden="true">#</a> 2. 非阻塞 I/O - Nonblocking I/O</h3>
<p><img src="@source/posts/images/IO_nonblocking_model.png" alt="IO_nonblocking_model" loading="lazy"></p>
<p>在非阻塞 I/O 中，recvfrom 方法在数据未就绪时会立即返回一个错误，并不会阻塞地等待数据就绪。一般采用循环调用 recvfrom 的方式来检查数据是否就绪，一旦数据准备好，recvfrom 方法会等待数据从内核空间拷贝到应用内存后返回。</p>
<h3 id="_3-i-o-多路复用-i-o-multiplexing" tabindex="-1"><a class="header-anchor" href="#_3-i-o-多路复用-i-o-multiplexing" aria-hidden="true">#</a> 3. I/O 多路复用 - I/O Multiplexing</h3>
<p><img src="@source/posts/images/IO_multiplexing_model.png" alt="IO_multiplexing_model" loading="lazy"></p>
<p>在 I/O 多路复用的模型中，进程阻塞在 <code v-pre>select</code>或 <code v-pre>poll</code>方法上，不是真正的 I/O 系统调用(recvfrom),当数据可读时，再调用 recvfrom 方法将数据拷贝到应用内存中。与上文提到的阻塞 I/O 模型对比，I/O 多路复用需要使用2个系统调用来完成操作，但其优势在于，一个<code v-pre>select</code>方法可以监听在多个文件描述符上面，同时监听多个 I/O 是否可读。</p>
<h3 id="_4-信号驱动的-i-o-signal-driven-i-o" tabindex="-1"><a class="header-anchor" href="#_4-信号驱动的-i-o-signal-driven-i-o" aria-hidden="true">#</a> 4. 信号驱动的 I/O - Signal Driven I/O</h3>
<p><img src="@source/posts/images/IO_signal_driven_model.png" alt="IO_signal_driven_model" loading="lazy"></p>
<p>在信号驱动的模型中，我们先注册一个信号处理器到系统调用 <code v-pre>sigaction</code>上，这个调用是非阻塞的，并会立即返回，应用进程可以继续处理后面的逻辑，一旦数据就绪时将会产生信号，应用进程可以通过注册的处理器读取数据或通过调用 recvfrom 读取数据。整个过程在等待数据就绪时候是非阻塞的。</p>
<h3 id="_5-异步-i-o-asynchronous-i-o" tabindex="-1"><a class="header-anchor" href="#_5-异步-i-o-asynchronous-i-o" aria-hidden="true">#</a> 5. 异步 I/O - Asynchronous I/O</h3>
<p><img src="@source/posts/images/IO_asynchronous_model.png" alt="IO_asynchronous_model" loading="lazy"></p>
<p>异步 I/O 是由 POSIX 规范定义的，其工作过程是当调用异步 I/O 方法时就立即返回了，应用进程会继续去处理后面的逻辑，内核会负责整个 I/O 操作(包括等待数据就绪和将数据拷贝至应用内存中)，与信号驱动 I/O 模型的区别在于，内核在信号驱动的I/O 中会通知我们何时可以开始 I/O 操作(真正读数据，即拷贝数据)，而在异步 I/O 中内核是通知我们何时完成 I/O .</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p><img src="@source/posts/images/IO_models_comparison.png" alt="IO_models_comparison" loading="lazy"></p>
<p>POSIX 定义了同步和异步 I/O 的定义：</p>
<ul>
<li>同步 I/O（synchronous I/O）：A synchronous I/O operation causes the requesting process to be blocked until that I/O operation completes.</li>
<li>异步 I/O（asynchronous I/O）：An asynchronous I/O operation does not cause the requesting process to be blocked.</li>
</ul>
<p>按以上定以来说，上面前 4 种 I/O 模型(阻塞、非阻塞、I/O 多路复用、信号驱动 I/O)都属于同步 I/O，因为它们在真正的 I/O 操作过程中(recvfrom) 都会阻塞调用进程。只有最后一个模型符合 POSIX 定义的异步 I/O.</p>
</div></template>


