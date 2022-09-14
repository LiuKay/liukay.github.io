# 数据结构

## 红黑树

HashMap

## 跳表

Redis 实现 REIDS_HASH 底层会用

### 查询过程：

temp = head

1. 从 temp 出发，如果当前节点的 key == target，返回 target
2. key !=target && right ==null, temp = temp.down
3. key != target && right !=null && right < key, temp = temp.right
4. key != target && right !=null && right > key, temp = temp.down

### 删除过程：

1. right == null, temp = temp.down
2. right !=null && key == right, delete right, temp = temp.down
3. right != null && key > right, temp = temp.right
4. right != null && key < right, temp = temp.down

###  插入过程：





## B+ 树

MySQL 索引底层

### 各种中间件常用的数据结构

