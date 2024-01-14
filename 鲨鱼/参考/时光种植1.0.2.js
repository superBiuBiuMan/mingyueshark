// 定义插件名字 
pluginName = "时光种植";
// 定义作者名称
pluginAuthor = "怪我喽";
// 定义描述
pluginDescription = "";
// 插件版本
pluginVersion = "1.0.2";

onPluginStart = async function () {
  try {
    await onPluginStartNew()
  } catch (error) {
    shark.logger.error("遇到错误，给你打印出来了，把错误截图给作者")
    shark.logger.error(error.toString());// 出错了等一段时间再重新执行
    // await shark.delay(10);
    // await onPluginStartNew()
  }
}



async function onPluginStartNew() {
  let shopInfo
  do {
    shopInfo = await shark.reqest({
      name: "查看商店",
      url: "{!nc}query?act=2280001",
      data: {
        shopid: 1,
      }
    })
    if (shopInfo.code == 1) break
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

  let knapsack = await shark.reqest({
    name: "查看背包",
    url: "{!ncf}cgi_farm_getuserseed?mod=repertory&act=getUserSeed"
  })

  let seed = knapsack.find(val => {
    return val.cId == "6085"
  })

  let seedNum = seed.amount

  let farmInfo
  do {
    farmInfo = await shark.reqest({
      name: "查看时光农场土地",
      url: "{!nc}cgi_farm_time_space?act=index",
    })

    if (farmInfo.ecode == 0 && farmInfo.res) break
    await shark.delay(1)
  } while (true);

  let landList = farmInfo.res.farmlandstatus

  for (const i in landList) {
    if (seedNum < 1) break
    let land = landList[i]
    if (land.b == 6) {

      let result = await shark.reqest({
        name: "一键收获",
        url: "{!nc}cgi_farm_time_space?act=batchharvest",
        data: {}
      })
      if(result.ecode == 0 && result.res) land.b = 7
      await shark.delay(1)
    }
    if (land.b == 7) {

      let result = await shark.reqest({
        name: "铲地",
        url: "{!nc}cgi_farm_time_space?act=dig",
        data: {
          landid: i*1 + 1
        }
      })
      if(result.ecode == 0 && result.res) land.b = 0
      await shark.delay(1)
    }
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

  await shark.delay(600)
  onPluginStart()
}