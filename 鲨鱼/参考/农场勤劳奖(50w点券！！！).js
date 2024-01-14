// 定义插件名字 
pluginName = "农场勤劳奖";
// 定义作者名称
pluginAuthor = "三";
// 定义描述
pluginDescription = "农场勤劳奖,与那明月只能领取一次50w点卷同一个";
// 插件版本
pluginVersion = "2023-4-26";

onPluginStart = async function () {
    await shark.reqest({name: "查看",
    url: "{!nc}cgi_farm_exjz",
    data: {opt:"index",},});
    await shark.reqest({name: "领取晶钻",
    url: "{!nc}cgi_farm_exjz",
    data: {opt:"exjz",},});
    await shark.delay(1);
    await shark.reqest({name: "领取礼包",
    url: "{!nc}cgi_farm_exjz",
    data: {opt:"exgift",},});
    await shark.delay(1);
}
