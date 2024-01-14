// 定义插件名字
pluginName = "铂金抵扣买道具";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = "道具ID,单价,数量(多组用|分隔)；每天仅执行一次购买"
// 插件版本
pluginVersion = "20230803";

pluginInputs = [
    {
        key: "tool_list",
        title: "购买道具",
        placeholder: "206,5,10|207,18,10"
    }
]

onPluginStart = async function(){
    
    let toollist = [];
    if(shark.rule.tool_list){
        if(/^\d+[ .,;，；]\d+[ .,;，；]\d+(\|\d+[ .,;，；]\d+[ .,;，；]\d+)*?$/.test(shark.rule.tool_list)){
            toollist = shark.rule.tool_list.split("|");
        }else{
            shark.logger.error("输入有误!["+shark.rule.tool_list+"]");
            return;
        }
    }
    if(toollist.length ==0){return;}

    let overtime = shark.getNextDayMS() - 2000;
    for(let i = 0;i < toollist.length;i++){
        let vtool = toollist[i].split(/[ .,;，；]/);
        let cachename = "buyMineTool_"+vtool[0];
        let cachecheck = shark.getCache(cachename);
        if(cachecheck ==null){
            let check = await buytool(vtool[0], Number(vtool[1]), Number(vtool[2]));
            if(check){
                shark.setCache(cachename, "true", overtime);
            }
        }
    }
    return;

    async function buytool(tid, price, num){
        let isok = false;

        let set_call = {
            name: "购买-"+tid+"[c:"+(price * num)+",n:"+num+"]",
            url: "{!ncm}cgi_ios_mine",
            data: {
                act: "buyMineTool",
                coin: price * num,
                num: num,
                id: tid,
                version: shark.mobileVersion,
                platform: shark.mobilePlatform,
                appid: 353
            }
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("购买成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("购买失败["+get_back["direction"]+"]");
            }else{shark.logger.error("购买失败");}
        }
        await shark.delay(2);
        return isok;
    }
}