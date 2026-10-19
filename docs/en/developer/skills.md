# Skill Development

A Skill is a reusable task capability definition. Built-in Skills live in the repository's `SKILLs/` directory, one directory per Skill; the directory name is the Skill ID used by the app.

```text
SKILLs/
└── my-skill/
    ├── SKILL.md       # required: YAML metadata + execution instructions
    ├── scripts/       # optional: helper scripts
    ├── references/    # optional: detailed references read on demand
    ├── assets/        # optional: static resources such as templates and styles
    └── zhiyuan/       # optional: display metadata and icons
```

`SKILL.md` starts with YAML enclosed in `---` and contains at least `name` and `description`. The `description` should state clearly when to use the Skill and when not to; the model uses it to decide whether to invoke the Skill. The body contains execution instructions for the model. Longer reference material goes into `references/`, with a note in the body about when to read it.

Python scripts in a Skill run through the `run_skill_script` tool in the app-hosted Python environment. Default enabled state and ordering are configured in `SKILLs/skills.config.json`.

See the repository's `SKILLs/README.md` for the full specification.

Users can also create custom Skills without changing source code, in the app under **Expert → Skills**, or import them from ModelScope and GitHub; see [Using and Managing Skills](../guide/skills.md).
