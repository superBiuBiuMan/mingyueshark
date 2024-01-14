// 定义插件名字
pluginName = "例4-面板数据展示";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 教你怎么将数据显示到查看面板";

// 面板显示钩子函数
// 会在每次显示面板时调用
// refresh是个函数, 当数据准备好了之后需要调用refresh传递数据去更新页面
onPanelShow = async function (refresh) {
  // 面板需要要传递两个数据

  // 第一个 设置表内容数据
  // 格式为对象的数组 对象内字段名没有限制
  const tableData = [
    { id: 1, name: "西瓜", num: 10 },
    { id: 2, name: "钛矿", num: 20 },
    { id: 3, name: "迷人藤", num: 30 },
  ];
  // 第二个 设置显示列
  // 格式固定为  name: 列名称  key: 使用上面表数据的哪个字段名
  const columnData = [
    { name: "道具ID", key: "id" },
    { name: "道具名称", key: "name" },
    { name: "道具数量", key: "num" },
  ];

  // 调用refresh刷新面板页面
  refresh(tableData, columnData);
};
