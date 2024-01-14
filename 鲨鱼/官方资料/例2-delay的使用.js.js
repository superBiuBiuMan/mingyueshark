// 定义插件名字
pluginName = "例2-delay的使用";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 教你怎么延时执行";

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
  shark.logger.log(`插件开始执行了~`);

  // 等待两秒 再执行后面的语句
  await shark.delay(2);

  shark.logger.log(`2秒等待完了!`);
};
