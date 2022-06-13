# HTML 相关知识

[toc]

## `MIME`

[什么是`MIME`--菜鸟](https://www.runoob.com/http/mime-types.html)

MIME (Multipurpose Internet Mail Extensions) 是描述消息内容类型的标准，用来表示文档、文件或字节流的性质和格式。

MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。

浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理 URL，因此 We b 服务器在响应头中添加正确的 MIME 类型非常重要。如果配置不正确，浏览器可能会无法解析文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

**语法：**

```txt
type/subtype
主类型/子类型
```

主类型：`text` `image` `audio` `video` `application`

常见 `MIME`

| 媒体类型                   | 文件扩展名       | 说明                                      |
| -------------------------- | ---------------- | ----------------------------------------- |
| `application/x-gzip`       | gz, gzip         | GZ 压缩文件格式                           |
| `application/zip`          | zip, 7zip        | ZIP 压缩文件格式                          |
| `image/gif`                | gif              | GIF 图像格式                              |
| `image/jpeg`               | jpg, jpeg        | JPG(JPEG) 图像格式                        |
| `image/png`                | png              | PNG 图像格式                              |
| `image/bmp`                | bmp              | BMP 图像格式（位图格式）                  |
| `image/webp`               | webp             | WebP 图像格式                             |
| `image/x-icon`             | ico              | ico 图像格式，通常用于浏览器 Favicon 图标 |
| `text/plain`               | txt              | 普通文本格式                              |
| `application/x-javascript` | js               | Javascript 文件类型                       |
| `text/javascript`          | js               | 表示 Javascript 脚本文件                  |
| `text/css`                 | css              | 表示 CSS 样式表                           |
| `text/html`                | htm, html, shtml | HTML 文件格式                             |

## 内容类别

[Content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#palpable_content)
[内容分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)
