// 定义插件名字
pluginName = "精灵进修";
// 定义作者名称
pluginAuthor = "愿得一人心";
// 定义描述
pluginDescription = ""

onPluginStart = async function () {
  do {
    const 获取信息 = await shark.reqest({
      name: "获取学堂信息",
      url: "{!mc}cgi_pasture_sprite_garden?act=schoolindex",
      data: {
        pays: 0
      },
    });
    if (获取信息.isLearning != 1) {
      const 学习 = await shark.reqest({
        name: "学习",
        url: "{!mc}cgi_pasture_sprite_garden?act=schoolupgrade",
        data: {
          tabId: 1,
          pays: 0,
          gridId: 获取信息.unlockTab1[0].id,
        },
      });
    }
    await shark.delay(3600);
  } while (true)
}