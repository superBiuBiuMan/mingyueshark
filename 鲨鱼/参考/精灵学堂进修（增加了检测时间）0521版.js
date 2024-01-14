// 定义插件名字
pluginName = "精灵进修";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = ""
// 插件版本
pluginVersion = "20230521";

pluginInputs = [
    {
        key: "check_sleep",
        title: "监测间隔(分钟)",
        placeholder: "30"
    }
]

onPluginStart = async function() {
    let sleep = 30 * 60;
    if(shark.rule.check_sleep){
        if(/^\d+(\.\d+)?$/.test(shark.rule.check_sleep)){
            sleep = Number(shark.rule.check_sleep) * 60;
        }else{
            shark.logger.error("输入非法!["+shark.rule.check_sleep+"]");
            return;
        }
    }
    
    let learnname = {
        "1,1": "初-公共课程I",
        "1,2": "初-艺术理论I",
        "1,3": "初-体育概论I",
        "1,4": "初-礼仪培训I",
        "1,5": "初-艺术理论II",
        "1,6": "初-体育概论II",
        "1,7": "初-礼仪培训II",
        "2,1": "中-公共课程II",
        "2,2": "中-声乐知识I",
        "2,3": "中-田径训练I",
        "2,4": "中-健美课程I",
        "2,5": "中-舞蹈美学I",
        "2,6": "中-翻滚技巧I",
        "2,7": "中-西方礼仪I",
        "2,8": "中-朗诵表演I",
        "2,9": "中-弹跳训练I",
        "2,10": "中-优雅仪态I",
        "2,11": "中-音乐欣赏I",
        "2,12": "中-游泳技巧I",
        "2,13": "中-艺术体操I",
        "3,1": "高-公共课程III",
        "3,2": "高-声乐知识II",
        "3,3": "高-田径训练II",
        "3,4": "高-健美课程II",
        "3,5": "高-舞蹈美学II",
        "3,6": "高-翻滚技巧II",
        "3,7": "高-西方礼仪II",
        "3,8": "高-朗诵表演II",
        "3,9": "高-弹跳训练II",
        "3,10": "高-优雅仪态II",
        "3,11": "高-音乐欣赏II",
        "3,12": "高-游泳技巧II",
        "3,13": "高-艺术体操II"
    }

    while(1){
        let waittime = 0;
        let school = await enterschool();

        if(school["isok"]){
            let tabs = school["tablist"];
            if(school["isLearning"] == 0){
                for(let i = 0;i < tabs.length;i++){
                    for(let j = 0;j < tabs[i].length;j++){
                        let item = tabs[i][j];
                        let tg = [i+1, j+1].join(",");
                        if(item.status == 1){
                            await unlock(learnname[tg], i+1, j+1);
                        }
                        if(item.lv < 10){
                            if(waittime == 0){
                                waittime = await tolearn(learnname[tg], item.lv, i+1, j+1);
                                if(waittime == 0){return;}
                            }
                        }
                    }
                }
            }else{
                waittime = school["leftTime"];
                let t_id = school["learnTab"], g_id = school["learnGrid"];
                let tg = [t_id, g_id].join(",");
                shark.logger.log("["+learnname[tg]+" Lv:"+tabs[t_id-1][g_id-1].lv+"=>"+(tabs[t_id-1][g_id-1].lv+1)+"]t="+t_id+",g="+g_id+"修炼进行中,剩余"+fmttime(school["leftTime"]));
            }
        }

        if(waittime > 0){
            if(waittime < sleep){
                await shark.delay(waittime);
            }else{await shark.delay(sleep);}
        }else{return;}
    }
    return;

    async function tolearn(name, lv, tid, gid){
        let learn_time = 0;
        
        let learn_call = {
            name: "修炼["+name+" Lv:"+lv+"=>"+(lv+1)+"]t="+tid+",g="+gid,
            url: "{!mc}cgi_pasture_sprite_garden",
            data: {act: "schoolupgrade", tabId: tid, gridId: gid}
        }
        
        const learn_back = await shark.reqest(learn_call);
        if(learn_back.ecode == 0){
            learn_time = learn_back["leftTime"];
            shark.logger.log("["+name+"]修炼开始,耗时"+fmttime(learn_time));
        }else{
            if("direction" in learn_back){
                shark.logger.error("修炼["+name+" Lv"+lv+"=>"+(lv+1)+"]失败("+learn_back["direction"]+")");
            }else{shark.logger.error("修炼["+name+" Lv"+lv+"=>"+(lv+1)+"]失败");}
        }
        await shark.delay(2);
        return learn_time;
    }
    
    async function unlock(name, tid, gid){
        let isok = false;
        
        let unlock_call = {
            name: "解锁["+name+"]t="+tid+",g="+gid,
            url: "{!mc}cgi_pasture_sprite",
            data: {act: "unlock", table: tid, grid: gid}
        }
        
        const unlock_back = await shark.reqest(unlock_call);
        if(unlock_back.ecode == 0){
            shark.logger.log("解锁["+name+"]成功");
        }else{
            if("direction" in unlock_back){
                shark.logger.error("解锁["+name+"]失败("+unlock_back["direction"]+")");
            }else{shark.logger.error("解锁["+name+"]失败");}
        }
        await shark.delay(2);
        return isok;
    }
    
    async function enterschool(){
        let school_info = {
            isok: false,
            time: [0, 0, 0],
            tablist: [
                [
                    {id: 1, lv: 0, status: 0},
                    {id: 2, lv: 0, status: 0},
                    {id: 3, lv: 0, status: 0},
                    {id: 4, lv: 0, status: 0},
                    {id: 5, lv: 0, status: 0},
                    {id: 6, lv: 0, status: 0},
                    {id: 7, lv: 0, status: 0}
                ],
                [
                    {id: 1, lv: 0, status: 0},
                    {id: 2, lv: 0, status: 0},
                    {id: 3, lv: 0, status: 0},
                    {id: 4, lv: 0, status: 0},
                    {id: 5, lv: 0, status: 0},
                    {id: 6, lv: 0, status: 0},
                    {id: 7, lv: 0, status: 0},
                    {id: 8, lv: 0, status: 0},
                    {id: 9, lv: 0, status: 0},
                    {id: 10, lv: 0, status: 0},
                    {id: 11, lv: 0, status: 0},
                    {id: 12, lv: 0, status: 0},
                    {id: 13, lv: 0, status: 0}
                ],
                [
                    {id: 1, lv: 0, status: 0},
                    {id: 2, lv: 0, status: 0},
                    {id: 3, lv: 0, status: 0},
                    {id: 4, lv: 0, status: 0},
                    {id: 5, lv: 0, status: 0},
                    {id: 6, lv: 0, status: 0},
                    {id: 7, lv: 0, status: 0},
                    {id: 8, lv: 0, status: 0},
                    {id: 9, lv: 0, status: 0},
                    {id: 10, lv: 0, status: 0},
                    {id: 11, lv: 0, status: 0},
                    {id: 12, lv: 0, status: 0},
                    {id: 13, lv: 0, status: 0}
                ]
            ]
        }

        let getschool_call = {
            name: "获取精灵学堂信息",
            url: "{!mc}cgi_pasture_sprite_garden",
            data: {act: "schoolindex"}
        }
        
        const getschool_back = await shark.reqest(getschool_call);
        if(getschool_back.ecode == 0){
            let tag_done = {
                tab1: ["初级进修", 7],
                tab2: ["中级进修", 13],
                tab3: ["高级进修", 13],
            }

            let tags = [
                "chuji",
                "gaoji",
                "isLearning",
                "learnGrid",
                "learnTab",
                "leftTime"
            ];
            
            for(let i = 0;i < tags.length;i++){
                school_info[tags[i]] = 0;
                if(tags[i] in getschool_back){
                    school_info[tags[i]] = getschool_back[tags[i]];
                }
            }
            for(let i = 0;i < 3;i++){
                let checkdone = 0;
                let tag1 = "time" + (i + 1);
                if(tag1 in getschool_back){
                    school_info["time"][i] = getschool_back[tag1];
                }
                
                let tag2 = "tab" + (i + 1);
                if(tag2 in getschool_back){
                    for(let j = 0;j < getschool_back[tag2].length;j++){
                        let gid = getschool_back[tag2][j]["id"];
                        let glv = getschool_back[tag2][j]["lv"];
                        if(glv == 10){checkdone = checkdone + 1;}
                        school_info["tablist"][i][gid-1]["lv"] = glv;
                    }
                }
                if(tag2 in tag_done){
                    if(tag_done[tag2][1] == checkdone){
                        shark.logger.log(tag_done[tag2][0]+"已满级");
                    }
                }
                
                let tag3 = "unlockTab" + (i + 1);
                if(tag3 in getschool_back){
                    for(let j = 0;j < getschool_back[tag3].length;j++){
                        let gid = getschool_back[tag3][j]["id"];
                        let gstatus = getschool_back[tag3][j]["status"];
                        school_info["tablist"][i][gid-1]["status"] = gstatus;
                    }
                }
            }
            
            school_info["isok"] = true;
            shark.logger.log("获取精灵学堂信息成功");
        }else{
            if("direction" in getschool_back){
                shark.logger.error("获取精灵学堂信息失败("+getschool_back["direction"]+")");
            }else{shark.logger.error("获取精灵学堂信息失败");}
        }
        await shark.delay(2);
        return school_info;
    }

    function fmttime(t){
        let dd = Math.floor(t / 86400);
        let hh = Math.floor((t % 86400) / 3600);
        let mm = Math.floor((t % 3600) / 60);
        let ss = t % 60;
        return dd.toString()+"天"+hh+"时"+mm+"分"+ss+"秒";
    }
    
    function addzero(t){
        return Number(t) <10 ? "0"+t : t.toString();
    }
}