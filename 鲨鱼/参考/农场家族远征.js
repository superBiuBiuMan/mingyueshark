// 定义插件名字
pluginName = "农-家族远征";
// 定义作者名称
pluginAuthor = "QQ1404559540";
// 定义描述
pluginDescription = ""
// 插件版本
pluginVersion = "20230611";

pluginInputs = [
    {
        key: "yz_choice",
        title: "参与方式",
        placeholder: "无",
        type: "select",
        selects: [
            {
                name: "无",
                value: 0
            },
            {
                name: "组建自己队伍",
                value: 1
            },
            {
                name: "加入别人队伍",
                value: 2
            }
        ]
    },
    {
        key: "yz_self_check",
        title: "[自]审核加入自家队伍方式",
        placeholder: "全部同意",
        type: "select",
        selects: [
            {
                name: "全部同意",
                value: 1
            },
            {
                name: "仅同意战力高于指定值加入",
                value: 2
            },
            {
                name: "仅同意指定q号加入",
                value: 3
            }
        ]
    },
    {
        key: "yz_self_force",
        title: "[自]仅同意战力高于指定值加入",
        placeholder: 600000
    },
    {
        key: "yz_self_qqlist",
        title: "[自]仅同意指定q号加入",
        placeholder: "多个用,分隔"
    },
    {
        key: "yz_other_check",
        title: "[别]申请加入别人队伍方式",
        placeholder: "全部申请",
        type: "select",
        selects: [
            {
                name: "全部申请",
                value: 1
            },
            {
                name: "仅申请战力高于指定值队伍",
                value: 2
            },
            {
                name: "仅申请指定q号队伍",
                value: 3
            }
        ]
    },
    {
        key: "yz_other_force",
        title: "[别]仅申请战力高于指定值队伍",
        placeholder: 1000000
    },
    {
        key: "yz_other_qqlist",
        title: "[别]仅申请指定q号队伍",
        placeholder: "多个用,分隔"
    },
    {
        key: "yz_level",
        title: "设定远征最高等级",
        placeholder: 30
    },
    {
        key: "yz_sleep",
        title: "监测间隔(分钟)",
        placeholder: 5
    },
    {
        key: "yz_harvest",
        title: "查看奖励领取情况",
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
]


onPluginStart = async function (){

    let familyinfo = await getfamily();
    if(Object.keys(familyinfo).length ==0){return;}
    
    let memberlist = await getmanager();
    if(Object.keys(memberlist).length ==0){return;}
    
    let hero = await herocount(shark.selfUin);
    if(hero.length ==0){
        shark.logger.error("未配置阵容!");
        return;
    }
    
    let yz_choice = 0;
    let yz_self_check  = 1;
    let yz_self_force = 600000;
    let yz_self_qqlist = [];
    let yz_other_check = 1;
    let yz_other_force = 1000000;
    let yz_other_qqlist = [];
    let yz_level = 30;
    let yz_sleep = 300;
    
    if(shark.rule.yz_choice){
        yz_choice = shark.rule.yz_choice;
    }
    
    if(shark.rule.yz_self_check){
        yz_self_check = shark.rule.yz_self_check;
    }
    
    if(shark.rule.yz_self_force){
        if(/^\d+$/.test(shark.rule.yz_self_force)){
            yz_self_force = Number(shark.rule.yz_self_force);
        }else{
            shark.logger.error("输入有误!["+shark.rule.yz_self_force+"]");
        }
    }
    
    if(yz_self_check ==3){
        if(shark.rule.yz_self_qqlist){
            if(/^\d+([ .,;，；]\d+)*?$/.test(shark.rule.yz_self_qqlist)){
                yz_self_qqlist = shark.rule.yz_self_qqlist.split(/[ .,;，；]/);
            }else{
                shark.logger.error("输入有误!["+shark.rule.yz_self_qqlist+"]");
                return;
            }
        }else{
            shark.logger.error("指定q号列表不能为空!");
            return;
        }
    }
    
    if(shark.rule.yz_other_check){
        yz_other_check = shark.rule.yz_other_check;
    }
    
    if(shark.rule.yz_other_force){
        if(/^\d+$/.test(shark.rule.yz_other_force)){
            yz_other_force = Number(shark.rule.yz_other_force);
        }else{
            shark.logger.error("输入有误!["+shark.rule.yz_other_force+"]");
        }
    }
    
    if(yz_other_check ==3){
        if(shark.rule.yz_other_qqlist){
            if(/^\d+([ .,;，；]\d+)*?$/.test(shark.rule.yz_other_qqlist)){
                yz_other_qqlist = shark.rule.yz_other_qqlist.split(/[ .,;，；]/);
            }else{
                shark.logger.error("输入有误!["+shark.rule.yz_other_qqlist+"]");
                return;
            }
        }else{
            shark.logger.error("指定q号列表不能为空!");
            return;
        }
    }
    
    if(shark.rule.yz_level){
        if(/^\d+$/.test(shark.rule.yz_level)){
            yz_level = Number(shark.rule.yz_level);
        }else{
            shark.logger.error("输入有误!["+shark.rule.yz_level+"]");
        }
    }
    
    if(shark.rule.yz_sleep){
        if(/^\d+(\.\d+)?$/.test(shark.rule.yz_sleep)){
            yz_sleep = 60 * Number(shark.rule.yz_sleep);
        }else{
            shark.logger.error("输入有误!["+shark.rule.yz_sleep+"]");
        }
    }

    if(shark.rule.yz_harvest){
        let showinfo = await showlogs();
        if(showinfo.length >0){
            shark.logger.log("\r\n"+showinfo.join("\r\n"));
        }else{
            shark.logger.log("查询无果!");
        }
    }

    let week = 1;
    let now =new Date(shark.getFarmTime() * 1000);
    week = now.getDay()||7;

    if(week ==7 && yz_choice >0){
        while(1){
            let teaminfo = await getteam();

            if(yz_choice ==1){
                let leaderuin = shark.selfUin;
                if(teaminfo["leaderuin"] ==0){
                    await createteam();
                    teaminfo = await getteam();
                }else{
                    if(teaminfo["leaderuin"] !=leaderuin){
                        shark.logger.log("你已加入"+memberlist[teaminfo["leaderuin"]]+"["+teaminfo["leaderuin"]+"]的队伍!");
                        return;
                    }
                }
                
                if(teaminfo["teamlist"][leaderuin]["maxlevel"] != yz_level){
                    await setmaxlevel(yz_level);
                }
                
                let applylist = teaminfo["applylist"][leaderuin];
                let memlist = teaminfo["memlist"][leaderuin];
                let freespace = teaminfo["teamlist"][leaderuin]["space"] - Object.keys(memlist).length;
                if(yz_self_check ==1){
                    if(freespace >0){
                        let sortkey = Object.keys(applylist).sort((a, b) => {return applylist[b].force - applylist[a].force});
                        if(sortkey.length >0){
                            for(let i = 0;i < sortkey.length;i++){
                                if(!(sortkey[i] in  memlist)){
                                    let name = "";
                                    if(sortkey[i] in memberlist){name = memberlist[sortkey[i]];}
                                    let check = await agreeapply(name, sortkey[i], applylist[sortkey[i]].force);
                                    if(check){
                                        freespace -=1;
                                        if(freespace <=0){break;}
                                    }
                                }
                            }
                        }else{
                            shark.logger.log("暂未发现有人申请加入!");
                        }
                    }else{
                        shark.logger.log("队伍已满员!");
                        return;
                    }
                }
                
                if(yz_self_check ==2){
                    if(freespace >0){
                        let sortkey = Object.keys(applylist).sort((a, b) => {return applylist[b].force - applylist[a].force});
                        if(sortkey.length >0){
                            let ismatch = false;
                            for(let i = 0;i < sortkey.length;i++){
                                if(!(sortkey[i] in  memlist)){
                                    if(applylist[sortkey[i]].force >=yz_self_force){
                                        ismatch = true;
                                        let name = "";
                                        if(sortkey[i] in memberlist){name = memberlist[sortkey[i]];}
                                        let check = await agreeapply(name, sortkey[i], applylist[sortkey[i]].force);
                                        if(check){
                                            freespace -=1;
                                            if(freespace <=0){break;}
                                        }
                                    }
                                }
                            }
                            if(!ismatch){
                                shark.logger.log("未发现符合条件的申请!");
                            }
                        }else{
                            shark.logger.log("暂未发现有人申请加入!");
                        }
                    }else{
                        shark.logger.log("队伍已满员!");
                        return;
                    }
                }
                
                if(yz_self_check ==3){
                    if(freespace >0){
                        let sortkey = Object.keys(applylist).sort((a, b) => {return applylist[b].force - applylist[a].force});
                        if(sortkey.length >0){
                            let ismatch = false;
                            for(let i = 0;i < sortkey.length;i++){
                                if(!(sortkey[i] in  memlist)){
                                    if(yz_self_qqlist.indexOf(sortkey[i].toString()) >-1){
                                        ismatch = true;
                                        let name = "";
                                        if(sortkey[i] in memberlist){name = memberlist[sortkey[i]];}
                                        let check = await agreeapply(name, sortkey[i], applylist[sortkey[i]].force);
                                        if(check){
                                            freespace -=1;
                                            if(freespace <=0){break;}
                                        }
                                        
                                    }
                                }
                            }
                            if(!ismatch){
                                shark.logger.log("未发现符合条件的申请!");
                            }
                        }else{
                            shark.logger.log("暂未发现有人申请加入!");
                        }
                    }else{
                        shark.logger.log("队伍已满员!");
                        return;
                    }
                }
            }
            
            if(yz_choice ==2){
                if(teaminfo["leaderuin"] ==0){
                    let myuin = shark.selfUin;
                    let teamlist = teaminfo["teamlist"];
                    let applylist = teaminfo["applylist"];
                    let memlist = teaminfo["memlist"];
                
                    if(yz_other_check ==1){
                        let ismatch = false;
                        for(let teamleader in teamlist){
                            if(!(myuin in applylist[teamleader])){
                                if(!(myuin in memlist[teamleader])){
                                    let freespace = teamlist[teamleader]["space"] - Object.keys(memlist[teamleader]).length;
                                    if(freespace >0){
                                        ismatch = true;
                                        let name = "";
                                        if(teamleader in memberlist){name = memberlist[teamleader];}
                                        await applyteam(name, teamleader, teamlist[teamleader]["tid"], teamlist[teamleader]["force"]);
                                    }
                                }
                            }
                        }
                        if(!ismatch){
                            shark.logger.log("没有可申请的队伍!");
                        }
                    }
                    
                    if(yz_other_check ==2){
                        let ismatch = false;
                        for(let teamleader in teamlist){
                            if(teamlist[teamleader]["force"] >=yz_other_force){
                                if(!(myuin in applylist[teamleader])){
                                    if(!(myuin in memlist[teamleader])){
                                        let freespace = teamlist[teamleader]["space"] - Object.keys(memlist[teamleader]).length;
                                        if(freespace >0){
                                            ismatch = true;
                                            let name = "";
                                            if(teamleader in memberlist){name = memberlist[teamleader];}
                                            await applyteam(name, teamleader, teamlist[teamleader]["tid"], teamlist[teamleader]["force"]);
                                        }
                                    }
                                }
                            }
                        }
                        if(!ismatch){
                            shark.logger.log("没有可申请的队伍!");
                        }
                    }
                    
                    if(yz_other_check ==3){
                        let ismatch = false;
                        for(let teamleader in teamlist){
                            if(yz_other_qqlist.indexOf(teamleader.toString()) >-1){
                                if(!(myuin in applylist[teamleader])){
                                    if(!(myuin in memlist[teamleader])){
                                        let freespace = teamlist[teamleader]["space"] - Object.keys(memlist[teamleader]).length;
                                        if(freespace >0){
                                            ismatch = true;
                                            let name = "";
                                            if(teamleader in memberlist){name = memberlist[teamleader];}
                                            await applyteam(name, teamleader, teamlist[teamleader]["tid"], teamlist[teamleader]["force"]);
                                        }
                                    }
                                }
                            }
                        }
                        if(!ismatch){
                            shark.logger.log("没有可申请的队伍!");
                        }
                    }
                }else{
                    shark.logger.log("你已加入"+memberlist[teaminfo["leaderuin"]]+"["+teaminfo["leaderuin"]+"]的队伍!");
                    return;
                }
            }
            
            shark.logger.log("暂停"+yz_sleep+"秒后继续");
            await shark.delay(yz_sleep);
        }
    }else{let teaminfo = await getteam();}
    return;
    
    async function showlogs(){
        let info =[];
        
        let set_call = {
            name: "获取对战记录",
            url: "{!nc}cgi_farm_family",
            data: {act: "indexteam"}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            let logsdata = get_back["logs"];
            for(let i = 0;i < logsdata.length;i++){
                let logitem = JSON.parse(logsdata[i]);
                let giftlist = [];
                for(let pkg of logitem["package"]){
                    let  giftitem = pkg["name"]+"x"+pkg["num"];
                    giftlist.push(giftitem);
                }
                let dt = fmttime(logitem["ts"]);
                if(giftlist.length >0){
                    let line = dt+"\r\n"+giftlist.join(",");
                    info.push(line);
                }
            }
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败("+get_back["direction"]+")");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        return info;
    }
    
    async function getteam(){
        let info = {
            leaderuin: 0,
            teamlist: {},
            applylist: {},
            memlist:{}
        }
        
        let set_call = {
            name: "获取队伍信息",
            url: "{!nc}cgi_farm_family",
            data: {act: "indexteam"}
        }
        
        const get_back = await shark.reqest(set_call);
        if("teamlist" in get_back){
            if(get_back["leaderuin"] != 0){info["leaderuin"] = get_back["leaderuin"];}
            
            for(let team in get_back["teamlist"]){
                
                let team_it = get_back["teamlist"][team];
                let leader = team_it["leaderuin"];
                let apply_it = team_it["applylist"];
                let mem_it = team_it["memlist"];
                
                info["teamlist"][leader] = {
                    maxlevel: team_it["maxlevel"],
                    force: team_it["force"],
                    space: team_it["space"],
                    tid: team_it["tid"]
                }
                
                let dic1 = {}
                for(let item of apply_it){
                    if(!(item["uin"] in dic1)){
                        dic1[item["uin"]] = {force: item["force"]}
                    }
                }
                info["applylist"][leader] = dic1;
                
                let dic2 = {}
                for(let item in mem_it){
                    if(!(mem_it[item]["uin"] in dic2)){
                        dic2[mem_it[item]["uin"]] = "";
                    }
                }
                info["memlist"][leader] = dic2;
            }
            
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败("+get_back["direction"]+")");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        return info;
    }
    
    async function setmaxlevel(num){
        let isok = false;
        
        let set_call = {
            name: "设定远征最高等级"+num,
            url: "{!nc}cgi_farm_family",
            data: {act: "setmaxlevel", level: num}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("设定成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("设定失败("+get_back["direction"]+")");
            }else{shark.logger.error("设定失败");}
        }
        await shark.delay(2);
        return isok;
    }
    
    async function agreeapply(nick, uin, force){
        let isok = false;
        
        let set_call = {
            name: "同意"+nick+"["+uin+"](战:"+force+")的加入",
            url: "{!nc}cgi_farm_family",
            data: {act: "applyoptteam", opt: 1, index: uin}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("加入成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("加入失败("+get_back["direction"]+")");
            }else{shark.logger.error("加入失败");}
        }
        await shark.delay(2);
        return isok;
    }
    
    async function createteam(){
        let isok = false;
        
        let set_call = {
            name: "组建自己队伍",
            url: "{!nc}cgi_farm_family",
            data: {act: "createteam"}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("创建成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("创建失败("+get_back["direction"]+")");
            }else{shark.logger.error("创建失败");}
        }
        await shark.delay(2);
        return isok;
    }

    async function applyteam(nick, uin, tid, force){
        let isok = false;
        
        let set_call = {
            name: "加入"+nick+"["+uin+"](战:"+force+")队伍",
            url: "{!nc}cgi_farm_family",
            data: {act: "applyteam", id: tid}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            isok = true;
            shark.logger.log("申请成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("申请失败("+get_back["direction"]+")");
            }else{shark.logger.error("申请失败");}
        }
        await shark.delay(2);
        return isok;
    }

    async function herocount(uin){
        let heroinfo = [];
        
        let set_call = {
            name: "获取阵容信息",
            url: "{!nc}query",
            data: {act: 2010051, uinlist: uin}
        }
        
        const get_back = await shark.reqest(set_call);
        if("hero" in get_back){
            let qquin = "qq"+uin;
            if(qquin in get_back["hero"]){heroinfo=get_back["hero"][qquin];}
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败("+get_back["direction"]+")");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        return heroinfo;
    }

    async function getfamily(){
        let info = {};
        
        let set_call = {
            name: "获取家族信息",
            url: "{!nc}cgi_farm_family",
            data: {act: "index"}
        }
        
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            if("l_52700" in get_back){
                info["领导能力"] = get_back["l_52700"];
            }
            if("l_52701" in get_back){
                info["众志成城"] = get_back["l_52701"];
            }
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败("+get_back["direction"]+")");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        return info;
    }

    async function getmanager(){
        let meminfo = {};
        
        let set_call = {
            name: "获取家族成员信息",
            url: "{!nc}cgi_farm_family",
            data: {act: "manager", manager_type: "look"}
        }
        
        let uin_arr = [];
        const get_back = await shark.reqest(set_call);
        if(get_back.ecode == 0){
            let member = get_back["member"];
            let tmp_arr = [];
            for(let i = 0;i < member.length;i++){
                let uin = member[i]["uin"];
                let nick = "NickError!";
                if(!(uin in meminfo)){meminfo[uin] = nick;}
                
                tmp_arr.push(uin);
                if((i + 1) % 150 == 0){
                    uin_arr.push(tmp_arr.join(","));
                    tmp_arr = [];
                }
            }
            if(tmp_arr.length >0){
                uin_arr.push(tmp_arr.join(","));
                tmp_arr = [];
            }
            shark.logger.log("获取成功");
        }else{
            if("direction" in get_back){
                shark.logger.error("获取失败("+get_back["direction"]+")");
            }else{shark.logger.error("获取失败");}
        }
        await shark.delay(2);
        
        if(uin_arr.length >0){
            let nickinfo = await getnick(uin_arr);
            for(let uin in nickinfo){
                if(uin in meminfo){meminfo[uin] = nickinfo[uin];}
            }
        }

        return meminfo;
    }
    
    async function getnick(uinarr){
        let uin_nick = {};

        for(let i = 0;i < uinarr.length;i++){
            let set_call = {
                name: "获取昵称"+(i+1).toString()+"组",
                url: "{!nc}query",
                data: {
                    act: 2010029,
                    type: 1,
                    hide: 0,
                    uinlist: uinarr[i]
                }
            }
            
            const get_back = await shark.reqest(set_call);
            if(get_back.ecode == 0){
                for(let i = 0;i < get_back.name.length;i++){
                    if(!(get_back.name[i]["uin"] in uin_nick)){
                        uin_nick[get_back.name[i]["uin"]] = get_back.name[i]["nick"];
                    }
                }
                shark.logger.log("获取成功");
            }else{
                if("direction" in get_back){
                    shark.logger.error("获取失败["+get_back.direction+"]");
                }else{shark.logger.error("获取失败");}
            }
            
            await shark.delay(2);
        }

        return uin_nick;
    }
    
    function fmttime(t){
        let dt = new Date(t * 1000);
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let hh = dt.getHours();
        let mm = dt.getMinutes();
        let ss = dt.getSeconds();
        return year+"/"+addzero(month)+"/"+addzero(day)+" "+addzero(hh)+":"+addzero(mm)+":"+addzero(ss);
    }
    
    function addzero(t){
        return Number(t) <10 ? "0"+t : t.toString();
    }
}

onPanelShow = async function (refresh){
    let tableData = [];
    
    let set_call = {
        name: "面板-获取队伍信息",
        url: "{!nc}cgi_farm_family",
        data: {act: "indexteam"}
    }
        
    const get_back = await shark.reqest(set_call);
    if(get_back.ecode == 0){
        for(let team in get_back["teamlist"]){
            let flag = "";
            let item = {id: 0, leader: "", force: 0, space: 0, maxlevel:0, member: ""}
            item["id"] = get_back["teamlist"][team]["tid"];
            item["leader"] = get_back["teamlist"][team]["leaderuin"];
            item["force"] = get_back["teamlist"][team]["force"];
            item["maxlevel"] = get_back["teamlist"][team]["maxlevel"];
            let mem_arr = [];
            for(let mem in get_back["teamlist"][team]["memlist"]){
                if(get_back["teamlist"][team]["memlist"][mem]["uin"] == shark.selfUin){flag = "[在]";}
                mem_arr.push(get_back["teamlist"][team]["memlist"][mem]["uin"]);
            }
            for(let mem of get_back["teamlist"][team]["applylist"]){
                if(mem["uin"] == shark.selfUin){flag = "[申]";}
            }
            item["space"] = get_back["teamlist"][team]["space"].toString()+flag;
            item["member"] = mem_arr.join(",");
            tableData.push(item);
        }
    }

    let columnData = [
        {name: "队伍ID", key: "id"},
        {name: "队长", key: "leader"},
        {name: "战力", key: "force"},
        {name: "名额", key: "space"},
        {name: "等级", key: "maxlevel"},
        {name: "队员", key: "member"}
    ];
    
    refresh(tableData, columnData);
}