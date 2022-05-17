# npm 和 cnpm 混用

问题描述：由于 `npm` 和 `cnpm` 混用，导致 `node_module` 出问题，出现 `Module not found` 等。

解决：删掉 `node_module`，重新 `cnpm install`，并且注意后续不要再混用。
