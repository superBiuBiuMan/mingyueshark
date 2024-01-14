// 定义插件名字
pluginName = "农牧场小功能合集";
// 定义作者名称
pluginAuthor = "Alex";
// 特别感谢以下作者：借用了他们的一些插件接口及部分逻辑
/* 
  等雨停
  三
*/
pluginVersion = "1.0.3";
// 鸣谢作者三，
// 定义描述
pluginDescription =
  "-------------------------------------  长期活动  --------------------------------------------" +
  "【小摊】：只会购买农场广告小报的作物。购买作物的Id默认是：747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34 注意：如果出现频繁请关闭此功能。" +
  "【微端许愿树】： 比如有三个许愿项，你选了普通有机化肥，那么三个许愿项都是普通有机化肥。注意：需要许愿树等级是40级且农牧助手（三合一）需要关闭许愿选项（不许愿✓即可）。" +
  "【微端家族商店】 【首农家族商店】 【金币兑换点卷】【点卷兑换】"
  "---------------------------------  临时活动  ------------------------------------------" +
  "【矿山返利季签到 2023-11-29 23:59:59截止】，【喜迎新版倒计时 2023-12-13 23:59:59截止】【牧场精灵联军挑战 2023-12-06 23:59:59】";
pluginInputs = [
  {
    key: "xiaotan",
    title: "【小摊】是否启用功能",
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
    key: "hope",
    title: "【微端许愿树】是否启用功能",
    placeholder: "默认禁用",
    type: "select",
    selects: [
      { name: "启用", value: 1 },
      { name: "禁用", value: 0 },
    ],
  },
  {
    key: "hopeId",
    title: "【微端许愿树】许愿项",
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
    ]
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
      { name: "黑魔晶", value: "黑魔晶", },
      { name: "家族科技点", value: "家族科技点", },
      { name: "红营养液", value: "红营养液", },
      { name: "黄营养液", value: "黄营养液", },
      { name: "白营养液", value: "白营养液", },
      { name: "深海红晶石", value: "深海红晶石", },
      { name: "深海蓝晶石", value: "深海蓝晶石", },
      { name: "深海绿晶石", value: "深海绿晶石", },
      { name: "深海黄晶石", value: "深海黄晶石", },
      { name: "天命种子", value: "天命种子", },
      { name: "速度种子", value: "速度种子", },
      { name: "特级经验种子", value: "特级经验种子", },
      { name: "高级经验种子", value: "高级经验种子", },
      { name: "特级体力种子", value: "特级体力种子", },
      { name: "高级体力种子", value: "高级体力种子", },
      { name: "特级洗练种子", value: "特级洗练种子", },
      { name: "高级洗练种子", value: "高级洗练种子", },
      { name: "特级强力碎片", value: "特级强力碎片", },
      { name: "特级吸血碎片", value: "特级吸血碎片", },
      { name: "特级防御碎片", value: "特级防御碎片", },
      { name: "特级暴击碎片", value: "特级暴击碎片", },
      { name: "特级闪避碎片", value: "特级闪避碎片", },
      { name: "高级强力碎片", value: "高级强力碎片", },
      { name: "高级吸血碎片", value: "高级吸血碎片", },
      { name: "高级防御碎片", value: "高级防御碎片", },
      { name: "高级暴击碎片", value: "高级暴击碎片", },
      { name: "高级闪避碎片", value: "高级闪避碎片", }
    ]
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
      { name: "爱心", value: "爱心", },
      { name: "花粉", value: "花粉", },
      { name: "狗粮", value: "狗粮", },
      { name: "车轮矿", value: "车轮矿", },
      { name: "刷新卡", value: "刷新卡", },
      { name: "冷却剂", value: "冷却剂", },
      { name: "红营养液", value: "红营养液", },
      { name: "黄营养液", value: "黄营养液", },
      { name: "白营养液", value: "白营养液", },
    ]
  },
  {
    key: "farmFamilyIphoneGXShopCustom",
    title: "【手农家族】商店(备用填写)",
    placeholder: "物品名字(用英文的，分割隔开)",
  },
  {
    key: 'moneyToCoupon',
    title: "金币兑换点券",
    placeholder: "默认不兑换",
    type: "select",
    selects: [
      {name:'不兑换', value: 0, },
      { name: "1千万金币兑换5280点卷", value: "4", },
      { name: "4百万金币兑换2100点卷", value: "3", },
      { name: "1百万金币兑换500点券", value: "2", },
      { name: "20万金币兑换100点券", value: "1", },
    ]
  },
  {
    key: "couponToThing",
    title: "点券兑换",
    placeholder: "默认不兑换",
    type: "muti-select",
    selects: [
      { name: "高速肥料礼包", value: "3,9107,高速肥料礼包", },
      { name: "高级鱼食礼包", value: "24,9201,高级鱼食礼包", },
    ]
  },
];
async function requestOptimize(req, isSuccessFn = null, retryCount = 3, throwError = true) {
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
      return result
    }
    await shark.delay(5);
  }
  await shark.delay(10);
  throw new Error("请求错误次数达到上限");
}
// 重新加载插件
function reloadFn() {
  //第二天凌晨重新调用
  const nextDay = (shark.getNextDayMS() - Date.now()) / 1000 + 30;
  shark.delay(nextDay, function () {
    onPluginStart();
  });
}
// 获取到晚上10点的倒计时
function getTenOclockCountdownFn() {
  const getFarmTime = shark.getFarmTime();
  const nextDayTime = shark.getNextDayMS() / 1000;
  return nextDayTime - 60 * 60 * 2 - getFarmTime
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
async function requestXiaoTanInfo(uin) {
  const responseData = await requestOptimize(
    {
      name: `获取${uin}的小摊数据`,
      url: "{!nc}cgi_farm_xiaotan_index",
      data: {
        uin: uin,
      },
    },
    null,
    10
  );
  return responseData;
}
// 获取广告小报列表数据
async function requestXiaoTanGetadvs() {
  const responseData = await requestOptimize(
    {
      name: "获取广告小报列表数据",
      url: "{!nc}cgi_farm_xiaotan_getadvs",
    },
    null,
    10
  );
  return responseData;
}
async function requestXiaoTanByg(uin, shelf) {
  const responseData = await requestOptimize(
    {
      name: "开始购买",
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
          data.direction.indexOf("好友间的交易达到了上限") > -1)
      ) {
        return true;
      } else {
        return false;
      }
    },
    3
  );
  return responseData;
}
/**
 * @description: 购买小摊
 * @return {*}
 */
async function bugXiaoTan() {
  try {
    while (true) {
      const saleMoneyTypeObj = {
        JB: [0],
        DJ: [1],
        JBAndDJ: [0, 1],
      };
      const saleMoneyTypeSelected =
        saleMoneyTypeObj[shark.rule.saleMoneyType || "JB"];
      let saleNumInput = Number(shark.rule.saleNum) || 60;
      saleNumInput = saleNumInput >= 60 ? 60 : saleNumInput;
      const cropId = splitStringId(
        shark.rule.crop ||
        "747,268,304,72,78,76,33,98,38,37,228,77,51,308,305,34"
      );
      // 当天是否还有购买次数
      let toDayCanBug = shark.getCache("xiaotan_toDayCanBug");
      if (toDayCanBug !== false && !toDayCanBug) {
        shark.setCache("xiaotan_toDayCanBug", true, shark.getNextDayMS());
        toDayCanBug = true;
      }
      if (toDayCanBug) {
        // 获取小摊数据
        const { buyStrangerTimes, level } = await requestXiaoTanInfo(
          shark.selfUin
        );
        //根据当前等级获取用户的购买次数
        const { strangerTimes } = getBuyNumFn(level);
        if (buyStrangerTimes === strangerTimes) {
          shark.setCache("xiaotan_toDayCanBug", false, shark.getNextDayMS());
          throw new Error("今日小摊购买次数已用完");
        }
        // 获取广告小报数据
        const { advslist: xiaotanData } = await requestXiaoTanGetadvs();
        for (let i = 0; i < xiaotanData.length; i++) {
          const { saleMoneyType, saleItemNum, saleItemid, uin } =
            xiaotanData[i];
          if (
            saleMoneyTypeSelected.includes(saleMoneyType) &&
            cropId.includes(saleItemid)
          ) {
            //进入小摊
            const friendXiaotanData = await await requestXiaoTanInfo(uin);
            await shark.delay(1);
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
                const { ecode } = await requestXiaoTanByg(uin, j);
                if (ecode === 0) {
                  shark.logger.log(
                    `购买小摊作物${saleInfo.saleItemid}：${getSeedInfoFn(saleInfo.saleItemid)?.name
                    }*${saleInfo.saleItemNum}个`
                  );
                }
                await shark.delay(5);
              }
            }
          }
        }
      }
      // 10分钟检测一次
      await shark.delay(60 * 10);
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    bugXiaoTan();
  }
}
//  获取许愿树地信息
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
    name: `获取微端许愿树信息`,
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
    name: `许愿树收获`,
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
/**
 * @description: 许愿树许愿
 * @return {*}
 */
async function hopeFn() {
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

  if (hopeId && !(canHope === false)) {
    try {
      do {
        if (!isHope) {
          const { status, gift_list, star_lv, lv } = await requestGetHopeInfo();
          if (lv !== 40) {
            shark.setCache("hope_canHope", false, shark.getNextDayMS());
            throw new Error("当前用户的许愿树未达到40级暂不可许愿");
          }
          if (status === 0) {
            for (let i = 0; i < gift_list.length; i++) {
              const { id, num } = gift_list[i];
              if (id === hopeId) {
                // 开始许愿
                const hopeList = getCurrentUserHopeList(star_lv, id);
                await shark.delay(5);
                const { ecode } = await requestSetHope(id, hopeList);
                if (ecode === 0) {
                  shark.logger.log(
                    `微端许愿树许愿成功:${hopeList.split("_").length * num}个 ${hopeObj[id]
                    }`
                  );
                  hopeFn();
                  return;
                }
              }
            }
            throw new Error("此次没有符合要求的许愿，将再次许愿");
          } else if (status === 4) {
            const responseData = await requestHopeHarvest();

            if (responseData.ecode === 0) {
              shark.logger.log("微端许愿树许愿: 收获许愿树成功");
              shark.setCache("hope_isHope", true, shark.getNextDayMS());
              hopeFn();
              return
            }
          } else if (status === 1) {
            shark.setCache("hope_isHope", true, shark.getNextDayMS());
            shark.logger.log("微端许愿树许愿: 已收获许愿树了，别太贪心了");
            hopeFn();
            return
          }
        }
        await shark.delay(15 * 60);
      } while (true);
    } catch (error) {
      const message = error.toString().replace("Error: ", "");
      shark.logger.log(message);
      await shark.delay(5);
      hopeFn();
    }
  }
}
/**
 * @description: 金币兑换点卷
 * @return {*}
 */
async function moneyToCouponFn() {
  try {
    const moneyToCouponSelected = shark.rule.moneyToCoupon
    const isMoneyToCoupon = shark.getCache("isMoneyToCoupon");

    if (moneyToCouponSelected && !isMoneyToCoupon) {
      while (true) {
        const { ecode, cost_money, add_coupon, direction = '' } = await shark.reqest({
          name: "金币兑换点券",
          url: "{!ncf}cgi_farm_money_coupon_change",
          data: { chgid: moneyToCouponSelected },
        });
        if (ecode === 0) {
          shark.logger.log(`【金币兑换点券】：花费金币${cost_money}购买点券${add_coupon}`)
          shark.setCache("isMoneyToCoupon", true, shark.getNextDayMS());
          return
        } else {
          if (direction.indexOf('已经兑换过') > -1) {
            shark.setCache("isMoneyToCoupon", true, shark.getNextDayMS());
            return
          }
        }
        await shark.delay(60 * 60 * 2)
      }
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    moneyToCouponFn();
  }
}
/**
 * @description: 点卷兑换其他
 * @return {*}
 */
async function couponToThingFn() {
  try {
    const couponToThingSelected = shark.rule.couponToThing
    const couponToThing = shark.getCache("couponToThing");

    if (!couponToThing) {
      for (let i = 0; i < couponToThingSelected.length; i++) {
        const couponToThingSelectedArr = couponToThingSelected[i].split(",");
        const { ecode, coupon } = await shark.reqest({
          name: "点卷商店兑换" + couponToThingSelectedArr[2],
          url: "{!ncf}cgi_farm_buy_tools",
          data: { number: 1, type: couponToThingSelectedArr[0], tId: couponToThingSelectedArr[1], },
        });
        if (ecode === 0) {
          shark.logger.log(`【点卷兑换】：花费点卷${coupon?.toString()?.substring(1)}购买${couponToThingSelectedArr[2]}`)
        }
      }
      shark.setCache("couponToThing", true, shark.getNextDayMS());
    }
  } catch (error) {
    const message = error.toString().replace("Error: ", "");
    shark.logger.log(message);
    await shark.delay(10);
    couponToThingFn();
  }
}


/**
 * @description: 家族商店
 * @return {*}
 */
async function familyShopFn() {
  try {
    const {
      farmFamilyShopGX,
      farmFamilyShopGXCustom,
      farmFamilyShopXB,
      farmFamilyShopXBCustom,
      farmFamilyIphoneGXShop,
      farmFamilyIphoneGXShopCustom
    } = shark.rule;
    const farmFamilyShopGXArr = [...(farmFamilyShopGX || []), ...(farmFamilyShopGXCustom?farmFamilyShopGXCustom.split(','):[])];
    const farmFamilyShopXBArr = [...(farmFamilyShopXB || []), ...(farmFamilyShopXBCustom?farmFamilyShopXBCustom.split(','):[])];
    const farmFamilyIphoneGXShopArr = [...(farmFamilyIphoneGXShop || []), ...(farmFamilyIphoneGXShopCustom?farmFamilyIphoneGXShopCustom.split(','):[])];
    
    if (farmFamilyShopGXArr.length > 0 ||
      farmFamilyShopXBArr.length > 0 ||
      farmFamilyIphoneGXShopArr.length > 0
    ) {
      const familyInfo = await shark.reqest({
        name: "【微端家族】获取家族信息",
        url: "{!nc}cgi_farm_family",
        data: { act: "index" },
      });
      await shark.delay(2)
      if (familyInfo.ecode === 0) {
        // 微端个人贡献商店购买
        if (farmFamilyShopGXArr.length > 0) {
          const { gifts, daily_shop_draw } = await requestOptimize({
            name: "【微端家族】查看家族商店",
            url: "{!nc}cgi_farm_family",
            data: { act: "shop", shop_type: "query" },
          });
          await shark.delay(2)
          for (let i = 0; i < farmFamilyShopGXArr.length; i++) {
            const curShopName = farmFamilyShopGXArr[i];
            for (let j = 0; j < gifts.length; j++) {
              const draw_id = j + 1;
              if (gifts[j].name === curShopName) {
                for (let num = 0; num < 20 - daily_shop_draw; num++) {
                  const { ecode, pkg } = await shark.reqest({
                    name: "【微端家族】商店购买",
                    url: "{!nc}cgi_farm_family",
                    data: { act: "shop", shop_type: "exchange", draw_id: draw_id },
                  });
                  if (ecode === 0) {
                    shark.logger.log('【微端家族】商店购买:' + shark.convertPkgToStr(pkg));
                    await shark.delay(2)
                  } else {
                    break
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
          await shark.delay(2)
          for (let i = 0; i < farmFamilyShopXBArr.length; i++) {
            const curShopName = farmFamilyShopXBArr[i];
            for (let j = 0; j < pool_gift.length; j++) {
              const draw_id = j + 1;
              //ts[j]===0 表示没有购买过
              if (pool_gift[j].name === curShopName && ts[j]===0) {
                const { ecode, package } = await shark.reqest({
                  name: "【微端家族】仙币商店购买",
                  url: "{!nc}cgi_farm_family_battle",
                  data: { act: "shopbuy", id: draw_id },
                });
                if (ecode === 0) {
                  shark.logger.log('【微端家族】仙币商店购买:' + shark.convertPkgToStr(package));
                  await shark.delay(2)
                } else {
                  break
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
          await shark.delay(2)
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
                      draw_id: draw_id
                    },
                  });
                  if (ecode === 0) {
                    shark.logger.log('【手农家族】商店购买:' + shark.convertPkgToStr(pkg));
                    await shark.delay(2)
                  } else {
                    break
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
    couponToThingFn();
  }
}


/**
 * @description: 临时活动
 * @return {*}
 */

//矿山返利季  2023-11-29 23:59:59活动截止

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
        if (ecode === 0 || direction.indexOf("今日已签到") > -1) {
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
// 喜迎新版倒计时 2023-12-13 23:59:59活动截止
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
        if (ecode === 0 || direction.indexOf("已经领") > -1) {
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

// 牧场精灵联军挑战活动 2023-12-06 23:59:59活动截止
async function jlkingdoms() {
  try {
    const getFarmTime = shark.getFarmTime();
    const nextDayTime = shark.getNextDayMS() / 1000;
    const actFinishedTime = new Date("2023-12-06 23:59:59").getTime() / 1000;

    if (getFarmTime < actFinishedTime) {
      // 每天晚上10点运行一次
      const countdown = getTenOclockCountdownFn()
      await shark.delay(countdown);
      const isjlkingdoms = shark.getCache("isjlkingdoms");
      const jlkingdomsTaskHasGet = shark.getCache("jlkingdomsTaskHasGet") || [];
      if (!isjlkingdoms) {
        await requestOptimize({
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
              if (direction.indexOf("已经领取") > -1) {
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

onPluginStart = async function () {
  //凌晨重新加载
  reloadFn();
  /* * *  长期活动 * * */
  // 小摊购买
  if (shark.rule.xiaotan) {
    bugXiaoTan();
  }
  // 微端许愿树许愿
  if (shark.rule.hope) {
    hopeFn();
  }
  // 金币兑换点卷
  if (shark.rule.moneyToCoupon) {
    moneyToCouponFn()
  }
  // 点卷兑换其他
  if (Array.isArray(shark.rule.couponToThing) && shark.rule.couponToThing.length > 0) {
    couponToThingFn()
  }
  // 家族商店;
  familyShopFn()
  //
  /* * *  临时活动 * * */
  // 矿山返利季
  ksflj();
  //喜迎新版倒计时
  xyxbdjs();
  // 牧场 精灵联军挑战领取
  jlkingdoms();
};

onPanelShow = async function (refresh) {
  if (shark.rule.xiaotan) {
    const seedIdList = [
      3, 4, 7, 10, 16, 17, 21, 22, 33, 34, 35, 37, 38, 39, 42, 48, 51, 54, 55,
      56, 57, 58, 60, 61, 68, 72, 74, 75, 76, 77, 78, 79, 80, 83, 84, 86, 87,
      89, 90, 95, 97, 98, 210, 211, 228, 251, 253, 266, 268, 304, 305, 308, 413,
      747, 966, 969, 1017, 1018, 1019, 1038, 1044, 1050, 1060, 1471, 1472, 1475,
      1477,
    ];
    const columnData = [
      { name: "运输机作物名称", key: "name" },
      { name: "运输机作物Id", key: "id" },
      { name: "作物仓库数量", key: "num" },
    ];
    let tableData = [];
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
      tableData.push({
        name: curCropData?.cName || item,
        id: curCropData?.cId || item,
        num: curCropData?.amount || 0,
      });
    });
    tableData = tableData.sort((a, b) => b.num - a.num);
    shark.logger.log(`作物从多到少ID排序：${tableData.map((i) => i.id)}`);
    refresh(tableData, columnData);
  }
};
