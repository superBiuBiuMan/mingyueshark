// 定义插件名字
pluginName = "例7-游戏配置获取与选择框";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 教你如何获取配置与设置选择框";

shark.get;
// 定义参数
pluginInputs = [
  {
    key: "value1",
    title: "单选框",
    placeholder: "请选择需要加工的成品",
    type: "select",
    selects: shark.getFarmSquareProductConfigs().map((v) => {
      return {
        name: `${v.name}(ID:${v.id})`,
        value: v.id,
      };
    }),
  },
  {
    key: "value2",
    title: "多选框",
    placeholder: "请选择要购买的农场装饰",
    type: "muti-select",
    selects: shark.getFarmItemInfoConfigs().map((v) => {
      return {
        name: `${v.name}(价格:${v.price})`,
        value: v.id,
      };
    }),
  },
  {
    key: "value3",
    title: "自己解析CData",
    placeholder: "请选择要购买的农场装饰",
    type: "muti-select",
    selects: JSON.parse(
      shark.getConfigElements("config_other", "data", "item_info").elements[0]
        .cdata
    ).item_info.map((v) => {
      return {
        name: `${v.name}(价格:${v.price})`,
        value: v.id,
      };
    }),
  },
  {
    key: "value4",
    title: "XML配置读取",
    placeholder: "请选择梦幻矿山类型",
    type: "muti-select",
    selects: shark
      .getConfigElements(
        "config_cooperative",
        "data",
        "distant_mine_configlist"
      )
      .elements.map((v) => {
        return {
          name: `${v.attributes.name}(ID:${v.attributes.toolId})`,
          value: v.attributes.id,
        };
      }),
  },
];

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
  shark.logger.log(`加工的成品ID: `, shark.rule.value1);
  shark.logger.log(`需要购买的农场装饰ID: `, shark.rule.value2);
};
