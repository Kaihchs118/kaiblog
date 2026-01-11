---
title: 選項卡
slug: /tabs
pagination_prev: null
---

# 選項卡 `/tabs`
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

<div className="tip-callout">
:::info
也可以為 Tab 提供值與 defaultValue 道具：
:::
</div>
docs/format-as-rhetoric
<Tabs
  defaultValue="apple"
  values={[
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Banana', value: 'banana'},
  ]}>
  <TabItem value="apple">This is an apple 🍎</TabItem>
  <TabItem value="orange">This is an orange 🍊</TabItem>
  <TabItem value="banana">This is a banana 🍌</TabItem>
</Tabs>

<div className="tip-callout">
:::info
對於所有擁有相同 groupID 的分頁群組，它們的可能值不必完全相同。如果某個分頁群組選取的值，在另一個相同 groupID 的分頁群組中不存在，那麼缺少該值的分頁群組也不會改變其分頁狀態。您可以從下面的例子中清楚看到這一點：嘗試選擇「Linux」，上方的標籤組不會有任何變化。
:::
</div>


<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">
    I am Windows.
  </TabItem>
  <TabItem value="mac" label="macOS">
    I am macOS.
  </TabItem>
  <TabItem value="linux" label="Linux">
    I am Linux.
  </TabItem>
</Tabs>