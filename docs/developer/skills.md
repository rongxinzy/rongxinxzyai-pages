# Skill 开发

Skill 是一组可复用的任务说明，可以附带参考资料、资源和脚本。它适合保存稳定的工作方法，不应把一次性任务、账号凭据或未经验证的远程代码打包进去。

普通使用者可以在“管理技能”中通过创建入口编写自定义 Skill。该入口依赖已经安装并启用的 `skill-creator`。下面主要介绍如何在源码仓库中维护随应用发布的内置 Skill。

## 目录结构

内置 Skill 位于桌面应用仓库的 `SKILLs/` 目录。最小结构只有一个 `SKILL.md`：

```text
SKILLs/
└── example-skill/
    └── SKILL.md
```

需要时可以增加：

```text
example-skill/
├── SKILL.md
├── scripts/       # 可执行脚本
├── references/    # 按需读取的参考资料
├── assets/        # 模板和其他资源
└── zhiyuan/
    ├── metadata.yaml
    └── icon.png
```

只创建实际需要的目录。`SKILL.md` 中提到相对路径时，以 Skill 自身目录为起点。

## 编写 SKILL.md

仓库内置 Skill 的文件以 YAML frontmatter 开头：

```markdown
---
name: example-skill
description: 整理指定材料并输出结构化结果；当用户要求……时使用。
license: MIT
metadata:
  version: "1.0.0"
---

# Example skill

在这里说明输入要求、执行步骤、边界和交付格式。
```

`name` 必须使用小写连字符格式，例如 `meeting-recap`；`description` 为必填项。仓库校验允许的 frontmatter 字段为 `name`、`description`、`license`、`allowed-tools` 和 `metadata`。

描述应同时写清使用场景和不适用场景，因为系统会根据描述判断是否选择该 Skill。正文应包含：

- 任务开始前需要哪些信息。
- 按什么顺序处理。
- 哪些步骤需要用户确认。
- 最终交付物的格式和检查方法。
- 失败、资料不足或存在风险时怎样停止。

不要把密钥和用户数据写入 Skill。脚本需要安装依赖、联网或修改外部系统时，在说明中明确写出，并把不可逆操作留给用户确认。

## 显示信息和图标

`zhiyuan/metadata.yaml` 用于提供应用中的中文显示信息，可参考现有内置 Skill：

```yaml
name: 示例技能
description: 说明这个技能可以处理的任务。
author: 维护者名称
license: MIT
skillmd: ./SKILL.md
```

图标可以放在 `zhiyuan/icon.png`、`icon.svg`、`icon.webp`、`icon.jpg` 或 `icon.jpeg`。显示元数据和图标是可选项，不影响最小 Skill 的加载。

## 验证和测试

在桌面应用仓库根目录运行：

```bash
bun run validate:skills
```

该命令检查内置 Skill 的 frontmatter 是否能够被应用加载。之后在应用中启用 Skill，用一个符合描述的任务和一个不符合描述的任务分别测试，确认选择条件、相对路径、脚本依赖和输出格式。

如果 Skill 包含脚本，还要在目标操作系统上测试失败路径，并检查生成文件中没有缓存、凭据或调试数据。安装和日常管理方法见[使用与管理技能](../guide/skills.md)。
