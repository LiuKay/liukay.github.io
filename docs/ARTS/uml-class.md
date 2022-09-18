---
title: UML类图
date: 2021-01-16
category:
  - 编程技术
tag:
  - 知识点
  - TIPS
---


> 参考：https://en.wikipedia.org/wiki/Class_diagram

![https://en.wikipedia.org/wiki/Class_diagram#/media/File:Uml_classes_en.svg](./images/Uml_classes_en.svg)


## Instance-level relationships 实例间的关系

- Dependency

依赖关系是2个关联元素之间的语义连接，这种连接关系导致一个元素的变化可能会引起依赖它的其他元素的变化。依赖关系是单向的。

用带箭头的虚线表示。

- Association

关联关系。关联关系可以连接任意数量的 class,4种类型的关联关系：单向，双向，聚合（包括组合），自反。单向和双向关系是最常用的。

带箭头的实线表示。

- Aggregation

聚合关系。聚合代表的是一种`has a`关系，是一种更具体关联关系，它代表了一种部分-整体或部分关系。聚合关系只会涉及2个 class 而且必须是双向的关系。但是在实现中，聚合和关联关系的区别不大。

通常用带空心菱形的实现表示。

- Composition

组成。组成关系用填充的菱形指向包含class, 另一端用指向被包含的 class.

## Aggregation 和 Composition 的区别

**组成 composition:**

- 当要表达真实世界中的`部分-整体`关系时，如汽车引擎是汽车的一部分。
- 当整体销毁时，部分也将销毁 (When the container is destroyed, the contents are usually not destroyed)。如学校和学校中的部门，学校关闭了，它的部分也就不成立了。

**聚集 aggregation:**

- 当表达一种软件或数据库关系。如汽车引擎的模型 ENG01 是汽车模型CM01 的部分，该汽车引擎模型可能也是另一种车型的部分。
- 当整体销毁时，部分不会被销毁 (When the container is destroyed, the contents are usually not destroyed)。如教授教一批学生，当教授去世时，学生不会跟着去世...(WIKI上的例子)

### Class-level relationships 类间的关系

- Generalization/Inheritance 泛化/继承

  用空心三角和实线表示。

  继承代表一种`is a`的关系。是值一个元素是另一个元素的子类，或者也可以表示为另一个元素的类型。子类的任何实例也是父类的实例。

- Realization/Implementation  实现

  用空心三角和虚线表示。

  实现代表了一个元素（实现类）实现了另一个元素（接口）定义的行为（ a realization relationship is a relationship between two model elements, in which one model element (the client) realizes (implements or executes) the behavior that the other model element (the supplier) specifies）

### General relationship 通用关系

- Dependency

  依赖关系是一种很弱的关系。它可以表示在某个时间点上的依赖。
