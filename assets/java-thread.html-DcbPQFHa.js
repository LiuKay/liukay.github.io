import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,b as l}from"./app-Dl2VIqMH.js";const s="/assets/Life_cycle_of_a_Thread_in_Java-CjgQbqfb.jpg",i="/assets/lock_monitor-GLLGU9-6.png",p="/assets/jvm_Mark_Word_x64-U0G5HCUH.jpg",t="/assets/jvm_synchronize_process-BDBiB2JH.png",r={},o=l('<h4 id="进程与线程、协程的区别" tabindex="-1"><a class="header-anchor" href="#进程与线程、协程的区别"><span>进程与线程、协程的区别？</span></a></h4><ul><li><p>进程是操作系统进行资源分配的最小单位；线程是进程的一个执行单元，是 CPU 调度的基本单位</p></li><li><p>进程之间的资源是互相独立的，一个进程内可以有多个线程运行，线程之间共享同一进程内的资源。</p></li><li><p>进程间的切换开销大，线程由于轻量开销相对少</p></li></ul><h4 id="java-线程的状态有哪几种" tabindex="-1"><a class="header-anchor" href="#java-线程的状态有哪几种"><span>Java 线程的状态有哪几种？</span></a></h4><ol><li>初始(NEW)：新创建了一个线程对象，但还没有调用start()方法。</li><li>运行(RUNNABLE)：Java线程中将就绪（ready）和运行中（running）两种状态笼统的称为“运行”。<br> 线程对象创建后，其他线程(比如main线程）调用了该对象的start()方法。该状态的线程位于可运行线程池中，等待被线程调度选中，获取CPU的使用权，此时处于就绪状态（ready）。就绪状态的线程在获得CPU时间片后变为运行中状态（running）。</li><li>阻塞(BLOCKED)：表示线程阻塞于锁。</li><li>等待(WAITING)：进入该状态的线程需要等待其他线程做出一些特定动作（通知或中断）。</li><li>超时等待(TIMED_WAITING)：该状态不同于WAITING，它可以在指定的时间后自行返回。</li><li>终止(TERMINATED)：表示该线程已经执行完毕。</li></ol><p><img src="'+s+`" alt="Life_cycle_of_a_Thread_in_Java" loading="lazy"></p><h4 id="并发问题的-3-个核心源头" tabindex="-1"><a class="header-anchor" href="#并发问题的-3-个核心源头"><span>并发问题的 3 个核心源头</span></a></h4><ul><li>可见性 - 缓存</li><li>原子性 - 线程切换</li><li>有序性 - 编译优化</li></ul><p>解决方案：JMM， volatile，final，synchronized</p><h4 id="java-内存模型-jmm-与-happens-before" tabindex="-1"><a class="header-anchor" href="#java-内存模型-jmm-与-happens-before"><span>Java 内存模型(JMM)与 Happens-Before</span></a></h4><p>JMM 是一种规范，</p><ul><li>所有变量都存储在主存中（Main Memory)</li><li>每个线程都有一个本地内存（Local Memory），本地变量是主存的拷贝</li><li>线程对变量的操作都必须在本地内存中进行，而不能直接读写主存</li><li>不同线程之间无法直接访问对方本地内存的变量</li></ul><h4 id="happens-before-原则" tabindex="-1"><a class="header-anchor" href="#happens-before-原则"><span>Happens-Before 原则</span></a></h4><h4 id="什么是死锁-怎样排查死锁-避免死锁" tabindex="-1"><a class="header-anchor" href="#什么是死锁-怎样排查死锁-避免死锁"><span>什么是死锁，怎样排查死锁，避免死锁？</span></a></h4><p>死锁：一组互相竞争资源的线程因互相等待，导致永久阻塞(<code>blocked</code>)的现象。</p><p>死锁发生的4个条件：</p><ul><li>互斥，共享资源 X 和 Y 只能被一个线程占用；</li><li>占有且等待，线程 T1 已经占用资源 X，在等待资源 Y 的时候不释放资源 X；</li><li>不可抢占，其他线程不能强行抢占线程 T1 占用的资源</li><li>循环等待，线程 T1 等待线程 T2 占有的资源，线程 T2 等待线程 T 占用的资源</li></ul><p>避免死锁，只要破坏上面其中一个条件就行：</p><ul><li>破坏占有且等待：一次申请所有资源，如果一次不能拿到所有资源就都不占用</li><li>破坏不可抢占：申请不到其他资源时主动释放自己占用的资源</li><li>破坏循环等待：资源要按照顺序获取</li></ul><p>如何排查死锁：</p><ol><li>使用 jps 查询正在运行的 Java 进程，得到进程 ID，然后使用 jstck $pid 查看Java 进程中的线程堆栈</li><li>或者直接使用 jConsole 可以检测死锁</li><li>用 VisualVM 可以直接查看线程，做线程 Dump</li></ol><h4 id="sleep-time-wait-方法啥区别" tabindex="-1"><a class="header-anchor" href="#sleep-time-wait-方法啥区别"><span>sleep(time)，wait()方法啥区别？</span></a></h4><ul><li>sleep(time) 是 Thread 的静态方法，wait() 是 Object 的实例方法</li><li>sleep(time) 没有释放锁，wait() 释放了锁，都会释放 CPU资源</li><li>sleep(time) 用来短时间暂停当前线程，wait() 用于线程间通信</li><li>sleep(time) 可以在任何地方调用，但是 wait() 需要在临界区里面调用，不然会抛异常</li></ul><h4 id="线程池有哪些参数-工作原理-各参数如何合理配置" tabindex="-1"><a class="header-anchor" href="#线程池有哪些参数-工作原理-各参数如何合理配置"><span>线程池有哪些参数，工作原理，各参数如何合理配置?</span></a></h4><blockquote><ul><li><p>corePoolSize 核心线程数</p></li><li><p>maximumPoolSize 最大线程数</p></li><li><p>keepAliveTime 当线程数量大于核心线程数时，多余线程的空闲存活时间</p></li><li><p>workQueue 工作队列</p></li><li><p>threadFactory 线程工厂</p></li><li><p>rejectedExecutionHandler 当线程数达到最大，并且工作队列已满时的处理逻辑</p></li></ul></blockquote><p><strong>任务执行的规则如下：</strong></p><p>情况1：在线程数没有达到核心线程数时，每个新任务都会创建一个新的线程来执行任务。</p><p>情况2：当线程数达到核心线程数时，每个新任务会被放入到等待队列中等待被执行。</p><p>情况3：当等待队列已经满了之后，如果线程数没有到达总的线程数上限，那么会创建一个非核心线程来执行任务。</p><p>情况4：当线程数已经到达总的线程数限制时，新的任务会被拒绝策略者处理，线程池无法执行该任务</p><p><strong>线程数量配置规则：</strong></p><ul><li>CPU 密集型任务，设置为CPU核心数+1；</li><li>IO 密集型任务，设置为CPU核心数*2；</li></ul><p><strong>阻塞队列的配置：</strong></p><p>（原则：指定长度，如果使用无界队列大量任务时可能会 OOM）</p><p>LinkedBlockingQueue 不指定长度为无界队列</p><p>ArrayBlockingQueue 需指定长度</p><p>SychronizeQueue 没有容量的队列</p><p>PriorityBlockingQueue 优先级队列</p><p>DelayedWorkQueue 延时队列</p><h4 id="悲观锁-乐观锁-什么是-cas" tabindex="-1"><a class="header-anchor" href="#悲观锁-乐观锁-什么是-cas"><span>悲观锁，乐观锁，什么是 CAS</span></a></h4><p>悲观锁：假定一定会遇到竞争，所以一开始就加锁执行</p><p>乐观锁：假定线程竞争很少会发生，执行的时候不加锁，冲突失败了就进行重试直到成功</p><p>CAS：比较并交换，是一条 CPU 原语，用于判断内存中某个值是否为预期值，如果是，则更新为新的值，这个过程是原子性的。如果否，则自旋重试。</p><p>CAS的问题：ABA 问题，自旋开销问题，只能保证单个变量的原子性</p><p>Java 里面 CAS应用：java.util..concurrent.atomic 包下的各种</p><h4 id="无锁-threadlocal-原理-引用类型区别和场景-内存泄漏" tabindex="-1"><a class="header-anchor" href="#无锁-threadlocal-原理-引用类型区别和场景-内存泄漏"><span>无锁- ThreadLocal 原理，引用类型区别和场景，内存泄漏</span></a></h4><p>ThreadLocal 是线程隔离的变量，每个线程都持有一份变量，所以不存在资源竞争。</p><h5 id="threadlocal-原理" tabindex="-1"><a class="header-anchor" href="#threadlocal-原理"><span>ThreadLocal 原理：</span></a></h5><p>在 Thread 类内部有一个 <code>ThreadLocal.ThreadLocalMap threadlocals</code>，ThreadLocalMap 里有个 Entry 的数组，这个 Entry 的 key 就是 ThreadLocal 对象，value 就是我们需要保存的值。</p><p>ThreadLocalMap 是通过开放寻址法来解决冲突，如果通过 key 的哈希值得到的下标无法直接命中，则会将下标 +1，即继续往后遍历数组查找 Entry ，直到找到或者返回 null。</p><h5 id="threadlocal-源码分析" tabindex="-1"><a class="header-anchor" href="#threadlocal-源码分析"><span>ThreadLocal 源码分析：</span></a></h5><p>ThreadLocal 类内部有一个静态内部类 <code>ThreadLocalMap</code>（可以供外部使用）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Entry</span> <span class="token keyword">extends</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ThreadLocal</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/** The value associated with this ThreadLocal. */</span>
            <span class="token class-name">Object</span> value<span class="token punctuation">;</span>

            <span class="token class-name">Entry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k<span class="token punctuation">,</span> <span class="token class-name">Object</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">super</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>
                value <span class="token operator">=</span> v<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ThreadLocalMap 里面的 Entry 继承自 WeakReference，当内存不够发生 GC 的时候就会回收 Entry 的 Key，但是 这个时候对应的 Value 却不会被回收。</p><h5 id="threadlocal-内存泄漏" tabindex="-1"><a class="header-anchor" href="#threadlocal-内存泄漏"><span>ThreadLocal 内存泄漏</span></a></h5><p>内存泄漏是指程序中已经无用的内存无法被释放，造成系统内存的浪费。</p><p>当前大多数的线程使用场景都是线程池，导致线程不会被回收，当 Entry 中的 key 即 ThreadLocal 对象被回收了之后，会发生 Entry 中 key 为 null 的情况，其实这个 Entry 就已经没用了，但是又无法被回收，因为有 Thread-&gt;ThreadLocalMap -&gt;Entry 这条强引用在，这样没用的内存无法被回收就是内存泄露。</p><h5 id="threadlocal-最佳实践" tabindex="-1"><a class="header-anchor" href="#threadlocal-最佳实践"><span>ThreadLocal 最佳实践</span></a></h5><p>使用完之后 remove()</p><h4 id="synchronized-底层原理-重量级锁-轻量锁-偏向锁" tabindex="-1"><a class="header-anchor" href="#synchronized-底层原理-重量级锁-轻量锁-偏向锁"><span>synchronized 底层原理，重量级锁，轻量锁，偏向锁</span></a></h4><p>Java synchronized 关键字是基于管程（Monitor）的实现的， 在字节码里面会在执行的代码前后加入 monitorenter 和 monitorexit 指令。</p><h5 id="管程原理" tabindex="-1"><a class="header-anchor" href="#管程原理"><span>管程原理</span></a></h5><p>在管程模型里，共享变量和对共享变量的操作是被封装起来的，图中最外层的框就代表封装的意思。框的上面只有一个入口，并且在入口旁边还有一个入口等待队列。当多个线程同时试图进入管程内部时，只允许一个线程进入，其他线程则在入口等待队列中等待。管程里还引入了条件变量的概念，而且<strong>每个条件变量都对应有一个等待队列</strong>，用来解决线程同步的问题。</p><p><img src="`+i+'" alt="MESA 管程模型" loading="lazy"></p><p><em>(MESA 管程模型 - 极客时间《Java并发编程实战》)</em></p><p>因为 synchronize 使用底层操作系统的 Mutex Lock 来实现，JDK1.6 之前 synchronize 性能并不好，每次获取和释放锁会带来用户态和内核态的切换。JDK1.6 引入了偏向锁、轻量级锁、重量级锁概念，来减少锁竞争带来的上下文切换。</p><p>在 JDK1.6 JVM 中，对象实例在堆内存中被分为了三个部分：对象头、实例数据和对齐填充。其中 Java 对象头由 Mark Word、指向类的指针以及数组长度三部分组成。</p><p><img src="'+p+'" alt="jvm_Mark_Word_x64" loading="lazy"></p><p><em>（64 位 JVM的 Java 对象 中的 Mark Word 结构组成 - 极客时间《Java性能调优实战》 ）</em></p><p>锁升级主要依赖于 Mark Word 中的锁标志位和释放偏向锁标志位，Synchronized 同步锁就是从偏向锁开始的，随着竞争越来越激烈，偏向锁升级到轻量级锁，最终升级到重量级锁。</p><p>下图是锁升级的过程：</p><p><img src="'+t+'" alt="jvm_synchronize_process" loading="lazy"></p><p><em>（64 位 JVM的 Java 对象 中的 Mark Word 结构组成 - 极客时间《Java性能调优实战》 ）</em></p><h5 id="偏向锁" tabindex="-1"><a class="header-anchor" href="#偏向锁"><span>偏向锁</span></a></h5><p>场景：偏向锁主要用来优化同一线程多次申请同一个锁的竞争。</p><p>偏向锁只会在第一次请求时采用 CAS 操作，在锁对象的 Mark Word 中记录下当前线程的地址。在之后的运行过程中，持有该偏向锁的线程的加锁操作将直接返回。它针对的是锁仅会被同一线程持有的情况。</p><p>一旦出现其它线程竞争锁资源时，偏向锁就会被撤销。偏向锁的撤销需要等待全局安全点，暂停持有该锁的线程，同时检查该线程是否还在执行该方法，如果是，则升级锁，反之则被其它线程抢占</p><h5 id="轻量级锁" tabindex="-1"><a class="header-anchor" href="#轻量级锁"><span>轻量级锁</span></a></h5><p>预估情况：多个线程在不同的时间段请求同一把锁，即在一个时间点上没有锁竞争</p><p>轻量级锁采用 CAS 操作，将锁对象的标记字段替换为一个指针，指向当前线程栈上的一块空间，存储着锁对象原本的标记字段。它针对的是多个线程在不同时间段申请同一把锁的情况。</p><h5 id="重量级锁" tabindex="-1"><a class="header-anchor" href="#重量级锁"><span>重量级锁</span></a></h5><p>如果一个线程试图进入一段加锁的代码，发现当前是重量级锁，当前线程会被挂起，进入阻塞。</p><h4 id="java-util-concurrent-包下的工具类" tabindex="-1"><a class="header-anchor" href="#java-util-concurrent-包下的工具类"><span>java.util.concurrent 包下的工具类</span></a></h4><ul><li>Lock, Condition</li><li>Semaphore</li><li>ReadWriteLock</li><li>StampedLock</li><li>CountDownLatch，CyclicBarrier</li><li>Executor</li><li>CompletableFuture</li><li>ForkJoin</li></ul><h4 id="线程安全的级别" tabindex="-1"><a class="header-anchor" href="#线程安全的级别"><span>线程安全的级别</span></a></h4><ol><li><p>Immutable 不可变的实例</p></li><li><p>Thread-safe (unconditionally thread-safe) 无条件的线程安全/绝对的线程安全</p><p>这个类的实例是可变的，但是有内部的同步措施，无需任何外部的同步，如 Random，ConcurrentHashMap</p></li><li><p>Conditionally thread-safe 有条件的线程安全/相对的线程安全</p><p>通常意思上说的线程安全，单独操作这个对象是线程安全的，但对一些方法的连续调用需要额外的同步来保证调用正确性，如 Vector</p></li><li><p>Thread-compatible 线程兼容</p><p>对象本身不是线程安全的，但是可以通过使用同步手段来保证在并发环境中的正确性</p></li><li><p>Thread-hostile 线程对立</p><p>无论是否采用同步措施都无法保证在并发下的正确性，如 Thread的 suspend() 和 resume() 都已废弃</p></li></ol><h4 id="线程安全的实现方法有哪些" tabindex="-1"><a class="header-anchor" href="#线程安全的实现方法有哪些"><span>线程安全的实现方法有哪些？</span></a></h4><ol><li><p>互斥同步 (阻塞同步)</p><p>同步是指，并发访问共享数据时，保证同一时刻只有一个线程访问共享数据。</p><p>互斥是实现同步的一种手段，临界区，互斥量，信号量都是主要的互斥实现方式。</p><p>常见的互斥同步手段：</p><ul><li>synchronized 关键字</li><li>ReentrantLock 支持等待超时，公平锁，绑定多个条件</li></ul></li><li><p>非阻塞同步</p><p>基于冲突检测的乐观并发策略：CAS （硬件指令的支持）</p></li><li><p>无同步方案</p><ul><li>可重入的代码： 不依赖任何共享数据，传入相同的参数必返回相同的结果</li><li>线程本地存储：Thread Local Storage</li></ul></li></ol>',87),c=[o];function d(h,u){return e(),n("div",null,c)}const v=a(r,[["render",d],["__file","java-thread.html.vue"]]),y=JSON.parse('{"path":"/tech/java-thread.html","title":"Java 多线程知识点总结","lang":"zh-CN","frontmatter":{"title":"Java 多线程知识点总结","date":"2021-10-12T00:00:00.000Z","category":["编程技术"],"tag":["总结","多线程"]},"headers":[],"git":{"createdTime":1663322651000,"updatedTime":1663322651000,"contributors":[{"name":"LiuKay","email":"kayfen@foxmail.com","commits":1}]},"readingTime":{"minutes":10.36,"words":3108},"filePathRelative":"tech/java-thread.md","localizedDate":"2021年10月12日","excerpt":"<h4>进程与线程、协程的区别？</h4>\\n<ul>\\n<li>\\n<p>进程是操作系统进行资源分配的最小单位；线程是进程的一个执行单元，是 CPU 调度的基本单位</p>\\n</li>\\n<li>\\n<p>进程之间的资源是互相独立的，一个进程内可以有多个线程运行，线程之间共享同一进程内的资源。</p>\\n</li>\\n<li>\\n<p>进程间的切换开销大，线程由于轻量开销相对少</p>\\n</li>\\n</ul>\\n<h4>Java 线程的状态有哪几种？</h4>\\n<ol>\\n<li>初始(NEW)：新创建了一个线程对象，但还没有调用start()方法。</li>\\n<li>运行(RUNNABLE)：Java线程中将就绪（ready）和运行中（running）两种状态笼统的称为“运行”。<br>\\n线程对象创建后，其他线程(比如main线程）调用了该对象的start()方法。该状态的线程位于可运行线程池中，等待被线程调度选中，获取CPU的使用权，此时处于就绪状态（ready）。就绪状态的线程在获得CPU时间片后变为运行中状态（running）。</li>\\n<li>阻塞(BLOCKED)：表示线程阻塞于锁。</li>\\n<li>等待(WAITING)：进入该状态的线程需要等待其他线程做出一些特定动作（通知或中断）。</li>\\n<li>超时等待(TIMED_WAITING)：该状态不同于WAITING，它可以在指定的时间后自行返回。</li>\\n<li>终止(TERMINATED)：表示该线程已经执行完毕。</li>\\n</ol>"}');export{v as comp,y as data};
