// 定义插件名字 
pluginName = "时光种植";
// 定义作者名称
pluginAuthor = "怪我喽";
// 定义描述
pluginDescription = "=====会优先种植时光种子，最后一块地保留，只种时光。========="
// 插件版本
pluginVersion = "1.0.7";

pluginInputs = [
  {
    key: "fun_type",
    title: "功能选择",
    placeholder: "非必选",
    type: "muti-select",
    selects: [
      { name: "补种节气种子", value: "1", },
    ]
  },
]

// 背包
let knapsack

onPluginStart = async function () {
  try {
    await onPluginStartNew()
  } catch (error) {
    shark.logger.error("遇到位置错误，给你打印出来了，把错误截图给作者")
    shark.logger.error(error.toString());// 出错了等一段时间再重新执行
    shark.logger.error("错误已打印，30s后重启")
    await shark.delay(30);
    await onPluginStartNew()
  }
}

async function onPluginStartNew() {
  
  await harvest()

  await purchase()

  await plantFun()

  await solarTerms()

  await taskFun()

  await shark.delay(300)

  onPluginStart()
}

// 卖果实
async function harvest() {
  const { crop = [] } = await shark.reqest({
    name: "查看仓库",
    url: "{!nc}cgi_farm_getusercrop",
    data: {
      f: 1,
    },
  });

  if (crop && crop.length > 0) {
    let seed = crop.find((val) => {
      return val.cId == "6085";
    });
    if (seed && seed.amount > 0) {
      await shark.reqest({
        name: "卖果实",
        url: "{!nc}cgi_farm_time_space",
        data: {
          act: "sell",
          type: 1,
          num: seed.amount,
          cropid: 6085,
        },
      });
      shark.logger.log(`卖掉了${seed.amount}个果实`);
      await shark.delay(2);
    }
  }
}

// 买时光种子
async function purchase() {
  let shopInfo
  do {
    shopInfo = await shark.reqest({
      name: "查看商店",
      url: "{!nc}query?act=2280001",
      data: {
        shopid: 1,
      }
    })
    if (shopInfo.code == 1 && shopInfo.shop.length > 0) break
    await shark.delay(2)
  } while (true);


  let num = shopInfo.shop[0].limitmax - shopInfo.shop[0].curnum

  for (let i = 0; i < num; i++) {
    let result = await shark.reqest({
      name: "购买时光种子",
      url: "{!nc}exchange?act=2280002",
      data: {
        buyid: 1,
        buycount: 1,
        shopid: 1,
      }
    })
    if (result.ecode != 0) break
    await shark.delay(1)
  }
}

// 种植、铲除、收获
async function plantFun() {
  await shark.reqest({
    name: "一键收获",
    url: "{!nc}cgi_farm_time_space?act=batchharvest",
    data: {}
  })
  await shark.delay(1)

  let farmInfo
  do {
    farmInfo = await shark.reqest({
      name: "查看时光农场土地",
      url: "{!nc}cgi_farm_time_space?act=index",
    })

    if (farmInfo.ecode == 0 && farmInfo.res) break
    await shark.delay(1)
  } while (true);
  await shark.delay(1)

  do {
    knapsack = await shark.reqest({
      name: "查看背包",
      url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed"
    })
    if(knapsack && knapsack.length >= 0) break
    await shark.delay(1)
  } while (true);
  await shark.delay(1)

  let seed = knapsack.find(val => {
    return val.cId == "6085"
  })

  let seedNum = seed?.amount || 0

  let landList = farmInfo.res.farmlandstatus

  for (const i in landList) {
    let land = landList[i]
    
    if (land.b == 7) {

      let result = await shark.reqest({
        name: "铲地",
        url: "{!nc}cgi_farm_time_space?act=dig",
        data: {
          landid: i*1 + 1
        }
      })
      if(result?.ecode == 0 && result.res) land.b = 0
      await shark.delay(1)
    }

    if (seedNum < 1) continue

    if (land.b == 0) {
      let result = await shark.reqest({
        name: "种植时光种子",
        url: '{!nc}cgi_farm_time_space?act=plant',
        data: {
          cropid: "6085",
          landid: i*1+1,
        }
      })
      if (result.ecode == 0) seedNum--
      await shark.delay(1)
    }
  }
  await shark.delay(1)
}

async function solarTerms() {
  let index = shark.rule.fun_type.findIndex(val => val == 1)
  if(index < 0) return
  let farmInfo
  do {
    farmInfo = await shark.reqest({
      name: "查看时光农场土地",
      url: "{!nc}cgi_farm_time_space?act=index",
    })

    if (farmInfo.ecode == 0 && farmInfo.res) break
    await shark.delay(1)
  } while (true);
  await shark.delay(1)

  let jqSeed
  do {
    jqSeed = await shark.reqest({
      name: "查看本周节气种子ID",
      url: "{!nc}cgi_farm_seedhb?act=9",
      data: {},
    });

    if (jqSeed?.seedList && jqSeed?.seedList.length > 0) break
    await shark.delay(1)
  } while (true);
  await shark.delay(1)

  jqSeed = jqSeed.seedList

  do {
    knapsack = await shark.reqest({
      name: "查看背包",
      url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed"
    })
    if(knapsack && knapsack.length >= 0) break
    await shark.delay(1)
  } while (true);
  await shark.delay(1)

  let needSpeed = knapsack.filter(val => {

    let index = jqSeed.findIndex(jq => {
      return val.cId == jq.id
    })
    return index >= 0
  })

  let needSpeed2 = []
  needSpeed.forEach(val => {
    for (let i = 0; i < val.amount; i++) {
      needSpeed2.push(val.cId)
    }
  })
  if(needSpeed2.length < 0) {
    shark.logger.log("暂无可种植的节气种子")
    return false
  }
  
  let landList = farmInfo.res.farmlandstatus
  for (const i in landList) {
    if (needSpeed2.length < 1) break
    if(i == landList.length-1)  continue
    let land = landList[i]
    
    if (land.b == 7) {
      let result = await shark.reqest({
        name: "铲地",
        url: "{!nc}cgi_farm_time_space?act=dig",
        data: {
          landid: i*1 + 1
        }
      })
      if(result?.ecode == 0 && result.res) land.b = 0
      await shark.delay(1)
    }
    if (land.b == 0) {

      let result = await shark.reqest({
        name: "种植节气种子",
        url: '{!nc}cgi_farm_time_space?act=plant',
        data: {
          cropid: needSpeed2[0],
          landid: i*1+1,
        }
      })
      if (result.ecode == 0) needSpeed2.splice(0, 1)
      await shark.delay(1)
    }
  }

}

async function taskFun() {
  let view = await shark.reqest({
    name: "查看任务",
    url: "{!nc}cgi_farm_time_space?act=querytask",
  })

  if(view.ecode != 0 || !view?.res?.tasks) return
  let tasks = view?.res?.tasks || []
  for (const el of tasks) {
    if(el.status == 2) {
      await shark.reqest({
        name: "领取任务",
        url: "{!nc}cgi_farm_time_space?act=gettaskaward",
        data: {taskid: el.id}
      })
    }
  }
}