// 定义插件名字
pluginName = "老农-田地和饲养场";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = ""
// 插件版本
pluginVersion = "20230817";

pluginInputs = [
    {
        key: "modfield",
        title: "收取田地",
        placeholder: "否",
        type: "select",
        selects: [
            {
                name: "否",
                value: 0
            },
            {
                name: "是",
                value: 1
            }
        ]
    },
    {
        key: "modfeed",
        title: "收取饲养场",
        placeholder: "否",
        type: "select",
        selects: [
            {
                name: "否",
                value: 0
            },
            {
                name: "是",
                value: 1
            }
        ]
    },
    {
        key: "sleep_sec",
        title: "监测间隔(分钟)",
        placeholder: "10"
    }
]

onPluginStart = async function() {
    let sleep = 10 * 60;
    
    if(shark.rule.sleep_sec){
        if(/^\d+(\.\d+)?$/.test(shark.rule.sleep_sec)){
            sleep = Number(shark.rule.sleep_sec) * 60;
        }else{
            shark.logger.error("输入有误!["+shark.rule.sleep_sec+"]");
            return;
        }
    }

    while(1){
        let indexinfo = await getindex();
        
        if(shark.rule.modfield && indexinfo !=null){
            for(let item of indexinfo["fields"]){
                await field_harvest(item["fieldid"]);
            }
        }
        
        if(shark.rule.modfeed && indexinfo !=null){
            for(let item of indexinfo["feeds"]){
                await feed_harvest(item["feedid"]);
            }
        }
        
        await shark.delay(sleep);
    }
    return;
    
    async function getindex(){
        let info = null;
        
        let set_call = {
            name: "获取田地和饲养场信息",
            url: "{!mc}cgi_pasture_kingdoms",
            data: {act: "index"}
        }
        
        let get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            info = get_back;
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败["+get_back.direction+"]");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        return info;
    }
    
    async function field_harvest(fid){
        let isok = false;
        
        let set_call = {
            name: "收取田地"+fid,
            url: "{!mc}cgi_pasture_kingdoms",
            data: {
                act: "modfield",
                fieldid: fid,
                opt: 5
            }
        }
        
        let get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("收取成功["+get_back["addgrass"]+"]");
        }else{
            if("direction" in get_back){
                shark.logger.error("收取失败["+get_back.direction+"]");
            }else{shark.logger.error("收取失败");}
        }
        await shark.delay(2);
        return isok;
    }
    
    async function feed_harvest(fid){
        let isok = false;
        
        let set_call = {
            name: "收取饲养场"+fid,
            url: "{!mc}cgi_pasture_kingdoms",
            data: {
                act: "modfeed",
                feedid: fid,
                opt: 5
            }
        }
        
        let get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("收取成功["+get_back["addexpl"]+"]");
        }else{
            if("direction" in get_back){
                shark.logger.error("收取失败["+get_back.direction+"]");
            }else{shark.logger.error("收取失败");}
        }
        await shark.delay(2);
        return isok;
    }
}