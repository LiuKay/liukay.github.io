---
title: 在 Windows Terminal 中建一个有代理能力的配置
date: 2022-11-25
category:
    - 博客
    - Tips
tag:
    - Tips
---

> 问题： 在使用一些代理工具开启代理之后，windows 系统的命令行工具，诸如 terminal, cmd, powershell 默认是不会走代理，需要在环境变量中配置http/https 代理地址，但是有时候不是一直开着代理在跑，有时候也需要不开代理跑命令行，我又不想再设置一下环境变量，那怎么办呢？

可以在 Windows Terminal 上面新建一个配置, 在这个配置中默认开启代理，这样当我需要代理的时候，直接打开这个 Tab 弹出的命令行就可以直接使用了。

所以我们可以这样复制一个 Powershell 的配置(其他命令行类似)，然后在启动命令中加入配置代理：

```json
{
    "commandline": "C:\\Program Files\\PowerShell\\7\\pwsh.exe -NoExit -Command \"& {$env:HTTP_PROXY='http://127.0.0.1:10809';$env:HTTPS_PROXY='http://127.0.0.1:10809'}\" ",
    "guid": "{91dcdcec-b2d8-4317-9e87-2000791226b3}",
    "hidden": false,
    "icon": "ms-appx:///ProfileIcons/pwsh.png",
    "name": "ps_proxy",
    "startingDirectory": "D:\\"
}

```

其中 `$env:HTTP_PROXY='http://127.0.0.1:10809'` 就是设置环境变量，该变量只在当前的 Powershell session 中生效，不影响其他的命令行工具，这样就能随取随用了。

![windows_terminal_proxy](./images/windows_terminal_proxy.png)

### Git bash with Proxy
要在Windows Terminal中新建一个设置了代理的Git Bash，请按照以下步骤操作：

1. 打开Windows Terminal。

2. 点击下拉箭头，然后选择“设置”(Settings)。这将打开Windows Terminal的设置JSON文件。

3. 在"profiles" > "list"部分，添加一个新的配置对象，如下所示：

```json
{
    "guid": "{GUID}",
    "name": "Git Bash with Proxy",
    "commandline": "C:/Program Files/Git/bin/bash.exe --login -i -c \"export HTTP_PROXY=http://<username>:<password>@<proxy-server>:<port>; export HTTPS_PROXY=https://<username>:<password>@<proxy-server>:<port>; exec bash\"",
    "icon": "C:/Program Files/Git/mingw64/share/git/git-for-windows.ico",
    "hidden": false
}
```

请确保：

将{GUID}替换为一个唯一的GUID。您可以使用在线生成器（如https://www.guidgenerator.com/）生成GUID。
根据实际情况替换<username>、<password>、<proxy-server>和<port>为您的代理服务器详细信息。如果代理服务器不需要身份验证，只需省略<username>:<password>@部分。
如果您的Git安装路径与示例不同，请相应地修改"commandline"和"icon"中的路径。

4. 保存并关闭设置JSON文件。

5. 返回Windows Terminal，点击下拉箭头，您应该能看到一个名为"Git Bash with Proxy"的新配置选项。选择它，将打开一个设置了代理的Git Bash实例。