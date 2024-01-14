// 定义插件名字
pluginName = "例-矿山活动合集";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 实现矿山活动数据查看";
// 插件版本
pluginVersion = "2.0.5";
// 定义参数
pluginInputs = [
  {
    key: "activity_type",
    title: "当前活动",
    placeholder: "请选择当前活动",
    type: "select",
    selects: [
      {
        name: "自动选择",
        value: "",
      },
      {
        name: "幸运彩币",
        value: "act_ios_xyb",
      },
      {
        name: "矿工糖果",
        value: "act_ios_kgtg",
      },
      {
        name: "考古时代",
        value: "act_ios_kgsd",
      },
      {
        name: "宝石开开乐",
        value: "act_ios_bs",
      },
    ],
  },
  {
    key: "auto_exchange",
    title: "自动兑换",
    placeholder: "1:开启",
  },
  {
    key: "exchange_time",
    title: "兑换时间",
    placeholder: "默认:20 范围:[12,22]",
  },
];

const activityConfigMap = {
  act_ios_xyb: {
    uri: "act_ios_xyb",
    activity: "mineLuckyCoinAct",
    name: "幸运彩币",
    items: ["红币", "橙币", "蓝币"],
    counts: [
      [30, 0, 0],
      [40, 15, 0],
      [40, 40, 40],
    ],
  },
  act_ios_kgtg: {
    uri: "act_ios_kgtg",
    activity: "kgtgAct",
    name: "矿工糖果",
    items: ["酥糖", "奶糖", "巧克力"],
    counts: [
      [20, 5, 0],
      [0, 25, 10],
      [30, 30, 45],
    ],
  },
  act_ios_kgsd: {
    uri: "act_ios_kgsd",
    activity: "kgsdAct",
    name: "考古时代",
    items: ["号角", "排箫", "陶笛"],
    counts: [
      [40, 0, 0],
      [0, 45, 0],
      [0, 0, 60],
    ],
  },
  act_ios_bs: {
    uri: "act_ios_bs",
    activity: "gemGambleAct",
    name: "宝石开开乐",
    items: [],
    counts: [],
  },
};
const getActivityConfig = function () {
  if (shark.rule.activity_type) {
    return activityConfigMap[shark.rule.activity_type];
  } else {
    for (const activityType in activityConfigMap) {
      if (shark.isActivityInPogress("appfarm-asset", activityConfigMap[activityType].activity)) {
        return activityConfigMap[activityType];
      }
    }
  }
  return null;
};

onPluginStart = async function () {
  if (shark.rule.auto_exchange != "1") {
    return;
  }

  const activityConfig = getActivityConfig();
  if (!activityConfig) {
    return;
  }
  if (activityConfig.name == "宝石开开乐") {
    return;
  }
  const { name, uri, activity, counts } = activityConfig;
  // 不是最后一天不用管
  if (!shark.isActivityLastDay("appfarm-asset", activity)) {
    return;
  }
  let exchangeTime = Number(shark.rule.exchange_time);
  if (!(exchangeTime >= 12 && exchangeTime <= 22)) {
    exchangeTime = 20;
  }
  const curDate = new Date();
  const curHours = curDate.getHours();
  if (curHours < exchangeTime) {
    // 还没到8点 等到8点再处理
    await shark.delay((exchangeTime - curHours) * 60 * 60);
  }

  while (true) {
    const data = await shark.reqest({
      name: `获取${name}数据`,
      url: `{!nc}${uri}`,
      data: {
        act: "index",
      },
    });

    if (data.ecode != 0) {
      // 等60秒再试试
      await shark.delay(60);
      continue;
    }

    let needRestart = false;
    for (let idx = counts.length - 1; idx >= 0; idx--) {
      const [item1Count, item2Count, item3Count] = counts[idx];
      do {
        if (data.ex1 < item1Count) {
          break;
        }
        if (data.ex2 < item2Count) {
          break;
        }
        if (data.ex3 < item3Count) {
          break;
        }

        const exchangeData = await shark.reqest({
          name: `兑换${name}礼包${idx + 1}`,
          url: `{!nc}${uri}`,
          data: {
            act: "ex",
            id: idx + 1,
          },
        });

        if (exchangeData.ecode != 0) {
          shark.logger.log(`兑换失败! 稍后会自动重试`);
          // 等60秒再试试
          await shark.delay(60);
          needRestart = true;
          break;
        }
        shark.logger.log(
          `获得${name}礼包${idx + 1}奖励[${
            exchangeData.pkg
              ? shark.convertPkgToStr(exchangeData.pkg)
              : exchangeData.itemTip
          }]`
        );
        data.ex1 -= item1Count;
        data.ex2 -= item2Count;
        data.ex3 -= item3Count;
      } while (true);

      if (needRestart) {
        break;
      }
    }

    if (needRestart) {
      continue;
    }
    // 没有可以兑换的了
    break;
  }
};

// 记录上一次获取到数据的时间
let lastGetKklDataTime = 0;
// 记录上一次获取到的数据
let lastGetMineData = null;
let lastGetKklData = null;
const onKklPanelShow = async function (refresh) {
  if (Date.now() - lastGetDataTime > 3 * 60 * 1000) {
    const mineInfo = await shark.reqest({
      name: "获取矿山信息",
      url: "{!nc}cgi_ios_mine",
      data: {
        act: "index",
      },
    });
    if (mineInfo.ecode != 0) {
      shark.logger.log(`获取矿山信息失败了!`);
      return;
    }
    await shark.delay(1);

    const kklInfo = await shark.reqest({
      name: "获取宝石开开乐信息",
      url: "{!nc}act_ios_bs",
      data: { act: "index" },
    });
    if (kklInfo.ecode != 0) {
      shark.logger.log(`获取宝石开开乐信息失败了!`);
      return;
    }

    // 请求成功更新记录
    lastGetMineData = mineInfo;
    lastGetKklData = kklInfo;
    lastGetDataTime = Date.now();
  }

  const tableData = [
    { name: "宝石", num: lastGetMineData.baoshi },
    { name: "奖券", num: lastGetKklData.s },
    { name: "加速卡", num: lastGetMineData.jia_su },
  ];
  const columnData = [
    { name: "类型", key: "name" },
    { name: "数量", key: "num" },
  ];

  const tableData2 = [
    // {
    //   id: 1,
    //   name: "大生命瓶x2",
    //   limit: lastGetKklData.limit1,
    //   ex: `${3 - lastGetKklData.limit1}/3`,
    //   need: `15奖券`,
    // },
    { id: 6, name: "加速卡x1", limit: 0, ex: "-/+∞", need: `10奖券` },
    {
      id: 2,
      name: "钉锤x2",
      limit: lastGetKklData.limit2,
      ex: `${3 - lastGetKklData.limit2}/3`,
      need: `15奖券`,
    },
    {
      id: 3,
      name: "钉子x2",
      limit: lastGetKklData.limit3,
      ex: `${3 - lastGetKklData.limit3}/3`,
      need: `15奖券`,
    },
    {
      id: 4,
      name: "木板x2",
      limit: lastGetKklData.limit4,
      ex: `${3 - lastGetKklData.limit4}/3`,
      need: `15奖券`,
    },
    {
      id: 5,
      name: "绿色招聘券x3",
      limit: lastGetKklData.limit5,
      ex: `${3 - lastGetKklData.limit5}/3`,
      need: `15奖券`,
    },
  ];
  const columnData2 = [
    { name: "奖品", key: "name" },
    { name: "限换", key: "ex" },
    { name: "需要", key: "need" },
  ];
  refresh(tableData, columnData, tableData2, columnData2);

  const onClickExchange = async function (exData, exCount) {
    if (exData.id < 6) {
      // 除了加速卡 兑换不能超过三个
      exCount = Math.min(3 - exData.limit, exCount);
      if (exCount <= 0) {
        shark.logger.log(`[${exData.name}]已经全部兑换了,不能继续兑换!`);
        return;
      }
    }
    const onceNeedQuan = exData.id < 6 ? 15 : 10;

    while (exCount > 0) {
      if (lastGetKklData.s >= onceNeedQuan) {
        // 奖券够 先兑换一个
        const exInfo = await shark.reqest({
          name: `花费[奖券x${onceNeedQuan}]兑换[${exData.name}], 还要兑换[${
            exCount - 1
          }]次`,
          url: "{!nc}act_ios_bs",
          data: {
            act: "ex",
            id: exData.id,
          },
        });
        if (exInfo.ecode != 0) {
          shark.logger.log(`兑换失败!请刷新后重试!`);
          lastGetDataTime = 0;
          return;
        }
        // 兑换成功 更新数据
        // 次数减一
        exCount--;
        // 更新奖券数量
        lastGetKklData.s -= onceNeedQuan;
        if (exData.id == 6) {
          // 更新加速卡数量
          lastGetMineData.jia_su += 1;
        } else {
          // 更新限制数据
          lastGetKklData[`limit${exData.id}`]++;
        }
        await shark.delay(1);
        continue;
      }
      // 奖券不够 宝石抽奖来获得

      // 还需要多少奖券
      const leftNeedQuan = onceNeedQuan * exCount - lastGetKklData.s;
      // 需要奖券数量超过10就开10次 否则开一次
      const openCount = leftNeedQuan >= 10 ? 10 : 1;
      // 需要多少宝石
      const needBaoshi = openCount * 200;
      // 不够了开不下去了
      if (lastGetMineData.baoshi < needBaoshi) {
        shark.logger.log(`宝石不足!兑换已自动暂停!`);
        return;
      }
      const randInfo = await shark.reqest({
        name: `花费[宝石x${needBaoshi}]抽奖[${openCount}]次`,
        url: "{!nc}act_ios_bs",
        data: {
          act: "rand",
          id: 1,
          count: openCount,
        },
      });
      if (randInfo.ecode != 0) {
        shark.logger.log(`兑换出错!请刷新后重试!`);
        lastGetDataTime = 0;
        return;
      }
      shark.logger.log(`获得奖励[${shark.convertPkgToStr(randInfo.pkg)}]`);

      // 更新数据
      // 更新宝石数量
      lastGetMineData.baoshi -= needBaoshi;
      // 更新奖券数量
      for (const item of randInfo.pkg) {
        if (item.id == 5042) {
          lastGetKklData.s += 1;
        }
      }

      await shark.delay(1);
    }

    if (exCount == 0) {
      shark.logger.log(`已全部兑换完成!`);
    }
  };
  return {
    兑换1个: async function (data) {
      await onClickExchange(data, 1);
    },
    兑换3个: async function (data) {
      await onClickExchange(data, 3);
    },
    兑换10个: async function (data) {
      await onClickExchange(data, 10);
    },
    兑换50个: async function (data) {
      await onClickExchange(data, 50);
    },
    兑换100个: async function (data) {
      await onClickExchange(data, 100);
    },
  };
};

// 记录上一次获取到数据的时间
let lastGetDataTime = 0;
// 记录上一次获取到的数据
let lastGetData = null;

// 面板显示钩子函数
// 会在每次显示面板时调用
// refresh是个函数, 当数据准备好了之后需要调用refresh传递数据去更新页面
onPanelShow = async function (refresh) {
  const activityConfig = getActivityConfig();
  if (!activityConfig) {
    const tableData = [{ tips: "当前没有收集活动" }];
    const columnData = [{ name: "提示", key: "tips" }];
    refresh(tableData, columnData);
    return;
  }
  if (activityConfig.name == "宝石开开乐") {
    return await onKklPanelShow(refresh);
  }
  const { name, uri, items, counts } = activityConfig;
  if (Date.now() - lastGetDataTime > 3 * 60 * 1000) {
    // 距离上次请求已经超过3分钟 请求最新的数据
    const data = await shark.reqest({
      name: `获取${name}数据`,
      url: `{!nc}${uri}`,
      data: {
        act: "index",
      },
    });

    // ecode 不是0 请求失败了
    if (data.ecode != 0) {
      shark.logger.log(`获取活动信息失败了!`);
      return;
    }
    // 请求成功更新记录
    lastGetData = data;
    lastGetDataTime = Date.now();
  }

  // 第一个 设置表内容数据
  // 格式为对象的数组 对象内字段名没有限制
  const tableData = [];
  for (let itemId = 1; itemId <= 3; itemId++) {
    tableData.push({
      itemName: items[itemId - 1],
      totalNum: lastGetData[`ex${itemId}`],
      todayNum: lastGetData[`l${itemId}`],
    });
  }
  // 第二个 设置显示列
  // 格式固定为  name: 列名称  key: 使用上面表数据的哪个字段名
  const columnData = [
    { name: "道具名称", key: "itemName" },
    { name: "道具总数", key: "totalNum" },
    { name: "今天获得", key: "todayNum" },
  ];

  const tableData2 = [];
  for (let giftId = 1; giftId <= 3; giftId++) {
    tableData2.push({
      giftId: giftId,
      needCount1: counts[giftId - 1][0],
      needCount2: counts[giftId - 1][1],
      needCount3: counts[giftId - 1][2],
    });
  }

  const columnData2 = [
    { name: "礼包", key: "giftId" },
    { name: items[0], key: "needCount1" },
    { name: items[1], key: "needCount2" },
    { name: items[2], key: "needCount3" },
  ];

  refresh(tableData, columnData, tableData2, columnData2);

  return {
    兑换: async function (data) {
      for (let itemId = 1; itemId <= 3; itemId++) {
        const itemName = tableData[itemId - 1].itemName;
        const totalNum = tableData[itemId - 1].totalNum;
        const needCount = tableData2[data.giftId - 1][`needCount${itemId}`];
        if (totalNum < needCount) {
          shark.logger.log(
            `礼包${
              data.giftId
            }需要[${itemName}x${needCount}], 还差[${itemName}x${
              needCount - totalNum
            }]`
          );
          return;
        }
      }

      const exchangeData = await shark.reqest({
        name: `兑换${name}礼包${data.giftId}`,
        url: `{!nc}${uri}`,
        data: {
          act: "ex",
          id: data.giftId,
        },
      });

      lastGetDataTime = 0;
      if (exchangeData.ecode != 0) {
        lastGetDataTime = 0;
        shark.logger.log(`兑换失败! 请刷新后重试!`);
        return;
      }
      shark.logger.log(
        `获得${name}礼包${data.giftId}奖励[${
          exchangeData.pkg
            ? shark.convertPkgToStr(exchangeData.pkg)
            : exchangeData.itemTip
        }]`
      );

      // 刷新数据
      for (let itemId = 1; itemId <= 3; itemId++) {
        const needCount = tableData2[data.giftId - 1][`needCount${itemId}`];
        lastGetData[`ex${itemId}`] -= needCount;
      }
    },
  };
};
