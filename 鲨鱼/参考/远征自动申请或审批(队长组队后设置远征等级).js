// 定义插件名字
pluginName = "远征-自动组队";
// 定义作者名称
pluginAuthor = "愿得一人心";
// 定义描述
pluginDescription = "申请/审批指定QQ号或战力";
pluginInputs = [
    {
        key: "远征模式",
        title: "队长填1，队员填2",
        placeholder: "",
    },
    {
        key: "指定QQ",
        title: "指定QQ号，多个用“,”隔开",
        placeholder: "123,234",
    },
    {
        key: "指定最低战力",
        title: "指定最低战力",
        placeholder: "填0申请/审批所有",
    },
    {
        key: "远征队伍等级上限",
        title: "征队伍等级上限",
        placeholder: "",
    },
]

onPluginStart = async function () {
    const 查看队伍 = await shark.reqest({
        name: "查看队伍",
        url: "{!nc}cgi_farm_family",
        data: {
            act: "indexteam",
            pays: 0,
        },
    });
    if (查看队伍.leaderuin == "" && shark.rule.远征模式 == "2") {
        for (const list in 查看队伍.teamlist) {
            if (String(shark.rule.指定QQ).indexOf(查看队伍.teamlist[list]["leaderuin"]) != -1 || 查看队伍.teamlist[list]["force"] > shark.rule.指定最低战力) {
                await shark.reqest({
                    name: "申请队伍" + 查看队伍.teamlist[list]["tid"].substr(2),
                    url: "{!nc}cgi_farm_family",
                    data: {
                        act: "applyteam",
                        id: 查看队伍.teamlist[list]["tid"],
                    },
                });
            }
        }
    }
    else if (shark.rule.远征模式 == "1") {
        if (查看队伍.leaderuin == "") {
            await shark.reqest({
                name: "创建队伍",
                url: "{!nc}cgi_farm_family",
                data: {
                    act: "createteam",
                },
            });
            await shark.reqest({
                name: "设置远征等级",
                url: "{!nc}cgi_farm_family",
                data: {
                    act: "setmaxlevel",
                    level: shark.rule.远征队伍等级上限,
                },
            });
        }
        const 查看申请列表 = await shark.reqest({
            name: "查看申请列表",
            url: "{!nc}cgi_farm_family",
            data: {
                act: "index",
            },
        });
        for (const list of 查看申请列表.teamdata.applylist) {
            if (String(shark.rule.指定QQ).indexOf(list.uin) != -1 || list.force > shark.rule.指定最低战力) {
                await shark.reqest({
                    name: "同意审批" + list.uin,
                    url: "{!nc}cgi_farm_family",
                    data: {
                        act: "applyoptteam",
                        opt: 1,
                        index: list.uin
                    },
                });
            }
        }


    }
}