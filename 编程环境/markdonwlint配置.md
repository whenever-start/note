# 配置 `markdownlint` 规则

[markdownlint 规则 中文](https://www.jianshu.com/p/51523a1c6fe1)
[markdownlint 规则 官网](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md002---first-heading-should-be-a-top-level-heading)

```js
// settings.json
"markdownlint.config": {
    "MD033": {"allowed_elements": ["details","summary"]}
}
```
