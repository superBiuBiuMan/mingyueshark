// @ts-check
/// <reference path="../plugin.d.ts" />

// 定义插件名字
pluginName = "自动使用普通化肥";
// 定义作者名称
pluginAuthor = "燎原之火(17896)收人";
// 定义描述
pluginDescription = "VIP可以无限使用化肥，所以该插件会自动每小时使用化肥，小三可以自动完成，如果有小三即可废弃该插件";
// 
pluginVersion = "0.0.1";

async function start() {
    const cgi_farm_index = await shark.reqest({
        name: "获取土地信息",
        url: "{!nc}cgi_farm_index?mod=user&act=run"
    })
    cgi_farm_index.farmlandStatus.forEach(((item, index) => {
        shark.delay(100, () => {
            shark.reqest({
                name: "使用普通化肥",
                url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=fertilize",
                data: {
                    v_client: 1,
                    place: index,
                    tId: 2
                }
            });
        })
    }));
}

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
    shark.logger.log(`${pluginName}：插件开始执行了~`);
    shark.logger.log("家族：燎原之火 前100，收想玩魔法池的活跃玩家。家族号：17896，QQ群：871302673（进群请备注来源）");
    await start();
};
