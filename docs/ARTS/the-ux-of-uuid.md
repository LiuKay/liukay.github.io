---
title: UUID 的用户体验
date: 2024-04-12
category:
  - ARTS
tag:
  - ARTS
  - TIPS
---

>[The UX of UUIDs | Unkey](https://unkey.dev/blog/uuid-ux)

**TLDR;**
使用下列方式来改进 UUID 的用户体验：
1. 使 UUID 易于复制(Copy)
2. 添加前缀易于识别和分类
3. 使用更高效的编码方式，比如 Base58
4. 可以改变长度来提高重复率

## UUID 难以复制

UUID 在很多系统中使用的十分普遍，在我经历过的几个项目中，经常遇到需要 Copy UUID 到 Postman 来发送请求或者是到 Datadog 这样监控平台去查询日志等情形，这个时候很烦的一点就是 UUID 没法鼠标双击就选中了，原因就是它中间包含的中划线 ("-"), 你可以试试去复制下面的这个 ID。

```txt
4c5fb787-48ce-4b6e-ab8c-3c4f23590b27
```

一个简单的做法就是去除 UUID 中间的"-", 这样双击就直接选中了。
```txt
4c5fb78748ce4b6eab8c3c4f23590b27
```

```Java
public static String uuid(){  
	String id = UUID.randomUUID().toString();  
	return id.replace("-", "");  
}
```

## 前缀

给唯一 ID 加上前缀是一个好的实践，这样可读性更强，使用的时候也更明确。我以前参与的一个项目也给 ID 加了前缀，但是这个前缀是全局同一的，所以所有的ID 都是这个前缀，这样的话其实加了跟没加一样，所以在前缀中又加了一个数字来表达 ID 的类型，比如用户是 1，订单是 2。不过我觉得这样其实也不直观。最简单直观的方式还是加英文缩写前缀，比如 OpenAI 的 API Key那样，`sk_xxxxxxxxxxx`。
```shell
usr_123456789
ord_234567890
```

## Base58 编码

> [Base58 - What Is it? Why Use It? (wyhaines.io)](https://wyhaines.io/base58-what-is-it-why-use-it)


Base58 编码在 Web3 里面用的比较多，比如比特币，区块链里面。

简而言之就是，Base58 编码具有更好的可读性，能区分因为字符导致的误读，比如"I"和"l"(一个大写的i, 一个是小写的L)，同时能够以更短的字符包含更多的信息。比如文章的原话是说

>例如，8 个字符长的 base58 字符串可以存储的状态数量大约是 8 个字符的十六进制字符串的 30,000 倍。在 16 个字符的情况下，base58 字符串可以存储 889.054.070 个组合

拿 JS 的库来说，

```js
import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

const id = `prefix_${nanoid(22)}`// prefix_KSPKGySWPqJWWWa37RqGaX
```

我实际没找到（Google） Java 相关的 Base58 编码比较权威的库，一个比较还算靠谱的是 Testcontainers 的工具类里面有一个简单的实现。然后还有 [Base58 (bitcoinj 0.14 API)](https://bitcoinj.org/javadoc/0.14/org/bitcoinj/core/Base58.html)

```Java
public final class Base58 {  

private static final char[] ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".toCharArray();  
private static final SecureRandom RANDOM = new SecureRandom();  
  
	private Base58() {  
	//no-op  
	}  
  
	public static String randomString(int length) {  
		char[] result = new char[length];  
		  
		for(int i = 0; i < length; ++i) {  
			char pick = ALPHABET[RANDOM.nextInt(ALPHABET.length)];  
			result[i] = pick;  
		}  
	  
		return new String(result);  
	}  
}
```

## 改变长度来提高重复率

使用 Base58 编码可以指定base 长度，根据不同的长度来生成 ID，长度越长当然唯一性越高。

|Length|Example|Total States|
|---|---|---|
|nanoid(8)|re6ZkUUV|1.3e+14|
|nanoid(12)|pfpPYdZGbZvw|1.4e+21|
|nanoid(16)|sFDUZScHfZTfkLwk|1.6e+28|
|nanoid(24)|u7vzXJL9cGqUeabGPAZ5XUJ6|2.1e+42|
|nanoid(32)|qkvPDeH6JyAsRhaZ3X4ZLDPSLFP7MnJz|2.7e+56|
