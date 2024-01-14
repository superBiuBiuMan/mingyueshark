// 定义插件名字
pluginName = "巨铂换铂金";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = ""
// 插件版本
pluginVersion = "20230625";


onPluginStart = async function() {
    let sp = 0;
    let coin = 0;
    
    let set_call = {
        name: "获取巨铂数量",
        url: "{!ncm}act_ios_minersettled",
        data: {
            act: "index",
            version: shark.mobileVersion,
            platform: shark.mobilePlatform,
            appid: 353
        }
    }
        
    let get_back = await shark.reqest(set_call);
    if(get_back.ecode == 0){
        sp = get_back["sp"];
        coin = get_back["coin"];
        shark.logger.log("获取成功["+sp+"]");
    }else{
        if("direction" in get_back){
            shark.logger.error("获取失败("+get_back["direction"]+")");
        }else{shark.logger.error("获取失败");}
        return;
    }
    if(sp <=0){shark.logger.error("巨铂碎片不足");return;}
    await shark.delay(2);

    set_call = {
        name: "兑换铂金",
        url: "{!ncm}act_ios_minersettled",
        data: {
            act: "ex",
            version: shark.mobileVersion,
            platform: shark.mobilePlatform,
            appid: 353
        }
    }
            
    get_back = await shark.reqest(set_call);
    if(get_back.ecode == 0){
        shark.logger.log("兑换成功["+(get_back["coin"] - coin)+"]");
    }else{
        if("direction" in get_back){
            shark.logger.error("兑换失败("+get_back["direction"]+")");
        }else{shark.logger.error("兑换失败");}
    }
}