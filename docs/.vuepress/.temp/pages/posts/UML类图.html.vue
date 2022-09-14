<template><div><h3 id="review-uml类图" tabindex="-1"><a class="header-anchor" href="#review-uml类图" aria-hidden="true">#</a> Review - UML类图</h3>
<h4 id="relationships" tabindex="-1"><a class="header-anchor" href="#relationships" aria-hidden="true">#</a> Relationships</h4>
<p><img src="https://gitee.com/kaybee/markdown_pics/raw/master/img/Uml_classes_en.svg" alt="Uml_classes_en" loading="lazy"></p>
<h5 id="instance-level-relationships-实例间的关系" tabindex="-1"><a class="header-anchor" href="#instance-level-relationships-实例间的关系" aria-hidden="true">#</a> Instance-level relationships 实例间的关系</h5>
<ul>
<li>Dependency</li>
</ul>
<p>依赖关系是2个关联元素之间的语义连接，这种连接关系导致一个元素的变化可能会引起依赖它的其他元素的变化。依赖关系是单向的。</p>
<p>用带箭头的虚线表示。</p>
<ul>
<li>Association</li>
</ul>
<p>关联关系。关联关系可以连接任意数量的 class,4种类型的关联关系：单向，双向，聚合（包括组合），自反。单向和双向关系是最常用的。</p>
<p>带箭头的实线表示。</p>
<ul>
<li>Aggregation</li>
</ul>
<p>聚合关系。聚合代表的是一种<code v-pre>has a</code>关系，是一种更具体关联关系，它代表了一种部分-整体或部分关系。聚合关系只会涉及2个 class 而且必须是双向的关系。但是在实现中，聚合和关联关系的区别不大。</p>
<p>通常用带空心菱形的实现表示。</p>
<ul>
<li>Composition</li>
</ul>
<p>组成。组成关系用填充的菱形指向包含class, 另一端用指向被包含的 class.</p>
<h6 id="aggregation-和-composition-的区别" tabindex="-1"><a class="header-anchor" href="#aggregation-和-composition-的区别" aria-hidden="true">#</a> Aggregation 和 Composition 的区别</h6>
<p><strong>组成 composition:</strong></p>
<ul>
<li>当要表达真实世界中的<code v-pre>部分-整体</code>关系时，如汽车引擎是汽车的一部分。</li>
<li>当整体销毁时，部分也将销毁 (When the container is destroyed, the contents are usually not destroyed)。如学校和学校中的部门，学校关闭了，它的部分也就不成立了。</li>
</ul>
<p><strong>聚集 aggregation:</strong></p>
<ul>
<li>当表达一种软件或数据库关系。如汽车引擎的模型 ENG01 是汽车模型CM01 的部分，该汽车引擎模型可能也是另一种车型的部分。</li>
<li>当整体销毁时，部分不会被销毁 (When the container is destroyed, the contents are usually not destroyed)。如教授教一批学生，当教授去世时，学生不会跟着去世...(WIKI上的例子)</li>
</ul>
<h5 id="class-level-relationships-类间的关系" tabindex="-1"><a class="header-anchor" href="#class-level-relationships-类间的关系" aria-hidden="true">#</a> Class-level relationships 类间的关系</h5>
<ul>
<li>
<p>Generalization/Inheritance 泛化/继承</p>
<p>用空心三角和实线表示。</p>
<p>继承代表一种<code v-pre>is a</code>的关系。是值一个元素是另一个元素的子类，或者也可以表示为另一个元素的类型。子类的任何实例也是父类的实例。</p>
</li>
<li>
<p>Realization/Implementation  实现</p>
<p>用空心三角和虚线表示。</p>
<p>实现代表了一个元素（实现类）实现了另一个元素（接口）定义的行为（ a realization relationship is a relationship between two model elements, in which one model element (the client) realizes (implements or executes) the behavior that the other model element (the supplier) specifies）</p>
</li>
</ul>
<h5 id="general-relationship-通用关系" tabindex="-1"><a class="header-anchor" href="#general-relationship-通用关系" aria-hidden="true">#</a> General relationship 通用关系</h5>
<ul>
<li>
<p>Dependency</p>
<p>依赖关系是一种很弱的关系。它可以表示在某个时间点上的依赖。</p>
</li>
</ul>
</div></template>


