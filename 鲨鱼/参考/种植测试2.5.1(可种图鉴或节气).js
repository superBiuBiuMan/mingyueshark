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
        placeholder: "1-8=-1,145+9-15=5944,5945",
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
    {
        key: "强制铲除",
        title: "强制铲除",
        placeholder: "1为强制铲除",
    },
]

onPluginStart = async function () {
    do {
        let 节气种子ID合集 = []
        let 查看节气种子ID
        let 查看好友种植
        let 查看好友UID
        let 备选种子
        let 查看仓库
        let 查看背包
        let 查看土地状态
        let 美食数量 = { "2": 150, "3": 270, "65": 150, "4": 210, "5": 210, "96": 30, "71": 90, "99": 60, "6": 150, "51": 60, "7": 270, "98": 90, "305": 60, "8": 150, "37": 90, "306": 150, "97": 150, "9": 480, "10": 180, "70": 30, "14": 30, "100": 30, "50": 120, "27": 30, "49": 60, "52": 90, "42": 60, "48": 30, "77": 30, "63": 120, "68": 90 }
        let 美食ID = [2, 3, 65, 4, 5, 96, 71, 99, 6, 51, 7, 98, 305, 8, 37, 306, 97, 9, 10, 70, 14, 100, 50, 27, 49, 52, 42, 48, 77, 63, 68]
        let 手机订单ID = []
        let 查看手机订单ID
        let 可操作 = false
        let 不铲除ID = []
        do {
            查看节气种子ID = await shark.reqest({
                name: "节气种子ID",
                url: "{!nc}cgi_farm_seedhb?act=9",
                data: {
                },
            });
            if (判断未频繁(查看节气种子ID)) {
                break
            }
            await shark.delay(65)
        } while (true)

        for (const list of 查看节气种子ID.seedList) {
            节气种子ID合集.push(list.id)
        }
        function 判断未频繁(XX) {
            if (XX.ecode != -10000) {
                return true
            } else {
                return false
            }
        }
        async function 获取手机订单() {
            do {
                查看手机订单ID = await shark.reqest({
                    name: "查看手机订单ID",
                    url: "{!nc}query?act=2216001",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });
                if (判断未频繁(查看手机订单ID)) {
                    break
                }
                await shark.delay(65)
            } while (true)

            if (查看手机订单ID.order_1_num1 < 查看手机订单ID.order_1_t1) {
                手机订单ID.push(查看手机订单ID.order_1_id1)
            }
            if (查看手机订单ID.order_1_num2 < 查看手机订单ID.order_1_t2) {
                手机订单ID.push(查看手机订单ID.order_1_id2)
            }
            if (查看手机订单ID.order_1_num1 >= 查看手机订单ID.order_1_t1 && 查看手机订单ID.order_1_num2 >= 查看手机订单ID.order_1_t2 && 查看手机订单ID.order_1_state == 0) {
                await shark.reqest({
                    name: "提交手机订单1",
                    url: "{!nc}exchange?act=2216003&index=1",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });//提交订单
            }
            if (查看手机订单ID.order_2_num1 < 查看手机订单ID.order_2_t1) {
                手机订单ID.push(查看手机订单ID.order_2_id1)
            }
            if (查看手机订单ID.order_2_num2 < 查看手机订单ID.order_2_t2) {
                手机订单ID.push(查看手机订单ID.order_2_id2)
            }
            if (查看手机订单ID.order_2_num1 >= 查看手机订单ID.order_2_t1 && 查看手机订单ID.order_2_num2 >= 查看手机订单ID.order_2_t2 && 查看手机订单ID.order_2_state == 0) {
                await shark.reqest({
                    name: "提交手机订单2",
                    url: "{!nc}exchange?act=2216003&index=2",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });//提交订单
            }
            if (查看手机订单ID.order_3_num1 < 查看手机订单ID.order_3_t1) {
                手机订单ID.push(查看手机订单ID.order_3_id1)
            }
            if (查看手机订单ID.order_3_num2 < 查看手机订单ID.order_3_t2) {
                手机订单ID.push(查看手机订单ID.order_3_id2)
            }
            if (查看手机订单ID.order_3_num1 >= 查看手机订单ID.order_3_t1 && 查看手机订单ID.order_3_num2 >= 查看手机订单ID.order_3_t2 && 查看手机订单ID.order_3_state == 0) {
                await shark.reqest({
                    name: "提交手机订单3",
                    url: "{!nc}exchange?act=2216003&index=3",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });//提交订单
            }
            if (查看手机订单ID.order_4_num1 < 查看手机订单ID.order_4_t1) {
                手机订单ID.push(查看手机订单ID.order_4_id1)
            }
            if (查看手机订单ID.order_4_num2 < 查看手机订单ID.order_4_t2) {
                手机订单ID.push(查看手机订单ID.order_4_id2)
            }
            if (查看手机订单ID.order_4_num1 >= 查看手机订单ID.order_4_t1 && 查看手机订单ID.order_4_num2 >= 查看手机订单ID.order_4_t2 && 查看手机订单ID.order_4_state == 0) {
                await shark.reqest({
                    name: "提交手机订单4",
                    url: "{!nc}exchange?act=2216003&index=4",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });//提交订单
            }
            if (手机订单ID.length == 0 && shark.getFarmTime() - 查看手机订单ID.ts > 3600 * 40) {
                await shark.reqest({
                    name: "刷新订单",
                    url: "{!nc}exchange?act=2216002",
                    data: {
                        platform: 14,
                        market: 16,
                    },
                });//刷新订单
            }
        }
        获取手机订单()
        if (shark.rule.偷取指定QQ号 > 0) {
            do {
                查看好友UID = await shark.reqest({
                    name: "查看好友UID",
                    url: "{!nc}cgi_farm_getFriendList",
                    data: {
                        uinlist: shark.rule.偷取指定QQ号,
                    },
                });
                if (判断未频繁(查看好友UID)) {
                    break
                }
                await shark.delay(65)
            } while (true)
            do {
                查看好友种植 = await shark.reqest({
                    name: "查看好友种植作物",
                    url: "{!nc}cgi_farm_index",
                    data: {
                        act: "run",
                        ownerId: 查看好友UID[0].uId
                    },
                });
                if (判断未频繁(查看好友种植)) {
                    break
                }
                await shark.delay(65)
            } while (true)

            for (const list2 of 节气种子ID合集) {
                let x = 0
                for (const list of 查看好友种植.farmlandStatus) {
                    if (list.a == list2 && list.b == 6) {
                        const 偷取 = await shark.reqest({
                            name: "偷取土地" + x + "作物" + list.a,
                            url: "{!nc}cgi_farm_steal_v2?mod=farmlandstatus&act=scrounge",
                            data: {
                                v_client: 1,
                                place: x,
                                ownerId: 查看好友UID[0].uId
                            },
                        });
                        if (偷取.ecode) {
                            if (偷取.direction == "今日节气种子偷取已到上限~")
                                break
                        } else {
                            shark.logger.log("成功偷取土地" + x + "作物" + 偷取[0].seedId)
                        }
                        await shark.delay(1)
                    }
                    x++
                }
            }
        }
        do {
            可操作 = false
            查看土地状态 = await shark.reqest({
                name: "查看土地状态",
                url: "{!nc}cgi_farm_index?=user&actmod=run",
                data: {
                },
            });
            for (const list of 查看土地状态.farmlandStatus) {
                if (list.b == 6 && shark.rule.自动收获 == 1) {  //可收获
                    await shark.reqest({
                        name: "土地" + x + "收获",
                        url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=harvest",
                        data: {
                            v_client: 1,
                            place: x,
                        },
                    });
                    可操作 = true
                }
                if (list.b == 7) {  //可翻地
                    await shark.reqest({
                        name: "土地" + x + "翻地",
                        url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=scarify",
                        data: {
                            v_client: 1,
                            place: x,
                            cropStatus: 7,
                        },
                    });
                    可操作 = true
                }
            }

            if (判断未频繁(查看土地状态) && 可操作 == false) {
                break
            }
            await shark.delay(65)
        } while (true)
        do {
            查看背包 = await shark.reqest({
                name: "查看背包",
                url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed",
                data: {
                },
            })
            查看仓库 = await shark.reqest({
                name: "查看仓库",
                url: "{!nc}cgi_farm_getusercrop?f=1",
                data: {
                },
            });
            if (判断未频繁(查看背包) && 判断未频繁(查看仓库)) {
                break
            }
            await shark.delay(65)
        } while (true)
        for (const 美食循环 of 美食ID) {  //去除种植满了的美食ID
            for (const 仓库循环 of 查看仓库.crop) {
                if (仓库循环.cId == 美食循环 && 仓库循环.amount > 美食数量[美食循环])
                    美食ID = 美食ID.filter(item => item != 美食循环)  //库存大于需求，去除
            }
        }
        let x = 0
        let 种植计划 = shark.rule.指定种子.split('+')
        do {
            可操作 = false
            x = 0
            let 种植种子
            tpo: for (const list of 查看土地状态.farmlandStatus) {//循环检测土地状态
                for (const 种植计划分组 of 种植计划) { //遍历种植数组
                    备选种子 = []
                    不铲除ID = []
                    let 计划项 = 种植计划分组.split('=') //分离田地和种植方案ID
                    let 种植田地 = 计划项[0].split('-').map(v => Number(v)) //田地转为数字方便比较
                    if (种植田地[0] <= x && x <= 种植田地[1]) {//当前土地在种植方案的土地范围
                        for (const 种植 of 计划项[1].split(',')) {//遍历方案
                            if (种植 == -1) { //判断种植方案，生成可种植ID数组
                                不铲除ID.push.apply(不铲除ID, 节气种子ID合集);
                                for (const 节气循环 of 节气种子ID合集) { //遍历节气种子ID
                                    for (const 背包循环 of 查看背包) {//遍历背包种子ID
                                        if (节气循环 == Number(背包循环.cId)) { //背包内有此种子
                                            备选种子.push(节气循环); //加入到备选中
                                        }
                                    }
                                }
                            }
                            else if (种植 == -2) {
                                不铲除ID.push.apply(不铲除ID, 美食ID);//添加未满的美食ID到不铲除列表
                                let 美食ID2 = 美食ID
                                for (const 备选循环 of 美食ID) {
                                    for (const 土地循环 of 查看土地状态.farmlandStatus) {
                                        if (土地循环.a == 备选循环) {
                                            美食ID2 = 美食ID2.filter(item => item != 备选循环)  //土地已种植，去除
                                        }
                                    }
                                }
                                备选种子.push.apply(备选种子, 美食ID2);  //添加需要种植的美食ID
                            }
                            else if (种植 == -3) {
                                不铲除ID.push.apply(不铲除ID, 手机订单ID);//增加没种够的手机订单ID到不铲除列表
                                let 手机订单ID2 = 手机订单ID
                                for (const 手机循环 of 手机订单ID) {
                                    for (const 土地循环 of 查看土地状态.farmlandStatus) {
                                        if (土地循环.a == 手机循环) {
                                         //   shark.logger.log("去除" + 手机循环)
                                            手机订单ID2 = 手机订单ID2.filter(item => item != 手机循环)   //土地已种植，去除
                                        }
                                    }
                                }
                                备选种子.push.apply(备选种子, 手机订单ID2);
                            }
                            else if (种植 != "") {
                                if (不铲除ID.indexOf(list.a) == -1) {
                                    不铲除ID.push(Number(种植))
                                }
                                if (备选种子.indexOf(list.a) == -1) {
                                    备选种子.push(Number(种植))
                                }
                            }
                        }
                        // shark.logger.log(不铲除ID, "土地" + x, list.a,)
                        // shark.logger.log(备选种子)
                        if (备选种子.length == 0) {
                            shark.logger.log("土地" + x + "无合适作物")
                            continue
                        }
                        if (shark.rule.强制铲除 == 1 && 不铲除ID.indexOf(list.a) == -1 && list.b != 0) {
                            await shark.reqest({
                                name: "土地" + x + "强制铲除作物" + list.a,
                                url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=scarify",
                                data: {
                                    v_client: 1,
                                    place: x,
                                    cropStatus: 4
                                },
                            });
                            list.b = 0
                        }
                        种植种子 = 备选种子[0]
                        if (list.b == 0) {  //空地
                            for (const list2 of 查看背包) {
                                if (种植种子 == Number(list2.cId)) { //背包内有此种子
                                    await shark.reqest({
                                        name: "土地" + x + "种植" + list2.cName,
                                        url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=planting",
                                        data: {
                                            v_client: 1,
                                            place: x,
                                            cId: 种植种子,
                                        },
                                    });
                                    await shark.delay(1);
                                    do {
                                        查看土地状态 = await shark.reqest({
                                            name: "查看土地状态",
                                            url: "{!nc}cgi_farm_index?=user&actmod=run",
                                            data: {
                                            },
                                        });
                                        await shark.delay(2);
                                        查看背包 = await shark.reqest({
                                            name: "查看背包",
                                            url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed",
                                            data: {
                                            },
                                        })
                                        await shark.delay(2);
                                        if (判断未频繁(查看土地状态) && 判断未频繁(查看背包)) {
                                            可操作 = true
                                            break tpo;
                                        }
                                        await shark.delay(65)
                                    } while (true)
                                }
                            }
                            if (可操作 == false && 节气种子ID合集.indexOf(list.a) == -1) {
                                await shark.reqest({
                                    name: "土地" + x + "购买种子" + 种植种子,
                                    url: "{!ncf}cgi_farm_buyseed?mod=repertory&act=buySeed",
                                    data: {
                                        number: 1,
                                        cId: 种植种子,
                                        appid: 353,
                                    },
                                });
                                await shark.delay(1);
                                await shark.reqest({
                                    name: "土地" + x + "种植" + 种植种子,
                                    url: "{!nc}cgi_farm_plant?mod=farmlandstatus&act=planting",
                                    data: {
                                        v_client: 1,
                                        place: x,
                                        cId: 种植种子,
                                    },
                                });
                                await shark.delay(1);
                                do {
                                    查看土地状态 = await shark.reqest({
                                        name: "查看土地状态",
                                        url: "{!nc}cgi_farm_index?=user&actmod=run",
                                        data: {
                                        },
                                    });
                                    await shark.delay(2);
                                    查看背包 = await shark.reqest({
                                        name: "查看背包",
                                        url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed",
                                        data: {
                                        },
                                    })
                                    await shark.delay(2);
                                    if (判断未频繁(查看土地状态) && 判断未频繁(查看背包)) {
                                        可操作 = true
                                        break tpo;
                                    }
                                    await shark.delay(65)
                                } while (true)

                            }
                        }
                    }
                }
                x++
            }
        } while (可操作)
        shark.logger.log("种植结束")
        shark.logger.log("种植检测等待时间" + shark.rule.循环检测时间)
        await shark.delay(shark.rule.循环检测时间);
    } while (true);
}