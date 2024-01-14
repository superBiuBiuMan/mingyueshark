// 定义插件名字
pluginName = "牧场-精灵外派";
// 定义作者名称
pluginAuthor = "愿得一人心";
// 定义描述
pluginDescription = "自动出售表演场，回收精灵，外派精灵表演";

// 定义插件需要的参数
/*tcId=2286 高级天赋书  tcId=2274 普通天赋书  tcId=2275 遗忘天赋书
tcId=2254 装饰品   tcId=2255 建材       
tcId=2259 掌声  tcId=2260= 鲜花 tcId=2261 小红心 tcId=2262 喝彩 tcId=2263 拥抱
tcId=2280 幸运礼盒  tcId=2281 幸运礼卷  飞吻＝2258  
tcId=2277 灯牌  tcId=2276 应援棒*/

pluginInputs = [
  {
    key: "在家表演次数",
    title: "在家表演次数",
    placeholder: "填入在家次数即可",
  },
  {
    key: "使用库存体力",
    title: "使用库存体力",
    placeholder: "1为开启,默认关闭",
  },
  {
    key: "目标表演场等级",
    title: "目标表演场等级",
    placeholder: "最低0",
  },
  {
    key: "PK表演场等级",
    title: "PK表演场等级",
    placeholder: "最低0",
  },
  {
    key: "查看目标表演场间隔时间",
    title: "查看目标表演场间隔时间",
    placeholder: "时间/秒",
  },
  {
    key: "插件检测间隔时间",
    title: "插件检测间隔时间",
    placeholder: "时间/秒,建议120以上",
  },
  {
    key: "指定PK精灵ID",
    title: "指定PK精灵ID",
    placeholder: "单个精灵ID",
  },
  {
    key: "幸运礼盒保留数量",
    title: "幸运礼盒保留数量",
    placeholder: "幸运礼盒保留数量",
  },
  {
    key: "需要培训的精灵ID",
    title: "需要培训的精灵ID",
    placeholder: "需要培训的精灵ID，英文逗号隔开",
  },
  {
    key: "需要培训的项目ID",
    title: "需要培训的项目ID",
    placeholder: "1-9，英文逗号隔开",
  }
];




let 表演场体力;
let 已PK次数;
let 查看表演场数据返回;
let 查看目标精灵能力值返回;
let 查看目标表演场返回;
let 获取外出表演场列表返回;
let 在家次数数据返回;
let 查看任务状态返回;
let 可用精灵数 = 0;
let 培训精灵;
let 培训列表;
onPluginStart = async function () {
  do {
    // do while 循环会先执行循环中的代码，然后再对条件表达式进行判断
    do {
      查看表演场数据返回 = await shark.reqest({
        name: "获取表演场数据",
        url: "{!mc}cgi_pasture_performe",
        data: {
          act: "index",
          fuin: shark.selfUin,
        },
      });
    } while (查看表演场数据返回.ecode != 0)

    // shark.logger.log(JSON.stringify(查看表演精灵返回));
    for (const cklist of 查看表演场数据返回.spriteData) {
      for (const cklist2 of cklist.SpritePerformingData) {
        if ((((cklist2.performeTime + cklist2.performeTotalTime) - ((Date.parse(new Date())) / 1000)) < 0) && cklist2.isPerforming == 1) {
          const 回收返回 = await shark.reqest({
            name: "回收精灵" + cklist.opt_id,
            url: "{!mc}cgi_pasture_performe",
            data: {
              act: "performingFinishForTools",
              Id: "2",
              stageId: cklist2.stageId,
              stageUin: cklist2.stageUin,
              spId: cklist.opt_id,
            },
          });
          const 仓库查看返回 = await shark.reqest({
            name: "获取精灵仓库数据",
            url: "{!mc}cgi_pasture_performe",
            data: {
              act: "wareHouse",
              Id: "1",
            },
          });

          //ecode 不是0 请求失败了
          if (仓库查看返回.ecode != 0) {
            return;
          }

          for (const cklist3 of 仓库查看返回.wareHouseData[0].moneyList) {
            if (2258 <= cklist3.tcId && cklist3.tcId <= 2263) {
              const 仓库出售返回 = await shark.reqest({
                name: "出售" + cklist3.tcValue + "个" + cklist3.tcId,
                url: "{!mc}cgi_pasture_performe",
                data: {
                  act: "wareHouse",
                  Id: "3",
                  tooId: cklist3.tcId,
                  num: cklist3.tcValue
                },
              });
            }
            else if (cklist3.tcId == 2280) {
              const 仓库出售返回 = await shark.reqest({
                name: "出售" + (Number(cklist3.tcValue) - shark.rule.幸运礼盒保留数量) + "个" + cklist3.tcId,
                url: "{!mc}cgi_pasture_performe",
                data: {
                  act: "wareHouse",
                  Id: "3",
                  tooId: cklist3.tcId,
                  num: cklist3.tcValue - shark.rule.幸运礼盒保留数量,
                },
              });
            };
          };
        };
      };
    };
    do {
      查看表演场数据返回 = await shark.reqest({
        name: "获取表演场数据",
        url: "{!mc}cgi_pasture_performe",
        data: {
          act: "index",
          fuin: shark.selfUin,
        },
      });
    } while (查看表演场数据返回.ecode != 0)
    do {
      在家次数数据返回 = await shark.reqest({
        name: "获取在家次数",
        url: "{!mc}cgi_pasture_multiperforme",
        data: {
          act: "dailyMission",
          fuin: shark.selfUin,
        },
      });
    } while (在家次数数据返回.ecode != 0)
    if (shark.rule.需要培训的精灵ID != "" && shark.rule.需要培训的项目ID != "") {
      培训精灵 = shark.rule.需要培训的精灵ID.split(',').map(v => Number(v));
      培训列表 = shark.rule.需要培训的项目ID.split(',').map(v => Number(v));
      for (const cklist of 查看表演场数据返回.spriteData) {
        if (培训精灵.indexOf(cklist.opt_id) != -1 && shark.getFarmTime() - cklist.cultivate_LearnT > 3600 * 4) {
          for (const liet of cklist.SpriteAttrData) {
            if (培训列表.indexOf(liet.tcId) != -1 && liet.tcId_Lv < 10) {
              await shark.reqest({
                name: "精灵" + cklist.opt_id + "培训项目" + liet.tcId,
                url: "{!mc}cgi_pasture_performe?act=attributeUp",
                data: {
                  itemId: liet.tcId,
                  Id: 1,
                  spId: cklist.opt_id,
                  pays: 0,
                },
              });
            }
            break
          }
        }
      }
    }

    onPanelShow = async function (refresh) {
      const tableData = [];
      if (查看表演场数据返回.ecode == 0) {
        for (const cklist of 查看表演场数据返回.spriteData) {
          for (const cklist2 of cklist.SpritePerformingData) {
            const 外出状态 = cklist2.isPerforming;
            const 精灵ID = cklist.opt_id;
            const 能力值 = cklist.performace * 0.3 + cklist.sport * 0.3 + cklist.outlook * 0.3
            const 外出次数 = cklist2.performeNum
            tableData.push({ ID: 精灵ID, 状态: 外出状态, 次数: 外出次数, 能力: 能力值 });
          };
          // 第二个 设置显示列
          // 格式固定为  name: 列名称  key: 使用上面表数据的哪个字段名
          const columnData = [
            { name: "精灵ID", key: "ID" },
            { name: "表演状态", key: "状态" },
            { name: "外出次数", key: "次数" },
            { name: "能力值", key: "能力" },
          ];
          refresh(tableData, columnData);
        };
      };
    }
    for (const cklist of 查看表演场数据返回.spriteData) {
      for (const cklist2 of cklist.SpritePerformingData) {
        if (cklist2.performeNum < 3) {
          可用精灵数++
        }
      }
    }
    if (shark.rule.使用库存体力 == 1) {
      表演场体力 = 查看表演场数据返回.free_tili + 查看表演场数据返回.vt2279;
    } else {
      表演场体力 = 查看表演场数据返回.free_tili;
    };
    已PK次数 = 查看表演场数据返回.freepkNum;
    shark.logger.log("已PK次数" + 已PK次数);
    shark.logger.log("免费体力" + 查看表演场数据返回.free_tili + "库存体力" + 查看表演场数据返回.vt2279);

    if (表演场体力 > 0 && 在家次数数据返回.missionList[0].count >= shark.rule.在家表演次数 && 可用精灵数 > 0) {
      outerloop:
      for (const cklist of 查看表演场数据返回.spriteData) {
        for (const cklist2 of cklist.SpritePerformingData) {
          if (cklist2.isPerforming == 0 && cklist2.performeNum < 3) {
            shark.logger.log(cklist.spriteId + "可派遣");
            for (let i = 0; i < 10; i++) {
              do {
                获取外出表演场列表返回 = await shark.reqest({
                  name: "获取外出表演场列表" + i,
                  url: "{!mc}cgi_pasture_multiperforme",
                  data: {
                    act: "visitOther",
                    condition: i,
                  },
                });
              } while (获取外出表演场列表返回.ecode != 0)
              {
                for (const cklist4 of 获取外出表演场列表返回.userList) {
                  if (cklist4.lv >= shark.rule.目标表演场等级) {
                    do {
                      查看目标表演场返回 = await shark.reqest({
                        name: "查看表演场" + cklist4.uin,
                        url: "{!mc}cgi_pasture_performe",
                        data: {
                          act: "index",
                          fuin: cklist4.uin,
                        },
                      });
                    } while (查看目标表演场返回.ecode != 0 && 查看目标表演场返回.ecode != -103)
                    if (查看目标表演场返回.ecode == 0) {
                      for (let x = 1; x < 5; x++) {
                        if (查看目标表演场返回.stageData[x].stage_isUnlock == 1 && 查看目标表演场返回.stageData[x].stage_optId == null) {
                          const 派出返回 = await shark.reqest({
                            name: "派出精灵" + cklist.opt_id + "到" + cklist4.uin + "表演",
                            url: "{!mc}cgi_pasture_performe",
                            data: {
                              act: "spriteHook",
                              realId: cklist.spriteId,
                              Id: x + 1,
                              fuin: cklist4.uin,
                              spId: cklist.opt_id,
                            },
                          });
                          shark.logger.log(JSON.stringify(派出返回));
                          break outerloop;
                        }
                      }
                    }
                    await shark.delay(shark.rule.查看目标表演场间隔时间);
                  }
                };
              };
            };
          };
        };
        await shark.delay(shark.rule.插件检测间隔时间);
        // 等待600秒 再检测
      };
    }
    else if (表演场体力 > 0 && 在家次数数据返回.missionList[0].count < shark.rule.在家表演次数 && 可用精灵数 > 0) {
      innerloop: for (const cklist of 查看表演场数据返回.spriteData) {
        for (const cklist2 of cklist.SpritePerformingData) {
          if (cklist2.isPerforming == 0 && cklist2.performeNum < 3) {
            shark.logger.log(cklist.spriteId + "可派遣");
            const 派出返回 = await shark.reqest({
              name: "自家表演",
              url: "{!mc}cgi_pasture_performe",
              data: {
                act: "spriteHook",
                realId: cklist.spriteId,
                Id: 1,
                fuin: shark.selfUin,
                spId: cklist.opt_id,
              },
            });
            shark.logger.log(JSON.stringify(派出返回));
            break  innerloop;
          };
        };
      }
      await shark.delay(shark.rule.插件检测间隔时间);
      // 等待600秒 再检测
    } else if (已PK次数 < 3) {
      outerloop:
      for (const cklist of 查看表演场数据返回.spriteData) {
        for (const cklist2 of cklist.SpritePerformingData) {
          if (cklist2.isPerforming == 0 && cklist.opt_id == shark.rule.指定PK精灵ID) {
            shark.logger.log("指定精灵" + cklist.opt_id + "可派遣，能力值" + (cklist.performace * 0.3 + cklist.sport * 0.3 + cklist.outlook * 0.3));
            for (let i = 0; i < 10; i++) {
              do {
                获取外出表演场列表返回 = await shark.reqest({
                  name: "获取外出表演场列表" + i,
                  url: "{!mc}cgi_pasture_multiperforme",
                  data: {
                    act: "visitOther",
                    condition: i,
                  },
                });
              } while (获取外出表演场列表返回.ecode != 0)
              for (const cklist4 of 获取外出表演场列表返回.userList) {
                if (cklist4.lv >= shark.rule.PK表演场等级) {
                  do {
                    查看目标表演场返回 = await shark.reqest({
                      name: "查看表演场" + cklist4.uin,
                      url: "{!mc}cgi_pasture_performe",
                      data: {
                        act: "index",
                        fuin: cklist4.uin,
                      },
                    });
                  } while (查看目标表演场返回.ecode != 0 && 查看目标表演场返回.ecode != -103)
                  if (查看目标表演场返回.ecode == 0) {
                    for (let x = 1; x < 5; x++) {
                      if (查看目标表演场返回.stageData[x].stage_optId != null) {
                        do {
                          查看目标精灵能力值返回 = await shark.reqest({
                            name: "查看" + 查看目标表演场返回.stageData[x].stage_uin + "的" + 查看目标表演场返回.stageData[x].stage_optId + "精灵能力值",
                            url: "{!mc}cgi_pasture_multiperforme",
                            data: {
                              act: "querySprite",
                              fuin: 查看目标表演场返回.stageData[x].stage_uin,
                              spId: 查看目标表演场返回.stageData[x].stage_optId,
                            },
                          });
                        } while (查看目标精灵能力值返回.ecode != 0)
                        if ((查看目标精灵能力值返回.spriteData[0].performace * 0.3 + 查看目标精灵能力值返回.spriteData[0].sport * 0.3 + 查看目标精灵能力值返回.spriteData[0].outlook * 0.3) < ((cklist.performace * 0.3 + cklist.sport * 0.3 + cklist.outlook * 0.3) * 0.3)) {
                          const 派PK返回 = await shark.reqest({
                            name: "派出精灵" + cklist.opt_id + "到" + cklist4.uin + "的表演场PK" + 查看目标表演场返回.stageData[x].stage_uin + "能力值" + 查看目标精灵能力值返回.spriteData[0].performace + "的精灵" + 查看目标表演场返回.stageData[x].stage_optId,
                            url: "{!mc}cgi_pasture_performe",
                            data: {
                              act: "pk",
                              realId: cklist.spriteId,
                              fuin: cklist4.uin,
                              spId: cklist.opt_id,
                              pkspId: 查看目标表演场返回.stageData[x].stage_optId,
                              pkUin: 查看目标表演场返回.stageData[x].stage_uin,
                              tool: 0,
                              fuin: cklist4.uin,
                              stageId: x + 1,
                            },
                          });
                          shark.logger.log(JSON.stringify(派PK返回));
                          break outerloop;
                        };
                        await shark.delay(shark.rule.查看目标表演场间隔时间);
                      }
                    }
                  }

                }
              };
            };
          };
        };
      };
      await shark.delay(shark.rule.插件检测间隔时间);

    };
    do {
      查看任务状态返回 = await shark.reqest({
        name: "查看任务状态",
        url: "{!mc}cgi_pasture_multiperforme",
        data: {
          act: "dailyMission",
          fuin: shark.selfUin,
        },
      });

    } while (查看任务状态返回.ecode != 0)
    for (const chick of 查看任务状态返回.missionList) {
      if (chick.count > 0 && chick.state == 0) {
        const 领取返回 = await shark.reqest({
          name: "领取" + chick.id + "任务奖励",
          url: "{!mc}cgi_pasture_multiperforme",
          data: {
            act: "dailyMission",
            missionId: chick.id,
          },
        });
        shark.logger.log(JSON.stringify(领取返回));
      }
    };
  } while ((表演场体力 > 0 && 可用精灵数 > 0) || 已PK次数 < 3);
  shark.logger.log("精灵表演结束");
}