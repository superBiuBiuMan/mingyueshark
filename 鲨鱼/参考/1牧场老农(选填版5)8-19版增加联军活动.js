// 定义插件名字 
pluginName = "老农梦境";
// 定义作者名称
pluginAuthor = "三-1779358926";
// 定义描述
pluginDescription = "日常模块里面-三个首领类型只能选一个,为了插件正常运行,兵营的兵要充足,勇闯山寨选层数建议量力而行,除了演武选九个,其他队伍都只能上三个,(所有少填)与(没有对应的)皆会补空位(加玩法攻略交流群739068080)";
// 插件版本
pluginVersion = "8-19";

pluginInputs = [
     {
        key: "re_chang",
        title: "日常模块",
        placeholder: "选你要开启的模块",
        type: "muti-select",
        selects: [
        {name: "奇遇🎲",value: 1,},
        {name: "勇闯山寨",value: 2,},
        {name: "英雄升级一次(使用一个鸡蛋)",value: 3,},
        {name: "全部时间-单兵无伤首领([首领三选一])",value: 4,},
        {name: "全部时间-全力打首领([首领三选一])",   value: 5,},
        {name: "平时无伤,双倍全力首领([首领三选一])",value: 6,},
        {name: "系统兵演武",value: 7,},
        {name: "使用英雄帖,加载一次使用一次",value: 8,},
        {name: "循环练兵至对应兵营90%",value: 9,},
        {name: "英雄大厅升级",value: 10,},
        {name: "田地升级",value: 11,},
        {name: "饲养场升级",value: 12,},
        {name: "学府升级",value: 13,},
        {name: "学府[辅助]学习",value: 14,},
        {name: "学府[战斗]学习",value: 15,},
        {name: "清空编队2,3,4",value: 16,},
        {name: "周四设置14点后工作",value: 17,},
              ]
    },{
        key: "勇闯山寨指定层数",
        title: "勇闯山寨想打最高层数",
        placeholder: "想打最高层数:如填10",
    },{
        key: "sheng_ji",
        title: "英雄十连升级",
        placeholder: "选几个要升级的英雄",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((a) => {
      let zy = a.type == 0 ? "近" : a.type == 1000 ? "骑" : "远"; //职业
      let pz = a.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${a.id}${a.name}[${zy}][${pz}]`,
        value: a.id, };  }),
    },{
        key: "一键升星",
        title: "英雄升星,0-6代表星期几",
        placeholder: "填0-6开启,只填一个数字开启",
    },{
      key: "kai_bei_bao",
      title: "背包使用物品",
      placeholder: "选择一些能开的物品会自动使用完",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "bagJson").elements[0].cdata,
    ).map((b) => {   
      return { 
        name:  `${ b.id}${b.name}[${b.tips}]`,
        value:   b.id, };  }), 
    },{
      key: "za_huo_pu",
      title: "杂货铺",
      placeholder: "插件每运行一次购买一次",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "groceryStoreJSON").elements[0].cdata,
    ).map((c) => {
      let gcm = c.limit_week !=0 ? "周限制购买次数:"+c.limit_week : "每日限制购买次数:"+c.limit_day; 
      return {
        name: `${c.ID}${c.name}[${c.ptype+":"+c.pcount+"  "+gcm}]`,
        value: c.ID, };  }),
    },{
      key: "tan_xian",
      title: "探险商人",
      placeholder: "插件每运行一次购买一次,可以不填",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "adventureStoreJSON").elements[0].cdata,
    ).map((d) => {    
      let gm = d.limit_week !=0 ? "周限制购买次数:"+d.limit_week : "每日限制购买次数:"+d.limit_day; 
      return {
        name: `${d.ID}${d.name}[${d.ptype+":"+d.pcount+"  "+gm}]`,
        value: d.ID, };  }),
    },{
      key: "tan_xian2",
      title: "探险商人(周全买,日重载一次买10次)",
      placeholder: "选的周有足够的奇遇币会买完",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "adventureStoreJSON").elements[0].cdata,
    ).map((wd) => {
      let z_m = wd.limit_week !=0 ? "周限制购买次数:"+wd.limit_week : "每日限制购买次数:"+wd.limit_day+", 重载一次买10次"; 
      let cishu = wd.limit_week !=0 ? wd.limit_week : 10 ;
      return {
        name: `${wd.ID}${wd.name}[${wd.ptype+":"+wd.pcount+"  "+z_m}]`,
        value: `${wd.ID+","+cishu}`, };  }),
    },{
      key: "qi_yu",
      title: "奇遇🎲队伍",
      placeholder: "选三个最强,空会补位",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((aa) => {
      let ay = aa.type == 0 ? "近" : aa.type == 1000 ? "骑" : "远"; //职业
      let az = aa.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${aa.id}${aa.name}[${ay}][${az}]`,
        value: `${aa.id}${","}${aa.type+1}${","}`,};}),
    },{
      key: "yong_chuang",
      title: "勇闯山寨队伍",
      placeholder: "选三个最强,空会补位",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((ab) => {
      let by = ab.type == 0 ? "近" : ab.type == 1000 ? "骑" : "远"; //职业
      let bz = ab.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${ab.id}${ab.name}[${by}][${bz}]`,
        value: `${ab.id}${","}${ab.type+1}${","}`,};}),
    },{
      key: "shouling_1",
      title: "周一周四首领队伍",
      placeholder: "近战首领,推荐远程",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((bb) => {
      let cy = bb.type == 0 ? "近" : bb.type == 1000 ? "骑" : "远"; //职业
      let cz = bb.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${bb.id}${bb.name}[${cy}][${cz}]`,
        value: `${bb.id}${","}${bb.type+1}${","}`,};}),
    },{
      key: "shouling_2",
      title: "周二周五首领队伍",
      placeholder: "骑士首领,推荐近战",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((bc) => {
      let dy = bc.type == 0 ? "近" : bc.type == 1000 ? "骑" : "远"; //职业
      let dz = bc.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${bc.id}${bc.name}[${dy}][${dz}]`,
        value: `${bc.id}${","}${bc.type+1}${","}`,};}),
    },{
      key: "shouling_3",
      title: "周三周六首领队伍",
      placeholder: "远程首领,推荐骑士",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((bd) => {
      let ey = bd.type == 0 ? "近" : bd.type == 1000 ? "骑" : "远"; //职业
      let ez = bd.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${bd.id}${bd.name}[${ey}][${ez}]`,
        value: `${bd.id}${","}${bd.type+1}${","}`,};}),
    },{
      key: "shouling_4",
      title: "周日混合首领队伍",
      placeholder: "打远骑近,推荐骑近远",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((be) => {
      let fy = be.type == 0 ? "近" : be.type == 1000 ? "骑" : "远"; //职业
      let fz = be.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${be.id}${be.name}[${fy}][${fz}]`,
        value: `${be.id}${","}${be.type+1}${","}`,};}),
    },{
      key: "yan_wu",
      title: "演武上阵队伍",
      placeholder: "选九个,空会补位",
      type: "muti-select",
      selects:   JSON.parse(
      shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
    ).map((gg) => {
      let gy = gg.type == 0 ? "近" : gg.type == 1000 ? "骑" : "远"; //职业
      let gz = gg.rarity == 1 ? "紫" : "橙"; //品质
      return {
        name: `${gg.id}${gg.name}[${gy}][${gz}]`,
        value: `${gg.id}${","}${gg.type+1+",40000"}`, };  }),
    }  ]

onPluginStart = async function () {
//5秒后运行
//    await shark.delay(5);
// 记录上一次获取到数据的时间
let lastGetDataTime = 0;
// 记录上一次获取到的数据
let M = null;
let T = null;
let B = null;
    var dui_wu=[];var jcdw=0;var jcdw2=0;var bing_liang=0;
    var 英雄大厅;var 兵营; var 查看山寨层数;var 老农;
    var week=new Date().getDay();
    var hours=new Date().getHours();
    var wu_jiasu=0;var sb_leixing=0;var tiaochu_xh=-19;
    var fz_xue_xi;var deng_time=0;var xh_time=0;var lei_ji=0;
    var kong_he=[];var y=0; 

onPanelShow = async function (refresh) {
  if (Date.now() - lastGetDataTime > 3 * 60 * 1000) {
    老农=await shark.reqest({name:"获取老农梦境信息",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    兵营= await shark.reqest({name: "获取兵营",
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
    { 1: "田地1",    2:M.fields[0].fieldlv+"级" },
    { 1: "田地2",    2:M.fields[1].fieldlv+"级" },
    { 1: "饲养场1",  2:M.feeds[0].feedlv+"级"  },
    { 1: "饲养场2",  2:M.feeds[1].feedlv+"级"  },
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
   if(list.id==1){y="许褚1001"}else if(list.id==2){y="甄姬1001"}else if(list.id==3){y="士燮2001"}else if(list.id==4){y="周瑜2001"}else if(list.id==5){y="马云禄1"}else if(list.id==6){y="董旻2001"}else if(list.id==7){y="魏延1"}else if(list.id==8){y="孟获1001"}else if(list.id==9){y="张辽1001"}else if(list.id==10){y="夏侯渊2001"}else if(list.id==11){y="黄盖1"}else if(list.id==12){y="华佗1"}else if(list.id==13){y="陆逊2001"}else if(list.id==14){y="赵云1"}else if(list.id==15){y="鲁肃2001"}else if(list.id==16){y="桥瑁1001"}else if(list.id==17){y="李傕1001"}else if(list.id==18){y="张济1001"}else if(list.id==19){y="刘岱2001"}else if(list.id==20){y="赵娥2001"}else if(list.id==21){y="陶谦1"}else if(list.id==22){y="淳于琼1"}else if(list.id==23){y="程远志1"}else if(list.id==24){y="裴元绍1001"}else if(list.id==25){y="马日磾2001"}else if(list.id==26){y="夏侯惇1001"}else if(list.id==27){y="祝融1001"}else if(list.id==28){y="程普1"}
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

// 解析例子
//    var zhu1;var kon1=[];
//    zhu1=JSON.parse(
//    shark.getConfigElements("config_mc_ini_info", "main", "herotosoldierJSON").elements[0].cdata,
//    ).map((bcd) => {
//      kon1+=bcd.name+","+bcd.id+";";
//     }) ;
//      shark.logger.log(kon1); 


//查看活动
    await shark.reqest({name: "老农礼包特卖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2index", }, });
    await shark.reqest({name: "满月庆典丰收好礼",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a4index", }, });  
    await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a5index", }, }); 
    await shark.reqest({name: "梦境祈愿",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6index", }, });  
    await shark.reqest({name: "英雄培养",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a7index", }, });  
    await shark.reqest({name: "折扣商店+老农粮票消费返利",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a8index", }, });  

//  联军挑战奖励领取
    const ljtz=await shark.reqest({name: "查看联军挑战",
    url: "{!mc}cgi_pasture_kingdoms_activity?act=a13index",
    data: {},});
    if(ljtz.ecode==0){
    var ko=[]; var deng_lu
    ko=[{kong1:1,  kong2:"领取累计登陆奖励"},
           {kong1:7,  kong2:"领取累计首领挑战奖励"},
           {kong1:13,kong2:"领取累计田地奖励"},
           {kong1:19,kong2:"领取累计饲养场奖励"},
           {kong1:25,kong2:"领取累计士兵奖励"},
           {kong1:31,kong2:"领取累计训练加速奖励"},
           {kong1:37,kong2:"领取累计首领伤害奖励"},
           {kong1:43,kong2:"领取家族累计首领伤害奖励"},
           {kong1:49,kong2:"领取家族累计首领次数奖励"}, 
           {kong1:55,kong2:"领取家族累计收兵奖励"}, 
          ];
    for(let cc of ko){
    for(let ff=cc.kong1;ff<=cc.kong1+5;ff++){
    deng_lu=await shark.reqest({name: cc.kong2+`${(ff-1)%6}`,
    url: "{!mc}cgi_pasture_kingdoms_activity?act=a13drawtask",
    data: {id: ff},});
    if(deng_lu.ecode==0){shark.logger.log("获得"+deng_lu.s)}
    else{shark.logger.log(deng_lu.direction)
    if(deng_lu.direction=="条件不满足~"){break}  }
    await shark.delay(1);    }  }
//个人积分奖励
    for(let cishu=1;cishu<=4;cishu++){
    const ji_fen=await shark.reqest({name: `领取个人积分奖励${cishu}`,
    url: "{!mc}cgi_pasture_kingdoms_activity?act=a13drawcum",
    data: {id: cishu},});
    if(ji_fen.ecode==0){shark.logger.log("获得"+ji_fen.s)}
    else{shark.logger.log(ji_fen.direction)
    if(ji_fen.direction=="条件不满足~"){break}   }
    await shark.delay(1);    }       }
//


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
    if(装备锻造.total==100){ 
    await shark.reqest({name: "打开装备箱",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {act:"a10draw",opt: 2}, });  }

//周四游戏更新，设置14点后工作
    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==17){
    if (hours<14 && week==4){shark.logger.log("周四活动更新,14点后才工作")
   return } } }

//清空编队2--4
       for(let mo_kuai of shark.rule.re_chang){
       if(mo_kuai==16){
       for(let qkon=1;qkon<4;qkon++){
       await shark.reqest({
       name: `清空编队${qkon + 1}`,
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act:"modteam",tindex:qkon,
       opt: 1,team:"0,1,0|0,1,0|0,1,0"},}); } } }
 //   return

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

    if ((查看任务状态.limit & (0x0001 << 1)) == 0) {y=0;
    兵营 = await shark.reqest({name: "查看训练状态",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for (let list of 兵营.camp) {
    for (let list2 of list.camp) {
    if(list2.id==1){sb_leixing="近战"}else if(list2.id==1001){sb_leixing="骑士"}else if(list2.id==2001){sb_leixing="远程"}
    if (list.cap<=list2.num +list.trainnum+167){
    y=list2.num +list.trainnum-list.cap+167;
    if(y>=3000){y=3000}
    await shark.reqest({name:sb_leixing+"舍弃士兵"+y,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt:9,c_id:list.campid,
    s_id:list2.id,s_num:y,},});   }
    if (list.trainnum == 0){
    await shark.reqest({name:sb_leixing+"训练士兵167",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:167,},});
            await shark.delay(1);   } 
    if (list.trainnum>0){
    if (list.ts < ((Date.parse(new Date())) / 1000) && list.ts != 0) {
    await shark.reqest({name:sb_leixing+"收取士兵" + list.trainnum,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 6,c_id:list.campid,},})
    await shark.reqest({name:sb_leixing+"训练士兵167",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:167,},})
            await shark.delay(1);  } }
    }  }  
    await shark.reqest({name: "领取每日奖励1",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 1,},})
    await shark.reqest({name: "领取每日奖励2",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 2,},});}

    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==1){
    const 奇遇=await shark.reqest({name:"奇遇",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "enter",}});
    if(奇遇.ldices!=0){
    dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let liop of shark.rule.qi_yu){jcdw++;
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop.split(",")[0]){dui_wu+=liop;jcdw2++;
    兵营=await shark.reqest({name:"查看兵量",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for(let lei_xing of 兵营.camp){
    if(lei_xing.camp["0"].id==liop.split(",")[1]){
    bing_liang=Math.floor(lei_xing.camp["0"].num/100*70);//兵数量
    dui_wu+=bing_liang; } } } }
    if(jcdw!=jcdw2){dui_wu+="0,1,0";jcdw2=jcdw}
    if(jcdw==3){break}else{dui_wu+="|"}  }
    for( ; jcdw<3 ; ){ dui_wu+="0,1,0";
    if(jcdw==2){break}else{dui_wu+="|"} jcdw++}
    await shark.reqest({name: "编队",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "moddata",opt:3,},});
    const 补充兵力 = await shark.reqest({name:"使用奇遇队伍并补兵"+dui_wu,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modteam",tindex:0,opt:1,team:dui_wu,},});
    await shark.reqest({name: "使用为主队",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act:"modteam", tindex:0, opt:3,},});
    if (补充兵力.ecode != 0){shark.logger.log("兵力不足,退出任务")
            return}
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
//    if (前进返回.ecode == -102) { }
    } while (前进返回.ecode != -102)   }
    for (let i = 1; i < 5; i++) {
    const 奇遇礼包=await shark.reqest({name: "领取奇遇礼包" + i,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "gift",g_index: i,},});
    if(奇遇礼包.ecode==0){shark.logger.log("获得"+奇遇礼包.s) } }
    shark.logger.log("奇遇已完成")  } }
    if ((查看任务状态.limit & (0x0001 << 2)) == 0) {
    await shark.reqest({name: "领取每日奖励3",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 3,},});}

//使用英雄帖一次
    const 召唤=await shark.reqest({ name: "查看召唤",
    url: "{!mc}cgi_pasture_kingdoms_activity?act=index",
    data: {}, });
    if(召唤.ecode==0){   if(召唤.l_1==0){
    const 英雄帖=await shark.reqest({ name: "使用英雄帖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "draw", type: 1, pool: 1, }, });
    if(英雄帖.ecode==0){shark.logger.log("获得"+英雄帖.s) } } }


     for(let mo_kuai of shark.rule.re_chang){
     if(mo_kuai==3){
    if ((查看任务状态.limit & (0x0001 << 3)) == 0) {
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let oppo of 英雄大厅.herolist){
    const 鸡蛋=await shark.reqest({name: oppo.id+"使用一个鸡蛋",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhero",up_type: 1,opt: 2,
    hid:oppo.id,},});
    if(鸡蛋.ecode==0){break}
    if(鸡蛋.ecode!=0){shark.logger.log(鸡蛋.direction)} 
    if(鸡蛋.direction=="资源不足~"){break}   }
    await shark.reqest({name: "领取每日奖励4",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modtask",opt: 2,taskid: 4,},}) }  } }

     if ((查看任务状态.limit & (0x0001 << 4)) == 0) {
     await shark.reqest({name: "领取每日奖励5",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modtask",opt: 2,taskid: 5,},});}
     if ((查看任务状态.limit & (0x0001 << 5)) == 0) {
     await shark.reqest({name: "领取每日奖励6",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modtask",opt: 2,taskid: 6,},});}

//  数据归零
    if(typeof shark.rule.勇闯山寨指定层数 !="undefined" && Number(shark.rule.勇闯山寨指定层数)!=0){
     dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;
     for(let mo_kuai of shark.rule.re_chang){
     if(mo_kuai==2){
     do {
     查看山寨层数 = await shark.reqest({name: "查看山寨层数",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "dreamland",opt: 1,},});
     shark.logger.log("勇闯山寨层数:"+查看山寨层数.level)
     if (查看山寨层数.level <= shark.rule.勇闯山寨指定层数) {
    dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let liop of shark.rule.yong_chuang){jcdw++;
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop.split(",")[0]){dui_wu+=liop;jcdw2++;
    兵营=await shark.reqest({name:"查看兵量",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for(let lei_xing of 兵营.camp){
    if(lei_xing.camp["0"].id==liop.split(",")[1]){
    bing_liang=Math.floor(lei_xing.camp["0"].num/100*70);
    dui_wu+=bing_liang; } } } }
    if(jcdw!=jcdw2){dui_wu+="0,1,0";jcdw2=jcdw}
    if(jcdw==3){break}else{dui_wu+="|"}  }
    for( ; jcdw<3 ; ){ dui_wu+="0,1,0";
    if(jcdw==2){break}else{dui_wu+="|"} jcdw++}
     await shark.reqest({name: "编队",
     url: "{!mc}cgi_pasture_kingdoms",
     data: { act: "moddata",opt:3,},});
     const 补充兵力 = await shark.reqest({
     name: "更换勇闯山寨队伍并补兵"+dui_wu,
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "modteam",tindex:0,opt:1,team:dui_wu ,},});
     await shark.reqest({name: "使用为主队",
     url: "{!mc}cgi_pasture_kingdoms",
     data: { act: "modteam", tindex:0, opt:3,},});
     if (补充兵力.ecode != 0) {shark.logger.log("兵力不足,退出任务")
                    break; }
     const 挑战山寨 = await shark.reqest({
     name: "挑战山寨第" + 查看山寨层数.level + "层",
     url: "{!mc}cgi_pasture_kingdoms",
     data: {act: "dreamland",opt: 2,},});
    if(挑战山寨.ecode==0){shark.logger.log("获得"+挑战山寨.s) } 
     if (挑战山寨.result != 1) {
     shark.logger.log("挑战失败,退出任务")
                    break; }}
     } while (查看山寨层数.level <= shark.rule.勇闯山寨指定层数)   } } }

//  数据归零
    week=new Date().getDay();hours=new Date().getHours();
    dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;kong_he=[];
    if(hours>=6){
    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==4 || mo_kuai==5 || mo_kuai==6 ){kong_he=[];
    if(week==1 || week==4){kong_he=shark.rule.shouling_1}
    if(week==2 || week==5){kong_he=shark.rule.shouling_2}
    if(week==3 || week==6){kong_he=shark.rule.shouling_3}
    if(week==0){kong_he=shark.rule.shouling_4}
       const 首领挑战= await shark.reqest({ name: "首领挑战",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 1, }, });
       if (首领挑战.used>= 3) {
       shark.logger.log("首领挑战次数已达上限,退出任务")}
       else if (首领挑战.used< 3){
       for (let i = 1; i < 4; i++) {
    dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let liop of kong_he){jcdw++;
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop.split(",")[0]){dui_wu+=liop;jcdw2++;
    兵营=await shark.reqest({name:"查看兵量",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for(let lei_xing of 兵营.camp){
    if(lei_xing.camp["0"].id==liop.split(",")[1]){
    if(mo_kuai==4){bing_liang=1;}
    else if(mo_kuai==5){bing_liang=Math.floor(lei_xing.camp["0"].num/100*70);}
    else if(mo_kuai==6){
    const 双倍狂欢=await shark.reqest({name: "判断是否双倍狂欢时间",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a5index", }, });
    if (双倍狂欢.ecode==0){shark.logger.log("现在是双倍狂欢时间")
    bing_liang=Math.floor(lei_xing.camp["0"].num/100*70);
    }else{bing_liang=1;} }
    dui_wu+=bing_liang; } } } }
    if(jcdw!=jcdw2){dui_wu+="0,1,0";jcdw2=jcdw}
    if(jcdw==3){break}else{dui_wu+="|"}  }
    for( ; jcdw<3 ; ){ dui_wu+="0,1,0";
    if(jcdw==2){break}else{dui_wu+="|"} jcdw++}
       await shark.reqest({name: "编队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "moddata",opt:3,},});
       const 首领队伍=await shark.reqest({
       name: "更换首领挑战队伍"+dui_wu,
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act:"modteam",tindex:0,opt: 1,team:dui_wu,},});
       await shark.reqest({name: "设置为主队",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "modteam", tindex:0, opt:3,},});
       if (首领队伍.ecode != 0) {
       shark.logger.log("兵力不足,退出任务")
       break   }  
       const 挑战首领 = await shark.reqest({ name: "挑战首领",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 2, }, });
       if (挑战首领.ecode != 0) {
       shark.logger.log("首领挑战次数已达上限,退出任务")
       break  }  }  }
       const 查看首领= await shark.reqest({ name: "查看首领",
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 1, }, });
       if(查看首领.l==0 && 查看首领.used==3){
       const 领取首领奖励=await shark.reqest({
       name: "领取挑战首领奖励,今日伤害"+查看首领.d,
       url: "{!mc}cgi_pasture_kingdoms",
       data: { act: "weekboss", opt: 3, }, });
       if(领取首领奖励.ecode==0){shark.logger.log("获得"+领取首领奖励.items) } }
        }  } }else{shark.logger.log("未到6点，首领挑战不开启")}

//  数据归零
    dui_wu=[];jcdw=0;jcdw2=0;bing_liang=0;
    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==7){
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    var dui_wu=[];var jcdw=0;var jcdw2=0;
    for(let liop of shark.rule.yan_wu){jcdw++;
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
    const 挑战1=await shark.reqest({name: "挑战",
    url: "{!mc}cgi_pasture_kingdoms_arena",
    data: {act: "pk",fuin: list.id,},});PK次数--  
    if(挑战1.ecode==0){shark.logger.log("获得"+挑战1.s) } }
     } else if (list.pkts == 0 && PK次数 > 0 && 刷新次数 <=4 ){
   const 挑战2=await shark.reqest({ name: "挑战",
   url: "{!mc}cgi_pasture_kingdoms_arena",
   data: {act: "pk",fuin:list.id,},}); PK次数--
   if(挑战2.ecode==0){shark.logger.log("获得"+挑战2.s) }
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
  shark.logger.log("刷新次数" + 刷新次数 + "PK次数" + PK次数 + "演武积分" + 演武积分 + "演武结束")   }  }

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

    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==8){
    const 英帖=await shark.reqest({ name: "使用英雄帖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "draw", type: 1, pool: 1,},});
    if(英帖.ecode==0){shark.logger.log("获得"+英帖.s) } } }

    if(typeof shark.rule.sheng_ji !="undefined" && Number(shark.rule.sheng_ji)!=0){
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let liop of shark.rule.sheng_ji){
    for(let oppo of 英雄大厅.herolist){
    if(oppo.id==liop){
    const 升级=await shark.reqest({name: liop+"一键升十级",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",up_type:5,opt:2,hid:liop,},}); 
    if(升级.ecode!=0){shark.logger.log(升级.direction)} 
    if(升级.direction=="资源不足~"){break} 
     }  }  }  }

    if(typeof shark.rule.一键升星 !="undefined" && Number(shark.rule.一键升星)>=0){
    if (week==shark.rule.一键升星){ 
    let aq=0;let aw;
    英雄大厅=await shark.reqest({name:"获取英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt:1, },});
    for(let yx of 英雄大厅.herolist){
    aq=yx.id;
    if(aq==1){aw="许褚"}else if(aq==2){aw="甄姬"}else if(aq==3){aw="士燮"}else if(aq==4){aw="周瑜"}else if(aq==5){aw="马云禄"}else if(aq==6){aw="董旻"}else if(aq==7){aw="魏延"}else if(aq==8){aw="孟获"}else if(aq==9){aw="张辽"}else if(aq==10){aw="夏侯渊"}else if(aq==11){aw="黄盖"}else if(aq==12){aw="华佗"}else if(aq==13){aw="陆逊"}else if(aq==14){aw="赵云"}else if(aq==15){aw="鲁肃"}else if(aq==16){aw="桥瑁"}else if(aq==17){aw="李傕"}else if(aq==18){aw="张济"}else if(aq==19){aw="刘岱"}else if(aq==20){aw="赵娥"}else if(aq==21){aw="陶谦"}else if(aq==22){aw="淳于琼"}else if(aq==23){aw="程远志"}else if(aq==24){aw="裴元绍"}else if(aq==25){aw="马日磾"}else if(aq==26){aw="夏侯惇"}else if(aq==27){aw="祝融"}else if(aq==28){aw="程普"}
    const 星=await shark.reqest({name: aw+yx.id+"升星",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhero",opt:3,hid: yx.id,},}); 
    if (星.ecode != 0){shark.logger.log(aw+yx.id+"碎片不足！")} } }  }

    if(typeof shark.rule.kai_bei_bao !="undefined" && Number(shark.rule.kai_bei_bao)!=0){
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
    shark.logger.log(使用物品.s);  } } }  }

    if(typeof shark.rule.za_huo_pu !="undefined" && Number(shark.rule.za_huo_pu)!=0){
    for(let zhp of shark.rule.za_huo_pu){
    const 杂货铺=await shark.reqest({
    name: "杂货铺粮票购买物品ID:"+zhp,
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 1,
    opt: 2,num: 1,index: zhp, },  });
    if(杂货铺.ecode==0){shark.logger.log(杂货铺.s)}
    if(杂货铺.ecode!=0){shark.logger.log("物品ID:"+zhp+杂货铺.direction)} 
    if(杂货铺.direction=="粮票不足~"){break}  }  }

    if(typeof shark.rule.tan_xian !="undefined" && Number(shark.rule.tan_xian)!=0){
    for(let txsr of shark.rule.tan_xian){
    const 探险=await shark.reqest({
    name: "探险商人奇遇币购买物品ID:"+txsr,
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 2,
    opt: 2,num: 1,index:txsr, },  });
    if(探险.ecode==0){shark.logger.log(探险.s)}
    if(探险.ecode!=0){shark.logger.log("物品ID:"+txsr+探险.direction)} 
    if(探险.direction=="货币不足~"){break}  }  }

    if(typeof shark.rule.tan_xian2 !="undefined" && Number(shark.rule.tan_xian2)!=0){
    for(let txsr2 of shark.rule.tan_xian2){
    for(let tx=txsr2.split(",")[1] ; tx>0 ; tx--){
    if(tx>300){tx=0}
    const 探险2=await shark.reqest({
    name: "探险商人奇遇币购买物品ID:"+txsr2.split(",")[0],
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modshop", shopid: 2,
    opt: 2,num: 1,index:txsr2.split(",")[0], },  });
    if(探险2.ecode==0){shark.logger.log(探险2.s)}
    else{shark.logger.log("物品ID:"+txsr2.split(",")[0]+探险2.direction);break}  }  }  }

//查看活动
    const 老农礼包特卖=await shark.reqest({name: "老农礼包特卖",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2index", }, });
    if(老农礼包特卖.ecode==0 && 老农礼包特卖.l_day==0){
    const 购买礼包=await shark.reqest({name: "购买免费礼包1",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a2draw",}, });  
    if(购买礼包.ecode==0){shark.logger.log("获得"+购买礼包.s) } } 
    const 双倍狂欢=await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a5index", }, });
    if (双倍狂欢.ecode==0){
    for (let k = 1; k < 8; k++){
    const 狂日=await shark.reqest({
    name: "领双倍狂欢日奖"+k,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5draw",id: k,},});
    if(狂日.ecode==0){shark.logger.log("获得"+狂日.s) }  }
    await shark.reqest({name: "双倍狂欢",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5index",},  });
    for (let h = 1; h < 5; h++){
    const 狂任=await shark.reqest({name: "领双倍狂欢每日任务"+ h,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a5task",id: h,},}); 
    if(狂任.ecode==0){shark.logger.log("获得"+狂任.s) }  }  }
    const 丰收好礼=await shark.reqest({name: "丰收好礼",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a4index", }, });
    if (丰收好礼.ecode==0){
// 周限时商店，顺序id: 1到8，自己对应
//    await shark.reqest({name: "周限时商店换孟获",
//    url: "{!mc}cgi_pasture_kingdoms_activity",
//    data: {  act: "a4buy", id: 4, }, });
    for (let k = 1; k < 8; k++){
    const 丰日=await shark.reqest({name: "领丰收好礼日奖"+k,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a4draw",id: k,},});
    if(丰日.ecode==0){shark.logger.log("获得"+丰日.s) }  }
    for (let h = 1; h < 11; h++){
    const 丰任=await shark.reqest({name: "领丰收好礼每日任务"+h,
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: { act: "a4task",id: h,},});
    if(丰任.ecode==0){shark.logger.log("获得"+丰任.s) }  }   }
    const 梦境祈愿=await shark.reqest({name: "梦境祈愿",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6index", }, });
    if (梦境祈愿.ecode==0){
    const 祈愿=await shark.reqest({name: "祈愿1次",
    url: "{!mc}cgi_pasture_kingdoms_activity",
    data: {  act: "a6qy",type:1,}, }); 
    if(祈愿.ecode==0){shark.logger.log("获得"+祈愿.s) }  }

    wu_jiasu=0;sb_leixing=0;tiaochu_xh=-19;
    do{ tiaochu_xh=250;deng_time=-9;xh_time=-9;
    for(let mo_kuai of shark.rule.re_chang){
    if(mo_kuai==9 || mo_kuai==10 || mo_kuai==11 || mo_kuai==12 || mo_kuai==13 || mo_kuai==14 || mo_kuai==15){
    老农=await shark.reqest({name:"老农",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
//建筑类型最后5分钟加速卡使用
    for(let jia_su of 老农.build_list){
    wu_jiasu=jia_su.et-((Date.parse(new Date()))/1000);
    if(wu_jiasu>0 && wu_jiasu<=5*60){
    if(jia_su.type==7){
    await shark.reqest({name:"学府免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modschool",opt:3,schoolid:jia_su.id,},});}
    if(jia_su.type==4){
    await shark.reqest({name:"田地免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modfield",opt:3,fieldid:jia_su.id,},});}
    if(jia_su.type==3){
    await shark.reqest({name:"饲养场免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modfeed",opt:3,feedid:jia_su.id,},});}
    if(jia_su.type==2){
    await shark.reqest({name:"兵营免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modcamp",opt:3,campid:jia_su.id,},});}
    if(jia_su.type==1){
    await shark.reqest({name:"英雄大厅免费加速5分钟",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act:"modhall",opt:3,hallid:jia_su.id,},});} } }
    if(mo_kuai==9){
    兵营=await shark.reqest({name: "查看训练状态",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "moddata",opt: 2,},})
    for (let list of 兵营.camp) {
    for (let list2 of list.camp) {
    if(list2.id==1){sb_leixing="近战"}else if(list2.id==1001){sb_leixing="骑士"}else if(list2.id==2001){sb_leixing="远程"}
    if (list.cap/100*90>=list2.num){tiaochu_xh=10;
    if (list.trainnum>0){
    if (list.ts < ((Date.parse(new Date())) / 1000) && list.ts != 0) {
    await shark.reqest({name:sb_leixing+"收取士兵" + list.trainnum,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 6,c_id:list.campid,},}) 
    await shark.reqest({name:sb_leixing+"训练士兵"+list.trainmax,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:list.trainmax,},})
            await shark.delay(1);   }  }
    if (list.trainnum==0){
    await shark.reqest({name:sb_leixing+"训练士兵"+list.trainmax,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modcamp",opt: 5,
    c_id:list.campid,s_id:list2.id,s_num:list.trainmax,},});}
            await shark.delay(1); 
    deng_time=list.ts-((Date.parse(new Date()))/1000)+3;
    if (deng_time>0){shark.logger.log(deng_time+"秒后收取"+sb_leixing+"士兵");
    if (0<xh_time && xh_time<deng_time){deng_time=xh_time};xh_time=deng_time;}
    if (deng_time<=0){shark.logger.log(sb_leixing+"士兵已训练完成")}
     } else {shark.logger.log(sb_leixing+"士兵拥有数量"+list2.num+"，不再训练");}
     }  }  } 
    if(mo_kuai==10){
    await shark.reqest({name: "升级英雄大厅",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modhall",opt: 2,},});  }
    if(mo_kuai==11){
    老农=await shark.reqest({name:"查看田地",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    for(let list of 老农.fields){
    if (老农.halllv *10>list.fieldlv) {tiaochu_xh=10;
    const 升级田地=await shark.reqest({name: "升级田地"+list.fieldid,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfield",opt: 2,fieldid:list.fieldid,},});
    if(升级田地.ecode!=0){shark.logger.log(升级田地.direction);break}  }  }  }
    if(mo_kuai==12){
    老农=await shark.reqest({name:"查看饲养场",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    for(let list1 of 老农.feeds){
    if (老农.halllv *10>list1.feedlv) {tiaochu_xh=10;
    const 升级饲养场=await shark.reqest({name: "升级饲养场"+list1.feedid,
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modfeed",opt: 2,feedid:list1.feedid,},}); 
    if(升级饲养场.ecode!=0){shark.logger.log(升级饲养场.direction);break}  }  }  }
    if(mo_kuai==13){
    老农=await shark.reqest({name:"查看学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    if (老农.halllv>老农.schoollv) {tiaochu_xh=10;
    const 升级学府=await shark.reqest({name: "升级学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "modschool",opt: 2,},});
    if(升级学府.ecode!=0){shark.logger.log(升级学府.direction);}  }  }
    if(mo_kuai==14){
    const 学府学习=await shark.reqest({ name: "打开学府",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modschool",opt:1,}, });
    for(let i=1;i<9;i++){  
    if(i==4){i=7};
    fz_xue_xi="初级农业";if(i==2){fz_xue_xi="初级饲养"}else if(i==3){fz_xue_xi="探索"}else if(i==7){fz_xue_xi="初级训练"}else if(i==8){fz_xue_xi="初级兵营"}
    const 辅助学习=await shark.reqest({ name: fz_xue_xi+"学习",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modcourse",opt:2,type:2,course:i,},});
    if(辅助学习.ecode!=0){shark.logger.log(辅助学习.direction);break}else{tiaochu_xh=10;break;} } }
    if(mo_kuai==15){
    const 战斗学习=await shark.reqest({ name: "战斗学习",
    url: "{!mc}cgi_pasture_kingdoms",
    data: { act: "modcourse", opt:2,type:1, },}); 
    if(战斗学习.ecode!=0){shark.logger.log(战斗学习.direction)}
    else{tiaochu_xh=10;} }     } }
//判断循环 xh_time 
    deng_time=-9;xh_time=-9;
    老农=await shark.reqest({name:"查看等待列表",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    for(let xh_sj1 of 老农.build_list){
    deng_time=xh_sj1.et-((Date.parse(new Date()))/1000);
    if(deng_time>=0){
    if(0<=xh_time && xh_time<=deng_time){deng_time=xh_time}
    xh_time=deng_time;  } } 
    if(xh_time>0){
    if(xh_time>5*60){xh_time-=5*60;}else{xh_time=0} }
    for(let xh_sj2 of 老农.school_list){
    deng_time=xh_sj2.et-((Date.parse(new Date()))/1000);
    if(deng_time>=0){
    if(0<=xh_time && xh_time<=deng_time){deng_time=xh_time}
    xh_time=deng_time;  } } 
    for(let xh_sj3 of 老农.soldier_list){
    deng_time=xh_sj3.et-((Date.parse(new Date()))/1000);
    if(deng_time>=0){
    if(0<=xh_time && xh_time<=deng_time){deng_time=xh_time}
    xh_time=deng_time;  } }
//结束判断
    shark.logger.log(xh_time+"秒后可循环");
    if(xh_time>6*60*60){xh_time=0;tiaochu_xh=99;shark.logger.log("升级需要等待6小时以上,先退出");}
    await shark.delay(xh_time);xh_time=0;
  } while (tiaochu_xh==10)
    老农=await shark.reqest({name:"老农",
    url: "{!mc}cgi_pasture_kingdoms",
    data: {act: "index",},});
    shark.logger.log("英雄大厅等级"+老农.halllv+",学府等级"+老农.schoollv+"奇遇币"+老农.tk_76 )
    shark.logger.log("老农每日任务完成")
}