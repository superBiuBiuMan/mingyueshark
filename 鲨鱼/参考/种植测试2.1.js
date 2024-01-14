// 定义插件名字
pluginName = "指定种植";
// 定义作者名称
pluginAuthor = "愿得一人心";
// 定义描述
pluginDescription = "";
pluginInputs = [
    {
        key: "指定种子",
        title: "指定种子",
        placeholder: "1-8=195,145+9-15=5944,5945",
    },
    {
        key: "循环检测时间",
        title: "循环检测时间",
        placeholder: "单位:秒",
    },
    {
        key: "偷取指定QQ号",
        title: "偷取指定QQ号,单个",
        placeholder: "偷取指定QQ号",
    },
    {
        key: "自动收获",
        title: "自动收获",
        placeholder: "1为自动收获",
    },
]

onPluginStart = async function () {
    do {
        let 节气种子ID合集 = []
        let 备选种子
        let 查看节气种子ID
        let 查看好友种植
        let 查看收获状态
        let 查看土地状态
        do {
            查看节气种子ID = await shark.reqest({
                name: "节气种子ID",
                url: "{!nc}cgi_farm_seedhb?act=9",
                data: {
                },
            });
            if (查看节气种子ID.ecode != -10000) {
                break
            }
            await shark.delay(65)
        } while (true)

        for (const list of 查看节气种子ID.seedList) {
            节气种子ID合集.push(list.id)
        }
        if (shark.rule.偷取指定QQ号 > 0) {
            const 查看好友UID = await shark.reqest({
                name: "查看好友UID",
                url: "{!nc}cgi_farm_getFriendList",
                data: {
                    uinlist: shark.rule.偷取指定QQ号,
                },
            });
            //shark.logger.log(查看好友UID[0].uId)
            do {
                查看好友种植 = await shark.reqest({
                    name: "查看好友种植作物",
                    url: "{!nc}cgi_farm_index",
                    data: {
                        act: "run",
                        ownerId: 查看好友UID[0].uId
                    },
                });
                if (查看好友种植.ecode != -10000) {
                    break
                }
                await shark.delay(65)
            } while (true)

            for (const list2 of 节气种子ID合集) {
                let x = 0
                for (const list of 查看好友种植.farmlandStatus) {
                    if (list.a == list2 && list.b ==6) {
                        // shark.logger.log(list.a)
                        // shark.logger.log(x)
                        const 偷取 = await shark.reqest({
                            name: "偷取土地" + x + "作物" + list.a,
                            url: "{!nc}cgi_farm_steal_v2?mod=farmlandstatus&act=scrounge",
                            data: {
                                v_client: 1,
                                place: x,
                                ownerId: 查看好友UID[0].uId
                            },
                        });
                        //shark.logger.log(偷取上限)
                        if (偷取.code == 1) {
                            shark.logger.log("成功偷取" + 偷取.seedId)
                        }
                        else{
                            break
                        }
                        await shark.delay(1)
                    }
                    x++
                }
            }
        }
        do {
            查看收获状态 = await shark.reqest({
                name: "查看收获状态",
                url: "{!nc}cgi_farm_index?=user&actmod=run",
                data: {
                },
            });
            if (查看收获状态.ecode != -10000) {
                break
            }
            await shark.delay(65)
        } while (true)
        let x = 0
        for (const list of 查看收获状态.farmlandStatus) {
            if (list.b == 6 && shark.rule.自动收获 == 1) {
                await shark.reqest({
                    name: "土地" + x + "收获",
                    url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=harvest",
                    data: {
                        v_client: 1,
                        place: x,
                    },
                });
            }
            x++
        }
        do {
            查看土地状态 = await shark.reqest({
                name: "查看土地状态",
                url: "{!nc}cgi_farm_index?=user&actmod=run",
                data: {
                },
            });
            if (查看土地状态.ecode != -10000) {
                break
            }
            await shark.delay(65)
        } while (true)
        x = 0
        for (const list of 查看土地状态.farmlandStatus) {
            if (list.b == 7) {
                await shark.reqest({
                    name: "土地" + x + "翻地",
                    url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=scarify",
                    data: {
                        v_client: 1,
                        place: x,
                        cropStatus: 7,
                    },
                });
                let 种植计划 = shark.rule.指定种子.split('+')
                // shark.logger.log(种植计划)
                top:
                for (const list of 种植计划) {
                    const 计划项 = list.split('=')
                    const 种植田地 = 计划项[0].split('-').map(v => Number(v))
                    if (计划项[1] == -1) {
                        备选种子 = 节气种子ID合集
                    }
                    else {
                        备选种子 = 计划项[1].split(',')
                    }
                    const 查看背包 = await shark.reqest({
                        name: "查看背包",
                        url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed",
                        data: {
                        },
                    });
                    for (const list3 of 备选种子) {
                        // shark.logger.log(list3)
                        for (const list2 of 查看背包) {
                            if (list3 == list2.cId) {
                                // shark.logger.log("名称" + list2.cName + "数量" + list2.amount)
                                if (种植田地[0] <= x && x <= 种植田地[1]) {
                                    const 查看背包 = await shark.reqest({
                                        name: "土地" + x + "种植" + list2.cName,
                                        url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=planting",
                                        data: {
                                            v_client: 1,
                                            place: x,
                                            cId: list2.cId,
                                        },
                                    });
                                    break top;
                                }
                            }
                        }
                    }
                }
            }
            if (list.b == 0) {
                let 种植计划 = shark.rule.指定种子.split('+')
                // shark.logger.log(种植计划)
                top:
                for (const list of 种植计划) {
                    const 计划项 = list.split('=')
                    const 种植田地 = 计划项[0].split('-').map(v => Number(v))
                    //  shark.logger.log(计划项[1] )
                    if (种植田地[0] <= x && x <= 种植田地[1]) {
                        if (计划项[1] == -1) {
                            备选种子 = 节气种子ID合集
                        }
                        else {
                            备选种子 = 计划项[1].split(',')
                        }
                        const 查看背包 = await shark.reqest({
                            name: "查看背包",
                            url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed",
                            data: {
                            },
                        });
                        // shark.logger.log(备选种子)
                        for (const list3 of 备选种子) {
                            // shark.logger.log(list3)
                            for (const list2 of 查看背包) {
                                if (list3 == Number(list2.cId)) {
                                    //shark.logger.log("名称" + list2.cName + "数量" + list2.amount)

                                    const 查看背包 = await shark.reqest({
                                        name: "土地" + x + "种植" + list2.cName,
                                        url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=planting",
                                        data: {
                                            v_client: 1,
                                            place: x,
                                            cId: list2.cId,
                                        },
                                    });
                                    break top;
                                }
                            }
                        }
                    }
                }
            }
            x++
        }
        shark.logger.log("种植结束")
        shark.logger.log("种植检测等待时间" + shark.rule.循环检测时间)
        await shark.delay(shark.rule.循环检测时间);
    } while (true);
}