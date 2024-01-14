// 定义插件名字
pluginName = "牧场签到";
// 定义作者名称
pluginAuthor = "愿得一人心";
// 定义描述
pluginDescription = ""

onPluginStart = async function () {
  await shark.reqest({
    name: "牧场签到",
    url: "{!mc}cgi_pasture_family",
    data: {
      act: "sign",
      pays: 0,
      id: 1,
    },
  });
}