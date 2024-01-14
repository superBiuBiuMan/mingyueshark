// 定义插件名字
pluginName = "例6-输入参数定义与使用";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 教你输入参数的定义与使用";

// 定义参数
pluginInputs = [
  {
    key: "saleCount",
    title: "出售数量",
    placeholder: "请输入需要出售的数量",
  },
  {
    key: "buyCount",
    title: "购买数量",
    placeholder: "请输入需要购买的数量",
  },
];

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
  shark.logger.log(`需要出售的数量为: ${shark.rule.saleCount}`);
  shark.logger.log(`需要购买的数量为: ${shark.rule.buyCount}`);
};
