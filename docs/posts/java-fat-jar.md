---
title: 什么是 Fat/Shade/Shadow Jar ?
category:
 - 编程技术
tag:
 - 问题
 - Java
 - SHARE
---



## 问题

- `java -jar xxx.jar ` 执行时找不到主类 或 `ClassNotFoundException`

- 引入的 jar 包中依赖冲突了怎么办，有多个版本的依赖类

## 正文

有没有想过 Spring Boot 项目可以直接打包成一个 jar 包还能直接通过`java -jar`运行，而当我们自己去写一个小项目去打成 jar 包的时候，要么就是打成的 jar 包运行的时候报 “找不到主类”， 要么就是报一个依赖的Class找不到，这是为什么呢？

Spring Boot 的项目里面，如果是 maven 项目的话里面会有一个 `spring-boot-maven-plugin`，起作用的就是这个maven 插件了，原因就是它做了2件很重要的事：

- 生成 Manifest 文件并配置了项目的启动类，也就是 Main-Class
- 将项目依赖的类库一起打包进最后的 jar 里面去

这样构建出来的 jar 包就可以直接通过 `java -jar` 直接运行了。

说完 `spring-boot-maven-plugin` 这个插件再说什么是 `shade jar`?

我第一次看到 `shade` 这个词的时候一脸懵逼，机器翻译出来叫"(为避免强光照射而)遮挡,遮住(眼睛)"，**shade jar 是指将 jar 包和它的依赖包一起打包到一起，并能够将依赖包重命名（relocate - 重定位）**.

##### 如何理解这里的`重定位\重命名（relocate）`呢？

这里要顺便提一下 Java 的类加载机制，Class loader 查找在用户的 classpath 下的类文件，在 classpath 下可能有不同的文件夹以及 jars, zip 文件等，包含了 class 文件和一些资源文件。

而 Class loader 要加载 classpath 的类文件的时候是通过这个类的唯一限定名（fully qualified name,FQN）来标识它的， 比如 `com.kay.mylib.CoreClass`. 

这样就会有另外一个问题了，如果在 classpath 下的2个jar包内都有同一个类，并且这个类的唯一限定名是一样的，但是2个类的版本可能不一样，class loader 只会使用找到的第一个类（按照classpath 内的顺序）！

这在 Java 中叫做 `shadowing`，由于存在2个不同版本的同一个类，其中一个被另外一个给覆盖了。

#### 依赖解析的问题

在很多项目中都会依赖一些第三方的jar包，然而这些第三方的 jar 包很有可能就使用了另外一个相同的库，最要命的是这个库的版本还不一致，新的版本与老版本提供的方法还不兼容，这个时候我们使用的 maven 也好，gradle 也好就会发现依赖冲突了，它会说比如`org.example:some-lib:1.0.0`使用的`org.example:core-lib:1.0.0` 与 另外一个库 `org.example:other-lib:1.0.0` 使用的 `org.example:core-lib:2.0.0` 冲突了，此时我们的依赖树可能是这样的：



![Java shading1](https://img-blog.csdnimg.cn/img_convert/31e47f67540dca84cc76ce65f9b90de2.png)

最简单的方式当然就是直接 `exclude` 一个了，但是如果这2个版本不兼容的话，比如 some-lib 使用的是一个在 core-lib:2.0.0 中已经废弃删除了的方法，那这种方式就不可行了。

理想的情况下，core-lib 的开发者应该会保证他开发的库应该是`后向兼容的`，也就是说即使升级了，那老的版本应该也是能工作的，这时候他可能会：

- 升级他的包的 ArtifactId, 比如从 `org.example:core-lib` 到`org.example:core-lib2`,
- 修改包名，比如 `org.example.corelib` 修改成 `org.example.corelib2`

这样的话新旧版本的库就可以同时存在了，依赖冲突也就解决了。

但是吧，这样开发者的工作就大了，虽然有一些成功的例子，比如 log4j -> log4j2 , 但是大多数开发者并没有这样做。

那么有没有其他的办法呢？那就是`Shade`

### Shade Jar

上文说到，shade jar 是指将 jar 包和它的依赖包一起打包到一起，并能够将依赖包重命名（relocate - 重定位）， 说到这里，大家应该都明白重命名是怎么回事了，就是修改依赖的包名，这样就不会出现依赖冲突的情况了，这个时候上面的依赖树可能就变成下面这样了：

![Java shading](https://img-blog.csdnimg.cn/img_convert/1f02727f93706848e0ef80b9e45431dc.png)

some-lib 和 other-lib 分别将自己所依赖的库打包到自己的 jar 里面，并且通过重命名之后2个 jar 没有依赖冲突了，这个时候他们各自依赖的库如果在 `my-app`要引用的话会是什么样子呢？

比如在原始的`org.example:core-lib`中有一个类是`org.example.corelib.CoreClass` ,此时它在 `some-lib` 的包名可能已经被重命名为`somelib.shading.org.example.corelib.CoreClass`,

在`other-lib` 中的同一个类可能命名为`otherlib.shading.org.example.corelib.CoreClass`(重命名规则取决于我们配置的规则)，这样2个类的唯一限定名是完全不一样的，也就没有冲突一说了。

上面这种方式是 `some-lib` 和`other-lib` 的开发者将自己的依赖`shade`到自己的 jar 包中,  还有一种方式是我们作为 jar 的使用者将 `some-lib` 和`other-lib` 分别打包成 shade jar :

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210630211743647.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzI1Mjk1NjEx,size_16,color_FFFFFF,t_70#pic_center)


这两种方式的区别是，我们站在`my-app`的角度来 shade jar 的话，就相当于把 some-lib 和 other-lib 里面的 class 重新复制和重命名了一份（包括它们的依赖，有些依赖可能并不需要封装，因为它们比较稳定，不会发生大的变化），如果 jar 包的开发者来做 shade jar 的话，他们就能选择性的进行 `shade` ，把一些可能会导致兼容问题的依赖库给作为 shade jar 的一部分。

有一些工具能够帮助我们完成 shade jar 的工作，比如 maven 和 gradle 都有这样的工具:

- [Apache Maven Shade Plugin – Introduction](https://maven.apache.org/plugins/maven-shade-plugin/)

- [Apache Maven Assembly Plugin – Usage](https://maven.apache.org/plugins/maven-assembly-plugin/usage.html)
- [Gradle Shadow Plugin](https://imperceptiblethoughts.com/shadow/getting-started/)

具体使用方法可以参考相关的文档。

### Shading Best Practices - 最佳实践

- 使用一个单独的模块来做 shade, 封装jar 和其传递依赖。可以使用一个单独的子模块与其他模块最后分开
- 使用一个特定于项目和模块的前缀名来做 shade，这样避免与其他 jar 包冲突。比如对于 `some-lib` 和它的传递依赖，可以使用`myapp.shading.somelib` 作为前缀，其中的类可能是这样的:`myapp.shading.somelib.org.example.CoreClass`, 这样就能与本项目的另外一个jar 包（比如`other-lib`的`myapp.shading.otherlib.org.example.CoreClass`）的类所区别。
- 想清楚哪些依赖要做 shade 封装起来，哪些依赖可以不做，尽量减少最后打包出来的依赖比较大.
- 确保 shade jar 中只包含重写了 package 的类，不要把未重写 package 的类也打包进去了，不然以后遇到这些也要做 shade 的时候会导致问题.
- 不要将 shaded  classes 暴露在编译的 classpath下（compile classpath），即不要让 jar 的使用者使用你封装起来的依赖类，一旦别人用了你重命名只会的类，你以后想更新起来就比较困难了。
- 为你 shade jar 里面的依赖库选定好指定的版本（包括其传递依赖），不然后面更新版本的话里面的类和接口会有变化。

### Shading Drawbacks - 缺点

- 每一个 shade 的依赖都会增加你最终构建出的 jar 的大小，同时 classpath 的类数量也会更多，在多个版本都存在 classpath 的情况下，也会导致开发者使用的时候感到疑惑
- Debug 的时候比较困难，IDE 不知道从哪下载 shaded jar 里面依赖对应的源码, 只会有反编译的代码而没有注释和文档
- shading 插件可以在字节码的层面帮忙把对象指向重新命名后对应的包去，但是无法使用反射来动态的加载类信息了。

最后，附上一个简单的 shading-demo 项目：[Kaybee/shading-demo (gitee.com)](https://gitee.com/kaybee/shading-demo)



参考资料：

文章部分翻译自[Java Class Shadowing and Shading. Java class shading best practices and… | by Ammar Khaku | Medium](https://medium.com/@akhaku/java-class-shadowing-and-shading-9439b0eacb13)， 如有错误，请不惜指正，感谢。

[Executable Jar/Uber Jar/Shade Jar/Shadow Jar/Fat Jar 到底是什么东西？ - SegmentFault 思否](https://segmentfault.com/a/1190000039149043)


