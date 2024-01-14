/**
 * 插件名称
 */
declare let pluginName: string;

/**
 * 插件版本
 */
declare let pluginVersion: string;
/**
 * 插件描述
 */
declare let pluginDescription: string;
/**
 * 插件作者
 */
declare let pluginAuthor: string;
/**
 * 插件输入参数
 */
declare let pluginInputs: {
  key: string;
  title: string;
  placeholder: string;
  type: "input" | "select" | "muti-select";
  // 当type为select或者muti-select时有效
  selects: {
    name: string; // 显示的选项名称
    value: number | string; // 选项对应的值
  }[];
}[];

/**
 * 插件启动钩子函数
 * 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
 * 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
 */
declare let onPluginStart: (this: Shark) => any;

/**
 * 面板显示钩子函数
 * 会在每次显示面板时调用
 */
declare let onPanelShow: (
  this: Shark,
  refresh: (
    datas: {
      [key: string]: string | number;
    }[],
    columns: {
      key: string;
      name: string;
    }[]
  ) => void
) => any;

interface XMLAttributes {
  [key: string]: string | number | undefined;
}

interface XMLDeclarationAttributes {
  version?: string | number;
  encoding?: "utf-8" | string;
  standalone?: "yes" | "no";
}

interface XMLElement {
  declaration?: {
    attributes?: XMLDeclarationAttributes;
  };
  instruction?: string;
  attributes?: XMLAttributes;
  cdata?: string;
  doctype?: string;
  comment?: string;
  text?: string | number | boolean;
  type?: string;
  name?: string;
  elements?: Array<XMLElement>;
}

interface Shark {
  /**
   * 规则面板设置的数据
   */
  rule: { [key: string]: any };
  /**
   * 获得当前农场时间(秒级时间戳)
   */
  getFarmTime(): number;
  /**
   * 是否是手农VIP
   */
  isAppFarmVip(): boolean;
  /**
   * 是否是农场VIP
   */
  isFarmVip(): boolean;
  /**
   * 获得农场VIP等级
   */
  getFarmVipLevel(): number;
  /**
   * 是否是牧场VIP
   */
  isPastureVip(): boolean;
  /**
   * 获得牧场VIP等级
   */
  getPastureVipLevel(): number;
  /**
   * 是否是黄钻VIP
   */
  isYellowVip(): boolean;

  /**
   * 将返回的pkg数据转换成格式为 道具x数量 ...  的字符串
   */
  convertPkgToStr(pkg?: { name: string; num: number }[]): string;

  /**
   * 获得明天0点的毫秒级时间戳
   */
  getNextDayMS(): number;
  /**
   * 获得下周指定天数0点的毫秒级时间戳
   */
  getNextWeekDayMS(day: number): number;
  /**
   * 获得下个月1号0点的毫秒级时间戳
   */
  getNextMonthMS(): number;
  /**
   * 获得设置的缓存数据  如果没有设置或者已过期 会返回null
   */
  getCache(key: string): string | null;
  /**
   * 设置缓存数据及过期时间 ttl为毫秒级时间戳
   */
  setCache(key: string, value: string, ttl: number): void;
  /**
   * 延时执行
   */
  delay(time: number, callback: (this: this) => void): void;
  delay(time: number): Promise<void>;

  /**
   * 发起请求
   */
  reqest(req: {
    /**
     * 请求描述
     */
    name: string;
    /**
     * 请求的url
     */
    url: string;
    /**
     * 请求参数(一般用不到)
     */
    query?: { [key: string]: string | number };
    /**
     * 请求体
     */
    data?: { [key: string]: string | number };
    /**
     * 此次请求是否忽略繁忙
     */
    ignoreBusy?: boolean;
    /**
     * 请求完成的回调函数. 请求失败data为空对象
     */
    callback: (data: any, statusCode: number) => void;
  }): void;
  reqest(req: {
    /**
     * 请求描述
     */
    name: string;
    /**
     * 请求的url
     */
    url: string;
    /**
     * 请求参数(一般用不到)
     */
    query?: { [key: string]: string | number };
    /**
     * 请求体
     */
    data?: { [key: string]: string | number };
    /**
     * 此次请求是否忽略繁忙
     */
    ignoreBusy?: boolean;
  }): Promise<any>;

  /**
   * 日志打印对象
   */
  logger: {
    warn(...data: any[]): void;
    error(...data: any[]): void;
    log(...data: any[]): void;
    info(...data: any[]): void;
    debug(...data: any[]): void;
  };

  /**
   * 当前账号配置的手机平台
   */
  mobilePlatform: string;

  /**
   * 当前账号配置的手机版本
   */
  mobileVersion: string;
  /**
   * 当前执行插件的QQ
   */
  selfUin: number;
  /**
   * 当前执行插件的UID
   */
  selfUid: number;

  /******************************* 农场配置文件存放于[配置路径]下的[xml]文件夹里 ******************************/
  /**
   * 活动是否在进行中
   * pasture: 牧场活动        activityId: config_mc_ini_info里面配置的Id
   * appfarm: 手农活动        activityId: config_actinfo里面的cgi
   * farm30: 农场3.0活动      activityId: UnityCommonConfig 里面配置的entranceController
   */
  isActivityInPogress(
    activityType: "pasture" | "appfarm" | "farm30",
    activityId: string
  ): boolean;
  /**
   * 当前是否是活动的最后一天
   * pasture: 牧场活动        activityId: config_mc_ini_info里面配置的Id
   * appfarm: 手农活动        activityId: config_actinfo里面的cgi
   * farm30: 农场3.0活动      activityId: UnityCommonConfig 里面配置的entranceController
   */
  isActivityLastDay(
    activityType: "pasture" | "appfarm" | "farm30",
    activityId: string
  ): boolean;

  /**
   * 获取xml配置文件中的elements(当其他接口无法获取到需要的配置时使用这个)
   * configName: 配置文件名,[配置路径]下的[xml]文件夹里文件名
   * childs: 子节点路径
   */
  getConfigElements(
    configName: string,
    ...childs: string[]
  ): { elements?: XMLElement[] } | undefined;

  // 虚拟道具配置
  getVirtualConfigs(): {
    asset_id: string;
    buy_num: number;
    categoryid: number;
    coin: number;
    coupon: number;
    desc: string;
    effect_time: number;
    exchange_ext: string;
    exchange_id: number;
    exchange_num: number;
    exchange_type: number;
    extraParame: number;
    goldbuylimit: number;
    goldbuylimitid: number;
    id: number;
    ismc: number;
    name: string;
    qb: number;
    show: number;
    visable: number;
  }[];
  // 捕鱼时光配置
  getSeaPoolConfig(): {
    seaLevel: {
      asset_id: string;
      coupon: number;
      diffLevel: number;
      exp: number;
      fishHp: number;
      getExp: number;
      id: number;
      level: number;
      money: number;
      openGunLevel: number;
      score: number;
      shell: number;
      showFish: {
        fishID: number;
      }[];
      skillRange: number;
    }[];
    seaExchange: {
      asset_id: string;
      id: number;
      isNew: number;
      randomEx: {
        exnum: number;
        extype: number;
        itemid: number;
        itemnum: number;
        itemtype: number;
        rate: number;
      }[];
    }[];
    seaGun: {
      asset_id: string;
      asset_url: string;
      baseAttack: number;
      baseBig: number;
      baseKill: number;
      baseRange: number;
      baseSkill: {
        attrId: number;
        attrNum: number;
      }[];
      baseSpeed: number;
      bulletSpeed: number;
      buyBeike: number;
      canLevelUpAttr: {
        length: string;
        maxLevel: number;
        type: number;
      }[];
      id: number;
      levelup: {
        beginLevel: number;
        endLevel: number;
        ex: number;
        star: number;
      }[];
      maxLevel: number;
      name: string;
      preGunId: number;
      preGunMaxLevel: number;
      seaLevel: number;
    }[];
    seaGem: {
      asset_id: string;
      id: number;
      levelup: {
        level: number;
        shell: number;
        star: number;
        value: number;
      }[];
      name: string;
      type: number;
      weight: number;
    }[];
    seaConf: [
      {
        asset_id: string;
        buyBeike: {
          num: number;
          star: number;
        }[];
        buyHealth: {
          star: number;
          times: number;
        }[];
        fanPai: {
          itemid: number;
          itemnum: number;
          itemtype: number;
          rate: number;
        }[];
        id: number;
        isNotAuth: number;
        scoringRate: {
          level: number;
          score: number;
          timeFish: number;
        }[];
        slot: {
          beike: number;
          openLevel: number;
          slotid: number;
          star: number;
        }[];
      }
    ];
  };

  // 农场作物配置
  getCropConfigs(): {
    asset_id: { m: string; m1: string; m2: string; m3: string; s: string };
    cropGrow: string;
    eo: number;
    gossip: string;
    harvestNum: number;
    id: number;
    insect: string;
    lv: number;
    name: string;
    nextText: string;
    offsetX: number;
    offsetY: number;
    qd: number;
    sr: number;
    tip: string;
    type: number;
    vipDesc: string;
  }[];
  // 作物系列配置
  getCropSerialConfigs(): {
    asset_id: string;
    id: number;
    name: string;
    serialType: number;
    show: number;
    type: number;
  }[];
  // 池塘鱼配置
  getFishConfigs(): {
    asset_id: {
      m: number;
      s: number;
    };
    compose: number;
    coupon_price: number;
    crop_name: string;
    cycle: string;
    exp: number;
    g_opt: number;
    id: number;
    isMill: number;
    isRestaurant: number;
    lock_crystal: string;
    lock_level: number;
    lock_money: string;
    mature: number;
    output: number;
    pool_lv: number;
    pool_size: number;
    poolbook: number;
    price: number;
    sale: number;
    score: number;
    show: number;
    suiPian: string;
    tip: string;
    xiYou: number;
  }[];
  // 农场牌子配置
  getFarmBoardConfigs(): {
    asset_id: string;
    id: number;
    name: string;
  }[];
  // 农场背景装饰配置
  getFarmItemInfoConfigs(): {
    FBPrice: number;
    YFBPrice: number;
    asset_id: {
      b: string;
      m: string;
      s: string;
    };
    desc: string;
    exp: number;
    id: number;
    isNew: number;
    level: number;
    name: string;
    price: number;
    tips: string;
    type: number;
    valid: number;
  }[];

  // VIP土地配置
  getVipLandConfig(): {
    vip_plants: {
      tools: {
        itemid: number;
        type: number;
        name: string;
        price: number;
        meili_s: number;
        by_s: number;
        desc: string;
        buy: number;
      }[];
    };
    garden_bg: {
      id: number;
      name: string;
      price: number;
    }[];
    seeds: {
      id: number;
      name: string;
      price: number;
      init_meili: number;
      leaf_max: number;
      life_t: number;
      t1: number;
      init_rate: number;
      show: number;
      desc: string;
    }[];
  };
  // 新农场评级配置
  getFarmRatingConfigs(): {
    asset_id: string;
    big_level: number;
    desc: string;
    gift: {
      app_id: number;
      item_id: number;
      num: number;
      type: number;
    }[];
    id: number;
    little_level: number;
    score_begin: number;
    score_end: number;
  }[];

  // 农场商店礼包配置
  getFarmGiftpackConfigs(): {
    asset_id: {
      gift_iconUrl: number;
      pay_icon: number;
    };
    coin: number;
    coupon_price: number;
    desc: string;
    id: number;
    item: {
      itemid: number;
      num: number;
      type: number;
    }[];
    name: string;
    qb: number;
    show: number;
    showType: number;
  }[];
  // 农场商店配置
  getFarmShopConfigs(): {
    asset_id: string;
    goodsID: number;
    goodsType: number;
    hideTime: string;
    id: number;
    index: number;
    name: string;
    showType: number;
  }[];
  // 蜂巢配置
  getFarmHiveConfigs(): {
    asset_id: string;
    coupon: number;
    freecd: number;
    id: number;
    level: number;
    money: number;
    resttime: number;
    worktime: number;
  }[];
  // 金币换点券配置
  getFarmCouponMoneyConfigs(): {
    asset_id: string;
    coupon: number;
    desc: string;
    id: number;
    money: number;
  }[];
  // 加工坊配方配置
  getFarmFormulaConfigs(): {
    asset_id: string;
    buy_coupon: number;
    desc: string;
    id: number;
    materials: {
      app_id: number;
      itemid: number;
      num: number;
      type: number;
    }[];
    name: string;
    product: {
      app_id: number;
      itemid: number;
      num: number;
      type: number;
    }[];
    show: number;
    unlock_level: number;
    worktime: number;
  }[];
  // 加工坊等级配置
  getFarmSquareConfigs(): {
    asset_id: string;
    coupon: number;
    freecd: number;
    id: number;
    level: number;
    worktimes: number;
  }[];
  // 加工坊成品配置
  getFarmSquareProductConfigs(): {
    asset_id: string;
    desc: string;
    id: number;
    name: string;
    sale_coupon: number;
  }[];
  // 运输机等级配置
  getFarmOrderLevelConfigs(): {
    asset_id: string;
    exp: number;
    gift: {
      itemid: number;
      num: number;
      type: number;
    }[];
    id: number;
    level: number;
  }[];

  // 运输机订单配置
  getFarmOrderConfigs(): {
    asset_id: string;
    condition_crop: {
      app_id: number;
      itemid: number;
      max: number;
      min: number;
      type: number;
    }[];
    condition_crop_rate: number;
    condition_item_max: number;
    condition_item_min: number;
    condition_product: {
      app_id: number;
      itemid: number;
      max: number;
      min: number;
      type: number;
    }[];
    extra_reward: string;
    extra_reward_rate: number;
    id: number;
    level: number;
    refresh_time: number;
    reward: {
      A: number;
      B: number;
      app_id: number;
      itemid: number;
      rate: number;
      type: number;
    }[];
  }[];
  // 小摊等级配置
  getFarmXiaotanLevelConfigs(): {
    asset_id: string;
    coupon: number;
    friendTimes: number;
    id: number;
    level: number;
    shelfnum: number;
    strangerTimes: number;
  }[];
  // 鱼塘等级配置
  getFarmFishPoolConfigs(): {
    asset_id: string;
    descName: string;
    fishPoolBgID: number;
    level: number;
    levelup: {
      itemid: number;
      itemnum: number;
      type: number;
    }[];
    maxSize: number;
    poolName: string;
    unLockFishId: number;
    wxId: number;
  }[];
  // 珍珠蚌等级配置
  getFarmPearlMusselConfigs(): {
    asset_id: string;
    id: number;
    lv: number;
    needExp: number;
    outPutTime: number;
    rl: number;
    upCostZZ: number;
  }[];
  // 蜜蜂等级配置
  getFarmBeeConfigs(): {
    addHoneyRate: number;
    addTool: number;
    asset_id: string;
    coin: number;
    fwjMax: number;
    giftRate: number;
    goldMax: number;
    honey: number;
    id: number;
    level: number;
    smlwMax: number;
    zhengChanMax: number;
  }[];
  // 魔法池等级配置
  getMagicPoolConfigs(): {
    asset_id: string;
    addCropRate: number;
    addYinYang: number;
    heroNum: number;
    id: number;
    landNum: number;
    level: number;
    monsterNum: number;
    upLevelCoupon: number;
    upLevelTool: number;
    upLevelZhanLi: number;
  }[];
  // 魔法池守卫配置
  getMgicHeroConfigs(): {
    id: number;
    name: string;
    asset_id: string;
    attack: number;
    attackLength: number;
    attackMax1: number;
    defence: number;
    defenceLength: number;
    defenceMax1: number;
    evolutioncount: number;
    evolutionid: number;
    evolutionitem: number;
    maxAttack: number;
    maxDefence: number;
    maxPhysical: number;
    minAttack: number;
    minDefence: number;
    minPhysical: number;
    physical: number;
    physicalLength: number;
    physicalMax1: number;
    quality: number; // 品质
    skilllist: string;
    speedFirst: number;
    speedLength: number;
    textHero_Info: string;
    textSkill_Info: string;
    totalZhanli: number; // 初始战力，用来区分暗金和超暗
    type: number; // 类型，区分攻/防/体型
  }[];
  // 魔法池种子配置
  getMgicSeedConfigs(): {
    id: number; // 道具id
    cropid: number; // 作物id
    croptype: number; // 作物类型
    addNum: number; // 增加值
    growing: number; // 成熟总时间
    harvestNum: number; // 收获数量
    name: string; // 种子名称
    propName: string; // 产物名称
    saleCouponPrice: number; // 点券售价
    saleQb: number; // 晶钻售价
    show: number;
  }[];
  // 潜艇配置
  getFarmMarineConfigs(): {
    attr_lv: number;
    desc: string;
    id: number;
    max_lv: number;
    name: string;
    need_coin: number;
    unlock_lv: number;
  }[];
  // 潜艇技能配置
  getFarmMarineSkillConfigs(): {
    add_explore_deep: number;
    add_resource_num: number;
    asset_id: string;
    desc: string;
    id: number;
    name: string;
    reduce_oil: number;
    reduce_robbed_num: number;
    reduce_time: number;
  }[];
}

declare const shark: Shark;
