# Skill 开发

Skill 是可复用的任务能力定义。内置 Skill 放在仓库的 `SKILLs/` 目录，一个 Skill 一个目录，目录名就是应用使用的技能 ID。

```text
SKILLs/
└── my-skill/
    ├── SKILL.md       # 必需：YAML 元数据 + 执行说明
    ├── scripts/       # 可选：辅助脚本
    ├── references/    # 可选：按需读取的详细说明
    ├── assets/        # 可选：模板、样式等静态资源
    └── zhiyuan/       # 可选：展示元数据与图标
```

`SKILL.md` 以 `---` 包围的 YAML 开头，至少包含 `name` 和 `description`。`description` 写清什么时候使用、什么时候不使用，模型据此决定是否调用该技能。正文是给模型的执行说明，较长的参考资料放进 `references/`，并在正文中说明何时读取。

Skill 中的 Python 脚本由 `run_skill_script` 工具在应用托管的 Python 环境中运行。默认启用状态和排序在 `SKILLs/skills.config.json` 中配置。

完整规范见仓库的 `SKILLs/README.md`。

用户也可以不改源码，在应用的「专家 → 技能」中新建自定义技能，或从 ModelScope 和 GitHub 导入，见[使用与管理技能](../guide/skills.md)。
