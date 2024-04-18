---
title: 在 K8S 中使用 Datadog (Sidecar) 来收集 JVM Metrics
date: 2024-04-18
tags:
  - Tips
category:
  - ARTS
---
本文中将使用 Datadog 作为 Sidecar 和 应用程序部署在同一个 K8S Pod 中来收集程序的 JVM 指标。当然 Datadog 也提供了其他的方式以方便集成，具体可以参考 [Autodiscovery with JMX (datadoghq.com)](https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=operator)。

因为一些限制，我这里没法使用 Datadog Trace Agent 所以上述文档的自动配置没法使用，好在 Datadog 还提供了其他的方式来集成：[JMX (datadoghq.com)](https://docs.datadoghq.com/integrations/java/?tab=host)

以下以 Sidecar 的方式来配置，其他类似的方式差不多。

### Pod 定义

首先必须使用`datadog/agent:xxx-jmx` 这样的 Docker 镜像, 因为 ``datadog/agent:xxx` 没有集成获取 JMX 的功能。

Pod 的定义如下：

```yaml
apiVersion: v1  
kind: Pod  
metadata:  
  name: pod-name  
spec:  
  containers:  
    - image: public.ecr.aws/datadog/agent:7.32.0-jmx  
      name: datadog-agent  
      lifecycle:  
        postStart:  
          exec:  
            command:  
              - "/bin/bash"  
              - "-c"  
              - |  
                cat /dumps/hosts >> /etc/hosts;  
                cat <<EOF >/etc/datadog-agent/conf.d/jmx.d/jmx.yaml  
                init_config:  
                instances:  
                  - host: "127.0.0.1"  
                    port: "9001"  
                    name: jmx_instance  
                    tags:  
                      - env:${ENVIRONMENT}  
                      - app:${app-name}  
                EOF  
      env:  
        - name: DD_API_KEY  
          valueFrom:  
            secretKeyRef:  
              key: api-key  
              name: datadog  
              optional: true  
        - name: DD_CLUSTER_CHECKS_ENABLED  
          value: "true"  
        - name: DD_SITE  
          value: datadoghq.com  
        - name: DD_KUBERNETES_KUBELET_NODENAME  
          valueFrom:  
            fieldRef:  
              apiVersion: v1  
              fieldPath: spec.nodeName  
        - name: DD_JMXFETCH_ENABLED  
          value: "true"  
        - name: DD_JMXFETCH_CHECK_PERIOD  
          value: "60000"  
        - name: DD_JMXFETCH_STATSD_PORT  
          value: "8125"  
    - name: java-app  
      env:  
        - name: POD_IP  
          valueFrom:  
            fieldRef:  
              fieldPath: status.podIP  
        - name: JAVA_OPTS  
          value: >-  
            -Dcom.sun.management.jmxremote  
            -Dcom.sun.management.jmxremote.authenticate=false  
            -Dcom.sun.management.jmxremote.ssl=false  
            -Dcom.sun.management.jmxremote.local.only=false  
            -Dcom.sun.management.jmxremote.port=9001
            -Dcom.sun.management.jmxremote.rmi.port=9001  
            -Djava.rmi.server.hostname=$(POD_IP)
```

### App 配置

下面的 JAVA 参数用来开启 JMX 服务，Datadog Agent 从这个端口（9001）来抓取 JMX 指标，需要注意的是，Java 程序需要启动的时候加上这些参数，比如 `java $JAVA_OPTS -jar app.jar`, 如果使用自定义的方式启动的话，需将这些参数加到 `System.properties` 里面。
```txt
-Dcom.sun.management.jmxremote  
-Dcom.sun.management.jmxremote.authenticate=false  
-Dcom.sun.management.jmxremote.ssl=false  
-Dcom.sun.management.jmxremote.local.only=false  
-Dcom.sun.management.jmxremote.port=<JMX_PORT>  
-Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>  
-Djava.rmi.server.hostname=$(POD_IP)
```

### Datadog Agent 配置

Datadog Agent 收集 JMX 的配置实际上写入了 `/etc/datadog-agent/conf.d/jmx.d/jmx.yaml `, 该配置文件各项参数的定义可以参考[JMX (datadoghq.com)](https://docs.datadoghq.com/integrations/java/?tab=host#configuration-options)，
我这里只收集默认的 JVM 参数，因为 `collect_default_jvm_metrics` 默认值是 `true`，所以没有设置任何参数。

注意这里因为 agent 与 java-app 同在一个 Pod 中，所以 host 使用了 `127.0.0.1`。

```yaml
init_config: 

instances:  
  - host: "127.0.0.1"  
	port: "9001"  
	name: jmx_instance  
	tags:  
	  - env:${ENVIRONMENT}  
	  - app:${app-name}  
```

`jmx.yaml` 里面的 `tags` 用来在 Datadog UI 上面筛选 Metrics，收集的 JVM 参数在这里可以看到：[Java Runtime Metrics (datadoghq.com)](https://docs.datadoghq.com/tracing/metrics/runtime_metrics/java/)， 比如 **jvm.heap_memory**, **jvm.gc.major_collection_count** 等关键指标都有。

Datadog 提供了一个默认的 Dashboard 可供使用：[default JVM Runtime Dashboard](https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics?_gl=1*1wxmq3l*_gcl_au*MTE4Njc3MDU2My4xNzA2NjgyMDUz*_ga*NzM4NTU2MjAyLjE3MDY2ODIwNTE.*_ga_KN80RDFSQK*MTcxMzQyNTY5NS4xMi4xLjE3MTM0MjY2MjIuMC4wLjkzOTExNDg0*_fplc*UzdTcVhTVEFROTdNNE9qdTZER1lPYmh1VVdiMFVVUkNVQnVNbFAxS3pJQWZIVzloODltVHp5N3JralMzeTNQUDhsVXdOQlQzRm4wV2Q3QVk3R2IlMkZXJTJGcVdXUDEwT2FPVzExYUhTbHFpS2VVJTJGaU5NTkR5dmt5RzhwJTJCbmY2TUElM0QlM0Q.)
我们可以 Copy 过来然后修改一些 filter 参数，这样就能展示我们的 JVM 参数了，类似于 Grafana 的界面。

## ConfigMap 遇到的问题

当然我们也可以使用 `ConfigMap` 来保存 Datadog JMX 配置，然后在 Pod 里面使用 `volumeMounts` 来引用文件：
```yaml
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: dd-agent-config  
data:  
  jmx.yaml: |  
    init_config:  
  
    instances:  
      - host: "127.0.0.1"  
        port: "9001"  
        name: jmx_instance  
        tags:  
          - env:${ENV}  
          - app:${APP_NAME}
```

我在使用 `ConfigMap` 的时候想在 Pod 中去替换 `jmx.yaml` 中的 `tags` ，因为我的 pod definition 是一个模板，不同的 app 都会使用，但是 tags 不同，这样我可以用 tags 来做筛选。所以用了一个 `initContainers` 来做预处理，先替换 tags 然后 `cp` 写入到指定位置，让 agent 启动的时候使用, 模板如下：

```yaml
apiVersion: v1  
kind: Pod  
metadata:  
  name: pod-name  
spec:  
  initContainers:  
    - image: public.ecr.aws/datadog/agent:7.32.0-jmx  
      name: prepare-hosts  
      command:  
        - /bin/bash  
        - -c  
        - sed -i 's/ENV/${ENVIRONMENT}' /dd-init-config/jmx.yaml;  
        - sed -i 's/APP_NAME/${APP_NAME}' /dd-init-config/jmx.yaml;  
        - cp /dd-init-config/jmx.yaml /dd-config/jmx.yaml  
      volumeMounts:  
        - mountPath: /dd-init-config  
          name: dd-init-config  
        - mountPath: /dd-config  
          name: dd-config  
  containers:  
    - image: public.ecr.aws/datadog/agent:7.32.0-jmx  
      name: datadog-agent  
      lifecycle:  
        postStart:  
          exec:  
            command:  
              - "/bin/bash"  
              - "-c"  
              - cp /dd-config/jmx.yaml /etc/datadog-agent/conf.d/jmx.d/jmx.yaml  
      volumeMounts:  
        - mountPath: /dd-config  
          name: dd-config  
      env:  
        - name: DD_API_KEY  
          valueFrom:  
            secretKeyRef:  
              key: api-key  
              name: datadog  
              optional: true  
        - name: DD_CLUSTER_CHECKS_ENABLED  
          value: "true"  
        - name: DD_SITE  
          value: datadoghq.com  
        - name: DD_KUBERNETES_KUBELET_NODENAME  
          valueFrom:  
            fieldRef:  
              apiVersion: v1  
              fieldPath: spec.nodeName  
        - name: DD_JMXFETCH_ENABLED  
          value: "true"  
        - name: DD_JMXFETCH_CHECK_PERIOD  
          value: "60000"  
        - name: DD_JMXFETCH_STATSD_PORT  
          value: "8125"  
    - name: java-app  
      env:  
        - name: POD_IP  
          valueFrom:  
            fieldRef:  
              fieldPath: status.podIP  
        - name: JAVA_OPTS  
          value: >-    
            -Dcom.sun.management.jmxremote    
            -Dcom.sun.management.jmxremote.authenticate=false    
            -Dcom.sun.management.jmxremote.ssl=false    
            -Dcom.sun.management.jmxremote.local.only=false    
            -Dcom.sun.management.jmxremote.port=9001  
            -Dcom.sun.management.jmxremote.rmi.port=9001    
            -Djava.rmi.server.hostname=$(POD_IP)  
  volumes:  
    - name: dd-init-config  
      configMap:  
        name: dd-agent-config  
    - name: dd-config  
      emptyDir: { }
```

但是在部署之后发现根据 tags 根本查不到 metrics，最后 `bash` Datadog Agent 里面去看看配置文件：
```bash
kubectl exec -it pod-name -c datadog-agent -- bash

cat /etc/datadog-agent/conf.d/jmx.d/jmx.yaml
```

居然发现文件里面的变量没有被替换掉！
```yaml
init_config:

instances:
  - host: "127.0.0.1"
    port: "9001"
    name: jmx_instance
    tags:
      - env:ENV
      - app:APP_NAME
```

**原因就是 ConfigMap 映射过来的文件是只读的，使用 `sed` 替换字符的时候并没有生效**

了解原因就好办了，可以先 copy 一份文件，然后对复制之后的文件做替换就可以了。
但是我最后并没有采用 ConfigMap 的方式去存 JMX 的配置，原因在于我的 Pod 文件只是一个模板，我的 JMX 配置其实也是一个模板，我可以将他们放在一起，在部署之前进行替换然后部署，不用去维护 ConfigMap。


## 总结一下遇到的问题：

1. Service not available, connection refused
没有配置 `-Djava.rmi.server.hostname=$(POD_IP)`
2. Unknow host `%%host%%`
最开始 jmx.yaml  中的 host 配置的是 `%%host%%`，没有搞清楚这样配的含义，从别的地方 Copy 过来的
3. java.rmi.ConnectException: Connection refused to host: localhost;
由于是本机，所以配了 localhost，发现也不行
4. ConfigMap volumeMounts readOnly 问题
最开始 jmx.yaml 配置在 ConfigMap 中，想动态的修改 tags，没有理解ConfigMap volumeMounts 过来是只读的
5. container command error, not know the `-c` means in `/bin/bash -c "echo Hello, world!"`

```txt
Exec lifecycle hook ([/bin/bash -c]) for Container "datadog-agent" in Pod "dummy-test-job-001-jfz4z_default(58548007-f185-4af0-b7f8-912352ae4b8f)" failed - error: command '/bin/bash -c' exited with 2: /bin/bash: -c: option requires an argument, message: "/bin/bash: -c: option requires an argument\n"
```

不理解 container 里面 bash -c 的正确用法，以为跟 Gitlab 里面 scripts 一样可以直接执行。

