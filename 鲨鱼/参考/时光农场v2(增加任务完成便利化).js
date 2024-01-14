// 定义插件名字
pluginName = "时光农场";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = "本插件不自动购买非时光种子,确保背包中其他种子数量充足。种植设置解析:比如1=#1,40|2-6=#2,2|7=6002分别表示【土地1优先种植时光种子其次种植牧草】【土地2至土地6优先种植节气种子其次种植白萝卜】【土地7仅种植夜皇后】,其中#1指代时光种子,#2指代节气种子,40/2/6002分别为牧草/白萝卜/夜皇后的种子id,实际设置自行参考举例按格式自由搭配。查看面板可手动施肥。";
// 插件版本
pluginVersion = "20231113";

pluginInputs = [
    {
        key: "task_get",
        title: "自动领取任务奖励",
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
        key: "timeseed_buy",
        title: "自动购买时光种子",
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
        key: "timecrop_sell",
        title: "自动卖出时光果实",
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
        key: "land_new",
        title: "自动开垦土地",
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
        key: "firstland_fer",
        title: "对土地1的牧草自动施肥以完成任务",
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
        key: "seed_plant",
        title: "土地种植设置",
        placeholder: "土地编号=种子id(多个种子用,分隔;多组设置用|分隔)"
    }
]


let tableData =[];
let seeddata ={};
let cropsdata =JSON.parse(shark.getConfigElements("config_data_m", "data", "crops").elements[0].cdata);
for(let item of cropsdata["crops"]){seeddata[item["id"]] =item;}
let level;
let timemoney;
let myseed;
let fertilizer;
let sleep;
let isfertilize;
onPluginStart = async function() {
    myseed ={}
    
    let tasks_id={
        "1": ["购买时光种子",10,240,35],
        "2": ["收获时光作物",10,240,35],
        "3": ["收获普通作物",10,240,35],
        "4": ["种植时光种子",10,240,35],
        "5": ["种植普通种子",10,240,35],
        "6": ["挖地",10,240,35],
        "7": ["使用化肥",3,240,35]
    }

    let myplant =[];
    let jieqi_has =false;
    if(shark.rule.seed_plant){
        if(/^\d+(-\d+)?=#?\d+([,，]#?\d+)*(\|\d+(-\d+)?=#?\d+([,，]#?\d+)*)*$/.test(shark.rule.seed_plant)){
            if(shark.rule.seed_plant.search("#2") >-1){jieqi_has =true;}
            myplant = shark.rule.seed_plant.split("|");
            for(let i =0;i <myplant.length;i++){
                let arr =myplant[i].split("=");
                let brr =arr[1].split(/[ .,;，；]+/);
                for(let j =0;j <brr.length;j++){
                    if(/^\d+$/.test(brr[j]) && !(brr[j] in myseed)){
                        myseed[brr[j]] ={flag: "#0", num: 0, name: (brr[j] in seeddata?seeddata[brr[j]]["name"]:"unKnown")};
                    }
                }
            }
        }else{
            shark.logger.error("输入有误["+shark.rule.seed_plant+"]");
        }
    }

    for(;;){
        sleep = [1800];

        level =0;
        timemoney =0;
        
        isfertilize =false;
        fertilizer ={
            1: {name: "普通化肥1", num: 0},
            2: {name: "高速化肥2.5", num: 0},
            3: {name: "极速化肥5.5", num: 0},
            7: {name: "飞速化肥8", num: 0},
            30: {name: "普通有机化肥1", num: 0},
            31: {name: "高速有机化肥2.5", num: 0},
            32: {name: "极速有机化肥5.5", num: 0},
            33: {name: "飞速有机化肥8", num: 0},
            36: {name: "高速点券化肥2.5", num: 0},
            37: {name: "极速点券化肥5.5", num: 0},
            38: {name: "飞速点券化肥8", num: 0}
        };
        
        let af_done =true;
        let af =[2,3,7,30,31,32,33];
        
        let task =await actpost("获取", "任务信息", "{!nc}cgi_farm_time_space", {act: "querytask"});
        if(("ecode" in task) && task["ecode"] ==0){
            let tl =[];
            for(let item of task["res"]["tasks"]){
                let tk_tip =item["id"] in tasks_id?tasks_id[item["id"]][0]+"["+item["count"]+"/"+tasks_id[item["id"]][1]+"]":"未定义任务["+item["count"]+"/∞]";
                if(item["id"] ==3 || item["id"] ==5 || item["id"] ==7){
                    if(item["status"] <2){af_done=false;}
                }
                tl.push((item["status"]==3?"完":item["status"]==2?"领":"未")+":"+tk_tip);
            }
            shark.logger.log("获取成功\n"+tl.join("\n"));
            if(shark.rule.task_get){
                let tasks =task["res"]["tasks"];
                for(let i =0;i <tasks.length;i++){
                    if(tasks[i]["status"] ==2){
                        let gettask =await actpost("领取", "任务"+(i+1)+"奖励", "{!nc}cgi_farm_time_space", {act: "gettaskaward", taskid: tasks[i]["id"]});
                        if(("ecode" in gettask) && gettask["ecode"] ==0){
                            let pkg =[];
                            for(let item of gettask["pkg"]){
                                pkg.push(item["name"]+"x"+item["num"]);
                            }
                            shark.logger.log("领取成功["+pkg.join(" ")+"]");
                        }else{
                            if("direction" in gettask){
                                shark.logger.error("领取失败["+gettask.direction+"]");
                            }else{shark.logger.error("领取失败");}
                        }
                    }
                }
            }
        }else{
            if("direction" in task){
                shark.logger.error("获取失败["+task.direction+"]");
            }else{shark.logger.error("获取失败");}
            break;
        }


        if(shark.rule.land_new){
            let newland =await actpost("开垦", "新土地", "{!nc}cgi_farm_time_space", {act: "newland"});
            if(("ecode" in newland) && newland["ecode"] ==0){
                shark.logger.log("开垦成功");
            }else{
                if("direction" in newland){
                    shark.logger.error("开垦失败["+newland.direction+"]");
                }else{shark.logger.error("开垦失败");}
            }
        }


        let timefarm =await gettimefarm();

        if(jieqi_has){
            let solar =await actpost("获取", "节气种子信息", "{!nc}cgi_farm_seedhb", {act: 9});
            if(("ecode" in solar) && solar["ecode"] ==0){
                for(let item of solar["seedList"]){
                    if(!(item["id"] in myseed)){
                        myseed[item["id"]] ={flag: "#2", num: 0, name: (item["id"] in seeddata?seeddata[item["id"]]["name"]:"unKnown")};
                    }
                }
                shark.logger.log("获取成功");
            }else{
                if("direction" in solar){
                    shark.logger.error("获取失败["+solar.direction+"]");
                }else{shark.logger.error("获取失败");}
            }
        }
        
        let timeseed ={};
        let shop =await actpost("获取", "时光商店信息", "{!nc}query", {act: 2280001, shopid: 1});
        if(("ecode" in shop) && shop["ecode"] ==0){
            let s =[];
            for(let item of shop["shop"]){
                if(!(item["itemid"] in myseed)){
                    myseed[item["itemid"]] ={flag: "#1", num: 0, name: (item["itemid"] in seeddata?seeddata[item["itemid"]]["name"]:"unKnown")};
                }
                timeseed[item["itemid"]] =item;
                s.push(item["name"]+item["curnum"]+"/"+item["limitmax"])
            }
            shark.logger.log("获取成功["+s.join(" ")+"]");
            if(shark.rule.timeseed_buy){
                for(let item of shop["shop"]){
                    if(timemoney <=0){break;}
                    for(let i =item["curnum"];i <item["limitmax"];i++){
                        if(timemoney <item["costnum"]){break;}
                        let buyseed =await actpost("购买", "-"+item["name"]+"["+item["costnum"]+"]", "{!nc}exchange", {act: 2280002, shopid: 1, buycount: 1, buyid: item["id"]});
                        if(("ecode" in buyseed) && buyseed["ecode"] ==0){
                            timemoney -=item["costnum"];
                            shark.logger.log("购买成功["+(i+1)+"/"+item["limitmax"]+","+timemoney+"]");
                        }else{
                            if("direction" in buyseed){
                                shark.logger.error("购买失败["+buyseed.direction+"]");
                            }else{shark.logger.error("购买失败");}
                            break;
                        }
                    }
                }
            }
        }else{
            if("direction" in shop){
                shark.logger.error("获取失败["+shop.direction+"]");
            }else{shark.logger.error("获取失败");}
        }
        

        let repseed =await actpost("获取", "仓库种子信息", "{!ncf}cgi_farm_getuserseed", {act: "getUserSeed", mod: "repertory"});
        if(Array.isArray(repseed) && repseed.length >0){
            for(let item of repseed){
                if(item["cId"] in myseed){
                    myseed[item["cId"]]["num"] =item["amount"];
                    
                }
                if(("tId" in item) && (item["tId"] in fertilizer)){
                    fertilizer[item["tId"]]["num"] =item["amount"];
                }
            }
            shark.logger.log("获取成功");
        }else{
            if("direction" in repseed){
                shark.logger.error("获取失败["+repseed.direction+"]");
            }else{shark.logger.error("获取失败");}
        }
        let showseed =[];
        for(let item in myseed){
            showseed.push(myseed[item]["name"]+"("+item+")x"+myseed[item]["num"]);
        }
        if(showseed.length){shark.logger.log("种子:"+showseed.join(","));}
        //shark.logger.log(fertilizer);


        if(("res" in timefarm) && ("farmlandstatus" in timefarm["res"])){
            let landdata =timefarm["res"]["farmlandstatus"];

            for(let item of landdata){
                let isharvest =false;
                let isdig =false;
                let isplant =false;
                
                if(shark.rule.firstland_fer ==1 && !af_done && item["landid"] ==1 && item["a"] ==40 && item["b"] <6){
                    let fe =0;
                    for(let i =0;i <af.length;i++){
                        if(fertilizer[af[i]]["num"] >0){
                            fe =af[i];
                            break;
                        }
                    }
                    if(fe !=0){
                        for(let i =0;i <20;i++){
                            let actinfo =await tofertilize(item["landid"], fe);
                            if(("res" in actinfo) && ("farmlandstatus" in  actinfo["res"])){
                                sleep.push(0);
                                item =actinfo["res"]["farmlandstatus"][0];
                                if(item["b"] >=6){break;}
                            }
                        }
                    }
                }

                if(item["b"] ==6){
                    isharvest =await toharvest(item);
                    if(isharvest){sleep.push(0);}
                }
                
                if(isharvest || item["b"] ==7){
                    isdig =await todig(item);
                    if(isdig){sleep.push(0);}
                }
                
                if(isdig || item["a"] ==0){
                    isplant =await toplant(item, myplant);
                    if(isplant){sleep.push(0);}
                }
                
            }
        }
        
        if(shark.rule.timecrop_sell){
            let repcrop =await actpost("获取", "仓库果实信息", "{!nc}cgi_farm_getusercrop", {f: 1});
            if("crop" in repcrop){
                shark.logger.log("获取成功");
                for(let item of repcrop["crop"]){
                    if(item["cId"] in timeseed){
                        let sellnum =item["amount"] - timeseed[item["cId"]]["costnum"];
                        if(sellnum >0){
                            let sell =await actpost("卖出", "-"+item["cName"]+"["+sellnum+"]", "{!nc}cgi_farm_time_space", {act: "sell", cropid: item["cId"], num: sellnum, type: 1});
                            if(("ecode" in sell) && sell["ecode"] ==0){
                                shark.logger.log("卖出成功");
                            }else{
                                if("direction" in sell){
                                    shark.logger.error("卖出失败["+sell.direction+"]");
                                }else{shark.logger.error("卖出失败");}
                            }
                        }
                    }
                }
            }else{
                if("direction" in repcrop){
                    shark.logger.error("获取失败["+repcrop.direction+"]");
                }else{shark.logger.error("获取失败");}
            }
        }

        sleep.sort((a,b) => {return a - b});
        shark.logger.log("暂停"+sleep[0]+"秒后继续");
        for(let i =1;i <=sleep[0];i++){
            if(isfertilize){
                await gettimefarm();
                isfertilize =false;
                break;
            }
            let now_t =new Date(shark.getFarmTime() * 1000);
            let next_t =new Date(shark.getNextDayMS() + 5000);
            let hour = addzero(now_t.getHours());
            let minute = addzero(now_t.getMinutes());
            let hm = hour+":"+minute;
            if(hm >="23:58"){
                let st =Math.trunc((next_t.getTime() -now_t.getTime())/1000);
                shark.logger.log("倒计时"+fmtsec(st)+"后重载["+fmtdt(next_t)+"]");
                await shark.delay(st);
                break;
            }
            await shark.delay(1);
        }

    }
    return;
}

onPanelShow = async function (refresh){
    
    let columnData = [
        {name: "土地", key: "id"},
        {name: "作物", key: "seed"},
        {name: "状态", key: "status"},
        {name: "季数", key: "season"},
        {name: "成熟倒计时", key: "mature"}
    ];
    
    refresh(tableData, columnData);
    
    
    let doit ={};
    for(let item in fertilizer){
        let it_key ="["+fertilizer[item]["num"]+"]使用"+fertilizer[item]["name"];
        doit[it_key] =async function (it){
            await tofertilize(it["id"], item);
        }
    }

    return doit;
}

function matureTime(land){
    let param1 =shark.getFarmTime();
    let param2 =land["a"];
    let param3 =land["q"];
    let param4 =land["bitmap"];
    if(land["isGoldLand"] ==1){
        param4 =3;
    }
    if(param4 ==4){
        //land["isGoldLand"] =1;
        param4 =3;
    }
    if(land["bitmap2"] >=8){
        param4 =land["bitmap2"];
    }
    
    let _loc9_ =[];
    let _loc5_ ={};
    if(param2 in seeddata){
        _loc5_ =seeddata[param2];
    }else{
        return -1;
    }
    let isRed ="isRed" in _loc5_ ? _loc5_["isRed"] : 0;
    let _loc6_ =isRed == 2 ? true : false;
    let _loc7_ =isRed == 3 ? true : false;
    let _loc8_ =_loc5_["cropGrow"];
    if(_loc8_  =="")
    {
    return -1;
    }
    _loc9_ =_loc8_.split(",");
    let _loc10_ =_loc9_.length;
    let _loc11_ =Number(_loc9_[_loc10_ - 2]);
    if(param4 == 2 && _loc6_ == false && _loc7_ == false || param4 == 3 && _loc7_ == false || param4 == 8)
    {
        _loc11_ = _loc11_ * 0.8 - _loc11_ % 600;
    }
    return _loc11_ - (param1 - param3);
}

function remainTime(land){
    let param1 =land["a"];
    
    let param2 =land["q"];
    
    let param3 =land["bitmap"];
    if(land["isGoldLand"] ==1){
        param3 =3;
    }
    if(param3 ==4){
        //land["isGoldLand"] =1;
        param3 =3;
    }
    if(land["bitmap2"] >=8){
        param3 =land["bitmap2"];
    }
    
    let _loc7_ =[];
    let _loc16_ =0;
    let _loc17_ =0;
    let _loc18_ =0;
    let _loc19_ =0;
    if(param1 == 0)
    {
        return {
            "remain":0,
            "text":"",
            "progress":1
        };
    }
    let _loc4_ ={};
    if(param1 in seeddata){
        _loc4_ =seeddata[param1];
    }else{
        return {};
    }
    let _loc5_ =_loc4_["cropGrow"];
    if(_loc5_ == "")
    {
        return {};
    }
    let _loc6_ =_loc4_["nextText"];
    if(_loc6_ == "")
    {
        return {};
    }
    _loc7_ = _loc5_.split(",");
    let _loc8_ =_loc6_.split(",");
    let _loc9_ =_loc7_.length;
    let _loc10_ =Number(_loc7_[_loc9_ - 2]);
    let _loc11_ =shark.getFarmTime();
    let _loc12_ =_loc11_ - param2;
    let _loc13_ =_loc12_ / _loc10_;
    if(_loc13_ >1)
    {
        _loc13_ =1;
    }
    let _loc14_ =0;
    let _loc15_ =0;
    while(_loc15_ < _loc9_)
    {
        _loc16_ = "isRed" in _loc4_?_loc4_["isRed"]:0;
        if(param3 == 3 && _loc16_ < 3 || param3 == 2 && _loc16_ < 2 || param3 == 8 && _loc16_ < 4 || param3 == 16 && _loc16_ < 5 || param3 == 32 && _loc16_ < 6)
        {
            _loc17_ = 0.8;
            if(param3 == 8)
            {
                _loc17_ = 0.75;
            }
            else if(param3 == 16)
            {
                _loc17_ = 0.72;
            }
            else if(param3 == 32)
            {
                _loc17_ = 0.72;
            }
            if(_loc15_ < _loc9_ - 2)
            {
                _loc14_ = Math.floor(_loc7_[_loc15_] * _loc17_);
            }
            else
            {
                _loc14_ = Math.floor(_loc7_[_loc15_] * _loc17_);
                _loc18_ =_loc14_  % 600;
                if(_loc14_ > _loc18_)
                {
                    _loc14_ -= _loc18_;
                }
            }
        }
        else
        {
            _loc14_ = Math.trunc(_loc7_[_loc15_]);
        }
        if(_loc12_ < _loc14_)
        {
            _loc19_ = _loc14_ - _loc12_;
            if(_loc15_ == _loc9_ - 1)
            {
                _loc19_ = 0;
            }
            return {
                "remain":_loc19_,
                "text":_loc8_[_loc15_ + 1],
                "progress":_loc13_
            };
        }
        _loc15_++;
    }
    return {
        "remain":0,
        "text":"",
        "progress":1
    };
}


async function tofertilize(lid, fl){
    let isok ={};
    for(let i =0;i <3;i++){
        let check =await actpost("施肥", "-土地"+lid+"["+fertilizer[fl]["name"]+"]", "{!nc}cgi_farm_time_space", {act: "fertilize", landid: lid, toolid: fl});
        if(("ecode" in check) && check["ecode"] ==0){
            fertilizer[fl]["num"] -=1;
            isok =check;
            isfertilize =true;
            shark.logger.log("施肥成功");
            break
        }else{
            if("direction" in check){
                shark.logger.error("施肥失败["+check.direction+"]");
            }else{shark.logger.error("施肥失败");}
        }
    }
    return isok;
}

async function toharvest(land){
    let isok =false;
    for(let i =0;i <3;i++){
        let check =await actpost("收获", "-土地"+land["landid"]+"["+id2name(land["a"])+"x"+land["m"]+"]", "{!nc}cgi_farm_time_space", {act: "harvest", landid: land["landid"]});
        if(("ecode" in check) && check["ecode"] ==0){
            if(check["res"]["farmlandstatus"][0]["b"] ==7){
                isok =true;
            }
            sleep.push(0);
            shark.logger.log("收获成功");
            break;
        }else{
            if("direction" in check){
                shark.logger.error("收获失败["+check.direction+"]");
            }else{shark.logger.error("收获失败");}
        }
    }
    return isok;
}

async function todig(land){
    let isok =false;
    for(let i =0;i <3;i++){
        let check =await actpost("铲地", "-土地"+land["landid"], "{!nc}cgi_farm_time_space", {act: "dig", landid: land["landid"]});
        if(("ecode" in check) && check["ecode"] ==0){
            isok =true;
            shark.logger.log("铲地成功");
            break;
        }else{
            if("direction" in check){
                shark.logger.error("铲地失败["+check.direction+"]");
            }else{shark.logger.error("铲地失败");}
        }
    }
    return isok;
}

async function toplant(land, mp){
    let isok =false;
    let plantcid =0;
    
    for(let i =0;i <mp.length;i++){
        let arr =mp[i].split("=");
        let brr =(arr[0].indexOf("-")>-1?arr[0]:arr[0]+"-"+arr[0]).split("-");
        let crr =[];
        brr.sort((a,b) => {return Number(a) - Number(b)});
        for(let j =Number(brr[0]);j <=Number(brr[1]);j++){
            if(j ==land["landid"]){
                crr =arr[1].split(/[ .,;，；]+/);
                break;
            }
        }
        if(crr.length >0){
            for(let k =0;k <crr.length;k++){
                if(/^\d+$/.test(crr[k])){
                    if((crr[k] in myseed) && myseed[crr[k]]["num"] >0){
                        plantcid =crr[k];
                    }
                }else{
                    for(let cid in myseed){
                        if(myseed[cid]["flag"] ==crr[k] && myseed[cid]["num"] >0){
                            plantcid =cid;
                            break
                        }
                    }
                }
                if(plantcid !=0){break;}
            }
            break;
        }
    }

    if(plantcid !=0){
        for(let i =0;i <3;i++){
            let check =await actpost("种植", "["+id2name(plantcid)+"("+plantcid+") => 土地"+land["landid"]+"]", "{!nc}cgi_farm_time_space", {act: "plant", landid: land["landid"], cropid: plantcid});
            if(("ecode" in check) && check["ecode"] ==0){
                myseed[plantcid]["num"] -=1;
                isok =true;
                shark.logger.log("种植成功");
                break;
            }else{
                if("direction" in check){
                    shark.logger.error("种植失败["+check.direction+"]");
                }else{shark.logger.error("种植失败");}
            }
        }
    }
    return isok;
}


async function gettimefarm(){
    let index =await actpost("获取", "时光农场信息", "{!nc}cgi_farm_time_space", {act: "index"});
    if(("ecode" in index) && index["ecode"] ==0){
        level =index["res"]["userinfo"]["level"];
        timemoney =index["res"]["userinfo"]["timemoney"];
        shark.logger.log("获取成功[等级"+index["res"]["userinfo"]["level"]+",银子"+index["res"]["userinfo"]["timemoney"]+"]");
        tableData =[];
        for(let item of index["res"]["farmlandstatus"]){
            let rt =remainTime(item);
            let mt =matureTime(item);

            let i_seed ="";
            let i_status ="";
            let i_season ="";
            let i_mature ="";
            if(item["a"] >0){
                i_seed =item["a"];
                i_status =item["b"];
                i_season =(item["j"]+1).toString()+"/∞";
                if(item["a"] in seeddata){
                    i_seed =seeddata[item["a"]]["name"]+"["+item["a"]+"]";
                    let tip ="";
                    if(("progress" in rt) && rt["progress"] <1){
                        tip ="("+fmtsec(rt["remain"])+rt["text"]+")";
                    }
                    i_status ="["+item["b"]+"]"+(item["b"] ==7?"枯萎":seeddata[item["a"]]["nextText"].split(",")[item["b"]-1])+tip;
                    i_season =(item["j"]+1).toString()+"/"+seeddata[item["a"]]["harvestNum"];
                }
                if(mt >0){
                    sleep.push(mt);
                    i_mature = fmtsec(mt);
                }
            }
            let landitem ={
                id: item["landid"],
                seed: i_seed,
                status: i_status,
                season: i_season,
                mature: i_mature
            }
            item["showinfo"] =landitem;
            tableData.push(landitem);
        }
    }else{
        if("direction" in index){
            shark.logger.error("获取失败["+index.direction+"]");
        }else{shark.logger.error("获取失败");}
    }
    return index;
}

async function actpost(action, tip, posturl, postdata){
    let get_back = {};
    
    let set_call = {
        name: action+tip,
        url: posturl,
        data: postdata
    }

    for(let i =0;i <9;i++){
        get_back = await shark.reqest(set_call);
        await shark.delay(2+i);
        let direction ="";
        if("direction" in get_back){
            direction =get_back["direction"];
        }
        if(!/繁|忙/.test(direction)){
            break;
        }
    }
    
    return get_back;
}

function id2name(cid){
    let cname ="未知";
    if(cid in seeddata){cname =seeddata[cid]["name"];}
    return cname;
}

function fmtsec(t){
    let hh = Math.floor(t / 3600);
    let mm = Math.floor((t % 3600) / 60);
    let ss = t % 60;
    return addzero(hh)+":"+addzero(mm)+":"+addzero(ss);
}

function fmtdt(t){
    let year = t.getFullYear();
    let month = t.getMonth() + 1;
    let day = t.getDate();
    let hh = t.getHours();
    let mm = t.getMinutes();
    let ss = t.getSeconds();
    return year+"/"+addzero(month)+"/"+addzero(day)+" "+addzero(hh)+":"+addzero(mm)+":"+addzero(ss);
}

function addzero(t){
    return Number(t) <10 ? "0"+t : t.toString();
}