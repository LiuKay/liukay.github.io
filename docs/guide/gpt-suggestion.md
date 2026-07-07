---
category:
    - 学习之道
---

# 学习计划 by ChatGPT

围绕一个最终成果来倒推：

> **2 个月后，你要能在简历和面试里讲清楚：我不仅维护过 legacy ETL，也理解并实践过 AWS + Spark + EKS/EMR 的现代数据管道，并且能用 AI Agent 提升数据排障和运维效率。**

我按你工作之外时间有限来设计，假设每周投入 **8–10 小时**。如果你只能投入 5 小时，也可以按优先级压缩。

---

# 总体学习主线

这 2 个月分成 4 条线，但不是平均用力：

| 模块                  |  占比 | 目标                      |
| ------------------- | --: | ----------------------- |
| Data Engineering 主线 | 50% | AWS、Spark、数据管道工程化       |
| 项目实践                | 25% | 做出一个可写进简历的 demo/project |
| AI Agent 加分项        | 15% | 做数据管道排障/日志分析 Agent      |
| 英语表达                | 10% | 能用英文讲项目、讲问题、讲排障         |

最终产出应该是 3 个东西：

1. 一个英文 README 的数据工程项目
2. 一个 AI-assisted debugging / pipeline troubleshooting 小工具
3. 一套英文面试表达稿：项目介绍、技术难点、故障排查、未来优化

---

# 第 1–2 周：建立现代 Data Engineering 框架

## 目标

先不要急着写代码。前两周的目标是把你的认知从：

> 我维护 ETL 脚本

升级成：

> 我理解一个现代数据管道从 ingestion、storage、processing、orchestration 到 monitoring 的完整链路。

## 学习重点

### AWS 数据工程基础

重点了解这些服务，不需要一开始全部精通：

* S3：数据湖基础，raw / processed / curated 分层
* IAM：权限、role、policy
* VPC：知道私有网络、子网、安全组即可
* Glue Catalog：元数据管理
* EMR / EMR on EKS：Spark 运行环境
* Redshift：数仓目标端
* CloudWatch：日志与监控
* Step Functions / Airflow / MWAA：任务编排概念

### Spark 基础概念

重点掌握：

* DataFrame / Dataset
* partition
* shuffle
* join
* broadcast join
* cache / persist
* executor / driver
* job / stage / task
* 常见失败原因：OOM、数据倾斜、schema mismatch、权限问题

## 这两周你要做的事

建议你画一张图，对比两个项目：

| 项目  | 技术栈                             | 数据源 | 处理方式 | 调度方式 | 监控方式 | 痛点 |
| --- | ------------------------------- | --- | ---- | ---- | ---- | -- |
| 老项目 | Pentaho + Bash + Java + on-prem | ？   | ？    | ？    | ？    | ？  |
| 新项目 | AWS + EKS + Spark + Scala       | ？   | ？    | ？    | ？    | ？  |

这个表非常重要，因为它会变成你未来面试时的表达基础。

## 英语练习

每周练 2 段英文表达：

第一段：

> I currently maintain a legacy ingestion system built with Pentaho, Bash, Java and on-premise servers.

第二段：

> I’m also getting familiar with a cloud-native ingestion platform based on AWS, EKS, Spark and Scala.

不要求流利，但要能说出来。

---

# 第 3–4 周：做一个最小可运行的数据管道项目

## 目标

开始做一个小项目，不要追求复杂，追求完整链路。

项目名称可以叫：

> **Cloud Native Ingestion Pipeline Demo**

或者：

> **AWS-style Data Ingestion Pipeline**

你不一定非要全部部署到 AWS。可以先本地模拟，关键是架构和工程思想要对。

## 项目设计

最小版本：

```text
CSV / API / Mock Data
        ↓
Raw Layer
        ↓
Spark Processing
        ↓
Cleaned Data
        ↓
Redshift-compatible Output / Parquet
        ↓
Data Quality Check
        ↓
Logs + Failure Report
```

你可以先用本地文件夹模拟 S3：

```text
/data/raw/
/data/processed/
/data/rejected/
/logs/
```

然后用 Spark 处理数据。

## 重点不要做成普通 demo

你要刻意加入数据工程真实场景：

### 必须包含

* schema 校验
* 空值检查
* 重复数据检查
* bad records 输出
* job 日志
* 失败重试思路
* idempotency 设计说明
* backfill 说明
* README 架构图

### 可选增强

* 用 Docker 跑 Spark
* 用 Airflow 编排
* 输出 Parquet
* 模拟写入 Redshift
* 加 CloudWatch 风格日志格式

## 这两周你要掌握的关键词

* raw layer
* processed layer
* data quality check
* idempotent pipeline
* retry
* backfill
* schema evolution
* monitoring
* alerting

这些词比单纯“我会 Spark API”更有价值。

---

# 第 5–6 周：加入工程化能力和 AI Agent 排障工具

## 目标

这两周要把项目从“能跑”升级成“像生产系统”。

重点是：**日志、错误分类、排障流程、AI 辅助分析。**

## 数据工程工程化部分

你要给项目补上：

### 1. 日志

日志里至少包含：

* job name
* job start time
* job end time
* input path
* output path
* record count
* success / failed
* error type
* error message

### 2. 错误分类

你可以定义几类 ingestion 常见错误：

| 错误类型                 | 示例          |
| -------------------- | ----------- |
| SchemaMismatch       | 字段缺失、字段类型变化 |
| EmptyInput           | 上游没有数据      |
| DuplicateRecords     | 主键重复        |
| PermissionError      | 没有权限读取或写入   |
| DownstreamWriteError | 写入数仓失败      |
| DataQualityFailed    | 数据质量检查失败    |

### 3. Runbook

给每类错误写一个简单处理建议：

```text
SchemaMismatch:
1. Check upstream schema changes.
2. Compare current schema with expected schema.
3. Update mapping config if the change is expected.
4. Re-run the job for the failed partition.
```

## AI Agent 部分

做一个小工具，不要复杂。

名字可以叫：

> **Ingestion Troubleshooting Assistant**

功能：

输入一段 job log，输出：

1. 错误类型判断
2. 可能原因
3. 建议排查步骤
4. 可能需要执行的 SQL 检查
5. 英文 incident summary

示例输出：

```text
Error Type: SchemaMismatch

Possible Cause:
The upstream data source added a new column or changed the data type of an existing column.

Suggested Checks:
1. Compare the source schema with the expected schema.
2. Check whether the failed partition contains unexpected fields.
3. Validate downstream table definition.

Incident Summary:
The ingestion job failed due to a schema mismatch between the upstream source and the expected target schema.
```

这里你可以用 Codex 辅助开发，但你要理解整体设计。

## 这一阶段的价值

这一步会让你从普通 Data Engineer 变成更有辨识度的：

> Data Engineer who can use AI tools to improve production troubleshooting and operational efficiency.

这比“我会用 ChatGPT”强很多。

---

# 第 7 周：简历化、面试化、英文表达化

## 目标

第 7 周不要再盲目加功能，而是开始把项目包装成求职资产。

你要准备 3 套表达。

---

## 1. 中文项目描述

可以这样讲：

> 我基于真实 ingestion 工作经验，设计了一个云原生数据管道 demo，模拟从 raw data ingestion、Spark 清洗、数据质量校验、错误分类、日志记录到失败排障的完整流程。项目重点不是单纯数据处理，而是关注生产环境中的稳定性、可观测性、幂等性和故障恢复。

---

## 2. 英文简历 bullet

可以准备类似这样的表达：

```text
Designed and implemented a cloud-native data ingestion pipeline prototype using Spark, structured logging, data quality checks, retry strategy and failure classification.
```

```text
Built an AI-assisted troubleshooting assistant to analyze ingestion job logs, classify failure types and generate incident summaries and runbook-based debugging steps.
```

```text
Explored modernization patterns for legacy ETL workflows from Pentaho/Bash/Java-based ingestion to Spark-based cloud-native data pipelines.
```

---

## 3. 英文面试口述稿

你要能回答这个问题：

> Can you introduce one data engineering project you worked on?

你的回答结构可以是：

```text
Sure. In my current role, I mainly maintain a legacy ingestion system built with Pentaho, Bash and Java on on-premise machines.

Recently, I started to focus on cloud-native data engineering patterns. I built a prototype ingestion pipeline using Spark to process raw data, validate schema, run data quality checks and generate structured logs.

The key point of this project is not only data transformation, but also reliability. I added failure classification, retry strategy, idempotency considerations and an AI-assisted troubleshooting assistant to analyze job logs and generate incident summaries.

This helped me build a better understanding of how to modernize legacy ETL workflows into cloud-native data pipelines.
```

这段要练到可以自然说出来。

---

# 第 8 周：查漏补缺 + 对齐岗位要求

## 目标

最后一周不再扩大学习范围，而是回到求职目标：

> 我现在离 Cloud Data Engineer / Senior Data Engineer 还差什么？

你需要拿 10 个目标岗位 JD 做对比，最好是外企岗位。

重点看这些关键词出现频率：

* AWS
* Spark
* EMR
* EKS
* Glue
* Redshift
* Airflow
* Python
* Scala
* SQL
* Data Pipeline
* ETL / ELT
* Data Quality
* Monitoring
* CI/CD
* Terraform
* Kubernetes

然后把你的学习和项目内容对齐到岗位语言。

## 第 8 周要完成的东西

1. 更新英文简历
2. 更新 LinkedIn / Boss / 猎聘 简历关键词
3. 整理项目 README
4. 准备 5 个英文面试问题
5. 列出下一阶段继续补的技术点

---

# 每周时间安排建议

如果你每周有 8–10 小时，可以这样安排：

| 时间              | 内容                       |
| --------------- | ------------------------ |
| 工作日 3 天，每天 1 小时 | AWS / Spark / 英语小练习      |
| 工作日 1 天，1 小时    | 复盘公司项目，整理架构和问题           |
| 周末 4–5 小时       | 项目实践 / AI Agent / README |

一个比较现实的节奏：

```text
周一：AWS / Spark 概念学习
周二：看公司项目 or 整理技术笔记
周三：英语表达训练
周四：Spark / 数据工程练习
周六：项目开发
周日：项目开发 + README + 复盘
```

---

# 这 2 个月不要做什么

## 1. 不要系统性深挖 Pentaho

能维护即可，不要把时间继续投入到老工具上。

## 2. 不要一上来啃 Kubernetes 全家桶

你只需要理解 EKS 如何承载 Spark job，以及基本概念：pod、node、deployment、job、logs、resource request/limit。

不要转成 K8s 运维路线。

## 3. 不要花太多时间学纯 Scala

Scala 够用即可。你的目标不是 Scala 后端工程师，而是 Spark/Data Engineer。

## 4. 不要做泛 AI Agent 项目

比如“个人助手”“网页总结助手”“聊天机器人”这类，对你的跳槽帮助不大。

你的 Agent 必须绑定数据工程场景。

## 5. 不要只刷证书

AWS Data Engineer 证书可以作为辅助，但项目和表达优先。

---

# 2 个月后的理想状态

如果执行得比较好，2 个月后你应该能做到：

1. 看懂 AWS + EKS + Spark ingestion 项目的主流程
2. 能解释 legacy ETL 和 cloud-native data pipeline 的区别
3. 能用 Spark 做基本数据清洗和质量检查
4. 能讲清楚 ingestion job 失败的常见原因和排查方法
5. 有一个能展示的 Data Engineering demo
6. 有一个 AI-assisted troubleshooting 小工具
7. 英文能介绍自己的项目和技术转型方向
8. 简历关键词从“ETL 维护”升级为“Data Engineering / Cloud Data Pipeline / Spark / AWS / AI-assisted debugging”

---

# 最终版 2 个月路线图

你可以直接按这个执行：

```text
第 1–2 周：
理解现代数据工程架构，重点学习 AWS + Spark 基础，画出 legacy ingestion 和 cloud-native ingestion 对比图。

第 3–4 周：
做一个最小可运行的 Spark ingestion pipeline，包含 raw data、清洗、数据质量检查、bad records、日志。

第 5–6 周：
加入工程化能力：错误分类、重试、幂等、runbook，并做一个 AI-assisted ingestion troubleshooting assistant。

第 7 周：
把项目简历化、英文表达化，准备 README、简历 bullet 和英文项目介绍。

第 8 周：
对照外企 Data Engineer 岗位 JD 查漏补缺，更新简历和下一阶段学习计划。
```

你的主线一定要稳住：

> **不是“老 ETL 工程师学一点 AI”，而是“正在从 legacy ingestion 迁移到 cloud-native data engineering，并用 AI 提升数据工程排障效率”。**

这个定位最适合你当前背景，也最容易转化成下一份外企机会。

