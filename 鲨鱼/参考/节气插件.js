pluginName = "节气插件";

pluginAuthor = "等雨停";

pluginDescription = "仅支持1.6.22及以上版本使用!-V5.1正式版";

pluginInputs = [
  {
    key: "special",
    title: "处理特殊订单类型",
    placeholder: "请阅读插件说明",
  },
  {
    key: "pulbictask_num",
    title: "每天提交总订单的上限",
    placeholder: "请阅读插件说明",
  },
  {
    key: "exceed",
    title: "提交的订单溢值最大值",
    placeholder: "请阅读插件说明",
  },
  {
    key: "score",
    title: "向日葵积分",
    placeholder: "请阅读插件说明",
  },
  {
    key: "threshold",
    title: "分界值",
    placeholder: "请阅读插件说明",
  },
  {
    key: "l_seed",
    title: "领取每日种子",
    placeholder: "0=不领，1=领取，请阅读插件说明",
  },
  {
    key: "ex_time",
    title: "领取积分奖励时间",
    placeholder: "请阅读插件说明",
  },
  {
    key: "ex_exchang",
    title: "兑换奖励",
    placeholder: "可不填。请阅读插件说明",
  },
];
let scores = 0;
let sun = 0;
let jieqidian = 0;
let tasksnum = 0;
let specialnum = 0;
let todayseed = 0;
let time = 0;
let libao = 0;
let ex_id = new Array();
let itemList_buyTimes = new Array(); //购买的次数
let itemList_itemId = new Array(); //购买的id
let itemList_price = new Array(); //购买的价格

let seedLists = new Array();
let nowcrops = [0, 0, 0, 0];
let abandons = new Array();
let abandontimes = new Array();
let needIds = new Array();
let needNums = new Array();
let specials = new Array();
let task_gift_sun = new Array();
let task_gift_jf = new Array();
let task_gift_qt = new Array();
let gift_ex = [200, 600, 1000, 1500, 2500, 5000];
let score_gift_ex = new Array();
onPluginStart = async function () {
  const jqdd = await shark.reqest({
    name: `查看节气订单`,
    url: "{!nc}cgi_farm_seedhb",
    data: { act: "9" },
  });
  if (jqdd.ecode != 0) {
    shark.logger.log("请求节气订单错误");
    return;
  }
  scores = jqdd.score;
  todayseed = jqdd.l_seed_ex;
  libao = jqdd.score_gift_ex;
  for (let a = 0; a < 4; a++) {
    seedLists[a] = jqdd.seedList[a].id;
  }
  await shark.delay(1);

  for (let a = 0; a < 6; a++) {
    score_gift_ex[a] = libao % 10;
    libao = Math.floor(libao / 10);
  }
  await shark.delay(1);

  const ck = await shark.reqest({
    name: `查看仓库作物`,
    url: "{!nc}cgi_farm_getusercrop",
    data: { f: 1 },
  });
  await shark.delay(1);
  for (let b = 0; b < 4; b++) {
    for (const rep of ck.crop) {
      if (rep.cId == seedLists[b]) {
        nowcrops[b] = rep.amount;
      }
    }
  }
  Refresh();
  if (shark.rule.ex_exchang) {
    Reygsd();
  }
  await xrk();
  time = shark.getFarmTime();
  await shark.delay(1);
  while (scores < shark.rule.score) {
    await shark.delay(2);
    if (shark.getFarmTime() - time > 300) {
      const jqdd = await shark.reqest({
        name: `查看节气订单`,
        url: "{!nc}cgi_farm_seedhb",
        data: { act: "9" },
      });
      if (jqdd.ecode != 0) {
        shark.logger.log("请求节气订单错误");
        return;
      }
      scores = jqdd.score;
      todayseed = jqdd.l_seed_ex;
      libao = jqdd.score_gift_ex;
      for (let a = 0; a < 4; a++) {
        seedLists[a] = jqdd.seedList[a].id;
      }
      await shark.delay(1);
      for (let a = 0; a < 6; a++) {
        score_gift_ex[a] = libao % 10;
        libao = Math.floor(libao / 10);
      }
      await shark.delay(1);

      const ck = await shark.reqest({
        name: `查看仓库作物`,
        url: "{!nc}cgi_farm_getusercrop",
        data: { f: 1 },
      });
      await shark.delay(1);
      for (let b = 0; b < 4; b++) {
        for (const rep of ck.crop) {
          if (rep.cId == seedLists[b]) {
            nowcrops[b] = rep.amount;
          }
        }
      }
      Refresh();
      if (shark.rule.ex_exchang) {
        Reygsd();
      }
      time = shark.getFarmTime();
      await shark.delay(1);
    }
    await xrk();
    await shark.delay(1);
    duihuanlj();

    let num;
    if (shark.isFarmVip()) {
      num = 15;
    } else {
      num = 12;
    }
    await shark.delay(1);
    //如果设置领取种子且可领取，则领取种子

    if (!todayseed && shark.rule.l_seed) {
      lqseed();
    }
    await shark.delay(2);
    //遍历订单，判断是否需要放弃
    for (let taskid = 0; taskid < 9; taskid++) {
      for (let key = 0; key < 4; key++) {
        if (needIds[taskid] == seedLists[key]) {
          if (
            !abandons[taskid] &&
            specials[taskid] == 1 &&
            (shark.rule.special == 2 ||
              shark.rule.special == 3 ||
              shark.rule.special == 6)
          ) {
            //如果是金币单，非冷却中，且没有设置提交金币相关订单，则放弃该特殊订单
            shark.logger.log(
              `特殊金币订单${taskid + 1},奖励[阳光:${
                task_gift_sun[taskid]
              },积分:${task_gift_jf[taskid]},金币:${
                task_gift_qt[taskid]
              }],与设置${shark.rule.special}相斥，放弃`
            );
            abandontask(taskid + 1, 1);
            break;
          } else if (
            !abandons[taskid] &&
            specials[taskid] == 2 &&
            (shark.rule.special == 1 ||
              shark.rule.special == 3 ||
              shark.rule.special == 5)
          ) {
            //如果是点券单，非冷却中，且没有设置提交点券相关订单，则放弃该特殊订单
            shark.logger.log(
              `特殊点券订单${taskid + 1},奖励[阳光:${
                task_gift_sun[taskid]
              },积分:${task_gift_jf[taskid]},点券:${
                task_gift_qt[taskid]
              }],与设置${shark.rule.special}相斥，放弃`
            );
            abandontask(taskid + 1, 1);
            break;
          } else if (
            !abandons[taskid] &&
            specials[taskid] == 3 &&
            (shark.rule.special == 1 ||
              shark.rule.special == 2 ||
              shark.rule.special == 4)
          ) {
            //如果是节气单，非冷却中，且没有设置提交节气相关订单，则放弃该特殊订单
            shark.logger.log(
              `特殊节气订单${taskid + 1},奖励[阳光:${
                task_gift_sun[taskid]
              },积分:${task_gift_jf[taskid]},节气点:${
                task_gift_qt[taskid]
              }],与设置${shark.rule.special}相斥，放弃`
            );
            abandontask(taskid + 1, 1);
            break;
          } else if (
            !abandons[taskid] &&
            specials[taskid] &&
            !shark.rule.special
          ) {
            //任意非冷却中的特殊单，没有设置处理特殊订单，则放弃该特殊订单
            shark.logger.log(
              `没有设置处理特殊订单,放弃特殊订单${taskid + 1},类型为:${
                specials[taskid]
              },所需数量:${needNums[taskid]},奖励[阳光:${
                task_gift_sun[taskid]
              },积分:${task_gift_jf[taskid]},额外:${
                task_gift_qt[taskid]
              }],仓库数量:${nowcrops[key]}`
            );
            abandontask(taskid + 1, 1);
            break;
          } else if (
            !abandons[taskid] &&
            specialnum == num &&
            needNums[taskid] - task_gift_jf[taskid] * 10 > shark.rule.exceed &&
            !specials[taskid]
          ) {
            //如果特殊单已达上限，非冷却中，普通订单不符合溢出值，则放弃普通单
            shark.logger.log(
              `普通订单${taskid + 1}不符合溢出值，放弃,所需数量:${
                needNums[taskid]
              },奖励[阳光:${task_gift_sun[taskid]},积分:${
                task_gift_jf[taskid]
              }],仓库数量:${nowcrops[key]}`
            );
            abandontask(taskid + 1, 2);
            break;
          } else if (
            !abandons[taskid] &&
            specialnum == num &&
            !specials[taskid] &&
            needNums[taskid] > nowcrops[key] &&
            (nowcrops[0] >= shark.rule.threshold ||
              nowcrops[1] >= shark.rule.threshold ||
              nowcrops[2] >= shark.rule.threshold ||
              nowcrops[3] >= shark.rule.threshold)
          ) {
            //如果特殊单已全部刷出，非冷却中，普通订单库存不足，且仓库内有符合分界值数量的作物，则放弃普通单
            abandontask(taskid + 1, 2);
            break;
          } else if (
            !abandons[taskid] &&
            specialnum < num &&
            !specials[taskid]
          ) {
            //如果特殊单还没全部刷出，普通单非冷却中，则放弃普通单
            abandontask(taskid + 1, 2);
            break;
          }
        }
      }
    }
    await shark.delay(3);

    //遍历订单，判断是否需要提交
    for (let taskid = 0; taskid < 9; taskid++) {
      for (let key = 0; key < 4; key++) {
        if (needIds[taskid] == seedLists[key]) {
          if (scores >= shark.rule.score) {
            await shark.delay(3);
            shark.logger.log(
              "已达订单的[阳光值]上限,当前阳光值:" +
                scores +
                ",设置上限为:" +
                shark.rule.score
            );
            return;
          } else if (tasksnum >= shark.rule.pulbictask_num) {
            await shark.delay(3);
            shark.logger.log(
              "已达订单的[提交]上限,当前提交:" +
                tasksnum +
                ",设置上限为:" +
                shark.rule.pulbictask_num
            );
            return;
          } else if (
            scores < shark.rule.score &&
            tasksnum < shark.rule.pulbictask_num &&
            !abandons[taskid] &&
            needNums[taskid] <= nowcrops[key] &&
            specials[taskid] == 1 &&
            (shark.rule.special == 1 ||
              shark.rule.special == 4 ||
              shark.rule.special == 5 ||
              shark.rule.special == 7)
          ) {
            //如果特殊单是金币单，非冷却中，作物充足，符合设置，则提交该特殊单
            finishtask(taskid + 1, 1);
            nowcrops[key] -= needNums[taskid];
            break;
          } else if (
            scores < shark.rule.score &&
            tasksnum < shark.rule.pulbictask_num &&
            !abandons[taskid] &&
            needNums[taskid] <= nowcrops[key] &&
            specials[taskid] == 2 &&
            (shark.rule.special == 2 ||
              shark.rule.special == 4 ||
              shark.rule.special == 6 ||
              shark.rule.special == 7)
          ) {
            //如果特殊单是点券单，非冷却中，作物充足，符合设置，则提交该特殊单
            finishtask(taskid + 1, 1);
            nowcrops[key] -= needNums[taskid];
            break;
          } else if (
            scores < shark.rule.score &&
            tasksnum < shark.rule.pulbictask_num &&
            !abandons[taskid] &&
            needNums[taskid] <= nowcrops[key] &&
            specials[taskid] == 3 &&
            (shark.rule.special == 3 ||
              shark.rule.special == 5 ||
              shark.rule.special == 6 ||
              shark.rule.special == 7)
          ) {
            //如果特殊单是节气单，非冷却中，作物充足，符合设置，则提交该特殊单
            finishtask(taskid + 1, 1);
            nowcrops[key] -= needNums[taskid];
            break;
          } else if (
            scores < shark.rule.score &&
            tasksnum < shark.rule.pulbictask_num &&
            !abandons[taskid] &&
            specialnum == num &&
            needNums[taskid] <= nowcrops[key] &&
            needNums[taskid] - task_gift_jf[taskid] * 10 <= shark.rule.exceed &&
            !specials[taskid]
          ) {
            //如果特殊单已全部刷出，订单非冷却中，作物充足，符合溢出值，则提交该订单
            shark.logger.log(
              `普通订单${taskid + 1}符合溢值，提交,所需数量:${
                needNums[taskid]
              },奖励[阳光:${task_gift_sun[taskid]},积分:${
                task_gift_jf[taskid]
              }],仓库数量:${nowcrops[key]}`
            );
            finishtask(taskid + 1, 2);
            nowcrops[key] -= needNums[taskid];
            break;
          } else {
            break;
          }
        }
        await shark.delay(3);
      }
    }
    await shark.delay(2);
  }
  function duihuanlj() {
    if (shark.rule.ex_exchang) {
      ex_id = shark.rule.ex_exchang.match(/\d+(\.\d+)?/g);
      for (let b = 0; b < ex_id.length; b++) {
        if (itemList_buyTimes[ex_id[b] - 1] < 9) {
          if (sun >= itemList_price[ex_id[b] - 1]) {
            yg_exchang(ex_id[b]);
          }
          return;
        } else if (itemList_buyTimes[ex_id[b] - 1] == 9) {
          continue;
        } else {
          return;
        }
      }
    }
  }
  async function lqseed() {
    await shark.reqest({
      name: `领取每日种子`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "10" },
      cd: 3,
      callback: (data) => {
        if (data.ecode != 0) {
          return;
        }
        todayseed = 1;
        let str = "";
        if (data.pkg) {
          for (const item of data.pkg) {
            str += `作物${item.id}x${item.num}`;
          }
        }
        shark.logger.log(`今日获得:${str}`);
      },
    });
  }

  function finishtask(taskid, type) {
    shark.reqest({
      name: `提交${type == 1 ? `特殊` : `普通`}订单${taskid}`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "2", task: taskid },
      cd: 3,
      callback: (data) => {
        if (data.ecode != 0) {
          return Refresh();
        }
        scores = data.score;
        tasksnum = data.finishcount;

        abandons = data.tasks.map((id) => id.abandon);
        abandontimes = data.tasks.map((id) => id.abandontime);
        needIds = data.tasks.map((id) => id.needId);
        needNums = data.tasks.map((id) => id.needNum);
        specials = data.tasks.map((id) => id.special);
        task_gift_sun = data.tasks.map((id) => id.rewards[0].num);
        task_gift_jf = data.tasks.map((id) => id.rewards[1].num);
        task_gift_qt = data.tasks.map((id) => id.rewards[2]?.num || 0);
        tasksnum = data.finishcount;
        specialnum = data.specialcount;
        jieqidian = data.yinyangDian;
        let str = "";
        if (data.pkg) {
          for (const item of data.pkg) {
            str += `${item.name}x${item.num}`;
          }
        }
        shark.logger.log(`提交订单${taskid}获得:${str}`);
      },
    });
    return;
  }

  function abandontask(taskid, type) {
    shark.reqest({
      name: `放弃${type == 1 ? `特殊` : `普通`}订单${taskid}`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "3", task: taskid },
      cd: 3,
      callback: (data) => {
        if (data.ecode != 0) {
          return Refresh();
        }
        tasksnum = data.finishcount;
        abandons = data.tasks.map((id) => id.abandon);
        abandontimes = data.tasks.map((id) => id.abandontime);
        needIds = data.tasks.map((id) => id.needId);
        needNums = data.tasks.map((id) => id.needNum);
        specials = data.tasks.map((id) => id.special);
        task_gift_sun = data.tasks.map((id) => id.rewards[0].num);
        task_gift_jf = data.tasks.map((id) => id.rewards[1].num);
        task_gift_qt = data.tasks.map((id) => id.rewards[2]?.num || 0);
        tasksnum = data.finishcount;
        specialnum = data.specialcount;
        jieqidian = data.yinyangDian;
      },
    });
    return;
  }
  async function xrk() {
    if (shark.rule.ex_time) {
      const week = shark.rule.ex_time.substr(0, 1);
      const tm = shark.rule.ex_time.substr(2, shark.rule.ex_time.length);
      const nowweek = new Date(shark.getFarmTime() * 1000);
      if (nowweek.getDay() == week && nowweek.getHours() >= tm) {
        for (let b = 0; b < gift_ex.length; b++) {
          if (scores >= gift_ex[b] && !score_gift_ex[b]) {
            await shark.reqest({
              name: `领取${gift_ex[b]}分奖励`,
              type: "farm",
              url: "{!nc}cgi_farm_seedhb",
              query: {},
              data: { act: "18", id: `${b + 1}` },
              cd: 3,
              callback: (data) => {
                if (data.ecode != 0) {
                  return;
                }
                shark.logger.log(`获得:${data.itemTip}`);
                score_gift_ex[b] = 1;
              },
            });
            score_gift_ex[b] = 1;
          } else {
            continue;
          }
        }
      }
    }
  }
  function yg_exchang(id) {
    shark.reqest({
      name: `兑换id:${id}`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "5", type: "2", id: id },
      cd: 3,
      callback: (data) => {
        if (data.ecode != 0) {
          return Reygsd();
        }
        sun = data.sun;
        for (let a = 0; a < itemList_itemId.length; a++) {
          if (id == itemList_itemId[a]) {
            itemList_buyTimes[a]++;
            shark.logger.log(
              `兑换${id}成功,花费${itemList_price[a]}/${sun},已兑换${itemList_buyTimes[a]}/9次`
            );
          }
        }
      },
    });
    return;
  }

  async function Refresh() {
    const shuaxin = await shark.reqest({
      name: `刷新种子订单`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "1", type: "1" },
      cd: 3,
    });
    if (shuaxin.ecode != 0) {
      return Refresh();
    }
    abandons = shuaxin.tasks.map((id) => id.abandon);
    abandontimes = shuaxin.tasks.map((id) => id.abandontime);
    needIds = shuaxin.tasks.map((id) => id.needId);
    needNums = shuaxin.tasks.map((id) => id.needNum);
    specials = shuaxin.tasks.map((id) => id.special);
    task_gift_sun = shuaxin.tasks.map((id) => id.rewards[0].num);
    task_gift_jf = shuaxin.tasks.map((id) => id.rewards[1].num);
    task_gift_qt = shuaxin.tasks.map((id) => id.rewards[2]?.num || 0);
    tasksnum = shuaxin.finishcount;
    specialnum = shuaxin.specialcount;
    jieqidian = shuaxin.yinyangDian;
    await shark.delay(2);
  }

  async function Reygsd() {
    const ygsd = await shark.reqest({
      name: `查看阳光商店`,
      type: "farm",
      url: "{!nc}cgi_farm_seedhb",
      query: {},
      data: { act: "4", type: "2" },
      cd: 3,
    });
    if (ygsd.ecode != 0) {
      return Reygsd();
    }
    itemList_buyTimes = ygsd.itemList.map((id) => id.buyTimes);
    itemList_itemId = ygsd.itemList.map((id) => id.itemId);
    itemList_price = ygsd.itemList.map((id) => id.price);
    sun = ygsd.sun;
  }
};

onPanelShow = async function (refresh) {
  const tableData = new Array();

  tableData[0] = {
    name: "积分 / 节气点 / 阳光值",
    num: `${scores} / ${jieqidian} / ${sun}`,
  };
  tableData[1] = {
    name: "今日总共提交 / 遇到特殊订单",
    num: `${tasksnum} / ${specialnum}`,
  };
  tableData[2] = {
    name: "作物1 / 2 / 3 / 4",
    num: `${nowcrops[0]} / ${nowcrops[1]} / ${nowcrops[2]} / ${nowcrops[3]}`,
  };
  for (let a = 0; a < ex_id.length; a++) {
    tableData[a + 3] = {
      name: `id:${ex_id[a]} / 价格:${itemList_price[ex_id[a] - 1]}阳光值`,
      num: `已换:${itemList_buyTimes[ex_id[a] - 1]}`,
    };
  }
  const columnData = [
    { name: "字段", key: "name" },
    { name: "数量", key: "num" },
  ];
  const tableData2 = new Array();
  for (let id = 0; id < 9; id++) {
    tableData2[id] = {
      id: `${id + 1}/${
        specials[id] == 1
          ? "金币"
          : specials[id] == 2
          ? "点券"
          : specials[id] == 3
          ? "节气"
          : "普通"
      }`,
      ecode: `${abandons[id] == 0 ? "等待提交" : "CD中"}`,
      needid: `${
        needIds[id] == seedLists[0]
          ? "作物1"
          : needIds[id] == seedLists[1]
          ? "作物2"
          : needIds[id] == seedLists[2]
          ? "作物3"
          : "作物4"
      }`,
      neednum: `${needNums[id]}`,
      jf: `${
        specials[id]
          ? task_gift_jf[id] + "/" + task_gift_qt[id]
          : task_gift_jf[id]
      }`,
    };
  }
  const columnData2 = [
    { name: "任务/类型", key: "id" },
    { name: "状态", key: "ecode" },
    { name: "需作物", key: "needid" },
    { name: "需数量", key: "neednum" },
    { name: "积分/额外", key: "jf" },
  ];
  refresh(tableData, columnData, tableData2, columnData2);
};
