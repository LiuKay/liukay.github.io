---
title: 理解 Reactor 模式
category:
  - 编程技术
tag:
  - REVIEW
  - Design
--- 

> [Understanding Reactor Pattern: Thread-Based and Event-Driven - DZone Java](https://dzone.com/articles/understanding-reactor-pattern-thread-based-and-eve)

(原文的图片挂了，这是我自己加的，使用的是 Doug Lea 的PPT中的)

Reactor 模式在实践中是怎么做的，为什么理解它很重要。

有2种处理网络请求的 Web 架构: 基于线程（thread-based）的架构和事件驱动（event-driven）的架构。

### 基于线程的架构 - Thread-Based Architecture

实现多线程服务器的最直观的方法就是遵循“一个线程对应一个连接”（thread-per-connection）的方法。这种方式适用于需要避免使用多线程来兼容非线程安全库的网站。

这种模式使用多进程处理模块来隔离每个请求，这样单个请求如果发生了问题，不会影响其他请求：

![class service design](https://img-blog.csdnimg.cn/img_convert/90969c5bc197fedf4a25123bb1728120.png)

但是，多进程会比较重，尤其是在上下文切换和内存开销方面。所以通常的做法使用多线程来代替多进程，尽管多线程的应用容易发生问题和难以调试，但是“一个连接一个线程”的模式比“一个连接一个进程”的方式具有更好的可扩展性。

为了调整到最佳性能的线程数量，同时避免线程创建/销毁的开销，通常会使用一个分发线程（dispatcher thread），一个有界的阻塞队列和线程池来实现。分发线程阻塞在监听新的连接（套接字Socket）上，一旦有新的连接到达，就将其发送到阻塞队列中，一旦阻塞队列中的任务满了，新的连接将会被丢弃，但是好处是，在阻塞队列中的任务被处理的延迟时间是可以预估的（任务的最大延时=队列长度*平均每个任务处理时间/线程数）。线程池中可用的工作线程将循环的从阻塞队列中获取任务（要处理的Socket）进行处理和响应。

不足之处在于，在这样的架构中，随时都有一个线程和一个连接相绑定的关系。长时间存活的连接如开启了Keep-Alive， 将一直占用工作线程，但是在这个时间里线程是空闲的，比如访问文件，网络请求等，如果同时有上百或上千这样的连接的话，那么这么多的线程将会占用很可观的资源。

### 事件驱动的架构 - Event-Driven Architecture

事件驱动的方案能够将线程和连接进行解耦，线程只服务于特定的事件回调或处理方法中。

事件驱动的架构由事件的生产者和消费者组成。事件的生产者是事件的来源，只关心哪些事件的发生。而事件的消费者只需要知道事件发生了，它只需要处理事件或者仅仅是响应事件。

#### Reactor 模式 - The Reactor Pattern

Reactor 模式是事件驱动架构的一种实现方式。简单来说，它**使用一个单独的线程来循环地、阻塞地监听事件的就绪，并将就绪的事件分发给相应的回调函数或处理器**。这样的话就不需要阻塞在I/O事件处理上了，只需要注册相应的回调函数或处理方法，一旦I/O就绪就会自动地回调处理。事件可以是新的连接事件，可读/可写事件等等。然后这些回调函数在多核CPU的环境下还可以使用线程池来实现。

**Reactor 模式实现了模块化应用代码与可重用的事件驱动架构的解耦。**

Reactor 模式有2个重要的组成：

#### 1. Reactor

一个Reactor 实例运行在一个单独的线程中，它的作用就是监听到 I/O 事件时将其分发给相应的处理器（回调函数）。类似于公司里一个电话接线员，当有电话接入时帮忙转接到对应的联系人。

#### 2. Handlers

一个处理器（回调方法）是真正处理 I/O 事件的实体，类似于接线员要转接给的联系人，他才是真正要接电话处理事情的人。

### Reactor 模式解决的问题

Reactor 架构模式使事件驱动的应用实现了多路复用，将来自不同的服务请求分发到同一个服务应用上。一个 reactor 实例持续监听事件，一旦事件就绪，就通知相应的事件处理器（回调函数）来处理事件。

**The Reactor Pattern is a design pattern for synchronous demultiplexing and order of events as they arrive。**

Reactor 模式的设计目的是实现同步的多路复用，同步是指按照事件到达的顺序分发处理。应用程序同时接收不同客户端的消息、请求和连接，尽管这些请求是并发的，但是应用程序会按事件的到达顺序触发回调方法。Reactor 模式是为了避免为每个事件（消息、请求或连接等）创建一个新的处理线程，它实际上接收一系列的事件消息然后将它们顺序地分发到对应的事件处理器中去了。Reactor 解决的这个问题的实质其实是著名的`C10K`问题（[The C10K problem](http://www.kegel.com/c10k.html))）

>**In Summary: Servers have to handle more than 10,000 concurrent clients, and threads cannot scale the connections using Tomcat, Glassfish, JBoss, or HttpClient.**
>
>So, the application using the reactor only needs to use a thread to handle simultaneous events.

**总结：在需要处理超过10000个并发请求的服务器场景下，使用像 Tomcat，Glassfish，JBoss 或者是 HttpClient 是无法做到线程的可伸缩的.** 而使用 Reactor 模式的应用只需要使用一个线程来同步处理并发请求。

![Basic Reactor Design](https://img-blog.csdnimg.cn/img_convert/8cfce83b1f54120381eb6f35d476a732.png)

基本上，标准Reactor允许具有同步事件的主应用程序，同时保持单线程的简单性。

（多线程版本）

![worker thread pools](https://img-blog.csdnimg.cn/img_convert/fa0ba44d876e9c79d1efa1a1d7092900.png)

> A demultiplexer is a circuit that has an input and more than one output. It is a circuit used when you want to send a signal to one of several devices.
>
> This description sounds similar to the description given to a decoder, but is used to select between many devices, while a demultiplexer is used to send a signal among many devices.

(上面面这段看的不是很懂，好像是拿电路做类比，直接拿谷歌翻译了)

多路选择器是具有一个输入和一个以上输出的电路。 当您要将信号发送到多个设备之一时，它是一种电路。

该描述听起来与对解码器的描述类似，但是用于在许多设备之间进行选择，而多路分解器用于在许多设备之间发送信号。

Reactor 允许使用单个线程高效地处理阻塞的多个任务，同时 Reactor还要对事件处理器（回调方法）进行组织和管理，当事件被激活时，Reactor 将请求转发给可用的处理器连接并将其标记成激活状态（处理中）。

#### 事件循环：

> 1. Find all handlers that are active and unlocked or delegates this for a dispatcher implementation.
> 2. Execute each of these handlers sequentially until complete, or a point is reached where they are blocked. Completed Handlers are deactivated, allowing the event cycle to continue.
> 3. Repeats from Step One (1)

1. 查找所有处于活动状态且未锁定的处理器，或将其委托给调度程序的某个实现
2. 依次执行所有的处理器（回调方法）直到执行完成，或阻塞。 已完成的处理器将被停用，从而允许事件循环继续进行。
3. 重复步骤1

（注：原文看起来有点难以理解，翻译过来也是这样，但是如果你知道Java NIO 的实现 Reactor 机制的话应该很好类比:

1. 开始循环监听 Socket 就绪事件（如Accept,Read,Write）
2. 遍历所有已就绪的事件（遍历SelectionKey）并将其分发给对应的事件处理器处理，直到处理器执行完毕，然后将事件就绪状态删除（删除已处理的SelectionKey）
3. 返回步骤1）

### 为什么 Reactor 模式很重要？

因为 Reactor 模式被应用在很多地方，如 Node.js，Vert.x，Reactive Extensions，Jetty，Nginx 等等还有其他许多。因此，如果你喜欢识别模式并想知道隐藏在事物背后的工作方式，那么请务必注意这种模式。
