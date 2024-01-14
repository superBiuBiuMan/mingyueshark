// 定义插件名字
pluginName = "牧场家族任务与商店";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = "结义帖，不是结义贴"
// 插件版本
pluginVersion = "20231111";

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
        key: "family_sign",
        title: "家族自动签到",
        placeholder: "否",
        type: "select",
        selects: [
            {
                name: "否",
                value: 0
            },
            {
                name: "普通签到",
                value: 1
            },
            {
                name: "粮票签到",
                value: 2
            }
        ]
    },
    {
        key: "shop_exc",
        title: "指定商店兑换商品",
        placeholder: "商品名称(多个用,分隔)"
    },
    {
        key: "goods_ref",
        title: "未出现指定兑换商品时消耗贡献进行刷新",
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
    }
]


onPluginStart = async function() {
    
    for(;;){
        let sleep = 0x1e * 0x3c;
        let now_t =new Date(shark.getFarmTime() * 1000);
        let next_t =new Date(shark.getNextDayMS()+1000);
        let hour = addzero(now_t.getHours());
        let minute = addzero(now_t.getMinutes());
        let hm = hour+":"+minute;
        if(hm >="23:20"){
            let t_sleep =Math.trunc((next_t.getTime() -now_t.getTime())/1000);
            shark.logger.log("倒计时"+fmtsec(t_sleep)+"后重载["+fmtdt(next_t)+"]");
            await shark.delay(t_sleep);
        }

        const main_url ="{!mc}cgi_pasture_family";

        let mygoods =[];
        if(shark.rule.shop_exc){
            let gl =shark.rule.shop_exc.split(/[ .,;，；]+/);
            for(let i =0;i <gl.length;i++){
                if(mygoods.indexOf(gl[i]) ==-1){mygoods.push(gl[i]);}
            }
        }
        
        let memberMax =0;
        let fw_conf ={
            "1": 5,
            "2": 5,
            "3": 5,
            "4": 5,
            "5": 10
        }
        let family =await actpost("获取", "家族信息", main_url, {act: "index"});
        if(("ecode" in family) && family["ecode"] ==0){
            let effect =0;
            for(let i =1;i <=family["family"]["rep_lv"];i++){
                effect +=fw_conf[i];
            }
            memberMax =30 + (family["family"]["lv"] - 1) * 5 + effect;
            shark.logger.log("获取成功");
        }else{
            if("direction" in family){
                shark.logger.error("获取失败["+family.direction+"]");
            }else{shark.logger.error("获取失败");}
            break;
        }
        
        
        let tasks =[];
        let task =await actpost("获取", "任务信息", main_url, {act: "task", task_type: "query"});
        if(("ecode" in task) && task["ecode"] ==0){
            tasks =task["task"];
            let pkg =[];
            for(let i =0;i <tasks.length;i++){
                let jiazu_top =0;
                switch(tasks[i]["taskLv"]){
                    case 1:
                        jiazu_top =memberMax * 0.2;
                        break;
                    case 2:
                        jiazu_top =memberMax * 0.4;
                        break;
                    case 3:
                        jiazu_top =memberMax * 0.6;
                        break;   
                }
                pkg.push((tasks[i]["bit"]==0?"未":"完")+":"+tasks[i]["taskName"]+"["+tasks[i]["compeleted_num"]+"/"+tasks[i]["needNum"]+","+task["process"+(i+1)]+"/"+Math.trunc(jiazu_top)+"]");
            }
            shark.logger.log("获取成功\n"+pkg.join("\n"));
        }else{
            if("direction" in task){
                shark.logger.error("获取失败["+task.direction+"]");
            }else{shark.logger.error("获取失败");}
            break;
        }
        if(shark.rule.task_get){
            if(tasks.length >0){
                for(let i =0;i <tasks.length;i++){
                    if(tasks[i]["bit"] ==0 && tasks[i]["compeleted_num"] >=tasks[i]["needNum"]){
                        let dotask =await actpost("领取", "任务"+(i+1)+"奖励", main_url, {act: "task", task_type: "exchange", draw_id: i+1});
                        if(("ecode" in dotask) && dotask["ecode"] ==0){
                            shark.logger.log("领取成功");
                        }else{
                            if("direction" in dotask){
                                shark.logger.error("领取失败["+dotask.direction+"]");
                            }else{shark.logger.error("领取失败");}
                        }
                    }
                }
            }
        }
        
        let tmp_t =new Date(shark.getFarmTime() * 1000);
        tmp_t.setHours(0, 0, 0, 0);
        if(family["my"]["sign_ts"] * 1000 < tmp_t.getTime()){
            let sign_id =shark.rule.family_sign;
            if(sign_id ==1 || sign_id ==2){
                let sign =await actpost("签到", "-"+(sign_id ==1?"普通":"粮票"), main_url, {act: "sign", id: sign_id});
                if(("ecode" in sign) && sign["ecode"] ==0){
                    shark.logger.log("签到成功");
                }else{
                    if("direction" in sign){
                        shark.logger.error("签到失败["+sign.direction+"]");
                    }else{shark.logger.error("签到失败");}
                }
            }
        }

        if(mygoods.length >0){
            for(;;){
                let contribution =0;
                let shop_draw_limit =20;
                let family =await actpost("获取", "个人贡献信息", main_url, {act: "index"});
                if(("ecode" in family) && family["ecode"] ==0){
                    contribution =family["my"]["contribution"];
                    shark.logger.log("获取成功["+contribution+"]");
                    switch(family["family"]["shop_lv"]){
                        case 1:
                            shop_draw_limit =3;
                            break;
                        case 2:
                            shop_draw_limit =5;
                            break;
                        case 3:
                            shop_draw_limit =8;
                            break;
                        case 4:
                            shop_draw_limit =12;
                            break;
                        case 5:
                            shop_draw_limit =16;
                            break;
                        case 6:
                            shop_draw_limit =20;
                            break;
                    }
                }else{
                    if("direction" in family){
                        shark.logger.error("获取失败["+family.direction+"]");
                    }else{shark.logger.error("获取失败");}
                    break;
                }
                if(contribution <=0){break;}
                
                let in_mygoods =false;
                let shop_draw =0;
                let goods =[];
                let shop =await actpost("获取", "商店信息", main_url, {act: "shop", shop_type: "query"});
                if(("ecode" in shop) && shop["ecode"] ==0){
                    shop_draw =shop["daily_shop_draw"];
                    goods =shop["gifts"];
                    let pkg =[];
                    for(let i =0;i <shop["conf"].length;i++){
                        goods[i]["price"] =shop["conf"][i];
                        goods[i]["drawid"] =i+1;
                        pkg.push(goods[i]["name"]+"x"+goods[i]["num"]+"["+goods[i]["price"]+"]");
                        if(mygoods.indexOf(goods[i]["name"]) >-1){in_mygoods =true;}
                    }
                    shark.logger.log("获取成功["+shop_draw+"/"+shop_draw_limit+"]\n"+pkg.join(" "));
                }else{
                    if("direction" in shop){
                        shark.logger.error("获取失败["+shop.direction+"]");
                    }else{shark.logger.error("获取失败");}
                    break;
                }
                if(shop_draw >=shop_draw_limit){break;}


                if(in_mygoods){
                    goods.sort((a, b) => {return b["price"] - a["price"]});
                    for(let i =0;i <mygoods.length;i++){
                        for(let j =0;j <goods.length;j++){
                            if(mygoods[i] ==goods[j]["name"]){
                                for(;;){
                                    if(goods[j]["price"] >contribution || contribution <=0 || shop_draw >=shop_draw_limit){
                                        break;
                                    }
                                    let tobuy =await actpost("兑换", "-"+goods[j]["name"]+"x"+goods[j]["num"], main_url, {act: "shop", shop_type: "exchange", draw_id: goods[j]["draw_id"]});
                                    if(("ecode" in tobuy) && tobuy["ecode"] ==0){
                                        contribution -=goods[j]["price"]
                                        shop_draw +=1;
                                        shark.logger.log("兑换成功["+shop_draw+","+contribution+"]");
                                    }else{
                                        if("direction" in tobuy){
                                            shark.logger.error("兑换失败["+tobuy.direction+"]");
                                        }else{shark.logger.error("兑换失败");}
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                }else{
                    if(shark.rule.goods_ref){
                        let toref =await actpost("刷新", "商品信息", main_url, {act: "shop", shop_type: "refresh"});
                        if(("ecode" in toref) && toref["ecode"] ==0){
                            shark.logger.log("刷新成功");
                        }else{
                            if("direction" in toref){
                                shark.logger.error("刷新失败["+toref.direction+"]");
                            }else{shark.logger.error("刷新失败");}
                            break;
                        }
                    }else{break;}
                }
            }
        }
        shark.logger.log("暂停"+sleep+"秒后继续");
        await shark.delay(sleep);
    }
    return;
}

async function actpost(action, tip, posturl, postdata){
    let get_back = {};
    
    let set_call = {
        name: action+tip,
        url: posturl,
        data: postdata
    }

    for(let i =0;i <5;i++){
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