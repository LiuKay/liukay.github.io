---
title: 容器内 JVM 内存设置最佳实践
date: 2021-01-08
category:
  - 编程技术
tag:
  - Java
  - JVM
  - docker
--- 

参考：[Best Practices: Java Memory Arguments for Containers - DZone Java](https://dzone.com/articles/best-practices-java-memory-arguments-for-container)

**TL;DR**

 简而言之，在容器内有3组参数来设置 JVM 的最大堆内存：

1. -XX:MaxRAMFraction, -XX:MinRAMFraction
2. -XX:MaxRAMPercentage, -XX:MinRAMPercentage
3. -Xmx 

应该怎么使用？

### 1 -XX:MaxRAMFraction, -XX:MinRAMFraction：

##### 支持版本：only Java 8 update 131 to Java 8 update 190

局限：

1. 同时要设置参数`-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap`，代表 JVM 将以容器的内存设置为准来分配最大堆内存，不然就会以宿主机的内存为准分配最大堆内存
2. -XX:MaxRAMFraction 只能识别整数的设置，如果设置`-XX:MaxRAMFraction=2.5`将会无法启动 JVM
3. 后续的 JDK 版本就不支持了

举例：

如果容器分配内存为 1GB, 设置 -XX:MaxRAMFraction=2，则 JVM 最大堆内存分配约为最大可用内存的 1/2(约512G).

### 2 -XX:MaxRAMPercentage, -XX:MinRAMPercentage

##### 支持版本：from Java 8 update 191 and above.

`-XX:+UseContainerSupport`这个参数这这些支持的版本中已经默认开启了，不需要再显示设置。

局限：不支持更老的版本

举例：

如果容器分配内存为 1GB, 设置 -XX:MaxRAMPercentage=50，则 JVM最大堆为 1GB*50%

### 3 -Xmx：

直接设置 JVM 的最大堆内存值

##### 支持版本：all

局限：

1. 如果你直接使用 -Xmx 来设置最大堆内存，当 JVM 内存超过 容器的内存限制，会遇到 OOM 或直接被 Kill掉




### 实践建议

1. 不管怎么设置最大堆的内存，记得留至少 25% 或更多的内存，因为JVM 运行时不止有堆内存，还有每个线程栈，内地内存，socket buffer 等等内存消耗
2. 如果一个容器里面只有一个 Java 应用在跑，把初始堆大小和最大堆大小设置为一样，避免 JVM扩容导致 JVM 暂停。如果初始内存设置的内存大于容器限制，JVM 甚至不会启动，在一开始就发现问题


