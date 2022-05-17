# git 代理

2 个一起用

```bash
# 1080 填入可用的端口号
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy
git config --global --unset https.proxy
```
