// 定义插件名字
pluginName = "例3-request的使用";
// 定义作者名称
pluginAuthor = "养🦈的高哥";
// 定义描述
pluginDescription = "一个例子插件, 教你怎么请求服务器";

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
  shark.logger.log(`插件开始执行了~`);

  // 向服务器发起请求 获取农场签到数据
  const signinHomeData = await shark.reqest({
    name: "获取农场签到数据", // 请求是在干什么
    url: "{!nc}cgi_farm_month_signin_home", // 只支持 农场: {!nc} 牧场:{!mc}
    data: {
      // 没有数据 不填就是了
    },
  });
  // 接到服务器数据了
  if (signinHomeData.ecode != 0) {
    shark.logger.log(`获取农场签到数据失败了!`);
    return;
  }

  // 判断今天是否签到过了
  if (signinHomeData.today_signin) {
    shark.logger.log(`今天已经签到啦~`);
    return;
  }

  // 为了避免频繁操作 尽量在请求之间加入延时 降低请求频率
  await shark.delay(3);

  // 请求今日签到
  const signinDayData = await shark.reqest({
    name: "请求今日签到", // 请求是在干什么
    url: "{!nc}cgi_farm_month_signin_day", // 只支持 农场: {!nc} 牧场:{!mc}
    data: {
      isbu: "0", // 是否补签
    },
  });
  if (signinDayData.ecode != 0) {
    if (signinDayData.ecode == -102) {
      shark.logger.log(`今天已经签到啦, 怎么重复签到了?`);
    }
    return;
  }

  this.logger.log(`签到成功! 本月第[${signinDayData.month_days}]次签到!`);
};
