// 定义插件名字
pluginName = "老农梦境";
// 定义作者名称
pluginAuthor = "三-1779358926";
// 定义描述
pluginDescription = "自动完成老农每日任务，紫色三巨头队伍：24,1001,9000|21,1,9000|19,2001,9000-所有需要用兵挑战不能超过兵营士兵数量，英雄ID与对应兵种、可在鲨鱼操作里面查看---无伤队伍例子：24,1001,1|0,1,0|0,1,0----演武挑战、训练士兵--士兵数量到达兵营总量的90%就不再训--所有队伍使用练编队1，根据下面未填提示写！！如果开背包和两商店没填报错不运行，先随便选择一个物品（可以选买不起的）运行一次后，再取消，插件就能正常工作，农场牧场加玩法攻略交流群739068080";
// 插件版本
pluginVersion = "2023-6-19";

pluginInputs = [
    {
        key: "勇闯山寨队伍",
        title: "勇闯山寨使队伍,不能超过兵营士兵数量",
        placeholder: "24,1001,9000|21,1,9000|19,2001,9000",
    },{
        key: "双倍首领挑战队伍",
        title: "双倍首领挑战",
        placeholder: "24,1001,9000|21,1,9000|19,2001,9000",
   },{
        key: "首领挑战队伍",
        title: "平时首领挑战",
        placeholder: "24,1001,1|0,1,0|0,1,0",
    },{
        key: "勇闯山寨指定层数",
        title: "勇闯山寨指定层数",
        placeholder: "勇闯山寨指定层数",
    },{
        key: "经验任务英雄",
        title: "经验任务英雄ID，需要未满级",
        placeholder: "填写英雄ID，只使用一个鸡蛋",
    },{
        key: "sheng_ji",
        title: "挑选要升级的英雄",
        placeholder: "选几个要升级的英雄",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((v) => {
      let zy = v.type == 0 ? "近" : v.type == 1000 ? "骑" : "远"; //职业
      let pz = v.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${v.id}${v.name}[${zy}][${pz}]`,
        value: v.id, };  }),
    },{
        key: "使用英雄贴",
        title: "英雄贴当天首次免费，加载一次使用一次",
        placeholder: "1为开启",
    },{
      key: "kai_bei_bao",
      title: "背包使用物品",
      placeholder: "选择一些能开的物品会自动使用完",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "bagJson").elements[0].cdata,
    ).map((v) => {   
      return { 
        name:  `${ v.id}${v.name}[${v.tips}]`,
        value:   v.id, };  }), 
    },{
      key: "za_huo_pu",
      title: "杂货铺",
      placeholder: "插件每运行一次购买一次",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "groceryStoreJSON").elements[0].cdata,
    ).map((v) => {
      return {
        name: `${v.ID}${v.name}[${v.ptype+":"+v.pcount+"周买次数:"+v.limit_week+"--日买次数:"+v.limit_day}]`,
        value: v.ID, };  }),
    },{
      key: "tan_xian",
      title: "探险商人",
      placeholder: "插件每运行一次购买一次,可以不填",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "adventureStoreJSON").elements[0].cdata,
    ).map((v) => {
      return {
        name: `${v.ID}${v.name}[${v.ptype+":"+v.pcount+"周买次数:"+v.limit_week+"--日买次数:"+v.limit_day}]`,
        value: v.ID, };  }),
    },{
        key: "学府学习",
        title: "自由选择是否学府学习",
        placeholder: "1为开启",
    },{
        key: "演武",
        title: "自由选择是否演武挑战",
        placeholder: "1为开启",
    },{
      key: "ying_xiong",
      title: "演武上阵队伍",
      placeholder: "选九个,空会自动补空位",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((v) => {
      let zy = v.type == 0 ? "近" : v.type == 1000 ? "骑" : "远"; //职业
      let pz = v.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${v.id}${v.name}[${zy}][${pz}]`,
        value: `${v.id}${","}${v.type+1+",40000"}`, };  }),
    },{
        key: "自动升级",
        title: "升级学府,田地,饲养场,兵营升级",
        placeholder: "1为开启",
    },{
        key: "一键升星",
        title: "英雄升星,0-6代表星期几",
        placeholder: "填0-6开启,只填一个数字开启",
    },{
        key: "自动练兵",
        title: "士兵数量到达兵营总量的90%就不再训练",
        placeholder: "1为开启",
    }
	      ]

onPluginStart = async function () {
//5秒后运行
    await shark.delay(5);
// 记录上一次获取到数据的时间
let lastGetDataTime = 0;
// 记录上一次获取到的数据
let M = null;
let T = null;
let B = null;
let y;
let z=0;
onPanelShow = async function (refresh) {
  let 英雄大厅;
  if (Date.now() - lastGetDataTime > 3 * 60 * 1000) {
    const 老农=await shark.reqest({name:"获取老农梦境信息",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    const 英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    const 兵营= await shark.reqest({name: "获取兵营",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "moddata",opt: 2,},})
    if (老农.ecode != 0) {
      shark.logger.log(`获取老农梦境信息失败了!`);
      return;}
    await shark.delay(1);
    // 请求成功更新记录
    M = 老农;
    T = 英雄大厅;
    B = 兵营;
    lastGetDataTime = Date.now();
  }
  const tableData = [ 
    { 1: "英雄大厅",2:M.halllv+"级"  },
    { 1: "学府",    2:M.schoollv+"级"},
    { 1: "田地",    2:M.fieldlv+"级" },
    { 1: "饲养场",  2:M.feedlv+"级"  },
    { 1: "粮食",    2:M.tk_9         },
    { 1: "木材",    2:M.tk_10        },
    { 1: "奇遇币",  2:M.tk_76        },
    { 1: "粮票",    2:M.new          },
    { 1: "近兵量",  2:B.camp["0"].camp["0"].num},
    { 1: "骑兵量",  2:B.camp[1].camp["0"].num  },
    { 1: "远兵量",  2:B.camp[2].camp["0"].num  },
   ];
  const columnData = [
    { name: "类型",key:1},
    { name: "数量",key:2},
   ];
   const tableData2 = [];
   for (const list of T.herolist) {
   z=list.id;
   if(z==1){y="许褚1001"}else if(z==2){y="甄姬1001"}else if(z==3){y="士燮2001"}else if(z==4){y="周瑜2001"}else if(z==5){y="马云禄1"}else if(z==6){y="董旻2001"}else if(z==7){y="魏延1"}else if(z==8){y="孟获1001"}else if(z==9){y="张辽1001"}else if(z==10){y="夏侯渊2001"}else if(z==11){y="黄盖1"}else if(z==12){y="华佗1"}else if(z==13){y="陆逊2001"}else if(z==14){y="赵云1"}else if(z==15){y="鲁肃2001"}else if(z==16){y="桥瑁1001"}else if(z==17){y="李傕1001"}else if(z==18){y="张济1001"}else if(z==19){y="刘岱2001"}else if(z==20){y="赵娥2001"}else if(z==21){y="陶谦1"}else if(z==22){y="淳于琼1"}else if(z==23){y="程远志1"}else if(z==24){y="裴元绍1001"}else if(z==25){y="马日磾2001"}else if(z==26){y="夏侯惇1001"}else if(z==27){y="祝融1001"}else if(z==28){y="程普1"}
   tableData2.push({ ID:list.id,hero:y,level:list.level,exp:list.exp+"/"+list.nextexp,ability:list.ability}); 
 }
  const columnData2 = [
    { name: "ID",  key:"ID"     },
    { name: "英雄",key:"hero"   },
    { name: "等级",key:"level"  },
    { name: "经验",key:"exp"    },
    { name: "战力",key:"ability"},
  ];
  refresh(tableData, columnData,tableData2,columnData2);
  const onClickExchange = async function (exData, exCount) {
   shark.logger.log("鸡蛋"+T.rep["0"].num);
 // 使用鸡蛋
    if(exCount==1 || exCount==2){
    let u=1;if(exCount==2){u=10;}
    for (let i=1;i<=u;i++){
    const 使用鸡蛋=await shark.reqest({name: "使用鸡蛋",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhero",up_type: 1,opt: 2,
    hid: exData.ID,},}); 
    if (使用鸡蛋.ecode != 0){shark.logger.log("资源不足！");
      return; } 
   shark.logger.log(exData.hero+exData.ID+"使用第"+i+"个鸡蛋");} }
// 升级
    if(exCount==3 || exCount==4){let e = exCount+1;
    const 升级=await shark.reqest({name: "升级",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",up_type:e,opt:2,hid:exData.ID,},}); 
    if (升级.ecode != 0) {shark.logger.log("资源不足！");
      return; }  }
// 升星 
  if(exCount==5){
    const 升星=await shark.reqest({name: "升星",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",opt:3,
    hid: exData.ID,},}); 
    if (升星.ecode != 0) {shark.logger.log("碎片不足！");
      return;}
    shark.logger.log(exData.hero+exData.ID+"升星");}
// 更新数据
    const 大厅=await shark.reqest({name:"更新英雄大厅数据",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    let a=0;let b=0;let c=0;let d=0;
    const n=50;let i=0;
    for(i=0;i!=n;i++){
    if(大厅.herolist[i].id==exData.ID){
    a=大厅.herolist[i].level;b=大厅.herolist[i].exp;c=大厅.herolist[i].nextexp;d=大厅.herolist[i].ability;
    for (const list of T.herolist){
    if(list.id==exData.ID){
    list.level=a;list.exp=b;list.nextexp=c;list.ability=d;} }
    } }
   shark.logger.log("忽略下面关于ID的报错");
    }
  return {
    使用鸡蛋一个: async function (data) {
      await onClickExchange(data, 1); },
    使用鸡蛋十个: async function (data) {
      await onClickExchange(data, 2); },
    升一级: async function (data) {
      await onClickExchange(data, 3); },
    升十级: async function (data) {
      await onClickExchange(data, 4); },
    升星: async function (data) {
      await onClickExchange(data, 5); },
     };
     };

     await shark.reqest({name: "领取田地",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act:"modfield",opt:6,},});
     await shark.reqest({name: "领取鸡蛋",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act:"modfeed",opt:6,},});

//周四游戏更新，设置14点后工作
//获取星期几
   var week=new Date().getDay();
//获取时间点
   var hours=new Date().getHours();
   if (hours<14 && week==4){shark.logger.log("周四活动更新,14点后才工作")
   return }
//查看活动
    if (shark.isActivityInPogress("pasture","OldFarmLiBaoTeMaiActivity")){
    await shark.reqest({name: "老农礼包特卖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2index", }, });  }
    if (shark.isActivityInPogress("pasture","ManYueQingDianActivity")){
    await shark.reqest({name: "满月庆典丰收好礼",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a4index", }, });  }
    if (shark.isActivityInPogress("pasture","ShuangBeiKuangHuanActivity")){
    await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a5index", }, });  }
    if (shark.isActivityInPogress("pasture","MengJingQiYuanActivity")){
    await shark.reqest({name: "梦境祈愿",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6index", }, });  }
    if (shark.isActivityInPogress("pasture","YingXiongPeiYangActivity")){
    await shark.reqest({name: "英雄培养"+"未写",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a7index", }, });  }
    if (shark.isActivityInPogress("pasture","XinNianKuangHuanLiActivity")){
    await shark.reqest({name: "狂欢礼"+"未写",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a7index", }, });  }
    if (shark.isActivityInPogress("pasture","ZheKouShangDianActivity")){
    await shark.reqest({name: "折扣商店"+"不写",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a8index", }, });  }
    if (shark.isActivityInPogress("pasture","LaoNongXiaoFeiActivity")){
    await shark.reqest({name: "老农粮票消费返利"+"与折扣商店同出",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a8index", }, });  }

//领装备，装备锻造
    let set_call = {name: "领装备",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {act: "a10draw"}  }
    const get_back = await shark.reqest(set_call);
    if(get_back.ecode == 0){
       shark.logger.log("领取成功\r\n"+get_back["s"].replace(/\s+$/,''));
    }else{
    if("direction" in get_back){
      shark.logger.error("领取失败["+get_back.direction+"]");
      }else{shark.logger.error("领取失败");}  } 
    const 装备锻造=await shark.reqest({name: "查看装备锻造",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {act:"a10index", }, });
    shark.logger.log("装备锻造累计次数"+装备锻造.total)
    if(装备锻造.total==10){ 
    await shark.reqest({name: "打开装备箱",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {act:"a10draw",opt: 2}, });  }

    const 贵族特权=await shark.reqest({name: "查看贵族特权",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfunc",opt: 7,},});
    if(贵族特权.daylimit==0){ 
    await shark.reqest({name: "领取贵族特权礼包",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfunc",opt: 9,},});}

    const 查看任务状态 = await shark.reqest({
    name: "查看任务状态",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 1,},});

    if ((查看任务状态.limit & (0x0001 << 0)) == 0){
    await shark.reqest({name: "领取每日奖励1",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 1,},});}

    if ((查看任务状态.limit & (0x0001 << 1)) == 0) {
    let 查看兵营;
    let list2;
    let list;
    let g=167;let y;
    let cccc;      
    查看兵营 = await shark.reqest({name: "查看训练状态",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for (list of 查看兵营.camp) {
    for (list2 of list.camp) {
    if(list2.id==1){cccc="近战"}else if(list2.id==1001){cccc="骑士"}else if(list2.id==2001){cccc="远程"}
    if (list.cap<=list2.num +list.trainnum+g){
    y=list2.num +list.trainnum+g-list.cap;
    await shark.reqest({name:cccc+"舍弃士兵"+y,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt:9,c_id:list.campid,
    s_id:list2.id,s_num:y,},});   }
    if (list.trainnum == 0){
    await shark.reqest({name:cccc+"训练士兵" + g,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:g,},});
            await shark.delay(1);   } 
    if (list.trainnum>0){
    if (list.ts < ((Date.parse(new Date())) / 1000) && list.ts != 0) {
    await shark.reqest({name:cccc+"收取士兵" + list.trainnum,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 6,c_id:list.campid,},})
    await shark.reqest({name:cccc+"训练士兵" + g,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:g,},})
            await shark.delay(1);  } }
    }  }  
    查看兵营 = await shark.reqest({name: "查看收取时间",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    let sleeptime = 9999999999999
    for (list of 查看兵营.camp) {
    if (list.ts < sleeptime && list.ts != 0)
    sleeptime = list.ts - ((Date.parse(new Date())) / 1000) + 3 }
    shark.logger.log(sleeptime + "秒后可收取士兵");

    await shark.reqest({name: "领取每日奖励1",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 1,},})
    await shark.reqest({name: "领取每日奖励2",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 2,},});}

    const 奇遇=await shark.reqest({name: "奇遇",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "enter",}});
   if(奇遇.ldices!=0){
    await shark.reqest({name: "编队",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "moddata",opt:3,},});
    const 补充兵力 = await shark.reqest({name:"更换勇闯山寨队伍并补兵",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modteam",tindex:0,opt:1,team:shark.rule.勇闯山寨队伍,},});
    await shark.reqest({name: "使用为主队",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act:"modteam", tindex:0, opt:3,},});
    if (补充兵力.ecode != 0) {shark.logger.log("兵力不足,退出任务")
            return
        }
    await shark.reqest({name: "刷新奇遇地图",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    let 前进返回
    do {
    前进返回 = await shark.reqest({name: "奇遇前进一次",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "play",id: 1,},});
    if (前进返回.score > 49) {
    await shark.reqest({name: "遭遇战斗",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "fight",f_level: 1},});}
    else if (前进返回.question != null) {
    await shark.reqest({name: "回答问题",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "randevent",opt: 1,id: 2,},});}
    if (前进返回.ecode == -102) {
    for (let i = 1; i < 5; i++) {
    await shark.reqest({name: "领取奇遇礼包" + i,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "gift",g_index: i,},});}}
    } while (前进返回.ecode != -102)
    shark.logger.log("奇遇已完成")   }
    if ((查看任务状态.limit & (0x0001 << 2)) == 0) {
    await shark.reqest({name: "领取每日奖励3",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 3,},});}

    if ((查看任务状态.limit & (0x0001 << 3)) == 0) {
    await shark.reqest({name: "使用一个鸡蛋",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhero",up_type: 1,opt: 2,
    hid: shark.rule.经验任务英雄,},});
//使用免费英雄帖一次
    await shark.reqest({ name: "使用英雄帖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "draw", type: 1, pool: 1, }, });
//丰收好礼活动期间开启，杂货铺消费一次，指定购买50奇遇币鸡腿index:210
    if (shark.isActivityInPogress("pasture","ManYueQingDianActivity"  )){
    const 兑换鸡腿=await shark.reqest({name:"兑换50奇遇币鸡腿一次",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 2,opt:2, num:1, index:210,}, });
    if (兑换鸡腿.ecode != 0){
    shark.logger.log("兑换鸡腿已达999,停止兑换") } }
    await shark.reqest({name: "领取每日奖励4",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 4,},});}

    const 英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let liop of shark.rule.sheng_ji){
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop){
    const 升级=await shark.reqest({name: liop+"一键升十级",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",up_type:5,opt:2,hid:liop,},}); 
    if(升级.code!=0){shark.logger.log(升级.direction)} 
    if(升级.direction=="资源不足~"){break} 
     }  }  }

     if ((查看任务状态.limit & (0x0001 << 4)) == 0) {
     await shark.reqest({name: "领取每日奖励5",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modtask",opt: 2,taskid: 5,},});}
     if ((查看任务状态.limit & (0x0001 << 5)) == 0) {
     await shark.reqest({name: "领取每日奖励6",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modtask",opt: 2,taskid: 6,},});}

     let 查看山寨层数;
     do {
     查看山寨层数 = await shark.reqest({name: "查看山寨层数",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "dreamland",opt: 1,},});
     if (查看山寨层数.level <= shark.rule.勇闯山寨指定层数) {
     await shark.reqest({name: "编队",
     url: "{!mc}cgi_pasture_kingdoms",
     data: { act: "moddata",opt:3,},});
     const 补充兵力 = await shark.reqest({name: "更换勇闯山寨队伍并补兵",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modteam",tindex:0,opt:1,team: shark.rule.勇闯山寨队伍,},});
     await shark.reqest({name: "使用为主队",
     url: "{!mc}cgi_pasture_kingdoms",
     data: { act: "modteam", tindex:0, opt:3,},});
     if (补充兵力.ecode != 0) {shark.logger.log("兵力不足,退出任务")
                    break
                }
     const 挑战山寨 = await shark.reqest({
     name: "挑战山寨第" + 查看山寨层数.level + "层",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "dreamland",opt: 2,},});
     if (挑战山寨.result != 1) {
     shark.logger.log("挑战失败,退出任务")
                    break
     }}
     } while (查看山寨层数.level <= shark.rule.勇闯山寨指定层数)

     if ((查看任务状态.limit & (0x0001 << 6)) == 0) {
     await shark.reqest({name: "领取每日奖励7",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modtask",opt: 2,taskid: 7,},});}

    if (查看任务状态.flimit == 0) {
    await shark.reqest({name: "领取每日奖励1",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 1,},});
    await shark.reqest({name: "领取每日奖励总",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 0,},});}

    for(let zhp of shark.rule.za_huo_pu){
    const 杂货铺=await shark.reqest({
    name: "杂货铺粮票购买物品ID:"+zhp,
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 1,
    opt: 2,num: 1,index: zhp, },  });
    if(杂货铺.ecode==0){shark.logger.log(杂货铺.s)}
    if(杂货铺.ecode!=0){shark.logger.log("物品ID:"+zhp+杂货铺.direction)} 
    if(杂货铺.direction=="粮票不足~"){break}  }

    for(let txsr of shark.rule.tan_xian){
    const 探险=await shark.reqest({
    name: "探险商人奇遇币购买物品ID:"+txsr,
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 2,
    opt: 2,num: 1,index:txsr, },  });
    if(探险.ecode==0){shark.logger.log(探险.s)}
    if(探险.ecode!=0){shark.logger.log("物品ID:"+txsr+探险.direction)} 
    if(探险.direction=="货币不足~"){break}  }

    const 查看背包 = await shark.reqest({
    name: "查看背包",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata", opt: 1, }, });
    for(let bei_bao of shark.rule.kai_bei_bao){
    for (const list8 of 查看背包.rep) {
    if(list8.id==bei_bao && list8.num!=0){
    const 使用物品 = await shark.reqest({name: "使用物品ID:"+bei_bao,
    url: "{!mc}cgi_pasture_kingdoms",   
    data: { act: "modfunc", id: bei_bao, 
    opt: 1, num: list8.num, }, });
    shark.logger.log(使用物品.s);  } } }

       const 首领挑战 = await shark.reqest({ name: "首领挑战",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 1, }, });
       if (首领挑战.used>= 3) {
       shark.logger.log("首领挑战次数已达上限,退出任务")}
       else if (首领挑战.used< 3){
       for (let i = 1; i < 4; i++) {
       await shark.reqest({name: "编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "moddata",opt:3,},});
       let 补充兵力;
   if (shark.isActivityInPogress("pasture","ShuangBeiKuangHuanActivity")){
//首领挑战3次，用主力
        补充兵力 = await shark.reqest({
       name: "更换双倍奖励首领挑战使用编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "modteam", tindex: 0, opt: 1,
       team:shark.rule.双倍首领挑战队伍,},});
       await shark.reqest({name: "双倍使用编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "modteam", tindex:0, opt:3,},}); } 
       else{
//首领挑战3次，推荐无损耗
        补充兵力 = await shark.reqest({
       name: "更换平时首领挑战使用编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act:"modteam",tindex:0,opt: 1,
       team:shark.rule.首领挑战队伍, }, });
       await shark.reqest({name: "平时使用编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "modteam", tindex:0, opt:3,},}); }  
       const 挑战首领 = await shark.reqest({ name: "挑战首领",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 2, }, });
       if (挑战首领.ecode != 0) {
       shark.logger.log("首领挑战次数已达上限,退出任务")
       break  }   }   }   
       await shark.reqest({name: "领取挑战首领奖励,今日伤害"+首领挑战.d,
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 3, }, });

   if (shark.rule.演武==1){
    const 英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    var dui_wu=[];var jcdw=0;var jcdw2=0;
    for(let liop of shark.rule.ying_xiong){jcdw++;
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop.split(",")[0]){dui_wu+=liop; jcdw2++; }
    }if(jcdw!=jcdw2){dui_wu+="0,1,0";jcdw2=jcdw}
    if(jcdw==9){break}
    if(jcdw%3 ==0){dui_wu+=";"}else{dui_wu+="|"} } 
    for( ; jcdw<9 ; ){ dui_wu+="0,1,0";
    if(jcdw==8){break}
    if(jcdw%3 ==2){dui_wu+=";"}else{dui_wu+="|"} jcdw++}
    shark.logger.log("演武上阵队伍"+dui_wu)
  let 自家总战力;let 刷新次数;let PK次数;let 演武积分;
  await shark.reqest({name:"查看演武",
  url: "{!mc}cgi_pasture_kingdoms_arena",
  data: {act:"index",},});
  await shark.reqest({name:"调整阵容",
  url: "{!mc}cgi_pasture_kingdoms",
  data: {act:"moddata",opt:1,pays:0,},});
  await shark.reqest({name:"使用系统兵力",
  url: "{!mc}cgi_pasture_kingdoms_arena",
  data: {act: "opt", sys:0, opt:4,pays:0,},});
  await shark.reqest({name:"保存阵容",
  url: "{!mc}cgi_pasture_kingdoms_arena",
  data: {act:"opt",opt:1,pays:0,sys:0,type:0,param:dui_wu},});
  const 自家战力=await shark.reqest({ name: "查看战力",
  url: "{!mc}cgi_pasture_kingdoms_arena",
  data: {act:"opt",sys:1,opt:3,type:0},});
  自家总战力 = 自家战力.ateam[0].groupability+自家战力.ateam[1].groupability+自家战力.ateam[2].groupability;
  do {
   const 查看演武 =await shark.reqest({ name: "查看演武",
   url: "{!mc}cgi_pasture_kingdoms_arena",
   data: {act: "index", }, });
    PK次数 = 查看演武.pktimes;
    刷新次数 = 查看演武.refreshtimes;
    演武积分 = 查看演武.score;
   for (const list of 查看演武.match) {
   if (PK次数== 0) {shark.logger.log("挑战次数为0,退出")
        break
     } else if (list.pkts == 0 && PK次数 > 0 && 刷新次数 >4 ){
   if (list.pkts == 0 && list.totalability < 自家总战力/100*75) {
    await shark.reqest({name: "挑战",
    url: "{!mc}cgi_pasture_kingdoms_arena",
    data: {act: "pk",fuin: list.id,},});PK次数--  }
     } else if (list.pkts == 0 && PK次数 > 0 && 刷新次数 <=4 ){
   await shark.reqest({ name: "挑战",
   url: "{!mc}cgi_pasture_kingdoms_arena",
   data: {act: "pk",fuin:list.id,},}); PK次数--
   if (PK次数== 0 && 刷新次数== 0 ) {shark.logger.log("无法挑战,退出")
        break  }
       } }
    if (刷新次数 > 0 && PK次数 > 0) {
     await shark.reqest({ name: "刷新",
     url: "{!mc}cgi_pasture_kingdoms_arena",
     data: {act: "match",opt:1, },}); }
    } while (刷新次数 > 0 && PK次数 > 0)
  for(let i=1;i<3;i++){
  await shark.reqest({ name: "赛季结算奖励"+i,
  url: "{!mc}cgi_pasture_kingdoms_arena",
  data: {act: "reward",opt:i, },});   } 
  shark.logger.log("刷新次数" + 刷新次数 + "PK次数" + PK次数 + "演武积分" + 演武积分 + "演武结束")   }  

    if (shark.rule.使用英雄贴==1){ 
    await shark.reqest({ name: "使用英雄帖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "draw", type: 1, pool: 1,},});}

    if (shark.rule.学府学习==1){ 
    let g;
    const 学府学习=await shark.reqest({ name: "打开学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modschool",opt:1,}, });
    for(let i=1;i<4;i++){
    await shark.delay(1);
    g="初级农业";if(i==2){g="初级饲养"}else if(i==3){g="探索"};
    await shark.reqest({ name: g+"学习",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modcourse",opt:2,type:2,course:i,},}); }
    for(let i=7;i<9;i++){
    await shark.delay(1);
    g="初级训练";if(i==8){g="初级兵营"};
    await shark.reqest({ name: g+"学习",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modcourse",opt:2,type:2,course:i,},}); }
    await shark.reqest({ name: "战斗学习",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modcourse", opt:2,type:1, },  }); 
//     使用加速卡，accid:54-1小时，accid:55-5分钟
//     await shark.reqest({ name: "使用加速卡",
//     url: "{!mc}cgi_pasture_kingdoms",
//     data: { act: "modcourse",accnum:1,opt:4,type:1,accid:55,},});
      }

//查看活动
    if (shark.isActivityInPogress("pasture","OldFarmLiBaoTeMaiActivity")){
    await shark.reqest({name: "老农礼包特卖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2index", }, });
    await shark.reqest({name: "购买免费礼包1",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2draw",}, });   }
    if (shark.isActivityInPogress("pasture","ShuangBeiKuangHuanActivity")){
    await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a5index", }, });
    for (let k = 1; k < 8; k++){
    await shark.reqest({
    name: "领双倍狂欢日奖"+k,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5draw",id: k,},});}
    await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5index",},  });
    for (let h = 1; h < 5; h++){
    await shark.reqest({name: "领双倍狂欢每日任务"+ h,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5task",id: h,},});}   }
    if (shark.isActivityInPogress("pasture","ManYueQingDianActivity"  )){
    await shark.reqest({name: "丰收好礼",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a4index", }, });
// 周限时商店，顺序id: 1到8，自己对应
//    await shark.reqest({name: "周限时商店换孟获",
//    url: "{!mc}cgi_pasture_kingdoms_activity",
//    data: {  act: "a4buy", id: 4, }, });
    for (let k = 1; k < 8; k++){
    await shark.reqest({name: "领丰收好礼日奖"+k,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a4draw",id: k,},});}
    for (let h = 1; h < 11; h++){
    await shark.reqest({name: "领丰收好礼每日任务"+h,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a4task",id: h,},});}   }
    if (shark.isActivityInPogress("pasture","MengJingQiYuanActivity")){
    await shark.reqest({name: "梦境祈愿",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6index", }, });
    await shark.reqest({name: "祈愿1次",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6qy",type:1,}, });   }

    if (shark.rule.自动升级==1){
    let xx=0;let ad=0;let axd=0;let awe=0;
    do{ awe=0;ad=-9;
    const 老农=await shark.reqest({name:"老农",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    for(let jiasu of 老农.build_list){
    xx=jiasu.et-((Date.parse(new Date()))/1000);
    if(xx>=0 && xx<=5*60){
    if(jiasu.type==7){
    await shark.reqest({name:"学府免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modschool",opt:3,schoolid:jiasu.id,},});}
    if(jiasu.type==4){
    await shark.reqest({name:"田地免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modfield",opt:3,fieldid:jiasu.id,},});}
    if(jiasu.type==3){
    await shark.reqest({name:"饲养场免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modfeed",opt:3,feedid:jiasu.id,},});}
    if(jiasu.type==2){
    await shark.reqest({name:"兵营免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modcamp",opt:3,campid:jiasu.id,},});}
    if(jiasu.type==1){
    await shark.reqest({name:"英雄大厅免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhall",opt:3,hallid:jiasu.id,},});}
    } }
//判断英雄大厅加速时间是=0
    await shark.reqest({name: "英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhall",},});
    await shark.reqest({name: "升级英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhall",opt: 2,},}); 
 //判断英雄大厅等级X10>田地/饲养场等级
    for(let list of 老农.fields){
    if (老农.halllv *10>list.fieldlv) {awe=1;
    await shark.reqest({name: "升级田地"+list.fieldid,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfield",opt: 2,fieldid:list.fieldid,},}); } } 
    for(let list1 of 老农.feeds){
    if (老农.halllv *10>list1.feedlv) {awe=1;
    await shark.reqest({name: "升级饲养场"+list1.feedid,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfeed",opt: 2,feedid:list1.feedid,},}); } }
//学府建筑升级
    if (老农.halllv>老农.schoollv) {
    await shark.reqest({name: "学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modschool",opt: 1,},});
    await shark.reqest({name: "升级学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modschool",opt: 2,},});   }
//判断训练营等级>=5
    let rrr;
    await shark.reqest({name: "训练营",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},});
    for(let i=0;i<2500;i=i+1000){
    if(i==0){rrr="近战"}else if(i==1000){rrr="骑士"}else if(i==2000){rrr="远程"}
    await shark.reqest({name: rrr+"训练营升级",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 2,c_id:i,},}); } 
    for(let jia of 老农.build_list){
    xx=jia.et-((Date.parse(new Date()))/1000);
    if(xx>=0){shark.logger.log("建筑剩余时间"+xx);
    if(xx>=5*60){axd=xx-5*60;
    if(ad !=-9 && axd>ad){axd=ad;};ad=axd;
    }else{axd=0;ad=0;}
    } }
    if(ad>120*60){ad=0;awe=9;shark.logger.log("建筑升级需要等待2小时以上,先退出");}
    shark.logger.log(ad+"秒后可循环");
    await shark.delay(ad);ad=0;
}while(awe==1)   }

    if (week==shark.rule.一键升星){ 
    let aq=0;let aw;
    const 厅=await shark.reqest({name:"英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let yx of 厅.herolist){
    aq=yx.id;
    if(aq==1){aw="许褚"}else if(aq==2){aw="甄姬"}else if(aq==3){aw="士燮"}else if(aq==4){aw="周瑜"}else if(aq==5){aw="马云禄"}else if(aq==6){aw="董旻"}else if(aq==7){aw="魏延"}else if(aq==8){aw="孟获"}else if(aq==9){aw="张辽"}else if(aq==10){aw="夏侯渊"}else if(aq==11){aw="黄盖"}else if(aq==12){aw="华佗"}else if(aq==13){aw="陆逊"}else if(aq==14){aw="赵云"}else if(aq==15){aw="鲁肃"}else if(aq==16){aw="桥瑁"}else if(aq==17){aw="李傕"}else if(aq==18){aw="张济"}else if(aq==19){aw="刘岱"}else if(aq==20){aw="赵娥"}else if(aq==21){aw="陶谦"}else if(aq==22){aw="淳于琼"}else if(aq==23){aw="程远志"}else if(aq==24){aw="裴元绍"}else if(aq==25){aw="马日磾"}else if(aq==26){aw="夏侯惇"}else if(aq==27){aw="祝融"}else if(aq==28){aw="程普"}
    const 星=await shark.reqest({name: aw+"升星",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",opt:3,hid: yx.id,},}); 
    if (星.ecode != 0){shark.logger.log(aw+"碎片不足！")} } }

    if (shark.rule.自动练兵==1){
    let 查看兵营;
    let list2;let list;let ee=1;let ccc;let dd=0;let pp=0;
    do { ee=1; 
    查看兵营 = await shark.reqest({name: "查看训练状态",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for (list of 查看兵营.camp) {
    for (list2 of list.camp) {
    if(list2.id==1){ccc="近战"}else if(list2.id==1001){ccc="骑士"}else if(list2.id==2001){ccc="远程"}
    if (list.cap/100*90>=list2.num){ee=10;
    if (list.trainnum>0){
    if (list.ts < ((Date.parse(new Date())) / 1000) && list.ts != 0) {
    await shark.reqest({name:ccc+"收取士兵" + list.trainnum,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 6,c_id:list.campid,},}) 
    await shark.reqest({name:ccc+"训练士兵"+list.trainmax,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:list.trainmax,},})
            await shark.delay(1);   }  }
    if (list.trainnum==0){
    await shark.reqest({name:ccc+"训练士兵"+list.trainmax,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:list.trainmax,},});}
            await shark.delay(1); 
    pp=list.ts-((Date.parse(new Date()))/1000)+3;
    if (pp>0){shark.logger.log(pp+"秒后收取"+ccc+"士兵");
    if (0<dd && dd<pp){pp=dd};dd=pp;}
    if (pp<=0){shark.logger.log(ccc+"士兵已训练完成")}
     } else {shark.logger.log(ccc+"士兵拥有数量"+list2.num+"，不再训练");}
     }  } shark.logger.log(dd+"秒后可循环");
    await shark.delay(dd);dd=0;
  } while (ee==10)  }

    const 老农=await shark.reqest({name:"老农",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    shark.logger.log("英雄大厅等级"+老农.halllv+",学府等级"+老农.schoollv+"奇遇币"+老农.tk_76 )

    shark.logger.log("老农每日任务完成")
    shark.logger.log("农场牧场加玩法攻略交流群739068080")
}
