---
title: JVM 字节码介绍
date: 2021-01-16
category:
  - 编程技术
tags:
  - JVM
  - TIPS
---


>来源： https://dzone.com/articles/introduction-to-java-bytecode

这是一遍相对来说比较简单的Java 字节码入门文章，一开始作者讲到了阅读Java 字节码比较枯燥无味，但是通过自己的故事说明了字节码的作用，事情是这样的，这哥们在很早之前做了一次功能变更，目的是为了测试修复一个潜在的性能问题, 并且打好了 JAR 包部署到服务器上。不幸的是，他并没有将源码提交到版本控制系统上，后来不知什么原因这段代码找不到了，一点痕迹都没有了（做了什么新的功能，记得一定要提交代码到Git 上），几个月后当他想用到那段代码的时候，悲剧就发生了。还好这哥们在远程机器上部署的 JAR 包还在，于是他用反编译的工具来找到源码，更不幸的是，反编译工具在关键的`Class`上崩溃了，也就是他正好要找的关键代码!

在尝试了无数次之后，他放弃了用反编译工具，所幸的是，这哥们比较熟悉 Java 字节码，并且还记得他的代码是从哪开始的，于是通过阅读Java 字节码知道了自己做了哪些修改，最后他痛苦的总结到 :laughing:

`I made sure to learn from my mistake and preserve them this time!`

Java 字节码是一种介于高级语言和底层代码之间的中间产物，它屏蔽了操作系统指令架构之间的区别，定义了JVM 虚拟机能够识别的统一格式，对于所有平台来说，字节码都是通用的。

Java 字节码有点类似于机器码，但是却更为简单易懂，这得益于 JVM 虚拟机使用的指令集架构比较简单，并且有十分完善的文档。

文章简单介绍了一下 JVM 虚拟机支持的数据类型，比如我们常见的基本数据类型：`byte`、`short` 、`int` 、`long` 、`char` 、`float`、 `double` 、`boolean`以及`returnAddress`,还有引用类型，包括`class`,`array`,`interface`. 对`boolean`类型来说并没有相对应的字节码指令，而是转换成`int` 类型来操作，除了`returnAddress`代表指向下一个指令外，其他类型都可以在 Java 中找到对应的类型.

字节码指令集的简化得益于`Sun`公司采用了基于栈的虚拟机架构，这是一种不同于基于寄存器的架构。JVM 进程内存划分成了不同的内存区域，但是却只要检查 JVM 虚拟机栈就能满足遵循字节码的指令集的要求。

对于JVM 虚拟机内存的划分的介绍，这篇文章说的比较简单，想了解更多可以阅读周志明的《深入理解Java虚拟机(第三版)》以及 JVM 的虚拟机规范。

然后作者举了几个简单的Java 代码编译后的字节码，分析了字节码是如何操作本地变量表和操作数栈的，这里要注意的是`invokestatic`指令如何进行的方法调用，将操作数栈上的数据传递给下一个栈帧。还有就是`new`一个对象的时候会涉及到的指令，先是`new`指令创建一个在堆上的对象以及将引用对象`push `到操作数栈顶，然后`dup`指令拷贝了这个引用，也就是说此时在操作数栈上有2个实例对象的引用，然后压入构造函数需要的参数和实例引用，用`invokespecial`调用构造函数。

最后作者说明，一般情况下并不需要完全掌握字节码指令的详细用法和具体的指令流程来读懂程序执行的是什么。比如为了搞清楚使用 Java Stream 来读取文件的时候是否会正确关闭流，通过查看字节码发现有一段类似于 `try-with-resource`的逻辑就可以知道结果了。

```Java
public static void main(java.lang.String[]) throws java.lang.Exception;
 descriptor: ([Ljava/lang/String;)V
 flags: (0x0009) ACC_PUBLIC, ACC_STATIC
 Code:
   stack=2, locals=8, args_size=1
      0: ldc           #2                  // class test/Test
      2: ldc           #3                  // String input.txt
      4: invokevirtual #4                  // Method java/lang/Class.getResource:(Ljava/lang/String;)Ljava/net/URL;
      7: invokevirtual #5                  // Method java/net/URL.toURI:()Ljava/net/URI;
     10: invokestatic  #6                  // Method java/nio/file/Paths.get:(Ljava/net/URI;)Ljava/nio/file/Path;
     13: astore_1
     14: new           #7                  // class java/lang/StringBuilder
     17: dup
     18: invokespecial #8                  // Method java/lang/StringBuilder."<init>":()V
     21: astore_2
     22: aload_1
     23: invokestatic  #9                  // Method java/nio/file/Files.lines:(Ljava/nio/file/Path;)Ljava/util/stream/Stream;
     26: astore_3
     27: aconst_null
     28: astore        4
     30: aload_3
     31: aload_2
     32: invokedynamic #10,  0             // InvokeDynamic #0:accept:(Ljava/lang/StringBuilder;)Ljava/util/function/Consumer;
     37: invokeinterface #11,  2           // InterfaceMethod java/util/stream/Stream.forEach:(Ljava/util/function/Consumer;)V
     42: aload_3
     43: ifnull        131
     46: aload         4
     48: ifnull        72
     51: aload_3
     52: invokeinterface #12,  1           // InterfaceMethod java/util/stream/Stream.close:()V
     57: goto          131
     60: astore        5
     62: aload         4
     64: aload         5
     66: invokevirtual #14                 // Method java/lang/Throwable.addSuppressed:(Ljava/lang/Throwable;)V
     69: goto          131
     72: aload_3
     73: invokeinterface #12,  1           // InterfaceMethod java/util/stream/Stream.close:()V
     78: goto          131
     81: astore        5
     83: aload         5
     85: astore        4
     87: aload         5
     89: athrow
     90: astore        6
     92: aload_3
     93: ifnull        128
     96: aload         4
     98: ifnull        122
    101: aload_3
    102: invokeinterface #12,  1           // InterfaceMethod java/util/stream/Stream.close:()V
    107: goto          128
    110: astore        7
    112: aload         4
    114: aload         7
    116: invokevirtual #14                 // Method java/lang/Throwable.addSuppressed:(Ljava/lang/Throwable;)V
    119: goto          128
    122: aload_3
    123: invokeinterface #12,  1           // InterfaceMethod java/util/stream/Stream.close:()V
    128: aload         6
    130: athrow
    131: getstatic     #15                 // Field java/lang/System.out:Ljava/io/PrintStream;
    134: aload_2
    135: invokevirtual #16                 // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
    138: invokevirtual #17                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
    141: return
```

我们可以看到  `java/util/Stream`的调用，通过`invokedynamic`处理了`Consumer`类型的对象，`invokeinterface`为Stram.forEach 调用，后面会看到一些 `Stream.close:()V`和`Method java/lang/Throwable.addSuppressed:(Ljava/lang/Throwable;)V`的重复调用，此处就是`try-with-resource`用来自动关闭流的基本逻辑。

总的来说，这是一篇比较不错的入门文章，作者以自身的案例来说明在日常开发中字节码的作用，文章中所用的配图也很值观清晰。
