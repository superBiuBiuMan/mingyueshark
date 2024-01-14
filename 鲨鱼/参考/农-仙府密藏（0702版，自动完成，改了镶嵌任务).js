// 定义插件名字 
pluginName = "农仙府密藏";
// 定义作者名称
pluginAuthor = "三";
// 定义描述
pluginDescription = "农场活动:仙府密藏活动!不爬塔,不打竞技场,";
// 插件版本
pluginVersion = "7-2";

pluginInputs = [{
        key: "开启",
        title: "仙府密藏",
        placeholder: "可选择花费晶钻开启",
        type: "muti-select",
        selects: [
       {name: "花费15晶钻开启朱雀一次",value: 1,},
       {name: "花费8晶钻开启青龙一次",value: 2,},
       {name: "花费8晶钻开启玄武一次",value: 3,},
       {name: "花费5晶钻开启白虎一次",value: 4,},
       {name: "白嫖玩家,不开启",value: 5,},
                   ]
    }]

onPluginStart = async function () {

    const 仙府=await shark.reqest({name: "获取仙府密藏活动信息",
    url: "{!nc}query",
    data: {act:"2255001",},});
    if(仙府.ecode!=0){shark.logger.log("仙府密藏活动未开始，退出")
     return}

    if(仙府.data[5]>0){shark.logger.log("任务1已经完成")}else{shark.logger.log("每日首次进入活动未完成")}
    if(仙府.data[6]>0){shark.logger.log("任务2已经完成")}else{shark.logger.log("每日仙府密藏中消耗晶钻未完成")
   for(let xiao_fei of shark.rule.开启){
   if(xiao_fei==1 || xiao_fei==2 || xiao_fei==3 || xiao_fei==4){let kq;
   if(xiao_fei==1){kq="花费15晶钻,开启朱雀一次"}else if(xiao_fei==2){kq="花费8晶钻,开启青龙一次"}else if(xiao_fei==3){kq="花费8晶钻,开启玄武一次"}else if(xiao_fei==4){kq="花费5晶钻,开启白虎一次"}
    await shark.reqest({name:kq,
    url: "{!nc}exchange",
    data: {act:"2255002",num:1,id:xiao_fei},}); }  }  }
    if(仙府.data[7]>4){shark.logger.log("任务3已经完成")}else{shark.logger.log("每日完成5次竞技场未完成")}
    if(仙府.data[8]>4){shark.logger.log("任务4已经完成")}else{shark.logger.log("每日完成5次通天塔未完成")}
    if(仙府.data[9]>0){shark.logger.log("任务5已经完成")}else{shark.logger.log("每日镶嵌宝石未完成")
    const 魔法池=await shark.reqest({name: "查看魔法池",
    url: "{!nc}magicquery",
    data: {act:"2010058",},});
    await shark.reqest({name: "查看装备",
    url: "{!nc}magicquery",
    data: {act:"2010039",},});
    for(const list of 魔法池.hero){
    await shark.reqest({
    name:"英雄heroIndex:"+list.heroIndex+"一键卸下",
    url: "{!nc}magicexchange",
    data: {act:"2010077",heroindex:list.heroIndex },});
    const 一键镶嵌=await shark.reqest({
    name: "英雄heroIndex:"+list.heroIndex+"一键镶嵌",
    url: "{!nc}magicexchange",
    data: {act:"2010076",heroindex:list.heroIndex },});
    if(一键镶嵌.ecode==0){shark.logger.log("镶嵌宝石任务完成,退出!");break}
      }  }
    if(仙府.data[10]>0){shark.logger.log("任务6已经完成")}else{shark.logger.log("每日合成宝石未完成")
    const marry = [2786,2793,2800,2807 ]
    let  bs;let hc=0;
    for (const list of marry) {
    if(hc==0){
    if(list==2786){bs="红玛瑙1级"}else if(list==2793){bs="绿翡翠1级"}else if(list==2800){bs="蓝水晶1级"}else if(list==2807){bs="虎眼石1级"}
    const 合成=await shark.reqest({name:bs+"合成",
    url: "{!nc}magicexchange",
    data: {act:"2010072",id:list},});
    if(合成.ecode!=0){shark.logger.log(bs+合成.direction+",合成失败")}
    else{hc=2;shark.logger.log(bs+"合成成功,退出！")}  }  }   }

    for(let i=1;i<7;i++){
    await shark.reqest({name:"领取任务宝石"+i,
    url: "{!nc}exchange",
    data: {act:"2255004",id:i},});  }

}

