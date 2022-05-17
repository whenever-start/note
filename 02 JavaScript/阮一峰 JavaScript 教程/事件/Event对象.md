# Event 对象

[Event 对象](https://www.bookstack.cn/read/javascript-tutorial/docs-events-event.md)

属性:

- `Event.bubbles Event.eventPhase`
- `Event.cancelable Event.cancelBubble`
- `Event.target Event.currentTarget`
- `Event.type`
- `Event.timeStamp`
- `Event.isTrusted`
- `Event.detail`

记忆:

1. `Event` 对象
2. 冒泡(图形: 有一个泡泡)
3. 取消(泡泡破裂)
4. `div`(泡泡破裂后蹦出来一个 `div => target`)
5. `type`(`div` 有一个 `type=click` 可点击)
6. `timeStamp`(点击 `type` 弹出来一个时间戳)
7. 真假(用牙咬看 弹出来的 `timeStamp` 是真是假)
8. 详情(查看详情)

`Event 对象 -> 冒泡 -> 取消 -> div -> type click -> timeStamp -> 真假 -> 详情`

方法:

- `Event.preventDefault()`
- `Event.stopPropagation()`
- `Event.stopImmediatePropagation()`
- `Event.composedPath()`
