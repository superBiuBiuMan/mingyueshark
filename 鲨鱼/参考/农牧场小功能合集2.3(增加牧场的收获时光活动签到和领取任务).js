// 定义插件名字
pluginName = "农牧场小功能合集";
// 定义作者名称
pluginAuthor = "Alex";
// 特别感谢以下作者：借用了他们的一些插件接口及部分逻辑
/* 
  等雨停
  三
*/
pluginVersion = "2.2.3";
// 鸣谢作者三，
// 定义描述
pluginDescription =
  "-------------------------------------  长期活动(面板只支持同时开启一个)  --------------------------------------------" +
  "【小摊】：只会购买农场广告小报的作物。购买作物的Id默认是：747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34 注意：如果出现频繁请关闭此功能。" +
  "【微端许愿树】： 比如有三个许愿项，你选了普通有机化肥，那么三个许愿项都是普通有机化肥。注意：需要许愿树等级是40级且农牧助手（三合一）需要关闭许愿选项（不许愿✓即可）。" +
  "【仙藏秘府】会完成仙府试炼任务宝石穿戴及合成任务并领取奖励。装备和宝石如果没有手动选择，程序会自动选择戒指和一级绿完成任务。狂战戒指装备eid=12,一级红gemid=2786,一级蓝gemid=2800,一级绿gemid=2793,一级黄gemid=2807" +
  "【微端家族商店】 【首农家族商店】 【金币兑换点卷】【点卷兑换】【时光农场答题】" +
  "【农场种植】种子填写规则：1-20:84;21-30:87， 1-20是土地范围，84是种子id。种子id目前支持种子id, 节气种子-1。节气种子自动领取" +
  "---------------------------------  临时活动  ------------------------------------------" +
  "【矿山返利季签到 2023-11-29 23:59:59截止】，【喜迎新版倒计时 2023-12-13 23:59:59截止】【牧场精灵联军挑战 2023-12-06 23:59:59】【牧场收获时光 2023-12-27 23:59:59活动截止】";
pluginInputs = [
  {
    key: "xiaotan",
    title: "【小摊】是否启用",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "xiaotanPanel",
    title: "【小摊】面板是否显示表格",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "saleMoneyType",
    title: "【小摊】购买币种",
    placeholder: "默认金币",
    type: "select",
    selects: [
      { name: "金币", value: "JB" },
      { name: "点券", value: "DJ" },
      { name: "金币和点券", value: "JBAndDJ" },
    ],
  },
  {
    key: "saleNum",
    title: "【小摊】作物数量不小于",
    placeholder: "60",
  },
  {
    key: "crop",
    title: "【小摊】购买作物的Id",
    placeholder: "默认:747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34",
  },
  {
    key: "xiaotan_friends",
    title: "【小摊】购买指定好友全部作物",
    placeholder: "请填写好友QQ",
  },
  {
    key: "hope",
    title: "【微端40级许愿树】是否启用(40级可用)",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "hopeId",
    title: "【微端40级许愿树】许愿项(40级可用)",
    placeholder: "默认不许愿",
    type: "select",
    selects: [
      { name: "不处理", value: 0 },
      { name: "金币", value: 400001 },
      { name: "点券", value: 400002 },
      { name: "普通有机化肥", value: 400003 },
      { name: "极速点券化肥", value: 400005 },
    ],
  },
  {
    key: "farmFamilyShopGX",
    title: "【微端家族】商店",
    placeholder: "消耗个人贡献",
    type: "muti-select",
    selects: [
      { name: "花粉", value: "花粉" },
      { name: "刷新卡", value: "刷新卡" },
      { name: "冷却剂", value: "冷却剂" },
      { name: "红营养液", value: "红营养液" },
      { name: "黄营养液", value: "黄营养液" },
      { name: "白营养液", value: "白营养液" },
      { name: "普通经验种子", value: "普通经验种子" },
      { name: "普通体力种子", value: "普通体力种子" },
      { name: "普通洗练种子", value: "普通洗练种子" },
    ],
  },
  {
    key: "farmFamilyShopGXCustom",
    title: "【微端家族】商店(备用填写)",
    placeholder: "物品名字(用英文的，分割隔开)",
  },
  {
    key: "farmFamilyShopXB",
    title: "【微端家族】仙币商店",
    placeholder: "消耗仙币",
    type: "muti-select",
    selects: [
      { name: "黑魔晶", value: "黑魔晶" },
      { name: "家族科技点", value: "家族科技点" },
      { name: "红营养液", value: "红营养液" },
      { name: "黄营养液", value: "黄营养液" },
      { name: "白营养液", value: "白营养液" },
      { name: "深海红晶石", value: "深海红晶石" },
      { name: "深海蓝晶石", value: "深海蓝晶石" },
      { name: "深海绿晶石", value: "深海绿晶石" },
      { name: "深海黄晶石", value: "深海黄晶石" },
      { name: "天命种子", value: "天命种子" },
      { name: "速度种子", value: "速度种子" },
      { name: "特级经验种子", value: "特级经验种子" },
      { name: "高级经验种子", value: "高级经验种子" },
      { name: "特级体力种子", value: "特级体力种子" },
      { name: "高级体力种子", value: "高级体力种子" },
      { name: "特级洗练种子", value: "特级洗练种子" },
      { name: "高级洗练种子", value: "高级洗练种子" },
      { name: "特级强力碎片", value: "特级强力碎片" },
      { name: "特级吸血碎片", value: "特级吸血碎片" },
      { name: "特级防御碎片", value: "特级防御碎片" },
      { name: "特级暴击碎片", value: "特级暴击碎片" },
      { name: "特级闪避碎片", value: "特级闪避碎片" },
      { name: "高级强力碎片", value: "高级强力碎片" },
      { name: "高级吸血碎片", value: "高级吸血碎片" },
      { name: "高级防御碎片", value: "高级防御碎片" },
      { name: "高级暴击碎片", value: "高级暴击碎片" },
      { name: "高级闪避碎片", value: "高级闪避碎片" },
    ],
  },
  {
    key: "farmFamilyShopXBCustom",
    title: "【微端家族】仙币商店(备用填写)",
    placeholder: "物品名字(用英文的，分割隔开)",
  },
  {
    key: "farmFamilyIphoneGXShop",
    title: "【手农家族】商店",
    placeholder: "消耗个人贡献",
    type: "muti-select",
    selects: [
      { name: "爱心", value: "爱心" },
      { name: "花粉", value: "花粉" },
      { name: "狗粮", value: "狗粮" },
      { name: "车轮矿", value: "车轮矿" },
      { name: "刷新卡", value: "刷新卡" },
      { name: "冷却剂", value: "冷却剂" },
      { name: "红营养液", value: "红营养液" },
      { name: "黄营养液", value: "黄营养液" },
      { name: "白营养液", value: "白营养液" },
    ],
  },
  {
    key: "farmFamilyIphoneGXShopCustom",
    title: "【手农家族】商店(备用填写)",
    placeholder: "物品名字(用英文的，分割隔开)",
  },
  {
    key: "moneyToCoupon",
    title: "金币兑换点券",
    placeholder: "默认不兑换",
    type: "select",
    selects: [
      { name: "不兑换", value: 0 },
      { name: "1千万金币兑换5280点卷", value: "4" },
      { name: "4百万金币兑换2100点卷", value: "3" },
      { name: "1百万金币兑换500点券", value: "2" },
      { name: "20万金币兑换100点券", value: "1" },
    ],
  },
  {
    key: "couponToThing",
    title: "点券兑换",
    placeholder: "默认不兑换",
    type: "muti-select",
    selects: [
      { name: "高速肥料礼包", value: "3,9107,高速肥料礼包" },
      { name: "高级鱼食礼包", value: "24,9201,高级鱼食礼包" },
    ],
  },
  {
    key: "xzmf",
    title: "【仙藏秘府】是否启用",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "xzmf_eid",
    title: "【仙藏秘府】装备(穿脱)eid",
    placeholder: "默认自动选择戒指装备完成任务",
  },
  {
    key: "xzmf_gemid",
    title: "【仙藏秘府】宝石(镶嵌，合成)gemid",
    placeholder: "默认一级绿翡翠2793",
  },
  {
    key: "plant",
    title: "【农场种植】是否启用",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "plantPanel",
    title: "【农场种植】面板是否显示表格",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "seedInput",
    title: "【农场种植】种子(必填)",
    placeholder: "举例：1-20:84;21-30:87",
    type: "input",
  },
  {
    key: "solarDelay",
    title: "【农场种植】节气延迟收获(单位:分钟)",
    placeholder: "默认不延迟",
    type: "input",
  },
  {
    key: "fertilizer",
    title: "【农场种植】普通1小时化肥(选填)",
    placeholder: "默认不施肥",
    type: "select",
    selects: [
      { name: "不施肥", value: "no" },
      { name: "每阶段施肥", value: "every" },
      { name: "收获前施肥", value: "last" },
    ],
  },
  {
    key: "reload",
    title: "【农场种植】重载时间",
    placeholder: "默认1小时",
    type: "select",
    selects: [
      { name: "15分钟", value: 900 },
      { name: "30分钟", value: 1800 },
      { name: "60分钟", value: 3600 },
      { name: "120分钟", value: 7200 },
    ],
  },
  {
    key: "sgncQuestion",
    title: "【时光农场】答题是否启用",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
];
// reqest 优化
async function requestOptimize(
  req,
  isSuccessFn = null,
  retryCount = 3,
  throwError = true
) {
  for (let i = 0; i < retryCount; i++) {
    const result = await shark.reqest(req);
    if (isSuccessFn) {
      if (isSuccessFn(result)) {
        return result;
      }
    } else if (Array.isArray(result)) {
      return result;
    } else {
      if (result.ecode === 0) {
        return result;
      }
    }
    // throwError是false时 不抛出错误
    if (i === retryCount - 1 && throwError === false) {
      return result;
    }
    await shark.delay(8);
  }
  await shark.delay(10);
  throw new Error("请求错误次数达到上限");
}
// 重新加载插件
function reloadFn() {
  //当天凌晨和晚上10点重新调用
  const nextDay = (shark.getNextDayMS() - Date.now()) / 1000 + 30;
  //const tenOclockCountdown = getClockCountdownFn(22);
  //const delayTime = Math.min(tenOclockCountdown, nextDay);
  shark.delay(nextDay, function () {
    onPluginStart();
  });
}
// 获取到time时间的倒计时
function getClockCountdownFn(clock = 22) {
  const getFarmTime = shark.getFarmTime();
  const nextDayTime = shark.getNextDayMS() / 1000;
  return nextDayTime - 60 * 60 * (24 - clock) - getFarmTime;
}
// 获取小摊等级信息
function getBuyNumFn(num) {
  return shark.getFarmXiaotanLevelConfigs().find((i) => i.level === num);
}
// 根据id 获取种子信息
function getSeedInfoFn(seedId) {
  const seedInfo = shark.getCropConfigs().find((i) => i.id === seedId);
  return seedInfo;
}
// 解析用户输入的id编号
function splitStringId(str) {
  const strArr = [];
  if (str && str.trim()) {
    const matchData = str.trim().matchAll(/\d+/g);
    for (const data of matchData) {
      if (data) {
        strArr.push(Number(data[0]));
      }
    }
  }
  return strArr;
}
// 进入到小摊数据
async function requestXiaoTanInfo(uin, name) {
  const responseData = await requestOptimize(
    {
      name: name,
      url: "{!nc}cgi_farm_xiaotan_index",
      data: {
        uin: uin,
      },
    },
    null,
    3,
    false
  );
  if (responseData.ecode !== 0) {
    await shark.delay(60 * 60);
    throw new Error("获取小摊数据失败");
  }
  return responseData;
}
// 获取广告小报列表数据
async function requestXiaoTanGetadvs() {
  const responseData = await requestOptimize(
    {
      name: "【小摊广告小报】获取广告小报数据",
      url: "{!nc}cgi_farm_xiaotan_getadvs",
    },
    null,
    10,
    false
  );
  if (responseData.ecode !== 0) {
    await shark.delay(60 * 60);
    throw new Error("获取小摊数据失败");
  }
  return responseData;
}
// 购买小摊作物
async function requestXiaoTanByg(uin, shelf, name) {
  const responseData = await requestOptimize(
    {
      name: name,
      url: "{!nc}cgi_farm_xiaotan_buygoods",
      data: {
        uin: uin,
        shelf: shelf,
      },
      ignoreBusy: true,
    },
    (data) => {
      if (
        data.ecode === 0 ||
        (data.direction &&
          data.direction?.indexOf("好友间的交易达到了上限") > -1)
      ) {
        return true;
      } else {
        return false;
      }
    },
    4,
    false
  );
  return responseData;
}

/* async function bugXiaoTan() {
  // 凌晨1点之后在开始运行防止和购买好友重复请求
  const delayTime = getClockCountdownFn(1)
  await shark.delay(delayTime);
  try {
    // 记录是否购买完成
    let xiaotan_bug_report_finished = shark.getCache("xiaotan_bug_report_finished");
    if (!xiaotan_bug_report_finished) {
      const saleMoneyTypeObj = {
        JB: [0],
        DJ: [1],
        JBAndDJ: [0, 1],
      };
      const saleMoneyTypeSelected = saleMoneyTypeObj[shark.rule.saleMoneyType || "JB"];
      let saleNumInput = Number(shark.rule.saleNum) || 60;
      saleNumInput = saleNumInput >= 60 ? 60 : saleNumInput;
      const cropId = splitStringId(
        shark.rule.crop ||
        "747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34"
      );
      // 获取小摊数据
      const { buyStrangerTimes, level } = await requestXiaoTanInfo(
        shark.selfUin,
        `【小摊广告小报】获取自己小摊数据`
      );
      //根据当前等级获取用户的购买次数
      const { strangerTimes } = getBuyNumFn(level);
      if (buyStrangerTimes === strangerTimes) {
        shark.setCache("xiaotan_bug_report_finished", true, shark.getNextDayMS());
        throw new Error("【小摊广告小报】广告小报购买次数已用完");
      }
      // 还剩下的购买次数
      let hasTimes = strangerTimes - buyStrangerTimes;
      while (true) {
        // 获取广告小报数据
        const { advslist: xiaotanData } = await requestXiaoTanGetadvs();
        xiaotanDataFor: for (let i = 0; i < xiaotanData.length; i++) {
          const { saleMoneyType, saleItemNum, saleItemid, uin } =
            xiaotanData[i];
          if (
            saleMoneyTypeSelected.includes(saleMoneyType) &&
            cropId.includes(saleItemid)
          ) {
            //进入小摊
            const friendXiaotanData = await requestXiaoTanInfo(
              uin,
              `【小摊广告小报】获取广告小报${uin}的数据`
            );

            const needList = friendXiaotanData.shelf;
            for (let j = 0; j < needList.length; j++) {
              const { saleInfo, status } = needList[j];
              if (
                status === 1 &&
                saleInfo.saleItemNum >= saleNumInput &&
                saleMoneyTypeSelected.includes(saleInfo.saleMoneyType) &&
                cropId.includes(saleInfo.saleItemid)
              ) {
                // 购买
                await shark.delay(5);
                const { ecode, direction } = await requestXiaoTanByg(
                  uin,
                  j,
                  `【小摊广告小报】开始购买广告小报${uin}的小摊作物`
                );
                if (ecode === 0) {
                  shark.logger.log(
                    `【小摊广告小报】广告小报购买成功：${getSeedInfoFn(saleInfo.saleItemid)?.name
                    }*${saleInfo.saleItemNum}个`
                  );
                  hasTimes--;
                  if (hasTimes === 0) {
                    shark.setCache("xiaotan_bug_report_finished", true, shark.getNextDayMS());
                    throw new Error("【小摊广告小报】广告小报购买次数已用完");
                  }
                } else {
                  // 当出现购买不成功时跳出循环
                  // break xiaotanDataFor;
                  await shark.delay(5)
                  throw new Error('【小摊广告小报】' + direction);
                }
                await shark.delay(5);
              }
            }
          }
        }
        // 15分钟检测一次
        await shark.delay(60 * 15);
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    bugXiaoTan();
  }
} */
// --- main 购买广告小报作物 ----
async function bugXiaoTan() {
  do {
    try {
      // 函数下次运行的默认时间
      let fnReloadTime = 24 * 60 * 60;
      // 凌晨1点之后在开始运行防止和购买好友重复请求
      const delayTime = getClockCountdownFn(1);
      await shark.delay(delayTime);

      // 记录是否购买完成
      let xiaotan_bug_report_finished = shark.getCache(
        "xiaotan_bug_report_finished"
      );
      if (!xiaotan_bug_report_finished) {
        const saleMoneyTypeObj = { JB: [0], DJ: [1], JBAndDJ: [0, 1] };
        const saleMoneyTypeSelected =
          saleMoneyTypeObj[shark.rule.saleMoneyType || "JB"];
        let saleNumInput = Number(shark.rule.saleNum) || 60;
        saleNumInput = saleNumInput >= 60 ? 60 : saleNumInput;
        const cropId = splitStringId(
          shark.rule.crop ||
            "747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34"
        );
        // 获取小摊数据
        const { buyStrangerTimes, level } = await requestXiaoTanInfo(
          shark.selfUin,
          `【小摊广告小报】获取自己小摊数据`
        );
        await shark.delay(10);
        //根据当前等级获取用户的购买次数
        const { strangerTimes } = getBuyNumFn(level);
        if (buyStrangerTimes === strangerTimes) {
          shark.setCache(
            "xiaotan_bug_report_finished",
            true,
            shark.getNextDayMS()
          );
          shark.logger.log("【小摊广告小报】广告小报购买次数已用完");
          continue;
        }
        // 还剩下的购买次数
        let hasTimes = strangerTimes - buyStrangerTimes;
        // 获取广告小报数据
        const { advslist: xiaotanData } = await requestXiaoTanGetadvs();
        await shark.delay(5);
        xiaotanDataFor: for (let i = 0; i < xiaotanData.length; i++) {
          const { saleMoneyType, saleItemNum, saleItemid, uin } =
            xiaotanData[i];
          if (
            saleMoneyTypeSelected.includes(saleMoneyType) &&
            cropId.includes(saleItemid) &&
            saleItemNum >= saleNumInput
          ) {
            //进入小摊
            const friendXiaotanData = await requestXiaoTanInfo(
              uin,
              `【小摊广告小报】获取广告小报${uin}的数据`
            );
            await shark.delay(5);
            const needList = friendXiaotanData.shelf;
            for (let j = 0; j < needList.length; j++) {
              const { saleInfo, status } = needList[j];
              if (
                status === 1 &&
                saleInfo.saleItemNum >= saleNumInput &&
                saleMoneyTypeSelected.includes(saleInfo.saleMoneyType) &&
                cropId.includes(saleInfo.saleItemid)
              ) {
                // 购买
                const { ecode, direction } = await requestXiaoTanByg(
                  uin,
                  j,
                  `【小摊广告小报】开始购买广告小报${uin}的小摊作物`
                );
                await shark.delay(10);
                if (ecode === 0) {
                  shark.logger.log(
                    `【小摊广告小报】广告小报购买成功：${
                      getSeedInfoFn(saleInfo.saleItemid)?.name
                    }*${saleInfo.saleItemNum}个`
                  );
                  hasTimes--;
                  if (hasTimes === 0) {
                    shark.setCache(
                      "xiaotan_bug_report_finished",
                      true,
                      shark.getNextDayMS()
                    );
                    shark.logger.log("【小摊广告小报】广告小报购买次数已用完");
                    break xiaotanDataFor;
                  }
                } else {
                  // 当出现购买不成功时跳出循环
                  shark.logger.log("【小摊广告小报】购买失败" + direction);
                  break xiaotanDataFor;
                }
              }
            }
          }
        }
        // 15分钟检测一次
        fnReloadTime = 60 * 15;
      }
      const nextDayTime =
        shark.getNextDayMS() / 1000 - shark.getFarmTime() + 30;
      const reloadTime = Math.min(nextDayTime, fnReloadTime);
      await shark.delay(reloadTime);
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(15);
      continue;
    }
  } while (true);
}

/* async function bugFriendXiaoTan() {
  try {
    const xiaotan_friends = splitStringId(shark.rule.xiaotan_friends);
    // 过滤掉自己的qq
    xiaotan_friends.indexOf(shark.selfUin) > -1
      ? xiaotan_friends.splice(xiaotan_friends.indexOf(shark.selfUin), 1)
      : null;
    const xiaotan_bug_friend_finished = shark.getCache(
      "xiaotan_bug_friend_finished"
    );
    const xiaotanFriendNoFriend =
      shark.getCache("xiaotanFriend_no_friend") || []; // 存放已经超过购买次数的好友qq

    if (
      xiaotan_friends.length > 0 &&
      !xiaotan_bug_friend_finished &&
      xiaotanFriendNoFriend.length < xiaotan_friends.length
    ) {
      // 获取自己小摊数据
      const { buyFriendTimes, level } = await requestXiaoTanInfo(
        shark.selfUin,
        `【小摊好友】获取自己小摊数据`
      );
      await shark.delay(5);
      //根据当前等级获取用户的购买次数
      const { friendTimes } = getBuyNumFn(level);
      if (buyFriendTimes === friendTimes) {
        shark.setCache(
          "xiaotan_bug_friend_finished",
          true,
          shark.getNextDayMS()
        );
        throw new Error("【小摊好友购买】今日好友次数已用完");
      }
      // 还剩下的购买次数
      let hasTimes = friendTimes - buyFriendTimes;
      while (true) {
        const xiaotanFriend_no_friend =
          shark.getCache("xiaotanFriend_no_friend") || []; // 存放已经超过购买次数的好友qq
        if (xiaotanFriend_no_friend.length < xiaotan_friends.length) {
          xiaotanDataFor: for (let friendUin of xiaotan_friends) {
            if (xiaotanFriend_no_friend.includes(friendUin)) {
              // 当前好友已经超过购买次数
              continue;
            }
            //进入小摊
            const { shelf } = await requestXiaoTanInfo(
              friendUin,
              `【小摊好友】获取好友${friendUin}的小摊数据`
            );

            for (let j = 0; j < shelf.length; j++) {
              const { saleInfo, status } = shelf[j];
              if (status === 1) {
                // 购买
                await shark.delay(5);
                const { ecode, direction } = await requestXiaoTanByg(
                  friendUin,
                  j,
                  `【小摊好友】开始购买好友${friendUin}的作物`
                );
                if (ecode === 0) {
                  shark.logger.log(
                    `【小摊好友】购买好友${friendUin}的作物：${getSeedInfoFn(saleInfo.saleItemid)?.name
                    }*${saleInfo.saleItemNum}个`
                  );
                  hasTimes--;
                  if (hasTimes === 0) {
                    // 当已经没有购买次数时
                    // break xiaotanDataFor;
                    shark.setCache(
                      "xiaotan_bug_friend_finished",
                      true,
                      shark.getNextDayMS()
                    );
                    throw new Error("【小摊好友购买】今日好友次数已用完");
                  }
                } else {
                  //该好友生意太火爆了，好友间的交易达到了上限，明天早点来抢购哦
                  if (direction.indexOf("该好友生意太火爆了") > -1) {
                    if (!xiaotanFriend_no_friend.includes(friendUin)) {
                      xiaotanFriend_no_friend.push(friendUin);
                      shark.setCache(
                        "xiaotanFriend_no_friend",
                        xiaotanFriend_no_friend,
                        shark.getNextDayMS()
                      );
                    }
                    break;
                  } else {
                    throw new Error("【小摊好友购买】" + direction);
                  }
                }
                await shark.delay(10);
              }
            }
          }
        } else {
          throw new Error("【小摊好友购买】所有好友都已完成购买");
        }
        // 1小时检测一次
        await shark.delay(60 * 60 * 1);
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    bugFriendXiaoTan();
  }
} */
// --- main  购买好友小摊作物 ----
async function bugFriendXiaoTan() {
  do {
    // 函数下次运行的默认时间
    let fnReloadTime = 24 * 60 * 60;
    try {
      const xiaotan_friends = splitStringId(shark.rule.xiaotan_friends);
      // 过滤掉自己的qq
      xiaotan_friends?.indexOf(shark.selfUin) > -1
        ? xiaotan_friends.splice(xiaotan_friends?.indexOf(shark.selfUin), 1)
        : null;
      // 好友次数是否用完
      const xiaotan_bug_friend_finished = shark.getCache(
        "xiaotan_bug_friend_finished"
      );
      // 存放已经超过购买次数的好友qq
      const xiaotanFriendNoFriend =
        shark.getCache("xiaotanFriend_no_friend") || []; // 存放已经超过购买次数的好友qq
      if (
        xiaotan_friends.length > 0 &&
        !xiaotan_bug_friend_finished &&
        xiaotanFriendNoFriend.length < xiaotan_friends.length
      ) {
        // 获取自己小摊数据
        const { buyFriendTimes, level } = await requestXiaoTanInfo(
          shark.selfUin,
          `【小摊好友】获取自己小摊数据`
        );
        await shark.delay(15);
        //根据当前等级获取用户的购买次数
        const { friendTimes } = getBuyNumFn(level);
        if (buyFriendTimes === friendTimes) {
          shark.setCache(
            "xiaotan_bug_friend_finished",
            true,
            shark.getNextDayMS()
          );
          shark.logger.log("【小摊好友购买】今日好友次数已用完");
          continue;
        }
        // 还剩下的购买次数
        let hasTimes = friendTimes - buyFriendTimes;
        xiaotanDataFor: for (let friendUin of xiaotan_friends) {
          const newXiaotanFriendNoFriend =
            shark.getCache("xiaotanFriend_no_friend") || [];
          if (newXiaotanFriendNoFriend.includes(friendUin)) {
            // 如果当前好友的交易次数已经达到限制，那么就遍历下一个好友
            continue;
          }
          //进入小摊
          const { shelf } = await requestXiaoTanInfo(
            friendUin,
            `【小摊好友】获取好友${friendUin}的小摊数据`
          );
          await shark.delay(10);
          for (let j = 0; j < shelf.length; j++) {
            const { saleInfo, status } = shelf[j];
            if (status === 1) {
              // 购买
              const { ecode, direction } = await requestXiaoTanByg(
                friendUin,
                j,
                `【小摊好友】开始购买好友${friendUin}第${j + 1}个摊位的作物`
              );
              await shark.delay(10);
              if (ecode === 0) {
                shark.logger.log(
                  `【小摊好友】购买好友${friendUin}的作物：${
                    getSeedInfoFn(saleInfo.saleItemid)?.name
                  }*${saleInfo.saleItemNum}个`
                );
                hasTimes--;
                if (hasTimes === 0) {
                  // 当已经没有购买次数时
                  shark.setCache(
                    "xiaotan_bug_friend_finished",
                    true,
                    shark.getNextDayMS()
                  );
                  shark.logger.log("【小摊好友购买】今日好友次数已用完");
                  break xiaotanDataFor;
                }
              } else {
                //该好友生意太火爆了，好友间的交易达到了上限，明天早点来抢购哦
                if (direction?.indexOf("该好友生意太火爆了") > -1) {
                  if (!newXiaotanFriendNoFriend.includes(friendUin)) {
                    newXiaotanFriendNoFriend.push(friendUin);
                    shark.setCache(
                      "xiaotanFriend_no_friend",
                      newXiaotanFriendNoFriend,
                      shark.getNextDayMS()
                    );
                  }
                  break;
                } else {
                  shark.logger.log("【小摊好友购买】购买失败" + direction);
                  break xiaotanDataFor;
                }
              }
              await shark.delay(10);
            }
          }
        }
        fnReloadTime = 60 * 60 * 2;
      }

      const nextDayTime =
        shark.getNextDayMS() / 1000 - shark.getFarmTime() + 30;
      const reloadTime = Math.min(nextDayTime, fnReloadTime);
      await shark.delay(reloadTime);
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(15);
      continue;
    }
  } while (true);
}

// 获取许愿树地信息
async function requestGetHopeInfo() {
  const responseData = await requestOptimize({
    name: `获取微端许愿树信息`,
    url: "{!nc}cgi_farm_wish_index",
    data: {
      ownerId: shark.selfUid,
    },
  });
  return responseData;
}

//  许愿树许愿
async function requestSetHope(hopeId, hopeIdList) {
  const responseData = await requestOptimize({
    name: `【微端许愿树】开始许愿`,
    url: "{!nc}cgi_farm_wish_plant",
    data: {
      id: hopeId,
      idlist: hopeIdList,
    },
  });
  return responseData;
}
// 许愿树收获
async function requestHopeHarvest() {
  const responseData = await requestOptimize({
    name: `【微端许愿树】开始收获许愿`,
    url: "{!nc}cgi_farm_wish_harvest",
  });
  return responseData;
}
function getCurrentUserHopeList(lv, hopeId) {
  let list = "";
  if (lv < 3) {
    list = `${hopeId}`;
  } else if (lv >= 5) {
    list = `${hopeId}_${hopeId}_${hopeId}`;
  } else {
    list = `${hopeId}_${hopeId}`;
  }
  return list;
}
// --- main  许愿树许愿 ----
async function hopeFn() {
  do {
    // 函数下次运行的默认时间
    let fnReloadTime = 24 * 60 * 60;
    try {
      const hopeObj = {
        400001: "金币",
        400002: "点券",
        400003: "普通有机化肥",
        400005: "极速点券化肥",
      };
      const hopeId = shark.rule.hopeId;
      // 是否已经许愿了
      const isHope = shark.getCache("hope_isHope");
      // 用户的许愿树是否可以许愿（等级是否是40级）
      const canHope = shark.getCache("hope_canHope");
      if (!isHope && !(canHope === false)) {
        const { status, star_lv, lv } = await requestGetHopeInfo();
        if (lv !== 40) {
          shark.setCache("hope_canHope", false, shark.getNextDayMS());
          continue;
        }
        if (status === 0) {
          const hopeList = getCurrentUserHopeList(star_lv, hopeId);
          const { ecode } = await requestSetHope(hopeId, hopeList);
          if (ecode === 0) {
            shark.logger.log(`【微端许愿树】许愿成功:${hopeObj[hopeId]}`);
          }
        } else if (status === 4) {
          const responseData = await requestHopeHarvest();
          if (responseData.ecode === 0) {
            shark.logger.log("【微端许愿树】: 收获许愿树成功");
            shark.setCache("hope_isHope", true, shark.getNextDayMS());
            continue;
          }
        } else if (status === 1) {
          shark.setCache("hope_isHope", true, shark.getNextDayMS());
          shark.logger.log("【微端许愿树】: 已收获许愿树了，别太贪心了");
          continue;
        }
        fnReloadTime = 15 * 60;
      }
      const nextDayTime =
        shark.getNextDayMS() / 1000 - shark.getFarmTime() + 30;
      const reloadTime = Math.min(nextDayTime, fnReloadTime);
      await shark.delay(reloadTime);
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(5);
      continue;
    }
  } while (true);
}
// --- main  金币兑换点卷 ----
async function moneyToCouponFn() {
  try {
    const moneyToCouponSelected = shark.rule.moneyToCoupon;
    const isMoneyToCoupon = shark.getCache("isMoneyToCoupon");
    if (moneyToCouponSelected && !isMoneyToCoupon) {
      const {
        ecode,
        cost_money,
        add_coupon,
        direction = "",
      } = await shark.reqest({
        name: "【金币兑换点卷】开始兑换点券",
        url: "{!ncf}cgi_farm_money_coupon_change",
        data: { chgid: moneyToCouponSelected },
      });
      if (ecode === 0) {
        shark.logger.log(
          `【金币兑换点券】：花费金币${cost_money}兑换点券${add_coupon}`
        );
        shark.setCache("isMoneyToCoupon", true, shark.getNextDayMS());
      } else {
        if (direction?.indexOf("已经兑换过") > -1) {
          shark.setCache("isMoneyToCoupon", true, shark.getNextDayMS());
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    moneyToCouponFn();
  }
}

// --- main  点卷兑换其他 ----
async function couponToThingFn() {
  try {
    const couponToThingSelected = shark.rule.couponToThing;
    const couponToThing = shark.getCache("couponToThing");

    if (!couponToThing) {
      for (let i = 0; i < couponToThingSelected.length; i++) {
        const couponToThingSelectedArr = couponToThingSelected[i].split(",");
        const { ecode, coupon, direction } = await shark.reqest({
          name: "【点券兑换】" + couponToThingSelectedArr[2],
          url: "{!ncf}cgi_farm_buy_tools",
          data: {
            number: 1,
            type: couponToThingSelectedArr[0],
            tId: couponToThingSelectedArr[1],
          },
        });
        if (ecode === 0) {
          shark.logger.log(
            `【点券兑换】：花费点卷${coupon?.toString()?.substring(1)}兑换${
              couponToThingSelectedArr[2]
            }`
          );
          shark.setCache("couponToThing", true, shark.getNextDayMS());
        } else {
          if (direction?.indexOf("已达到上限") > -1) {
            shark.setCache("couponToThing", true, shark.getNextDayMS());
          }
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    couponToThingFn();
  }
}

// --- main  家族商店 ----
async function familyShopFn() {
  try {
    const {
      farmFamilyShopGX,
      farmFamilyShopGXCustom,
      farmFamilyShopXB,
      farmFamilyShopXBCustom,
      farmFamilyIphoneGXShop,
      farmFamilyIphoneGXShopCustom,
    } = shark.rule;
    const farmFamilyShopGXArr = [
      ...(farmFamilyShopGX || []),
      ...(farmFamilyShopGXCustom ? farmFamilyShopGXCustom.split(",") : []),
    ];
    const farmFamilyShopXBArr = [
      ...(farmFamilyShopXB || []),
      ...(farmFamilyShopXBCustom ? farmFamilyShopXBCustom.split(",") : []),
    ];
    const farmFamilyIphoneGXShopArr = [
      ...(farmFamilyIphoneGXShop || []),
      ...(farmFamilyIphoneGXShopCustom
        ? farmFamilyIphoneGXShopCustom.split(",")
        : []),
    ];

    if (
      farmFamilyShopGXArr.length > 0 ||
      farmFamilyShopXBArr.length > 0 ||
      farmFamilyIphoneGXShopArr.length > 0
    ) {
      const familyInfo = await shark.reqest({
        name: "【微端家族】获取家族信息",
        url: "{!nc}cgi_farm_family",
        data: { act: "index" },
      });
      await shark.delay(2);
      if (familyInfo.ecode === 0) {
        // 微端个人贡献商店购买
        if (farmFamilyShopGXArr.length > 0) {
          const { gifts, daily_shop_draw } = await requestOptimize({
            name: "【微端家族】查看家族商店",
            url: "{!nc}cgi_farm_family",
            data: { act: "shop", shop_type: "query" },
          });
          await shark.delay(2);
          for (let i = 0; i < farmFamilyShopGXArr.length; i++) {
            const curShopName = farmFamilyShopGXArr[i];
            for (let j = 0; j < gifts.length; j++) {
              const draw_id = j + 1;
              if (gifts[j].name === curShopName) {
                for (let num = 0; num < 20 - daily_shop_draw; num++) {
                  const { ecode, pkg } = await shark.reqest({
                    name: "【微端家族】商店购买",
                    url: "{!nc}cgi_farm_family",
                    data: {
                      act: "shop",
                      shop_type: "exchange",
                      draw_id: draw_id,
                    },
                  });
                  if (ecode === 0) {
                    shark.logger.log(
                      "【微端家族】商店购买:" + shark.convertPkgToStr(pkg)
                    );
                    await shark.delay(2);
                  } else {
                    break;
                  }
                }
              }
            }
          }
        }
        // 微端仙币商店购买
        if (farmFamilyShopXBArr.length > 0) {
          const { pool_gift, ts } = await requestOptimize({
            name: "【微端家族】查看仙币商店",
            url: "{!nc}cgi_farm_family_battle",
            data: { act: "shopindex" },
          });
          await shark.delay(2);
          for (let i = 0; i < farmFamilyShopXBArr.length; i++) {
            const curShopName = farmFamilyShopXBArr[i];
            for (let j = 0; j < pool_gift.length; j++) {
              const draw_id = j + 1;
              //ts[j]===0 表示没有购买过
              if (pool_gift[j].name === curShopName && ts[j] === 0) {
                const { ecode, package } = await shark.reqest({
                  name: "【微端家族】仙币商店购买",
                  url: "{!nc}cgi_farm_family_battle",
                  data: { act: "shopbuy", id: draw_id },
                });
                if (ecode === 0) {
                  shark.logger.log(
                    "【微端家族】仙币商店购买:" + shark.convertPkgToStr(package)
                  );
                  await shark.delay(2);
                } else {
                  break;
                }
              }
            }
          }
        }
        // 手农个人贡献商店购买
        if (farmFamilyIphoneGXShopArr.length > 0) {
          const { gifts, daily_shop_draw } = await requestOptimize({
            name: "【手农家族】查看手农家族商店",
            url: "{!nc}cgi_farm_family",
            data: { act: "shop", shop_type: "query", login_type: 2 },
          });
          await shark.delay(2);
          for (let i = 0; i < farmFamilyIphoneGXShopArr.length; i++) {
            const curShopName = farmFamilyIphoneGXShopArr[i];
            for (let j = 0; j < gifts.length; j++) {
              const draw_id = j + 1;
              if (gifts[j].name === curShopName) {
                for (let num = 1; num <= 20 - daily_shop_draw; num++) {
                  const { ecode, pkg } = await shark.reqest({
                    name: "【手农家族】商店购买",
                    url: "{!nc}cgi_farm_family",
                    data: {
                      act: "shop",
                      shop_type: "exchange",
                      login_type: 2,
                      draw_id: draw_id,
                    },
                  });
                  if (ecode === 0) {
                    shark.logger.log(
                      "【手农家族】商店购买:" + shark.convertPkgToStr(pkg)
                    );
                    await shark.delay(2);
                  } else {
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    familyShopFn();
  }
}

// --- main  矿山返利季  2023-11-29 23:59:59活动截止 ----
async function ksflj() {
  try {
    const getFarmTime = shark.getFarmTime();
    const actFinishedTime = new Date("2023-11-29 23:59:59").getTime() / 1000;
    if (getFarmTime < actFinishedTime) {
      const isksfljGet = shark.getCache("isksfljGet");
      if (!isksfljGet) {
        const {
          ecode,
          pkg,
          direction = "",
        } = await shark.reqest({
          name: `【矿山返利季】每日签到`,
          url: "{!nc}act_ios_ksflj",
          data: {
            market: 16,
            act: "sign",
            uinY: shark.selfUin,
            appid: 353,
            uIdx: shark.selfUid,
            platform: 14,
          },
        });
        if (ecode === 0) {
          shark.logger.log(shark.convertPkgToStr(pkg));
        }
        if (ecode === 0 || direction?.indexOf("今日已签到") > -1) {
          shark.setCache("isksfljGet", true, shark.getNextDayMS());
          shark.logger.log("【矿山返利季】今日已完成签到");
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    ksflj();
  }
}
// --- main  喜迎新版倒计时 2023-12-13 23:59:59活动截止 ----
async function xyxbdjs() {
  try {
    const getFarmTime = shark.getFarmTime();
    const actFinishedTime = new Date("2023-12-13 23:59:59").getTime() / 1000;
    if (getFarmTime < actFinishedTime) {
      const isxyxbdjsGet = shark.getCache("isxyxbdjsGet");
      if (!isxyxbdjsGet) {
        // 打开活动
        await requestOptimize({
          name: `【喜迎新版倒计时】活动打开`,
          url: "{!nc}cgi_multipkg",
          data: {
            market: 16,
            platform: 14,
            uinY: shark.selfUin,
            appid: 353,
            uIdx: shark.selfUid,
            act: "update_index",
          },
        });
        // 领取礼物
        const {
          ecode,
          s,
          direction = "",
        } = await shark.reqest({
          name: `【喜迎新版倒计时】活动领取`,
          url: "{!nc}cgi_multipkg",
          data: {
            market: 16,
            platform: 14,
            uinY: shark.selfUin,
            appid: 353,
            uIdx: shark.selfUid,
            id: 1,
            act: "update_ex",
          },
        });
        if (ecode === 0) {
          shark.logger.log(`【喜迎新版倒计时】领取：${s}`);
        }
        if (ecode === 0 || direction?.indexOf("已经领") > -1) {
          shark.setCache("isxyxbdjsGet", true, shark.getNextDayMS());
          shark.logger.log("【喜迎新版倒计时】今日已完领取");
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    xyxbdjs();
  }
}

// --- main  牧场精灵联军挑战活动 2023-12-06 23:59:59活动截止 ----
async function jlkingdoms() {
  try {
    const getFarmTime = shark.getFarmTime();
    const actFinishedTime = new Date("2023-12-06 23:59:59").getTime() / 1000;

    if (getFarmTime < actFinishedTime) {
      // 每天晚上10点运行一次
      const countdown = getClockCountdownFn(22);
      await shark.delay(countdown);
      const isjlkingdoms = shark.getCache("isjlkingdoms");
      const jlkingdomsTaskHasGet = shark.getCache("jlkingdomsTaskHasGet") || [];
      if (!isjlkingdoms) {
        await shark.reqest({
          name: `【牧场精灵联军挑战】任务激活`,
          url: "{!mc}cgi_pasture_kingdoms_activity",
          data: {
            act: "a15index",
          },
        });
        // 任务领取
        for (let i = 1; i < 61; i++) {
          if (!jlkingdomsTaskHasGet.includes(i)) {
            const { s, direction, ecode } = await shark.reqest({
              name: `【牧场精灵联军挑战】领任务奖励${i}`,
              url: "{!mc}cgi_pasture_kingdoms_activity",
              data: {
                act: "a15drawtask",
                id: i,
              },
            });
            if (ecode === 0) {
              shark.logger.log(`【牧场精灵联军挑战】:领取任务${i}奖励：${s}`);
            } else {
              shark.logger.log(`【牧场精灵联军挑战】:任务${i}：${direction}`);
              if (direction?.indexOf("已经领取") > -1) {
                jlkingdomsTaskHasGet.push(i);
              }
            }
            await shark.delay(2);
          }
        }
        shark.setCache(
          "jlkingdomsTaskHasGet",
          jlkingdomsTaskHasGet,
          new Date("2023-12-06 23:59:59").getTime()
        );
        // 活跃度领取
        for (let i = 1; i < 5; i++) {
          const { s, direction, ecode } = await shark.reqest({
            name: `【牧场精灵联军挑战】活跃度领取${i}`,
            url: "{!mc}cgi_pasture_kingdoms_activity",
            data: {
              act: "a15drawcum",
              id: i,
            },
          });
          if (ecode === 0) {
            shark.logger.log(`【牧场精灵联军挑战】:领取活跃度${i}奖励：${s}`);
          } else {
            shark.logger.log(
              `【牧场精灵联军挑战】:领取活跃度${i}：${direction}`
            );
          }
          await shark.delay(2);
        }
        shark.setCache("isjlkingdoms", true, shark.getNextDayMS());
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    jlkingdoms();
  }
}
// 获取魔法池信息
async function requestMagicquery() {
  const responseData = await requestOptimize({
    name: "获取魔法池信息",
    url: "{!nc}magicquery",
    data: {
      act: 2010058,
    },
  });
  return responseData;
}

// --- main  仙藏秘府领取宝石活动 ----
async function xzmfFn() {
  if (shark.isActivityInPogress("farm30", "ActivityGemEntranceController")) {
    try {
      const xzmfTaskFinished = shark.getCache("xzmfTaskFinished");
      if (!xzmfTaskFinished) {
        let { xzmf_eid, xzmf_gemid } = shark.rule;
        if (!xzmf_eid) {
          // 如果用户没有填写装备eid则自动获取没有镶嵌宝石的装备
          const { equip } = await requestOptimize({
            name: "【仙藏秘府】获取装备",
            url: "{!nc}magicquery",
            data: { act: "2010039" },
          });
          for (let item of equip) {
            const {
              heroIndex: itemHeroIndex,
              gem,
              equipIndex,
              equipType,
            } = item;
            if (gem.toString() === "0,0,0" && equipType === 3) {
              if (itemHeroIndex === 0) {
                // 如果当前装备没有穿到守卫身上，那么就自动找个守卫穿上此装备
                const { hero } = await requestMagicquery();
                const { heroIndex } = hero?.[0] || {};
                if (heroIndex) {
                  await shark.delay(2);
                  shark.logger.log(heroIndex, equipIndex);
                  await shark.reqest({
                    name: `【仙藏秘府】魔法池守卫${heroIndex}脱掉装备`,
                    url: "{!nc}magicexchange",
                    data: {
                      act: 2010040,
                      type: 3,
                      heroindex: heroIndex,
                      equipindex: equipIndex,
                      op: 1, // 脱掉装备
                    },
                  });
                  await shark.delay(2);
                  await shark.reqest({
                    name: "【仙藏秘府】魔法池守卫${heroIndex}穿上装备",
                    url: "{!nc}magicexchange",
                    data: {
                      act: 2010040,
                      type: 3,
                      heroindex: heroIndex,
                      equipindex: equipIndex,
                      op: 2, // 穿上装备
                    },
                  });
                  await shark.delay(2);
                }
              }
              xzmf_eid = equipIndex;
              break;
            }
          }
        }
        if (!xzmf_gemid) {
          xzmf_gemid = 2793;
        }
        if (xzmf_eid) {
          // 完成任务
          await shark.reqest({
            name: "【仙藏秘府】进入活动界面",
            url: "{!nc}query",
            data: { act: "2255001" },
          });
          await shark.delay(2);
          await shark.reqest({
            name: "【仙藏秘府】获取魔法池装备",
            url: "{!nc}magicquery",
            data: { act: "2010039" },
          });
          await shark.delay(2);
          await shark.reqest({
            name: "【仙藏秘府】脱下翡翠",
            url: "{!nc}magicexchange",
            data: { act: "2010074", gemid: 0, eid: xzmf_eid },
          });
          await shark.delay(2);
          const mosaicData = await shark.reqest({
            name: "【仙藏秘府】镶嵌宝石",
            url: "{!nc}magicexchange",
            data: { act: "2010074", gemid: xzmf_gemid, eid: xzmf_eid },
          });
          if (mosaicData.ecode === 0) {
            await shark.delay(2);
            const takeOffData = await shark.reqest({
              name: "【仙藏秘府】脱下翡翠",
              url: "{!nc}magicexchange",
              data: { act: "2010074", gemid: 0, eid: xzmf_eid },
            });
            if (takeOffData.ecode === 0) {
              await shark.delay(2);
              const { ecode, direction } = await shark.reqest({
                name: "【仙藏秘府】翡翠合成",
                url: "{!nc}magicexchange",
                data: { act: "2010072", id: xzmf_gemid },
              });
              if (ecode === 0) {
                shark.setCache("xzmfTaskFinished", true, shark.getNextDayMS());
              } else {
                shark.logger.error(
                  `【仙藏秘府】：${direction || "宝石合成失败"}`
                );
              }
            }
          } else {
            shark.logger.error(`【仙藏秘府】:${mosaicData.direction}`);
          }
        } else {
          shark.logger.error(
            "【仙藏秘府】没有符合要求的装备：1.自动获取的装备必须没有安装宝石。2自动获取的装备必须被英雄穿戴"
          );
        }
      }
      // 晚上10点领取奖励
      const countdownTime = getClockCountdownFn(22);
      shark.delay(countdownTime, async function () {
        // 领取任务奖励
        for (let i = 1; i < 7; i++) {
          const { ecode, pkg } = await shark.reqest({
            name: "【仙藏秘府】领取任务奖励" + i,
            url: "{!nc}exchange",
            data: { act: "2255004", id: i },
          });
          if (ecode === 0) {
            shark.logger.log("【仙藏秘府】:" + shark.convertPkgToStr(pkg));
          }
          await shark.delay(1);
        }
      });
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(10);
      xzmfFn();
    }
  }
}
// --- main  时光农场NPC问答 ----
async function sgncQuestionFn() {
  try {
    const {
      result: cacheResult = -1,
      options: cacheOptions = [],
      preAnswerTime = null,
    } = shark.getCache("sgncQuestion") || {};
    let toDayIsAnswer = false;
    if (
      preAnswerTime &&
      new Date(preAnswerTime * 1000).getDay() ===
        new Date(shark.getFarmTime() * 1000).getDay()
    ) {
      toDayIsAnswer = true;
    }
    if (cacheResult === -1 && !toDayIsAnswer) {
      const { ecode, fin, result, opt } = await shark.reqest({
        name: "【时光农场】获取每日答题",
        url: "{!nc}query",
        data: { act: 2268001 },
      });
      await shark.delay(1);
      if (ecode === 0) {
        // result===1代表已经完成任务;
        if (result === -1) {
          //fin===false代表今天未答题
          if (fin === false) {
            const todayOption = [1, 2, 3, 4].reduce((pre, cur) => {
              return pre || (cacheOptions.includes(cur) ? 0 : cur);
            }, 0);
            const {
              ecode: qustionCode,
              pkg,
              result: qustionResult,
            } = await shark.reqest({
              name: `【时光农场】每日答题开始作答(选项${todayOption})`,
              url: "{!nc}exchange",
              data: { act: 2268002, opt: todayOption },
            });
            await shark.delay(1);
            if (qustionCode === 0) {
              if (qustionResult === 1) {
                shark.logger.log(
                  `【时光农场】今日答题正确:${shark.convertPkgToStr(pkg)}`
                );
              } else {
                shark.logger.log(`【时光农场】今日答题错误，明天继续`);
              }
              cacheOptions.push(todayOption);
              shark.setCache(
                "sgncQuestion",
                {
                  result: qustionResult,
                  options: cacheOptions,
                  preAnswerTime: shark.getFarmTime(),
                },
                shark.getNextWeekDayMS(4)
              );
            }
          } else {
            shark.logger.log("【时光农场】今日已完成答题");
            if (!cacheOptions.includes[opt]) {
              cacheOptions.push(opt);
            }
            shark.setCache(
              "sgncQuestion",
              {
                result: result,
                options: cacheOptions,
                preAnswerTime: shark.getFarmTime(),
              },
              shark.getNextWeekDayMS(4)
            );
          }
        } else {
          shark.logger.log("【时光农场】已完成本周答题内容");
          if (!cacheOptions.includes[opt]) {
            cacheOptions.push(opt);
          }
          shark.setCache(
            "sgncQuestion",
            {
              result: result,
              options: cacheOptions,
              preAnswerTime: shark.getFarmTime(),
            },
            shark.getNextWeekDayMS(4)
          );
        }
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    sgncQuestionFn();
  }
}
// --- main  牧场收获时光 2023-12-27 23:59:59活动截止 ----
async function mcshsgFn() {
  try {
    const getFarmTime = shark.getFarmTime();
    const actStartTime = new Date("2023-12-07 00:00:00").getTime() / 1000;
    const actFinishedTime = new Date("2023-12-27 23:59:59").getTime() / 1000;

    if (getFarmTime < actFinishedTime) {
      const ismcshsg = shark.getCache("ismcshsg");
      const ismcshsgTaskHasGet = shark.getCache("ismcshsgTaskHasGet") || [];

      if (!ismcshsg) {
        await shark.reqest({
          name: `【牧场收获时光】任务激活`,
          url: "{!mc}cgi_pasture_kingdoms_activity",
          data: {
            act: "a16index",
          },
        });
        const id =
          new Date(getFarmTime * 1000).getDate() -
          new Date(actStartTime * 1000).getDate() +
          1;
        const { s, ecode, direction } = await shark.reqest({
          name: `【牧场收获时光】第${id}天签到`,
          url: "{!mc}cgi_pasture_kingdoms_activity",
          data: {
            act: "a16draw",
            id: id,
          },
        });
        if (ecode === 0) {
          shark.logger.log(`【牧场收获时光】第${id}天签到成功:领取奖励：${s}`);
          shark.setCache("ismcshsg", true, shark.getNextDayMS());
        } else {
          if (direction?.indexOf("已经") > -1) {
            shark.setCache("ismcshsg", true, shark.getNextDayMS());
          }
          shark.logger.log(`【牧场收获时光】第${id}天签到失败：${direction}`);
        }
      }
      // 任务领取
      for (let i = 1; i < 11; i++) {
        if (!ismcshsgTaskHasGet.includes(i)) {
          const { s, direction, ecode } = await shark.reqest({
            name: `【牧场收获时光】领任务奖励${i}`,
            url: "{!mc}cgi_pasture_kingdoms_activity",
            data: {
              act: "a16task",
              id: i,
            },
          });
          if (ecode === 0) {
            shark.logger.log(`【牧场收获时光】:领取任务${i}奖励：${s}`);
            ismcshsgTaskHasGet.push(i);
          } else {
            shark.logger.log(`【牧场收获时光】:任务${i}：${direction}`);
            if (direction?.indexOf("已经领取") > -1) {
              ismcshsgTaskHasGet.push(i);
            }
          }
          await shark.delay(2);
        }
      }
      shark.setCache(
        "ismcshsgTaskHasGet",
        ismcshsgTaskHasGet,
        shark.getNextDayMS()
      );
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    mcshsgFn();
  }
}
/**
 * @description: 农场种植监听
 * @return {*}
 */
// 农场种植监听

// 农场所有种子数据
const seedData = shark.getCropConfigs();
// 土地类型数据
const landData = [
  { id: 0, name: "normal", out: "0", time: "0" },
  { id: 1, name: "red", out: "10", time: "0" },
  { id: 2, name: "black", out: "20", time: "20" },
  { id: 4, name: "gloden", out: "28", time: "20" },
  { id: 8, name: "purple", out: "30", time: "25" },
  { id: 16, name: "blue", out: "32", time: "28" },
  { id: 32, name: "newblack", out: "32", time: "28" },
];

// 节气种子
let solarTerms = [];
// 用户设置的种植种子
let seedInput = {};

//  获取用户土地信息
async function requestGetUserLand() {
  const responseData = await requestOptimize(
    {
      name: "【农场种植】获取用户土地信息",
      url: "{!nc}cgi_farm_index",
      data: {
        mod: "user",
        act: "run",
      },
    },
    (data) => {
      return data?.farmlandStatus ? true : false;
    }
  );
  return responseData.farmlandStatus || [];
}
// 获取单块土地的信息
async function requestGetUserOneLand(landNum) {
  const { status } = await requestOptimize(
    {
      name: `【农场种植】获取第${landNum + 1}块土地信息`,
      url: "{!nc}cgi_farm_plant",
      data: {
        mode: "farmlandstatus",
        act: "getOutput",
        v_client: 1,
        place: landNum,
        ownerId: shark.selfUid,
      },
    },
    (data) => (data?.status ? true : false)
  );
  return status || {};
}
// 种植土地
async function requestPlanting(landNum, seedId, packageData) {
  if (!seedId) {
    shark.logger.log(`【农场种植】暂未设置${landNum + 1}土地的种植种子`);
    return;
  }
  let realSeedId = seedId === -1 ? solarTerms.map((i) => i.id) : seedId;
  let packageSeedObj = {};
  if (Array.isArray(realSeedId)) {
    // 在背包查看是否有种子
    for (let i = 0; i < realSeedId.length; i++) {
      const { amount, thingObj } = getPackageThingNumFn(
        packageData,
        "cId",
        1,
        realSeedId[i]
      );
      if (amount > 0) {
        realSeedId = realSeedId[i];
        packageSeedObj = thingObj;
        break;
      }
    }
    // 如果没找到（还是原来的数据）那么暂时禁止操作该土地
    if (Array.isArray(realSeedId)) {
      realSeedId = null;
      shark.logger.log(
        `【农场种植】第${landNum + 1}块土地种植失败：背包里已经没有节气种子了`
      );
      if (!shark.getCache(`forbidLand${landNum}`)) {
        forbidLandFn(landNum, 900);
      }
      return;
    }
  } else {
    // 先判断背包是否有种子，如果没有去商店购买
    const { amount, thingObj } = getPackageThingNumFn(
      packageData,
      "cId",
      1,
      realSeedId
    );
    if (amount > 0) {
      packageSeedObj = thingObj;
    } else {
      await requestBugSeed(realSeedId);
      await shark.delay(1);
    }
  }

  const { name: seedName } = getSeedInfoFn(realSeedId) || {};

  const { code, direction } = await shark.reqest({
    name: `【农场种植】第${landNum + 1}块土地种植${seedName}`,
    url: "{!nc}cgi_farm_plant",
    data: {
      mode: "farmlandstatus",
      act: "planting",
      v_client: 1,
      place: landNum,
      cId: realSeedId,
    },
  });
  if (code === 1) {
    //shark.logger.log(`【农场种植】第${landNum + 1}块土地种植${seedName}成功`)
    packageSeedObj.amount = packageSeedObj?.amount - 1;
  } else {
    if (!shark.getCache(`forbidLand${landNum}`)) {
      forbidLandFn(landNum, 600);
    }
    shark.logger.log(
      `【农场种植】第${landNum + 1}块土地种植${
        seedName || ""
      }失败：${direction}`
    );
  }
  return { code, direction };
}
//收获土地
async function requestHarvest(landNum) {
  //校验是否需要收获
  const { code, direction, harvest, status } = await shark.reqest({
    name: `【农场种植】第${landNum + 1}块土地收获`,
    url: "{!nc}cgi_farm_plant",
    data: {
      v_client: 1,
      place: landNum,
      mode: "farmlandstatus",
      act: "harvest",
    },
  });
  if (code === 1) {
    shark.logger.log(
      `【农场种植】第${landNum + 1}块土地收获成功:${
        getSeedInfoFn(status?.cId)?.name
      }*${harvest}个`
    );
  } else {
    shark.logger.log(
      `【农场种植】第${landNum + 1}块土地收获失败：${direction}`
    );
  }
  return { code, direction, status };
}
// 铲地
async function requestScarify(landNum, isForce = false) {
  const { code, direction } = await shark.reqest({
    name: `【农场种植】第${landNum + 1}块土地铲除`,
    url: "{!nc}cgi_farm_plant",
    data: {
      v_client: 1,
      place: landNum,
      mode: "farmlandstatus",
      act: "scarify",
      cropStatus: isForce ? 2 : 7, //  7 代表的是枯萎才铲除
    },
  });
  if (code === 1) {
    // shark.logger.log(`【农场种植】第${landNum + 1}块土地铲除成功`)
  } else {
    shark.logger.log(
      `【农场种植】第${landNum + 1}块土地铲除失败：${direction}`
    );
  }
  return { code, direction };
}
// 施肥
async function requestFertilize(landNum) {
  //校验是否需要收获
  const { code, direction, status } = await shark.reqest({
    name: `【农场种植】第${landNum + 1}块土地施肥`,
    url: "{!nc}cgi_farm_plant",
    data: {
      v_client: 1,
      place: landNum,
      mode: "farmlandstatus",
      act: "fertilize",
      tId: 1,
    },
  });
  if (code === 1) {
    // shark.logger.log(`【农场种植】第${landNum + 1}块土地施肥成功`)
  } else {
    shark.logger.log(
      `【农场种植】第${landNum + 1}块土地施肥失败：${direction}`
    );
  }
  return { code, direction, status };
}
// 获取背包数据
async function requestGetUserSeed() {
  const responseData = await shark.reqest({
    name: "【农场种植】查看背包",
    url: "{!ncf}cgi_farm_getuserseed",
    data: {
      mod: "repertory",
      act: "getUserSeed",
    },
  });

  if (responseData && Array.isArray(responseData)) {
    return responseData;
  } else {
    shark.logger.log("【农场种植】查询背包失败");
    return [];
  }
}
// 购买种子
async function requestBugSeed(seedId) {
  const { name } = getSeedInfoFn(seedId) || {};
  const { code, direction, ecode } = await shark.reqest({
    name: `【农场种植】购买${name}种子`,
    url: "{!ncf}cgi_farm_buyseed",
    data: {
      number: 1,
      cId: seedId,
      appid: 353,
      mod: "repertory",
      act: "buySeed",
    },
  });
  if (code === 1) {
    //  shark.logger.log('【农场种植】购买种子成功')
  } else {
    shark.logger.log(direction);
  }
  return { code, ecode };
}
// 获取当前节气种子
async function requestGetSeedhb() {
  const { seedList, direction, ecode, l_seed_ex } = await shark.reqest({
    name: "【农场种植】获取节气种子信息",
    url: "{!nc}cgi_farm_seedhb",
    data: {
      act: 9,
    },
  });
  if (ecode === 0) {
  } else {
    shark.logger.log(`【农场种植】获取节气种子失败：${direction}`);
  }
  return { seedList, ecode, l_seed_ex };
}
// 领取当前节气种子
async function requestGetSolarTermsSeed() {
  const { direction, ecode } = await shark.reqest({
    name: "【农场种植】领取节气种子",
    url: "{!nc}cgi_farm_seedhb",
    data: {
      act: 10,
    },
  });
  if (ecode === 0) {
    // shark.logger.log('【农场种植】领取节气种子成功');
  } else {
    shark.logger.log(`【农场种植】领取节气种子失败：${direction}`);
  }
  return { direction, ecode };
}
// 获取用户好友列表信息
async function requestGetFriends() {
  const friendList = await requestOptimize({
    name: "【农场种植】获取好友列表",
    url: "{!nc}cgi_farm_getFriendList",
    data: {
      mod: "friend",
    },
  });
  return friendList;
}

//获取单个好友土地详情
async function requestFriendDetail(type, qq, name, uid) {
  const responseData = await requestOptimize(
    {
      name: `【农场种植】${
        type === 1 ? "获取" : "刷新"
      }好友[QQ:${qq},name:${name}]信息`,
      url: "{!nc}cgi_farm_index",
      data: { act: "run", mod: "user", ownerId: uid },
    },
    (data) => {
      return data?.farmlandStatus ? true : false;
    }
  );

  return responseData.farmlandStatus || [];
}
// 偷取好友作物
async function requestSneaking(qq, name, uid, landNum, seedId) {
  const { ecode, direction } = await shark.reqest({
    name: `【农场种植】偷取[qq:${qq},name:${name}]的土地${landNum}:${
      getSeedInfoFn(seedId)?.name
    }(id=${seedId})`,
    url: "{!nc}cgi_farm_steal_v2",
    data: {
      act: "scrounge",
      mod: "farmlandstatus",
      ownerId: uid,
      place: landNum,
    },
  });
  return { ecode, direction };
}
// 解析用户填写的种子信息
// TODO: 需要兼容土地和种子（有一些种子需要不能再普通土地种植）
function getSeedInputDataFn() {
  // eg: 1-20:12;21-30:99
  const seedInputDataInfo = {},
    errorRule = [];
  const seedInput = shark.rule.seedInput;
  const landRange = seedInput.split(";");
  landRange.forEach((val, index) => {
    const land = val.split(":")[0].split("-");
    // 用户可以配置种子id, 节气种子-1
    let seedId = val.split(":")[1];
    for (let i = Number(land[0]); i <= Number(land[1]); i++) {
      if (seedId === "-1") {
        seedInputDataInfo[`land${i}`] = Number(seedId);
      } else if (getSeedInfoFn(Number(seedId))) {
        //当用户填写的是种子id时，校验种子id是否存在
        seedInputDataInfo[`land${i}`] = Number(seedId);
      } else {
        if (i === land[0]) errorRule.push(val);
      }
    }
  });
  if (errorRule.length > 0) {
    shark.logger.error(
      `【农场种植】以下种子规则填写错误：${errorRule},请重新填写`
    );
  }
  return seedInputDataInfo;
}
// 根据土地编号获取用户配置的种子id
function getLandSeedInputFn(landNum) {
  return seedInput[`land${landNum + 1}`];
}
//土地暂时禁止操作
function forbidLandFn(landNum, time = 300) {
  const forbidLand = shark.getCache(`forbidLand${landNum}`);
  if (forbidLand) {
  } else {
    const nextDayMS = shark.getNextDayMS();
    const nowFarmTime = shark.getFarmTime();
    let timeOut = (nowFarmTime + time) * 1000;
    let timeRange = time;
    if (timeOut > nextDayMS) {
      timeOut = nextDayMS;
      timeRange = nextDayMS / 1000 - nowFarmTime;
    }
    //startTime 开始禁止的时间   countdown禁止的时间
    shark.setCache(
      `forbidLand${landNum}`,
      { startTime: nowFarmTime, countdown: timeRange },
      timeOut
    );
  }
}

//通过解析接口返回值来判断当前种子是否可以施肥如果不可以则记录到cache中
function seedIsNotFertilizerFn(seedId, responseData = {}) {
  if (
    responseData.code === 0 &&
    responseData.direction?.indexOf("不能对该作物使用") > -1
  ) {
    const seedNotFertilizer = shark.getCache("seedNotFertilizer") || [];
    if (!seedNotFertilizer.includes(seedId)) {
      seedNotFertilizer.push(seedId);
      shark.setCache("seedNotFertilizer", seedNotFertilizer, 9999999999999);
    }
  }
}
// 获取当前作物是否可以施肥
function isFertilizerFn(seedId) {
  const seedNotFertilizer = shark.getCache("seedNotFertilizer") || [];
  const { isYouji } = getSeedInfoFn(seedId) || {};
  if (
    isYouji !== 1 &&
    !solarTerms.find((i) => i.id === seedId) &&
    !seedNotFertilizer.includes(seedId)
  ) {
    return true;
  } else {
    return false;
  }
}
// 判断的当前土地是否施肥过
function isLandFertilizerFn(land) {
  const { a: seedId, s: landType, q: plantTime, o } = land || {};
  const realStage = seedCurStage(seedId, landType, plantTime);
  if (realStage === o) {
    return true;
  } else {
    return false;
  }
}
// 施肥判断
async function plantFertilizeFn(landNum, land, packageData) {
  const fertilizer = shark.rule.fertilizer;
  const {
    a: seedId,
    b: stage,
    s: landType,
    q: plantTime,
    o: hasFertilizer,
  } = land || {};
  if (seedId) {
    // 背包是有化肥
    const { amount, thingObj } = getPackageThingNumFn(packageData, "tId", 3, 1);
    if (!isLandFertilizerFn(land) && isFertilizerFn(seedId) && amount > 0) {
      const nextStageTime = nextStageTimeFn(seedId, landType, plantTime);
      if (fertilizer === "last") {
        if (
          isFinalStageFn(seedId, landType, plantTime) &&
          nextStageTime <= 3600
        ) {
          //施肥
          const responseData = await requestFertilize(landNum);
          await shark.delay(1);
          if (responseData.code === 1) {
            // 施肥成功则需要把背包的化肥数量-1
            thingObj.amount = thingObj.amount - 1;
            await operationHarvestFn(
              landNum,
              land,
              packageData,
              responseData.status
            );
            await shark.delay(1);
          }
          seedIsNotFertilizerFn(seedId, responseData);
        }
      } else if (fertilizer === "every") {
        if (isFinalStageFn(seedId, landType, plantTime)) {
          if (nextStageTime <= 3600) {
            //施肥
            const responseData = await requestFertilize(landNum);
            await shark.delay(1);
            if (responseData.code === 1) {
              thingObj.amount = thingObj.amount - 1;
              await operationHarvestFn(
                landNum,
                land,
                packageData,
                responseData.status
              );
              await shark.delay(1);
            }

            seedIsNotFertilizerFn(seedId, responseData);
          }
        } else {
          //施肥
          const responseData = await requestFertilize(landNum);
          await shark.delay(1);
          if (responseData.code === 1) {
            thingObj.amount = thingObj.amount - 1;
          }
          seedIsNotFertilizerFn(seedId, responseData);
        }
      }
    }
  }
}
// 判断当前作物是否是收获阶段  time是时间，如果没传默认取现在的时间
function isFinalStageFn(
  seedId,
  landType,
  plantTime,
  time = shark.getFarmTime()
) {
  const cropGroupToArr = getSeedStepInfoFn(seedId, landType);
  // 去重，防止有些数据的最后阶段是0时间
  const deduplication = ArrayToDeduplicationFn(cropGroupToArr);
  const finalStageTime = deduplication[deduplication.length - 3];
  const startPlantToCurrent = time - plantTime;
  if (startPlantToCurrent >= finalStageTime) {
    return true;
  } else {
    return false;
  }
}

// 根据土地类型和种子类型判断当前种子不同阶段的成熟时间
function getSeedStepInfoFn(seedId, landType) {
  // 当前土地类型的时间减免百分比
  const curLandCD = landData.find((i) => i.id === landType).time;
  // isRed 作物级别(红土地种子？ 黑土地种子？……)
  const { cropGrow, isRed = 0 } = getSeedInfoFn(seedId);
  // 特殊的种子必须在固定的固定类型上菜减免时间
  let seedStep = cropGrow.split(",").map((i) => Number(i));
  if (
    (landType === 4 && isRed < 3) ||
    (landType === 2 && isRed < 2) ||
    (landType === 8 && isRed < 4) ||
    (landType === 16 && isRed < 5) ||
    (landType === 32 && isRed < 6)
  ) {
    seedStep = seedStep.map((i) => Number(i) * (1 - Number(curLandCD) / 100));
  }
  return seedStep;
}
// 作物进入到下一阶段的需要的时间
function nextStageTimeFn(seedId, landType, plantTime) {
  const startPlantToCurrent = shark.getFarmTime() - plantTime;
  const nextStageTime = getSeedStepInfoFn(seedId, landType).reduce(
    (prev, curr) => {
      if (prev > 0) {
        return prev;
      }
      if (curr - startPlantToCurrent >= 0) {
        return curr - startPlantToCurrent;
      } else {
        return -1;
      }
    },
    -1
  );
  return nextStageTime;
}
// 当前作物的阶段
function seedCurStage(seedId, landType, plantTime) {
  let stage = 5;
  const startPlantToCurrent = shark.getFarmTime() - plantTime;
  const seedStep = getSeedStepInfoFn(seedId, landType);
  for (let i = 0; i < seedStep.length; i++) {
    if (startPlantToCurrent < seedStep[i]) {
      stage = i + 1;
      break;
    }
  }
  return stage > 5 ? 5 : stage;
}
// 背包里物品的个数
function getPackageThingNumFn(packageData = [], idType, type, id) {
  const thingObj =
    packageData.find((i) => i?.[idType] === id && i.type === type) || {};
  const { amount = 0, isLock } = thingObj;
  return { amount, isLock, thingObj };
}
// 数组去重
function ArrayToDeduplicationFn(arr = []) {
  const retArr = [];
  arr.map((value) => {
    if (!retArr.includes(value)) {
      retArr.push(value);
    }
  });
  return retArr;
}
// 数组对象去重
function ArrayObjectToDeduplicationFn(list, key) {
  let temp = [];
  return list.filter(
    (item) => !temp.includes(item[key]) && temp.push(item[key])
  );
}
// 秒转换成 *时*分*秒的格式
function secondsToHoursMinutesSecondsFn(num) {
  const hours = Math.trunc(num / 3600);
  const minutes = Math.trunc((num % 3600) / 60);
  const seconds = Math.trunc((num % 3600) % 60);
  return {
    hours,
    minutes,
    seconds,
    showTime: `${hours}时${minutes}分${seconds}秒`,
  };
}
//时间戳转换成月日时分秒
function timestampToTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return { M, D, h, m, s, showTime: `${M}月${D}日${h}时${m}分${s}秒` };
}

// 领取节气种子
async function getSolarTermsFn() {
  // 获取节气种子信息
  const { seedList = [], l_seed_ex } = await requestGetSeedhb();
  if (l_seed_ex === 0) {
    await requestGetSolarTermsSeed();
  }
  solarTerms = seedList.sort((a, b) => b.count - a.count);
}
// 判断当前是否是节气种子
function isSolarSeedFn(seedId) {
  return solarTerms.reduce((pre, cur) => {
    return pre || Number(cur.id) === Number(seedId);
  }, false);
}
//作物成熟的倒计时时间
function getLandRipeCountdown(land) {
  const { a: seedId, s: landType, q: plantTime } = land;
  //当前作物不同阶段的时间（算上了土地加成）
  const seedStep = getSeedStepInfoFn(seedId, landType);
  //下次成熟的时间差
  let ripe = seedStep[seedStep.length - 2];
  // 下次成熟的时间戳(秒)
  const ripeTime = plantTime + ripe;
  // 下次成熟的倒计时(秒)
  const ripeCountdown = ripeTime - shark.getFarmTime();
  return { ripeCountdown, ripeTime };
}
// 当前作物是否是最后一个阶段
//  计算下次操作的时间
function calcTimeFn(land = [], packageData = []) {
  const landTime = [],
    landDetail = [];
  for (let i = 0; i < land.length; i++) {
    const {
      a: seedId,
      b: stage,
      j: seasonsNumber,
      s: landType,
      q: plantTime,
      o: hasFertilizer,
    } = land[i] || {};
    const { name, harvestNum } = getSeedInfoFn(seedId) || {};
    const { ripeCountdown, ripeTime } = seedId
      ? getLandRipeCountdown(land[i])
      : {};
    const oneLandDetail = {
      index: i + 1,
      seedName: seedId ? name : "空地",
      quarter: seedId ? `${seasonsNumber + 1}/${harvestNum}` : null,
      ripeTime: stage,
    };
    landDetail.push(oneLandDetail);
    if (stage === 0 || stage === 7 || stage === 6) {
      // 用户设置的延迟收获
      const solarDelay = shark.rule.solarDelay;
      const forbidLand = shark.getCache(`forbidLand${i}`);
      if (forbidLand) {
        // 如果当前土地被暂时禁止了，那么需要计算禁止倒计时(开始记录禁止的时间+禁止时长-当前时间=还剩下的禁止时长)
        const forbidLandRemainder =
          forbidLand.startTime + forbidLand.countdown - shark.getFarmTime();
        landTime.push({
          time: forbidLandRemainder,
          tip: `[第${i + 1}块土地]==>上次禁止对该土地操作，再次操作`,
        });
      } else {
        if (stage === 0 && !getLandSeedInputFn(i)) {
          // 当前土地如果是种植阶段且没有设置种植种子则不加入监控中
        } else if (
          stage === 6 &&
          solarDelay &&
          isSolarSeedFn(seedId) &&
          Math.abs(ripeCountdown) < Number(solarDelay) * 60
        ) {
          // 如果当前阶段是收获阶段且用户设置了延迟收获
          landTime.push({
            time: Number(solarDelay) * 60 - Math.abs(ripeCountdown),
            tip: `[第${i + 1}块土地]==>${name}将延迟到${
              timestampToTime(ripeTime + Number(solarDelay) * 60).showTime
            }收获`,
          });
        } else {
          landTime.push({
            time: 2,
            tip: `[第${i + 1}块土地]==>${
              stage === 0 ? "种植" : stage === 6 ? "收获" : "铲除"
            }`,
          });
        }
      }
      oneLandDetail.ripeTime =
        stage === 0 ? "空地" : stage === 7 ? "枯萎" : "成熟";
    } else {
      // 当前作物成熟的倒计时
      // 进入下个阶段需要的时间
      const nextStageTime = nextStageTimeFn(seedId, landType, plantTime);

      // 如果当前阶段是收获阶段，那么就倒计时1小时施肥，如果当前阶段是是成长阶段那么直接施肥
      const fertilizer = shark.rule.fertilizer;
      // isFertilizerFn 是否可以施肥   getPackageThingNumFn背包里是否有化肥
      if (
        isFertilizerFn(seedId) &&
        getPackageThingNumFn(packageData, "tId", 3, 1).amount > 0
      ) {
        if (fertilizer === "last") {
          if (isFinalStageFn(seedId, landType, plantTime)) {
            // 如果当前是最后阶段
            if (!isLandFertilizerFn(land[i])) {
              landTime.push({
                time: nextStageTime <= 3600 ? 2 : nextStageTime - 3600,
                tip: `[第${i + 1}块土地]==>施肥`,
              });
            }
          } else {
            // 当前阶段不是最后阶段
            landTime.push({
              time: ripeCountdown - 3600,
              tip: `[第${i + 1}块土地]==>施肥`,
            });
          }
        } else if (fertilizer === "every") {
          if (isFinalStageFn(seedId, landType, plantTime)) {
            if (!isLandFertilizerFn(land[i])) {
              landTime.push(nextStageTime <= 3600 ? 2 : nextStageTime - 3600);
            }
          } else {
            if (!isLandFertilizerFn(land[i])) {
              landTime.push({ time: 2, tip: `[第${i + 1}块土地]==>施肥` });
            } else {
              //如果下个阶段是收获阶段
              if (
                isFinalStageFn(
                  seedId,
                  landType,
                  plantTime,
                  shark.getFarmTime() + nextStageTime
                )
              ) {
                landTime.push({
                  time: ripeCountdown - 3600,
                  tip: `[第${i + 1}块土地]==>施肥`,
                });
              } else {
                // 下个阶段不是收货阶段则直接放入到倒计时数组中
                landTime.push({
                  time: nextStageTime,
                  tip: `[第${i + 1}块土地]==>施肥`,
                });
              }
            }
          }
        }
      }
      landTime.push({ time: ripeCountdown, tip: `[第${i + 1}块土地]==>收获` });
      oneLandDetail.ripeTime =
        secondsToHoursMinutesSecondsFn(ripeCountdown).showTime;
    }
  }
  const { time: minTime = 900, tip = "上次没有检测到可操作的土地" } =
    landTime.sort((a, b) => a.time - b.time)?.[0] || {};
  const { hours, seconds, minutes } = secondsToHoursMinutesSecondsFn(minTime);
  return { minTime, hours, minutes, seconds, tip, landDetail };
}
// 把好友信息保存到缓存中
function setFriendListCacheFn(friendList) {
  const friendRefresh = Number(shark.rule.friendRefresh) || 900;
  const cacheTime = shark.getFarmTime() + friendRefresh;
  shark.setCache("friendList", friendList, cacheTime * 1000);
}
// 农场操作
async function operationFn() {
  const land = await requestGetUserLand();
  await shark.delay(2);
  const packageData = await requestGetUserSeed();
  await shark.delay(1);
  for (let i = 0; i < land.length; i++) {
    if (!shark.getCache(`forbidLand${i}`)) {
      const { a: seedId, b: stage, j: seasonsNumber } = land[i] || {};
      const landNum = i;
      if (stage === 0) {
        // 当前土地是空地时，需要种植
        await requestPlanting(
          landNum,
          getLandSeedInputFn(landNum),
          packageData
        );
        await shark.delay(1);
      } else if (stage === 6) {
        // 当果实成熟时有以下规则
        // 1.如果是节气种子且设置了延迟收获则需要延迟收获
        // 2.需要判断当前种子的阶段，如果是最后一个阶段，收获了后需要铲除并种植 solarTerms.map(i => i.id)
        /*   const { harvestNum, name } = getSeedInfoFn(seedId)
          const solarDelay = shark.rule.solarDelay;
          const { ripeCountdown, ripeTime } = getLandRipeCountdown(land[i])
          if (solarDelay && isSolarSeedFn(seedId) && Math.abs(ripeCountdown) < Number(solarDelay) * 60) {
            // 延迟收获
            // shark.logger.log(`【农场种植】第${i + 1}块土地的作物(${name})将延迟到${timestampToTime(ripeTime + Number(solarDelay) * 60).showTime}收获`)
          } else {
            const { code } = await requestHarvest(landNum)
            await shark.delay(1)
            if (code === 1 && harvestNum === seasonsNumber + 1) {
              // 铲除
              const { code } = await requestScarify(landNum);
              await shark.delay(1)
              // 种植
              if (code === 1) {
                await requestPlanting(landNum, getLandSeedInputFn(landNum), packageData)
                await shark.delay(1)
              }
  
            }
          } */
        await operationHarvestFn(landNum, land[i], packageData);
      } else if (stage === 7) {
        // 当果实枯萎时铲除并种植
        const { code } = await requestScarify(landNum);
        await shark.delay(1);
        if (code === 1) {
          await requestPlanting(
            landNum,
            getLandSeedInputFn(landNum),
            packageData
          );
          await shark.delay(1);
        }
      }
      // 化肥
      await plantFertilizeFn(landNum, land[landNum], packageData);
      await shark.delay(1);
    }
  }
}
// 农场收获
async function operationHarvestFn(
  landNum,
  land,
  packageData,
  landStatusUpdate
) {
  let newLand = land;
  // 如果存在land状态更新，那么就先更新数据
  if (landStatusUpdate) {
    newLand = {
      ...newLand,
      b: landStatusUpdate.cropStatus,
      q: landStatusUpdate.plantTime,
      o: landStatusUpdate.fertilize,
    };
  }
  const { a: seedId } = newLand;
  const solarDelay = shark.rule.solarDelay;
  const { ripeCountdown } = getLandRipeCountdown(newLand);
  // 当果实成熟时有以下规则
  // 1.如果是节气种子且设置了延迟收获则需要延迟收获
  // 2.需要判断当前种子的阶段，如果是最后一个阶段，收获了后需要铲除并种植 solarTerms.map(i => i.id)
  if (
    solarDelay &&
    isSolarSeedFn(seedId) &&
    Math.abs(ripeCountdown) < Number(solarDelay) * 60
  ) {
    // 延迟收获
    // shark.logger.log(`【农场种植】第${i + 1}块土地的作物(${name})将延迟到${timestampToTime(ripeTime + Number(solarDelay) * 60).showTime}收获`)
  } else {
    const { code: harvestCode, status } = await requestHarvest(landNum);
    await shark.delay(1);
    if (harvestCode === 1 && status?.cropStatus === 7) {
      // 铲除
      const { code: scarifyCode } = await requestScarify(landNum);
      await shark.delay(1);
      // 种植
      if (scarifyCode === 1) {
        await requestPlanting(
          landNum,
          getLandSeedInputFn(landNum),
          packageData
        );
        await shark.delay(1);
      }
    }
  }
}
// 监听自己农场的作物
async function listenOwnerFarmFn() {
  const reloadRule = Number(shark.rule.reload) || 3600;
  do {
    try {
      const packageData = await requestGetUserSeed();
      await shark.delay(2);
      const userLand = await requestGetUserLand();
      const { minTime, hours, minutes, seconds, tip } = calcTimeFn(
        userLand,
        packageData
      );
      const reloadTime = Math.min(reloadRule, minTime);
      const showTip =
        minTime === reloadTime
          ? `【农场种植】监听作物中：${hours}时${minutes}分${seconds}秒后进行下次操作${tip}`
          : `【农场种植】监听作物中：${reloadRule / 60}分钟重新刷新农场数据`;
      shark.logger.log(showTip);
      await shark.delay(reloadTime);
      if (reloadTime === minTime) {
        // 如果是当前时间是操作的倒计时则执行操作
        shark.logger.log("【农场种植】开始操作");
        await operationFn();
        await shark.delay(2);
      } else {
        shark.logger.log("【农场种植】刷新农场数据");
      }
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(10);
    }
  } while (true);
}
// 监听好友农场作物
async function listenFriendFarmFn() {
  try {
    // 获取好友列表
    const getFriends = await requestGetFriends();
    const friendInfo = ArrayObjectToDeduplicationFn(getFriends, "uin");
    const { refresh, data: friendObj } = shark.getCache("friendList") || {};

    if (
      friendObj &&
      friendObj instanceof Object &&
      Object.keys(friendObj).length >= friendInfo.length
    ) {
      // 如果用户更新了friendRefresh，需要更新cache
      if (refresh !== Number(Number(shark.rule.friendRefresh) || 900)) {
        setFriendListCacheFn(shark.getCache("friendList"));
      }
      for (let key in friendObj) {
        const { detail, uin, userName, uId } = friendObj[key];
        for (let i = 0; i < detail.length; i++) {
          const { a: seedId, b: stage } = detail[i];
          if (stage === 0 || stage === 7 || stage === 6) {
            if (stage === 6) {
              // 偷
            }
          } else {
            const { ripeCountdown } = getLandRipeCountdown(detail[i]);
            shark.logger.log(
              uin +
                "*" +
                userName +
                "*" +
                uId +
                "*" +
                i +
                "*" +
                "*" +
                seedId +
                "*" +
                ripeCountdown
            );
            shark.delay(ripeCountdown, function () {
              // 偷
              const { ecode, direction } = requestSneaking(
                uin,
                userName,
                uId,
                i,
                seedId
              );
            });
          }
        }
      }
    } else {
      for (let friend of friendInfo) {
        const { uin } = friend;
        const { data: friendObj = {} } = shark.getCache("friendList") || {};

        if (!friendObj[uin]) {
          friend.detail = await requestFriendDetail(
            1,
            friend.uin,
            friend.userName,
            friend.uId
          );
          // 把好友信息保存到缓存中
          const cacheData = {
            refresh: Number(shark.rule.friendRefresh) || 900,
            data: {
              ...friendObj,
              [uin]: friend,
            },
          };
          setFriendListCacheFn(cacheData);
          shark.logger.log(
            `已完成${Object.keys(friendObj).length + 1}/${friendInfo.length}`
          );
          await shark.delay(5);
        }
      }

      listenFriendFarmFn();
    }
  } catch (error) {
    shark.logger.log(error.toString());
    await shark.delay(10);
    onPluginStart();
  }
}

onPluginStart = async function () {
  /* * *  长期活动 * * */
  // 小摊购买
  if (shark.rule.xiaotan) {
    //购买广告小摊
    bugXiaoTan();
    //购买好友小摊
    bugFriendXiaoTan();
  }
  // 微端许愿树许愿
  if (shark.rule.hope) {
    hopeFn();
  }
  // 金币兑换点卷
  if (shark.rule.moneyToCoupon) {
    moneyToCouponFn();
  }
  // 点卷兑换其他
  if (
    Array.isArray(shark.rule.couponToThing) &&
    shark.rule.couponToThing.length > 0
  ) {
    couponToThingFn();
  }
  // 家族商店;
  familyShopFn();
  //
  /* * *  临时活动 * * */
  // 矿山返利季
  ksflj();
  //喜迎新版倒计时
  xyxbdjs();
  // 牧场 精灵联军挑战领取
  jlkingdoms();
  //牧场收获时光
  mcshsgFn();
  // 仙藏秘府领取宝石活动
  if (shark.rule.xzmf) {
    xzmfFn();
  }

  // 监听自己农场作物
  if (shark.rule.plant) {
    // 领取节气种子
    await getSolarTermsFn();
    // 解析用户输入的种植种子
    seedInput = getSeedInputDataFn();
    // 开始监听作物
    listenOwnerFarmFn();
  }
  if (shark.rule.sgncQuestion) {
    sgncQuestionFn();
  }
};

onPanelShow = async function (refresh) {
  let tableData1 = [],
    columnData1 = [],
    tableData2 = [],
    columnData2 = [];
  if (shark.rule.xiaotan && shark.rule.xiaotanPanel) {
    const seedIdList = [
      3, 4, 7, 10, 16, 17, 21, 22, 33, 34, 35, 37, 38, 39, 42, 48, 51, 54, 55,
      56, 57, 58, 60, 61, 68, 72, 74, 75, 76, 77, 78, 79, 80, 83, 84, 86, 87,
      89, 90, 95, 97, 98, 210, 211, 228, 251, 253, 266, 268, 304, 305, 308, 413,
      747, 966, 969, 1017, 1018, 1019, 1038, 1044, 1050, 1060, 1471, 1472, 1475,
      1477,
    ];
    columnData1 = [
      { name: "运输机作物名称", key: "name" },
      { name: "运输机作物Id", key: "id" },
      { name: "作物仓库数量", key: "num" },
    ];
    const { crop } = await requestOptimize(
      {
        name: "获取仓库数据",
        url: "{!nc}cgi_farm_getusercrop",
        data: {
          f: 1,
        },
      },
      (data) => (data?.crop ? true : false)
    );
    seedIdList.map((item) => {
      const curCropData = crop.find((i) => i.cId === item);
      tableData1.push({
        name: curCropData?.cName || item,
        id: curCropData?.cId || item,
        num: curCropData?.amount || 0,
      });
    });
    tableData1 = tableData1.sort((a, b) => b.num - a.num);
    shark.logger.log(`作物从多到少ID排序：${tableData1.map((i) => i.id)}`);
    refresh(tableData1, columnData1);
  }

  if (shark.rule.plant && shark.rule.plantPanel) {
    const userLand = await requestGetUserLand();
    columnData2 = [
      { name: "编号", key: "index" },
      { name: "作物", key: "seedName" },
      { name: "季度", key: "quarter" },
      { name: "成熟倒计时", key: "ripeTime" },
    ];
    tableData2 = calcTimeFn(userLand, []).landDetail;
    refresh(tableData2, columnData2);
    return {
      收获: async function (data) {
        const index = Number(data.index) - 1;
        const landInfo = await requestGetUserOneLand(index);
        if (landInfo.cropStatus === 0) {
          await requestHarvest(index);
        } else {
          shark.logger.log("作物收获失败：当前土地不是收获阶段，请刷新查看");
        }
      },
      种植: async function (data) {
        const index = Number(data.index) - 1;
        const landInfo = await requestGetUserOneLand(index);
        const seedId = getLandSeedInputFn(index);
        if (!seedId) {
          shark.logger.log("无法播种：没有配置该土地的种子");
          return;
        }
        if (landInfo.cropStatus === 0) {
          const packageData = await requestGetUserSeed();
          await requestPlanting(index, seedId, packageData);
        } else {
          shark.logger.log("种植失败：当前土地不是空地，请刷新查看");
        }
      },
      铲除: async function (data) {
        const index = Number(data.index) - 1;
        const landInfo = await requestGetUserOneLand(index);
        if (landInfo.cropStatus === 7) {
          await requestScarify(index);
        } else {
          shark.logger.log("作物铲除失败：当前土地不是枯萎阶段，请刷新查看");
        }
      },
      强制铲除: async function (data) {
        const index = Number(data.index) - 1;
        const landInfo = await requestGetUserOneLand(index);
        if (landInfo.cropStatus === 7) {
          await requestScarify(index);
        } else {
          await requestScarify(index, true);
        }
      },
      施肥: async function (data) {
        const index = Number(data.index) - 1;
        await requestFertilize(index);
      },
    };
  }
};
