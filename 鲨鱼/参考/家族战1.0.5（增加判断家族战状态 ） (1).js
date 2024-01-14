// 定义插件名字 
pluginName = "家族战";
// 定义作者名称
pluginAuthor = "怪我喽";
// 定义描述
pluginDescription = "血瓶补血，普通体力果实数量低于500时，不会使用普果去补。守卫补血逻辑：果实等级由高到低依次使用。【是否守卫只补一个普果】如果填了1，【补血瓶】、【是否守卫血量补满】不生效！！！！！";
// 插件版本
pluginVersion = "1.0.5";

pluginInputs = [
  {
    key: "qing_kong",
    title: "清空家族战队伍",
    placeholder: "一般不选,更换时候卡队伍再选",
    type: "muti-select",
    selects: [
      { name: "朱雀", value: "1,[朱雀]", },
      { name: "青龙", value: "2,[青龙]", },
      { name: "白虎", value: "3,[白虎]", },
      { name: "玄武", value: "4,[玄武]", },
    ]
  },
  {
    key: "zhu_que",
    title: "朱雀队伍",
    placeholder: "填英雄序号,英文  ,  隔开",
  },
  {
    key: "qing_long",
    title: "青龙队伍",
    placeholder: "填英雄序号,英文  ,  隔开",
  },
  {
    key: "bai_hu",
    title: "白虎队伍",
    placeholder: "填英雄序号,英文  ,  隔开",
  },
  {
    key: "xuan_wu",
    title: "玄武队伍",
    placeholder: "填英雄序号,英文  ,  隔开",
  },
  {
    key: "only_buxue",
    title: "是否守卫只补一个普果",
    placeholder: "填1为只补一个普果",
  },
  {
    key: "bu_xue",
    title: "是否守卫血量补满",
    placeholder: "是否补充守卫血量",
    type: "select",
    selects: [
      { name: "补充守卫血量", value: "1", },
      { name: "不补充", value: "0", },
    ]
  },
  {
    key: "xue_ping",
    title: "家族战血瓶",
    placeholder: "血瓶指定血量",
  },
  {
    key: "guo_shi",
    title: "补充血瓶使用的果实",
    placeholder: "指定果实类型",
    type: "muti-select",
    selects: [
      { name: "普通体力果", value: "4,[普通体力果]", },
      { name: "中级体力果", value: "5,[中级体力果]", },
      { name: "高级体力果", value: "6,[高级体力果]", },
      { name: "特级体力果", value: "8,[特级体力果]", },
    ]
  },
  {
    key: "shi_yon",
    title: "使用血瓶",
    placeholder: "使用血瓶",
    type: "select",
    selects: [
      { name: "不使用血瓶", value: "1,[取消自动使用血瓶]", },
      { name: "自动使用血瓶", value: "2,[自动使用血瓶]", },
    ]
  },
  {
    key: "yao_ji",
    title: "使用药剂",
    placeholder: "没上神兽的别选,会吞药剂",
    type: "muti-select",
    selects: [
      { name: "朱雀队伍一键补充", value: "1,[朱雀队伍一键补充]", },
      { name: "青龙队伍一键补充", value: "2,[青龙队伍一键补充]", },
      { name: "白虎队伍一键补充", value: "3,[白虎队伍一键补充]", },
      { name: "玄武队伍一键补充", value: "4,[玄武队伍一键补充]", },
    ]
  },
  {
    key: "jiang_li",
    title: "领取家族战奖励",
    placeholder: "不选不领取",
    type: "select",
    selects: [
      { name: "领取家族战奖励", value: "1", },
      { name: "不领取", value: "2", },
    ]
  },
]

// 队伍信息，魔法池的一些状态
let teamInfo; 
// 血瓶血量
let bottleHp; 
// 果实效果
let fruitEffect = 0;
let vip;
let sidui = ["朱雀", "青龙", "白虎", "玄武",]
// 我的队伍，家族战上阵队伍
let myTeam
// 上阵队伍列表
let herolist
// 赛季积分
let integral = 0
// 仓库体力果实数量
let cropList
// 所有守卫满血量
let heroAll = {}
// 家族战状态
let state = 0

onPluginStart = async function () {

  let familyInfo = await shark.reqest({
    name: "获取家族信息",
    url: "{!nc}cgi_farm_family",
    data: { act: "index", },
  });
  if (familyInfo.ecode != 0) {
    shark.logger.log("没有获取正确家族信息，退出")
    return
  }
  //查看上阵队伍，家族战所有族员上阵情况
  await viewTeams()

  // 查看英雄满血量是多少
  if(state == 2) await viewHeroAll()

  // 打印家族战基本信息
  if(state == 2) printInfo()

  // 补充血瓶总量
  if(state == 2) await supplementHpBottle()

  // 补充守卫血量
  if(state == 2) heroHp()

  // 所有守卫只补1血
  if(state == 2) heroHp1()

  //使用药剂
  if (typeof shark.rule.yao_ji != "undefined" && Number(shark.rule.yao_ji) != 0 && state == 2) {
    for (let yaoji of shark.rule.yao_ji) {
      let restlt = await shark.reqest({
        name: yaoji.split(",")[1],
        url: "{!nc}cgi_farm_family_battle?act=applybottlefast",
        data: { spriteid: yaoji.split(",")[0], },
      });
      if (restlt.ecode == 0) { shark.logger.log(yaoji.split(",")[1] + "使用药剂成功") }
      else { shark.logger.log(restlt.direction) }
    }
  }
  //自动使用血瓶
  if (typeof shark.rule.shi_yon != "undefined" && Number(shark.rule.shi_yon) != 0 && state == 2) {
    if (shark.rule.shi_yon.split(",")[0] == 1 || shark.rule.shi_yon.split(",")[0] == 2) {
      const 使用血瓶 = await shark.reqest({
        name: shark.rule.shi_yon.split(",")[1],
        url: "{!nc}cgi_farm_family_battle?act=autophy",
        data: { opt: shark.rule.shi_yon.split(",")[0] - 1 },
      });
      if (使用血瓶.ecode == 0) { shark.logger.log(shark.rule.shi_yon.split(",")[1] + "设置成功") }
      else { shark.logger.log(使用血瓶.direction) }
    }
  }
  //领取奖励
  if (typeof shark.rule.jiang_li != "undefined" && Number(shark.rule.jiang_li) != 0 && state == 3) {
    if (shark.rule.jiang_li == 1) {
      const 领取 = await shark.reqest({
        name: "领取家族战奖励",
        url: "{!nc}cgi_farm_family_battle?act=getgift",
        data: {},
      });
      if (领取.ecode == 0) { shark.logger.log("获得仙币" + 领取.num) }
      else { shark.logger.log(领取.direction) }
    }
  }
  if(state != 1) return
  //清空队伍
  if (typeof shark.rule.qing_kong != "undefined" && Number(shark.rule.qing_kong) != 0) {
    for (let likai of shark.rule.qing_kong) {
      let leaveTeam = await shark.reqest({
        name: likai.split(",")[1] + "退出队伍",
        url: "{!nc}cgi_farm_family_battle",
        data: { act: "exitteam", sindex: likai.split(",")[0] },
      });
      if (leaveTeam.ecode == 0) { shark.logger.log(likai.split(",")[1] + "退出队伍成功") }
      else { shark.logger.log(leaveTeam.direction) }
    }
  }
  //朱雀队伍
  if (typeof shark.rule.zhu_que != "undefined" && Number(shark.rule.zhu_que) != 0) {
    let joinTeam = await shark.reqest({
      name: "朱雀加入队伍",
      url: "{!nc}cgi_farm_family_battle",
      data: { act: "jointeam", sindex: 1, herolist: shark.rule.zhu_que },
    });
  }
  //青龙队伍
  if (typeof shark.rule.qing_long != "undefined" && Number(shark.rule.qing_long) != 0 && shark.rule.zhu_que != 0) {
    let joinTeam = await shark.reqest({
      name: "青龙加入队伍",
      url: "{!nc}cgi_farm_family_battle",
      data: { act: "jointeam", sindex: 2, herolist: shark.rule.qing_long },
    });
  }
  //白虎队伍
  if (typeof shark.rule.bai_hu != "undefined" && Number(shark.rule.bai_hu) != 0) {
    let joinTeam = await shark.reqest({
      name: "白虎加入队伍",
      url: "{!nc}cgi_farm_family_battle",
      data: { act: "jointeam", sindex: 3, herolist: shark.rule.bai_hu },
    });
  }
  //玄武队伍
  if (typeof shark.rule.xuan_wu != "undefined" && Number(shark.rule.xuan_wu) != 0) {
    let joinTeam = await shark.reqest({
      name: "玄武加入队伍",
      url: "{!nc}cgi_farm_family_battle",
      data: { act: "jointeam", sindex: 4, herolist: shark.rule.xuan_wu },
    });
  }
  
  

}

// 查看英雄满血是多少
async function viewHeroAll() {
  for (let i = 1; i <= 4; i++) {
    let herolistApi = await shark.reqest({
      name: "上阵英雄",
      url: "{!nc}cgi_farm_family_battle?act=getherolist&g_tk=1815979624",
      data: {
        uin: shark.selfUin,
        index: i,
      },
    });

    if (herolistApi.ecode == 0 && herolistApi.herolist.length > 0) {
      herolistApi.herolist.forEach(val => {
        heroAll[val.heroIndex] = val.physical
      })
    }
  }
}

//查看上阵队伍，家族战所有族员上阵情况
async function viewTeams() {
  vip = shark.getFarmVipLevel();
  teamInfo = null
  integral = 0
  do {
    teamInfo = await shark.reqest({
      name: "查看队伍情况",
      url: "{!nc}cgi_farm_family_battle?act=index",
      data: {},
    });
    if (teamInfo) break
  } while (true);

  state = teamInfo.state

  // 遍历打印队伍上阵情况
  for (const lis in teamInfo.battledata.memdata) {
    if (lis.indexOf(String(shark.selfUin)) != -1) {
      myTeam = teamInfo.battledata.memdata[lis]
      herolist = myTeam.herolist
    }
  }

  bottleHp = myTeam.physical

  for (const list2 of myTeam.qscore) {
    integral = integral * 1 + list2 * 1
  }
  let result
  do {
    result = await shark.reqest({
      name: "查看魔法池信息",
      url: "{!nc}magicquery",
      data: { act: "2010058", },
    });
    if (result?.code == 1) break
    await shark.delay(1)
  } while (true);
  // 查看果实数量

  // 所有体力果实List
  cropList = result.crop.filter(val => {
    return val.crop_id == 4 || val.crop_id == 5 || val.crop_id == 6 || val.crop_id == 8
  })

  // 升序排列，先用特级果实
  // cropList.sort((v1, v2) => {
  //   return v2.crop_id-v1.crop_id
  // })

  // 获取果实效果
  getEffect()

}

// 打印家族战基本信息
function printInfo() {
  sidui.forEach((item, index) => {
    shark.logger.log("家族战队伍" + item);
    shark.logger.log(herolist[index])
  })

  shark.logger.log("[果实效果: " + fruitEffect + "][本赛季累计积分: " + integral + "]")
  console.log("血瓶血量：" + bottleHp)
}

// 获取果实效果
function getEffect() {
  let obj = {
    0: 0,
    1: 10,
    2: 30,
    3: 60,
    4: 100,
    5: 150,
    6: 250,
    7: 350,
    8: 500
  }
  fruitEffect = (obj[vip] + (teamInfo.battledata.build[2][0] * 15 + 200)) / 100
  return fruitEffect
}

// 补充血瓶
async function supplementHpBottle() {
  let kong = 0
  if (bottleHp < shark.rule.xue_ping && shark.rule.only_buxue != 1) {
    for (let crop of cropList) {
      if (crop.crop_id == 4) { kong = 50 }
      else if (crop.crop_id == 5) { kong = 100 }
      else if (crop.crop_id == 6) { kong = 500 }
      else if (crop.crop_id == 8) { kong = 1200 }
      if (crop.crop_num <= 0) continue

      for (let val of shark.rule.guo_shi) {
        await viewTeams()
        if (crop.crop_id == val.split(",")[0]) {
          if (crop.crop_id == 4) {
            if(crop.crop_num < 500) continue
            let restlt = Math.ceil((shark.rule.xue_ping - bottleHp) / (kong * fruitEffect))
            if(crop.crop_num*1-500 < restlt) restlt = crop.crop_num*1-500
            let useFruits  = await shark.reqest({
              name: "使用" + val.split(",")[1] + crop.crop_num,
              url: "{!nc}cgi_farm_family_battle",
              data: {
                act: "applysbottle", pays: 0, itemid: crop.crop_id,
                consume: restlt,
              },
            });
            continue
          } 

          if (crop.crop_num * kong * fruitEffect + bottleHp < shark.rule.xue_ping) {
            useFruits = await shark.reqest({
              name: "使用" + val.split(",")[1] + crop.crop_num,
              url: "{!nc}cgi_farm_family_battle",
              data: {
                act: "applysbottle", pays: 0, itemid: crop.crop_id,
                consume: crop.crop_num,
              },
            });
          } else {
            useFruits = await shark.reqest({
              name: "使用" + val.split(",")[1] + Math.ceil((shark.rule.xue_ping - bottleHp) / (kong * fruitEffect)),
              url: "{!nc}cgi_farm_family_battle",
              data: {
                act: "applysbottle", pays: 0, itemid: crop.crop_id,
                consume: Math.ceil((shark.rule.xue_ping - bottleHp) / (kong * fruitEffect)),
              }
            });
          }
        }
      }

    }
  }
}

// 补充守卫血量
async function heroHp() {
  if (shark.rule.bu_xue != 1 || shark.rule.only_buxue == 1) return

  // 所有上阵守卫ID，组成一个统一数组
  let heros = []
  herolist.forEach(val => {
    if (val.length > 0) heros = [...val, ...heros]
  })

  let base, crop
  for (const id of heros) {
    // 需要补充的血量
    let needHp = heroAll[id] * 1 - myTeam.herophy["id" + id] * 1
    if (needHp <= 0) continue
    crop = cropList.find(val => val.crop_id == 8)
    base = 1200
    let num = Math.floor(needHp / (base * fruitEffect))
    if (num > 1 && crop.crop_num >= num) {
      let restlt = await shark.reqest({
        name: "补充守卫体力",
        url: "{!nc}cgi_farm_family_battle?act=applycrop",
        data: { num, cropid: 8, heroid: id, }
      })
      if (restlt.ecode == 0) {
        shark.logger.log("守卫：" + id + "，使用特级体力果：" + num);
        needHp = heroAll[id] * 1 - restlt.leftPhysical * 1
      } else {
        shark.logger.log(restlt.direction)
      }
    }
    shark.delay(1)

    crop = cropList.find(val => val.crop_id == 6)
    base = 500
    num = Math.floor(needHp / (base * fruitEffect))
    if (num > 1 && crop.crop_num >= num) {
      let restlt = await shark.reqest({
        name: "补充守卫体力",
        url: "{!nc}cgi_farm_family_battle?act=applycrop",
        data: { num, cropid: 6, heroid: id, }
      })
      if (restlt.ecode == 0) {
        shark.logger.log("守卫：" + id + "，使用高级体力果：" + num);
        needHp = heroAll[id] * 1 - restlt.leftPhysical * 1
      } else {
        shark.logger.log(restlt.direction)
      }
    }
    shark.delay(1)

    crop = cropList.find(val => val.crop_id == 5)
    base = 100
    num = Math.floor(needHp / (base * fruitEffect))
    if (num > 1 && crop.crop_num >= num) {
      let restlt = await shark.reqest({
        name: "补充守卫体力",
        url: "{!nc}cgi_farm_family_battle?act=applycrop",
        data: { num, cropid: 5, heroid: id, }
      })
      if (restlt.ecode == 0) {
        shark.logger.log("守卫：" + id + "，使用中级体力果：" + num);
        needHp = heroAll[id] * 1 - restlt.leftPhysical * 1
      } else {
        shark.logger.log(restlt.direction)
      }
    }
    shark.delay(1)

    crop = cropList.find(val => val.crop_id == 4)
    base = 50
    num = Math.ceil(needHp / (base * fruitEffect))
    if (num > 0 && crop.crop_num >= num) {
      let restlt = await shark.reqest({
        name: "补充守卫体力",
        url: "{!nc}cgi_farm_family_battle?act=applycrop",
        data: { num, cropid: 4, heroid: id, }
      })
      if (restlt.ecode == 0) {
        shark.logger.log("守卫：" + id + "，使用普通体力果：" + num);
        needHp = heroAll[id] * 1 - restlt.leftPhysical * 1
      } else {
        shark.logger.log(restlt.direction)
      }
    }
  }
}

// 守卫只补1血
async function heroHp1() {
  if (shark.rule.only_buxue != 1) return

  // 所有上阵守卫ID，组成一个统一数组
  let heros = []
  herolist.forEach(val => {
    if (val.length > 0) heros = [...val, ...heros]
  })
  for (const id of heros) {
    if (myTeam.herophy["id" + id] > 0) continue
    let restlt = await shark.reqest({
      name: "补充守卫体力",
      url: "{!nc}cgi_farm_family_battle?act=applycrop",
      data: { num: 1, cropid: 4, heroid: id, }
    })
    if (restlt.ecode == 0) {
      shark.logger.log("守卫：" + id + "，使用普通体力果：" + 1);
    } else {
      shark.logger.log(restlt.direction)
    }
  }
}
