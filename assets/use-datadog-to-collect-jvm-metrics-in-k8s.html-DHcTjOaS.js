import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o,c,a,d as n,e,b as t}from"./app-6KSEf1k3.js";const i={},u={href:"https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=operator",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.datadoghq.com/integrations/java/?tab=host",target:"_blank",rel:"noopener noreferrer"},r=t(`<p>以下以 Sidecar 的方式来配置，其他类似的方式差不多。</p><h3 id="pod-定义" tabindex="-1"><a class="header-anchor" href="#pod-定义"><span>Pod 定义</span></a></h3><p>首先必须使用<code>datadog/agent:xxx-jmx</code> 这样的 Docker 镜像, 因为 \`\`datadog/agent:xxx\` 没有集成获取 JMX 的功能。</p><p>Pod 的定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod  
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>name  
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> public.ecr.aws/datadog/agent<span class="token punctuation">:</span>7.32.0<span class="token punctuation">-</span>jmx  
      <span class="token key atrule">name</span><span class="token punctuation">:</span> datadog<span class="token punctuation">-</span>agent  
      <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>  
        <span class="token key atrule">postStart</span><span class="token punctuation">:</span>  
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>  
            <span class="token key atrule">command</span><span class="token punctuation">:</span>  
              <span class="token punctuation">-</span> <span class="token string">&quot;/bin/bash&quot;</span>  
              <span class="token punctuation">-</span> <span class="token string">&quot;-c&quot;</span>  
              <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">  
                cat /dumps/hosts &gt;&gt; /etc/hosts;  
                cat &lt;&lt;EOF &gt;/etc/datadog-agent/conf.d/jmx.d/jmx.yaml  
                init_config:  
                instances:  
                  - host: &quot;127.0.0.1&quot;  
                    port: &quot;9001&quot;  
                    name: jmx_instance  
                    tags:  
                      - env:\${ENVIRONMENT}  
                      - app:\${app-name}  
                EOF  </span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_API_KEY  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">key</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>key  
              <span class="token key atrule">name</span><span class="token punctuation">:</span> datadog  
              <span class="token key atrule">optional</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_CLUSTER_CHECKS_ENABLED  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_SITE  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> datadoghq.com  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_KUBERNETES_KUBELET_NODENAME  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> spec.nodeName  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_ENABLED  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_CHECK_PERIOD  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;60000&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_STATSD_PORT  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;8125&quot;</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> java<span class="token punctuation">-</span>app  
      <span class="token key atrule">env</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POD_IP  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> status.podIP  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JAVA_OPTS  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token punctuation">-</span>  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.authenticate=false  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.ssl=false  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.local.only=false  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.port=9001
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.rmi.port=9001  
            <span class="token punctuation">-</span>Djava.rmi.server.hostname=$(POD_IP)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="app-配置" tabindex="-1"><a class="header-anchor" href="#app-配置"><span>App 配置</span></a></h3><p>下面的 JAVA 参数用来开启 JMX 服务，Datadog Agent 从这个端口（9001）来抓取 JMX 指标，需要注意的是，Java 程序需要启动的时候加上这些参数，比如 <code>java $JAVA_OPTS -jar app.jar</code>, 如果使用自定义的方式启动的话，需将这些参数加到 <code>System.properties</code> 里面。</p><div class="language-txt line-numbers-mode" data-ext="txt" data-title="txt"><pre class="language-txt"><code>-Dcom.sun.management.jmxremote  
-Dcom.sun.management.jmxremote.authenticate=false  
-Dcom.sun.management.jmxremote.ssl=false  
-Dcom.sun.management.jmxremote.local.only=false  
-Dcom.sun.management.jmxremote.port=&lt;JMX_PORT&gt;  
-Dcom.sun.management.jmxremote.rmi.port=&lt;JMX_PORT&gt;  
-Djava.rmi.server.hostname=$(POD_IP)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="datadog-agent-配置" tabindex="-1"><a class="header-anchor" href="#datadog-agent-配置"><span>Datadog Agent 配置</span></a></h3>`,9),k=a("code",null,"/etc/datadog-agent/conf.d/jmx.d/jmx.yaml ",-1),m={href:"https://docs.datadoghq.com/integrations/java/?tab=host#configuration-options",target:"_blank",rel:"noopener noreferrer"},v=a("br",null,null,-1),b=a("code",null,"collect_default_jvm_metrics",-1),g=a("code",null,"true",-1),y=t(`<p>注意这里因为 agent 与 java-app 同在一个 Pod 中，所以 host 使用了 <code>127.0.0.1</code>。</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">init_config</span><span class="token punctuation">:</span> 

<span class="token key atrule">instances</span><span class="token punctuation">:</span>  
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1&quot;</span>  
	<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token string">&quot;9001&quot;</span>  
	<span class="token key atrule">name</span><span class="token punctuation">:</span> jmx_instance  
	<span class="token key atrule">tags</span><span class="token punctuation">:</span>  
	  <span class="token punctuation">-</span> env<span class="token punctuation">:</span>$<span class="token punctuation">{</span>ENVIRONMENT<span class="token punctuation">}</span>  
	  <span class="token punctuation">-</span> app<span class="token punctuation">:</span>$<span class="token punctuation">{</span>app<span class="token punctuation">-</span>name<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h=a("code",null,"jmx.yaml",-1),_=a("code",null,"tags",-1),f={href:"https://docs.datadoghq.com/tracing/metrics/runtime_metrics/java/",target:"_blank",rel:"noopener noreferrer"},D=a("strong",null,"jvm.heap_memory",-1),x=a("strong",null,"jvm.gc.major_collection_count",-1),j={href:"https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics?_gl=1*1wxmq3l*_gcl_au*MTE4Njc3MDU2My4xNzA2NjgyMDUz*_ga*NzM4NTU2MjAyLjE3MDY2ODIwNTE.*_ga_KN80RDFSQK*MTcxMzQyNTY5NS4xMi4xLjE3MTM0MjY2MjIuMC4wLjkzOTExNDg0*_fplc*UzdTcVhTVEFROTdNNE9qdTZER1lPYmh1VVdiMFVVUkNVQnVNbFAxS3pJQWZIVzloODltVHp5N3JralMzeTNQUDhsVXdOQlQzRm4wV2Q3QVk3R2IlMkZXJTJGcVdXUDEwT2FPVzExYUhTbHFpS2VVJTJGaU5NTkR5dmt5RzhwJTJCbmY2TUElM0QlM0Q.",target:"_blank",rel:"noopener noreferrer"},M=a("br",null,null,-1),E=t(`<h2 id="configmap-遇到的问题" tabindex="-1"><a class="header-anchor" href="#configmap-遇到的问题"><span>ConfigMap 遇到的问题</span></a></h2><p>当然我们也可以使用 <code>ConfigMap</code> 来保存 Datadog JMX 配置，然后在 Pod 里面使用 <code>volumeMounts</code> 来引用文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap  
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>agent<span class="token punctuation">-</span>config  
<span class="token key atrule">data</span><span class="token punctuation">:</span>  
  <span class="token key atrule">jmx.yaml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">  
    init_config:  </span>
  
    <span class="token key atrule">instances</span><span class="token punctuation">:</span>  
      <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1&quot;</span>  
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token string">&quot;9001&quot;</span>  
        <span class="token key atrule">name</span><span class="token punctuation">:</span> jmx_instance  
        <span class="token key atrule">tags</span><span class="token punctuation">:</span>  
          <span class="token punctuation">-</span> env<span class="token punctuation">:</span>$<span class="token punctuation">{</span>ENV<span class="token punctuation">}</span>  
          <span class="token punctuation">-</span> app<span class="token punctuation">:</span>$<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我在使用 <code>ConfigMap</code> 的时候想在 Pod 中去替换 <code>jmx.yaml</code> 中的 <code>tags</code> ，因为我的 pod definition 是一个模板，不同的 app 都会使用，但是 tags 不同，这样我可以用 tags 来做筛选。所以用了一个 <code>initContainers</code> 来做预处理，先替换 tags 然后 <code>cp</code> 写入到指定位置，让 agent 启动的时候使用, 模板如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod  
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>name  
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> public.ecr.aws/datadog/agent<span class="token punctuation">:</span>7.32.0<span class="token punctuation">-</span>jmx  
      <span class="token key atrule">name</span><span class="token punctuation">:</span> prepare<span class="token punctuation">-</span>hosts  
      <span class="token key atrule">command</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> /bin/bash  
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>c  
        <span class="token punctuation">-</span> sed <span class="token punctuation">-</span>i &#39;s/ENV/$<span class="token punctuation">{</span>ENVIRONMENT<span class="token punctuation">}</span>&#39; /dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config/jmx.yaml;  
        <span class="token punctuation">-</span> sed <span class="token punctuation">-</span>i &#39;s/APP_NAME/$<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span>&#39; /dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config/jmx.yaml;  
        <span class="token punctuation">-</span> cp /dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config/jmx.yaml /dd<span class="token punctuation">-</span>config/jmx.yaml  
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config  
          <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config  
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /dd<span class="token punctuation">-</span>config  
          <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>config  
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> public.ecr.aws/datadog/agent<span class="token punctuation">:</span>7.32.0<span class="token punctuation">-</span>jmx  
      <span class="token key atrule">name</span><span class="token punctuation">:</span> datadog<span class="token punctuation">-</span>agent  
      <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>  
        <span class="token key atrule">postStart</span><span class="token punctuation">:</span>  
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>  
            <span class="token key atrule">command</span><span class="token punctuation">:</span>  
              <span class="token punctuation">-</span> <span class="token string">&quot;/bin/bash&quot;</span>  
              <span class="token punctuation">-</span> <span class="token string">&quot;-c&quot;</span>  
              <span class="token punctuation">-</span> cp /dd<span class="token punctuation">-</span>config/jmx.yaml /etc/datadog<span class="token punctuation">-</span>agent/conf.d/jmx.d/jmx.yaml  
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /dd<span class="token punctuation">-</span>config  
          <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>config  
      <span class="token key atrule">env</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_API_KEY  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">key</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>key  
              <span class="token key atrule">name</span><span class="token punctuation">:</span> datadog  
              <span class="token key atrule">optional</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_CLUSTER_CHECKS_ENABLED  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_SITE  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> datadoghq.com  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_KUBERNETES_KUBELET_NODENAME  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> spec.nodeName  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_ENABLED  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_CHECK_PERIOD  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;60000&quot;</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DD_JMXFETCH_STATSD_PORT  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;8125&quot;</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> java<span class="token punctuation">-</span>app  
      <span class="token key atrule">env</span><span class="token punctuation">:</span>  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POD_IP  
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>  
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>  
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> status.podIP  
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JAVA_OPTS  
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token punctuation">-</span>    
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote    
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.authenticate=false    
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.ssl=false    
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.local.only=false    
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.port=9001  
            <span class="token punctuation">-</span>Dcom.sun.management.jmxremote.rmi.port=9001    
            <span class="token punctuation">-</span>Djava.rmi.server.hostname=$(POD_IP)  
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>  
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>init<span class="token punctuation">-</span>config  
      <span class="token key atrule">configMap</span><span class="token punctuation">:</span>  
        <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>agent<span class="token punctuation">-</span>config  
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dd<span class="token punctuation">-</span>config  
      <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在部署之后发现根据 tags 根本查不到 metrics，最后 <code>bash</code> Datadog Agent 里面去看看配置文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod-name <span class="token parameter variable">-c</span> datadog-agent -- <span class="token function">bash</span>

<span class="token function">cat</span> /etc/datadog-agent/conf.d/jmx.d/jmx.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>居然发现文件里面的变量没有被替换掉！</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">init_config</span><span class="token punctuation">:</span>

<span class="token key atrule">instances</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1&quot;</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token string">&quot;9001&quot;</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> jmx_instance
    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> env<span class="token punctuation">:</span>ENV
      <span class="token punctuation">-</span> app<span class="token punctuation">:</span>APP_NAME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原因就是 ConfigMap 映射过来的文件是只读的，使用 <code>sed</code> 替换字符的时候并没有生效</strong></p><p>了解原因就好办了，可以先 copy 一份文件，然后对复制之后的文件做替换就可以了。<br> 但是我最后并没有采用 ConfigMap 的方式去存 JMX 的配置，原因在于我的 Pod 文件只是一个模板，我的 JMX 配置其实也是一个模板，我可以将他们放在一起，在部署之前进行替换然后部署，不用去维护 ConfigMap。</p><h2 id="总结一下遇到的问题" tabindex="-1"><a class="header-anchor" href="#总结一下遇到的问题"><span>总结一下遇到的问题：</span></a></h2><ol><li>Service not available, connection refused<br> 没有配置 <code>-Djava.rmi.server.hostname=$(POD_IP)</code></li><li>Unknow host <code>%%host%%</code><br> 最开始 jmx.yaml 中的 host 配置的是 <code>%%host%%</code>，没有搞清楚这样配的含义，从别的地方 Copy 过来的</li><li>java.rmi.ConnectException: Connection refused to host: localhost;<br> 由于是本机，所以配了 localhost，发现也不行</li><li>ConfigMap volumeMounts readOnly 问题<br> 最开始 jmx.yaml 配置在 ConfigMap 中，想动态的修改 tags，没有理解ConfigMap volumeMounts 过来是只读的</li><li>container command error, not know the <code>-c</code> means in <code>/bin/bash -c &quot;echo Hello, world!&quot;</code></li></ol><div class="language-txt line-numbers-mode" data-ext="txt" data-title="txt"><pre class="language-txt"><code>Exec lifecycle hook ([/bin/bash -c]) for Container &quot;datadog-agent&quot; in Pod &quot;dummy-test-job-001-jfz4z_default(58548007-f185-4af0-b7f8-912352ae4b8f)&quot; failed - error: command &#39;/bin/bash -c&#39; exited with 2: /bin/bash: -c: option requires an argument, message: &quot;/bin/bash: -c: option requires an argument\\n&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不理解 container 里面 bash -c 的正确用法，以为跟 Gitlab 里面 scripts 一样可以直接执行。</p>`,15);function q(T,P){const s=l("ExternalLinkIcon");return o(),c("div",null,[a("p",null,[n("本文中将使用 Datadog 作为 Sidecar 和 应用程序部署在同一个 K8S Pod 中来收集程序的 JVM 指标。当然 Datadog 也提供了其他的方式以方便集成，具体可以参考 "),a("a",u,[n("Autodiscovery with JMX (datadoghq.com)"),e(s)]),n("。")]),a("p",null,[n("因为一些限制，我这里没法使用 Datadog Trace Agent 所以上述文档的自动配置没法使用，好在 Datadog 还提供了其他的方式来集成："),a("a",d,[n("JMX (datadoghq.com)"),e(s)])]),r,a("p",null,[n("Datadog Agent 收集 JMX 的配置实际上写入了 "),k,n(", 该配置文件各项参数的定义可以参考"),a("a",m,[n("JMX (datadoghq.com)"),e(s)]),n("，"),v,n(" 我这里只收集默认的 JVM 参数，因为 "),b,n(" 默认值是 "),g,n("，所以没有设置任何参数。")]),y,a("p",null,[h,n(" 里面的 "),_,n(" 用来在 Datadog UI 上面筛选 Metrics，收集的 JVM 参数在这里可以看到："),a("a",f,[n("Java Runtime Metrics (datadoghq.com)"),e(s)]),n("， 比如 "),D,n(", "),x,n(" 等关键指标都有。")]),a("p",null,[n("Datadog 提供了一个默认的 Dashboard 可供使用："),a("a",j,[n("default JVM Runtime Dashboard"),e(s)]),M,n(" 我们可以 Copy 过来然后修改一些 filter 参数，这样就能展示我们的 JVM 参数了，类似于 Grafana 的界面。")]),E])}const V=p(i,[["render",q],["__file","use-datadog-to-collect-jvm-metrics-in-k8s.html.vue"]]),A=JSON.parse('{"path":"/ARTS/use-datadog-to-collect-jvm-metrics-in-k8s.html","title":"在 K8S 中使用 Datadog (Sidecar) 来收集 JVM Metrics","lang":"zh-CN","frontmatter":{"title":"在 K8S 中使用 Datadog (Sidecar) 来收集 JVM Metrics","date":"2024-04-18T00:00:00.000Z","tags":["Tips"],"category":["ARTS"]},"headers":[{"level":3,"title":"Pod 定义","slug":"pod-定义","link":"#pod-定义","children":[]},{"level":3,"title":"App 配置","slug":"app-配置","link":"#app-配置","children":[]},{"level":3,"title":"Datadog Agent 配置","slug":"datadog-agent-配置","link":"#datadog-agent-配置","children":[]},{"level":2,"title":"ConfigMap 遇到的问题","slug":"configmap-遇到的问题","link":"#configmap-遇到的问题","children":[]},{"level":2,"title":"总结一下遇到的问题：","slug":"总结一下遇到的问题","link":"#总结一下遇到的问题","children":[]}],"git":{"createdTime":1713447262000,"updatedTime":1713447262000,"contributors":[{"name":"LiuKay","email":"kayfen@foxmail.com","commits":1}]},"readingTime":{"minutes":4.55,"words":1366},"filePathRelative":"ARTS/use-datadog-to-collect-jvm-metrics-in-k8s.md","localizedDate":"2024年4月18日","excerpt":"<p>本文中将使用 Datadog 作为 Sidecar 和 应用程序部署在同一个 K8S Pod 中来收集程序的 JVM 指标。当然 Datadog 也提供了其他的方式以方便集成，具体可以参考 <a href=\\"https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=operator\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Autodiscovery with JMX (datadoghq.com)</a>。</p>\\n<p>因为一些限制，我这里没法使用 Datadog Trace Agent 所以上述文档的自动配置没法使用，好在 Datadog 还提供了其他的方式来集成：<a href=\\"https://docs.datadoghq.com/integrations/java/?tab=host\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">JMX (datadoghq.com)</a></p>"}');export{V as comp,A as data};
