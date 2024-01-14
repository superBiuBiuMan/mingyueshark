// 定义插件名字 
pluginName = "牧场精灵";
// 定义作者名称
pluginAuthor = "三";
// 定义描述
pluginDescription = "牧场精灵";
// 插件版本
pluginVersion = "8-19";

pluginInputs = [
       {key: "wooks",
        title: "周四14点后工作",
        placeholder: "插件周四14点后工作",
        type: "select",
        selects: [
       {name: "是",value: "1",},
       {name: "否",value: "2",},
                   ]    },
       {key: "jing_ling",
        title: "精灵表演场",
        placeholder: "精灵表演场模块选择",
        type: "muti-select",
        selects: [
       {name: "随机留家表演九次,外出表演一次",value: "1",},
       {name: "打开神秘礼盒一次",value: "2",},
       {name: "列表第一只能力提升一次",value: "3",},
                   ]    },
       {key: "shopp",
        title: "仓库物品出售",
        placeholder: "仓库物品出售",
        type: "muti-select",
        selects: [
       {name: "飞吻",value: "2258",},
       {name: "掌声",value: "2259",},
       {name: "鲜花",value: "2260",},
       {name: "小红心",value: "2261",},
       {name: "喝彩",value: "2262",},
       {name: "拥抱",value: "2263",},
       {name: "幸运礼盒",value: "2280",},
                   ]    },

       {key: "pk",
        title: "外出PK的ID",
        placeholder: "功能没写，填ID,例：1",},


       {key: "hua_yuan",
        title: "精灵花园",
        placeholder: "精灵花园模块选择",
        type: "muti-select",
        selects: [
       {name: "随机每日比赛5次",value: "1",},
       {name: "随机精灵对抗赛PK3次",value: "2",},
       {name: "插件运行一次,普通玩具玩耍一次",value: "3",},
                   ]    },

       ]


onPluginStart = async function () {

    var wook1;var wook2;var wook3;var wook4;var wook5;var wook6;
    var wook21;var wook22;var wook23;var wook24;var wook25;var wook26;
    var wook31;var wook32;var wook33;var wook34;var wook35;var wook36;var wook37;
    var kong;var kong1;var kong2;var kong3;var kong4;var kong5;var kong6;
    var kong51=[];var kong52=[];var kong53=[];
    var week=new Date().getDay();
    var hours=new Date().getHours();
    var times=(Date.parse(new Date())) / 1000

//周四游戏更新，设置14点后工作
    if(typeof shark.rule.wooks !="undefined" && Number(shark.rule.wooks)==1 && hours<14 && week==4){
    shark.logger.log("周四活动更新,14点后才工作")
    return }


   wook1=await shark.reqest({name: "查看精灵表演场",
   url: "{!mc}cgi_pasture_performe?act=index",data: {fuin:shark.selfUin},});
   wook2=await shark.reqest({name: "查看每日任务",
   url: "{!mc}cgi_pasture_multiperforme?act=dailyMission",data: {},});


//shopp  仓库出售
   if(typeof shark.rule.shopp !="undefined" && Number(shark.rule.shopp)!=0){
   wook3=await shark.reqest({name: "查看仓库",
   url: "{!mc}cgi_pasture_performe?act=wareHouse",data: {Id:1,},});
   for(let list21 of shark.rule.shopp){
   for(let list22 of wook3.wareHouseData[0].moneyList){
   if(list21==list22.tcId && list22.tcValue!=0){
   await shark.reqest({name: "出售的tcId: "+list22.tcId,
   url: "{!mc}cgi_pasture_performe?act=wareHouse",
   data: {Id: 3,tooId: list22.tcId,num: list22.tcValue},});
   }  }  }  }

// 随机随机
   if(typeof shark.rule.jing_ling !="undefined" && Number(shark.rule.jing_ling)!=0){
   wook2=await shark.reqest({name: "查看每日任务",
   url: "{!mc}cgi_pasture_multiperforme?act=dailyMission",data: {},});
   if(wook2.ecode==0){
//收取表演成果
   wook4=await shark.reqest({name: "查看表演进度",
   url: "{!mc}cgi_pasture_multiperforme?act=performanceSchedule",data: {},});
   if(wook4.ecode==0){
   for(let biao of wook4.spriteData){
   times=(Date.parse(new Date())) / 1000
   if(biao.speedTime!=0 || times>=biao.performeTime+biao.performeTotalTime){
   await shark.reqest({name: biao.opt_id+"收取成果",
   url: "{!mc}cgi_pasture_performe?act=performingFinishForTools",
   data: {stageId:2,Id:2,spId:biao.opt_id,stageUin:shark.selfUid},});    }   }   } 
//
   for(let list of shark.rule.jing_ling){
   if(list==1){
//随机留家表演九次,外出表演一次
   wook1=await shark.reqest({name: "查看精灵表演场",
   url: "{!mc}cgi_pasture_performe?act=index",data: {fuin:shark.selfUin},});
   if(wook1.ecode==0){
   shark.logger.log("今天免费体力剩余:"+wook1.free_tili+"；可积计体力:"+wook1.vt2279)
   if(wook1.free_tili !=0){
   for(let tesk11 of wook1.spriteData){
   if(tesk11.SpritePerformingData[0].performeNum !=3){
//  外出表演
   if(wook2.missionList[1].count==0){
   wook23=await shark.reqest({name: "查看外派的列表",
   url: "{!mc}cgi_pasture_multiperforme?act=visitOther",data: {condition: 0},});
   if(wook23.ecode==0){
   for(kong1=0;kong1<=99;kong1++){
   wook2=await shark.reqest({name: "查看每日任务",
   url: "{!mc}cgi_pasture_multiperforme?act=dailyMission",data: {},});
   if(wook2.ecode==0){ if(wook2.missionList[1].count !=0){break} }else{break};
   wook24=await shark.reqest({name: "随机拜访一位",
   url: "{!mc}cgi_pasture_performe?act=index",
   data: {fuin: wook23.userList[kong1].uin},});
   if(wook24.ecode==0){
   for(kong=1;kong<=5;kong++){
   if(wook24.stageData[kong].stage_isUnlock==1){
   if(wook24.stage_optId == null){
   await shark.reqest({
   name: "派出精灵"+!!+"去"+wook24.nickName+"表演",
   url: "{!mc}cgi_pasture_performe?act=spriteHook",
   data: {Id:kong+1,fuin:wook24.stageData[0].stage_uin,
   spId: tesk11.opt_id ,realId: tesk11.spriteId},}); 
   }  }else{break}       }  }  }  }    } 
//  留家表演
   if(wook1.free_tili !=0){
   for(kong2=wook1.free_tili;kong2>0;kong2--){
   wook1=await shark.reqest({name: "查看体力",
   url: "{!mc}cgi_pasture_performe?act=index",data: {fuin:shark.selfUin},});
   if(wook1.ecode==0){kong2=wook1.free_tili;
   if(wook1.free_tili !=0){
//收取表演成果
   wook4=await shark.reqest({name: "查看表演进度",
   url: "{!mc}cgi_pasture_multiperforme?act=performanceSchedule",data: {},});
   if(wook4.ecode==0){
   for(let biao of wook4.spriteData){
   times=(Date.parse(new Date())) / 1000
   if(biao.speedTime!=0 || times>=biao.performeTime+biao.performeTotalTime){
   await shark.reqest({name: biao.opt_id+"收取成果",
   url: "{!mc}cgi_pasture_performe?act=performingFinishForTools",
   data: {stageId:2,Id:2,spId:biao.opt_id,stageUin:shark.selfUid},});  } } } 
//shopp  仓库出售
   if(typeof shark.rule.shopp !="undefined" && Number(shark.rule.shopp)!=0){
   wook3=await shark.reqest({name: "查看仓库",
   url: "{!mc}cgi_pasture_performe?act=wareHouse",data: {Id:1,},});
   for(let list21 of shark.rule.shopp){
   for(let list22 of wook3.wareHouseData[0].moneyList){
   if(list21==list22.tcId && list22.tcValue!=0){
   await shark.reqest({name: "出售的tcId: "+list22.tcId,
   url: "{!mc}cgi_pasture_performe?act=wareHouse",
   data: {Id: 3,tooId: list22.tcId,num: list22.tcValue},});
   }  }  }  }
   wook6=await shark.reqest({name: "留家表演",
   url: "{!mc}cgi_pasture_performe?act=spriteHook",
   data: {Id:1, spId: tesk11.opt_id ,realId: tesk11.spriteId},}); 
   if(wook6.ecode==0){shark.logger.log("留家表演成功!!!");
   shark.logger.log(wook6.getMoneyTime+"秒后可循环!!!");
   await shark.delay(wook6.getMoneyTime);  }
   else{shark.logger.log(wook6.direction);break}    }  }  }
   }  }  }  }     }
//
    }
// 打开神秘礼盒一次
   if(list==2 && wook2.missionList[4].count==0){
   wook4=await shark.reqest({name: "查看神秘礼盒",
   url: "{!nc}query?act=2181001",data: {Id:1,},});
   if(wook4.ecode==0){  
   if(wook4.vt2280>0 && wook4.vt2281>0){
   await shark.reqest({name: "打开神秘礼盒一次",
   url: "{!nc}exchange?act=2181002",data: {id: 1,},});   }  }  }
// 列表第一只能力提升一次
   if(list==3 && wook2.missionList[2].count==0){
   wook21=await shark.reqest({name: "查看列表第一个精灵ID",
   url: "{!mc}cgi_pasture_performe?act=queryWarehouse",
   data: {Id:1,},});
   if(wook21.ecode==0){
   wook22=await shark.reqest({name: "使用普通能力药水提升一次",
   url: "{!mc}cgi_pasture_performe?act=bilityUp",
   data: {Id:1,spId:wook21.spriteData[0].opt_id},});
   if(wook22.ecode==0){break}else{
   wook22=await shark.reqest({name: "使用高级能力药水提升一次",
   url: "{!mc}cgi_pasture_performe?act=bilityUp",
   data: {Id:2,spId:wook21.spriteData[0].opt_id},});
   }  }  }
//
    }  }  }
//结束随机


// 领取任务奖励
   wook2=await shark.reqest({name: "查看每日任务",
   url: "{!mc}cgi_pasture_multiperforme?act=dailyMission",data: {},});
   if(wook2.ecode==0){
   for(let task of wook2.missionList){
   if(task.count>0 && task.state==0){
   await shark.reqest({name: "领取每日任务奖励"+task.id,
   url: "{!mc}cgi_pasture_multiperforme?act=dailyMission",
   data: {missionId:task.id,},});           }  }
   if(wook2.activityNum>=200){
   await shark.reqest({name: "领取200活跃点奖励",
   url: "{!nc}exchange?act=2179002",data: {id: 5,},});  }
   if(wook2.activityNum>=160){
   await shark.reqest({name: "领取160活跃点奖励",
   url: "{!nc}exchange?act=2179002",data: {id: 4,},});  }
   if(wook2.activityNum>=120){
   await shark.reqest({name: "领取120活跃点奖励",
   url: "{!nc}exchange?act=2179002",data: {id: 3,},});  }
   if(wook2.activityNum>=80){
   await shark.reqest({name: "领取80活跃点奖励",
   url: "{!nc}exchange?act=2179002",data: {id: 2,},});  }
   if(wook2.activityNum>=20){
   await shark.reqest({name: "领取20活跃点奖励",
   url: "{!nc}exchange?act=2179002",data: {id: 1,},});  }      }
//

//   hua_yuan  精灵花园
   if(typeof shark.rule.hua_yuan !="undefined" && Number(shark.rule.hua_yuan)!=0){
   wook31=await shark.reqest({name: "查看精灵花园",
   url: "{!mc}cgi_pasture_sprite_garden?act=index",data: {},});
   for(let hua of shark.rule.hua_yuan){
// 花园随机PK3次
   if(hua==2 ){
   wook35=await shark.reqest({name: "查看精灵花园",
   url: "{!mc}cgi_pasture_sprite_battle?act=index",data: {},});
   if(wook35.ecode==0){
   if(wook35.dailyTime!=3){
   wook36=await shark.reqest({name: "查看精灵花园仓库",
   url: "{!mc}cgi_pasture_sprite_garden?act=rep",data: {id: 2},});
   if(wook36.ecode==0){
   kong52=[];kong52+="$";kong1=0;
   for(kong5=0;kong5<5;kong5++){
   if(wook31.spriteData[kong5].opt_id!=null){kong1=kong5+1;
   kong52+=wook31.spriteData[kong5].opt_id
   if(kong5==4){break}
   if(kong5==2){kong52+="$"}else{kong52+="-"} }else{break} }
//  仓库替补
   if(kong1<5 && wook36.repSpriteData[4-kong1].opt_id !=0){
   if(kong1==0){kong52+="$"}
   for(kong5=kong1;kong5<5;kong5++){
   kong52+=wook36.repSpriteData[4-kong5].opt_id
   if(kong5==4){break}
   if(kong5==2){kong52+="$"}else{kong52+="-"}  }  }
    if(kong1<5){break}else{
    for(kong2=wook35.dailyTime;kong2 !=3;kong2++){
   wook32=await shark.reqest({name: "设置今天PK挑战阵容",
   url: "{!mc}cgi_pasture_sprite_battle?act=option&act_choose=update",
   data: {day: 1,input:kong52},}); 
   await shark.reqest({name: "PK",
   url: "{!mc}cgi_pasture_sprite_battle?act=battle&act_choose=battle",
   data: {fuin: wook35.pkRecord[kong2].QQ},}); 
     } }
// input: $5-4-16$6-12  input: 5-16-4$$6-12  input: 6-15$5-4-16$
   }  }    }  }
// 每日比赛5次
   if(hua==1){
   kong51=[];
   for(kong5=0;kong5<5;kong5++){
   if(wook31.spriteData[kong5].opt_id!=null){
   kong51+=wook31.spriteData[kong5].opt_id+"-"
   }else{kong51+="0-"}
  if(kong5==4){kong51+="0"}   }
   wook34=await shark.reqest({name: "查看每日比赛次数",
   url: "{!mc}cgi_pasture_sprite_garden?act=pvp&pvp_act=index",
   data: {},});
   if(wook34.ecode==0){
   for(kong6=wook34.littleDuan;kong6>0;kong6--){ 
   wook33=await shark.reqest({name: "开始比赛",
   url: "{!mc}cgi_pasture_sprite?act=pk",
   data: {type:1,stage:kong51},});
   if(wook33.ecode==0){shark.logger.log("比赛成功,10分钟后再比赛")}
   else{break}
   if(kong6==1){break}
   await shark.delay(10*60); 
   }  }  }
//插件运行一次,普通玩具玩耍一次
   if(hua==3){
   for(let wanju of wook31.spriteData){
   wook37=await shark.reqest({name: wanju.opt_id+"普通玩具玩耍一次",
   url: "{!mc}cgi_pasture_sprite?act=play",
   data: {id: 1,toolid: 1,spId: wanju.opt_id},}); 
   if(wook37.ecode==0){shark.logger.log("使用玩具成功")}
   else{shark.logger.log(wook37.direction);break}   } }
//
   }  }  
//


 }
