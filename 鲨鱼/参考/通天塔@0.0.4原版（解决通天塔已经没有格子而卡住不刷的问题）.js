// 0.0.3
// 1.解决输出错误的日志信息
// 2.优化出现意外后延迟执行
// 3.减慢爬塔速度
// 4.增加参数（大于等于n个守卫时才爬塔）为了防止其他软件上下阵守卫导致其他守卫全部死光

// 0.0.4 
// 1.解决通天塔已经没有格子而卡住不刷的问题

// @ts-check
/// <reference path="../plugin.d.ts" />

// 定义插件名字
pluginName = "自动刷通天塔";
// 定义作者名称
pluginAuthor = "燎原之火(17896)收人";
// 定义描述
pluginDescription = "注意：该插件定死层数的刷通天塔，不会自动使用任何体力果实、不会自动上下阵守卫、攻击大怪物后自动进入下一层。如果出现有一个守卫体力不足1000时会停止刷通天塔。该插件有家族广告，介意者别用！";
// 版本号
pluginVersion = "0.0.4";

pluginInputs = [
    {
        key: "maxLayer",
        title: "层数",
        placeholder: "请输入需要固定层数",
        type: "input"
    },
    {
        key: "heroNumber",
        title: "大于等于多少个守卫时才爬塔",
        placeholder: "默认为5",
        type: "select",
        selects: [
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 }
        ]
    }
];

function isOk(result) {
    return result.ecode === 0
}

// 点击格子
async function go(index) {
    return await shark.reqest({
        name: `通天塔开地 编号[${index}]`,
        url: "{!nc}magicexchange?act=2010033",
        data: {
            index,
        }
    })
}

async function next() {
    return await shark.reqest({
        name: "进入下一层",
        url: "{!nc}magicexchange?act=2010034",
    })
}

async function prev() {
    return await shark.reqest({
        name: "回退五层",
        url: "{!nc}magicexchange?act=2010035",
    })
}

let road = [];

async function gameStart() {
    let n = road.shift();
    await shark.delay(0.5);
    const result_go = await go(n);
    if (isOk(result_go)) {
        if (result_go.pkg.length) {
            shark.logger.log(shark.convertPkgToStr(result_go.pkg));
        }

        if (result_go.type === 2) {
            // 打怪物
            await shark.delay(1);
            const result = await go(n);
            if (isOk(result)) {
                shark.logger.log("攻击小怪");
                if (result.pkg.length) {
                    shark.logger.log(shark.convertPkgToStr(result.pkg));
                }
            } else {
                shark.logger.log('出现意外，稍后重试！')
                shark.delay(10, start)
            }

        } else if (result_go.type === 4) {
            await shark.delay(1);
            const result = await go(n);
            if (isOk(result)) {
                shark.logger.log("攻击boss");
                if (result.pkg.length) {
                    shark.logger.log(shark.convertPkgToStr(result.pkg));
                }
            } else {
                shark.logger.log('出现意外，稍后重试！')
                shark.delay(10, start)
            }

            const result_next = await next();
            if (isOk(result_next)) {
                shark.delay(1, start)
            } else {
                shark.logger.log('出现意外，稍后重试！')
                shark.delay(10, start)
            }

            return
        }

        // 递归调用
        shark.delay(10, gameStart);
    } else {
        if (result_go.direction === "体力不足") {
            return;
        }
        // 请求失败的处理 一分钟后重试
        shark.logger.log("通天塔发生错误，1分钟后重试")
        shark.delay(60, start)
    }
}

async function start() {
    road = [];

    const maxLayer = shark.rule.maxLayer;

    const towerInfo = await shark.reqest({
        name: "获取通天塔数据",
        url: "{!nc}magicquery?act=2010030",
    })

    const magicquery = await shark.reqest({
        name: "获取魔法池信息",
        url: "{!nc}magicquery?act=2010058",
    })

    if (isOk(towerInfo) && isOk(magicquery)) {
        const { show, data, layer, vt1133 } = towerInfo;

        if (show.filter(i => !!i).length < (shark.rule.heroNumber || 5)) {
            shark.logger.warn(`上阵英雄不足${shark.rule.heroNumber}个守卫、停止爬塔！`);
            return;
        }

        if (vt1133 < 2) {
            shark.logger.warn("体力不足");
            return;
        }

        // 计算当前守卫的剩余血量 。 如果不足1000 有可能会阵亡，要格外小心
        const battleHero = [];
        show.forEach((idx) => {
            const heroItem = magicquery.hero.find(item => item.heroIndex === idx);
            heroItem && battleHero.push(heroItem);
        })
        if (battleHero.filter(hero => hero.leftPhysical < 1000).length) {
            shark.logger.warn("存在英雄血量不足1000，停止自动刷通天塔");
            return
        }

        // 最大的层数
        if (layer > maxLayer) {
            await prev();
            await shark.delay(1);
            return await start();
        }

        // 先扫码一遍是否存在已开地、未打怪的格子
        const executableList = data.filter(item => {
            if (item.type === 2 || item.type === 4) {
                return item.status === 1;
            }
        })
        for (let index = 0; index < executableList.length; index++) {
            const { id, type } = executableList[index];
            await go(id);
            if (type === 4) {
                await shark.delay(1);
                await next();
                return start();
            }
        }

        // 如果boss已经被打了，直接进入下一层
        const boss = data.find(item => item.type === 4 && item.status !== 1)
        if (boss) {
            next();
        }

        // 进入下一层，还没有开始之前，只走到一个格子。这个格子也是下一层的入口
        const [tab] = data.filter((item) => item.type === 1);
        // 得知当前要所在的行数
        const row = Math.ceil(tab.id / 6);
        const row_max = row * 6 + 1;
        const row_min = (row - 1) * 6 + 1;

        // 直接生成要走的路
        for (let index = tab.id + 1; index < row_max; index++) {
            road.push(index);
        }

        for (let index = tab.id; index >= row_min; index--) {
            road.push(index);
        }

        for (let index = row_max; index <= 36; index++) {
            road.push(index);
        }

        for (let index = row_min; index >= 1; index--) {
            road.push(index);
        }

        let roaded = data.map((item) => item.id);

        road = road.filter((id) => !roaded.includes(id));

        // 游戏开始
        await gameStart();
    }

}

// 插件启动钩子函数
// 如果此插件被启用了,
// 鲨鱼会在账号登录成功后以及重新加载逻辑时调用此函数
// 鲨鱼每5-6个小时会自动重载一次, 所以一天至少会调用此函数4次
onPluginStart = async function () {
    const maxLayer = +shark.rule.maxLayer;
    shark.logger.log(`目标层数：${maxLayer}`);
    shark.logger.log(`${pluginName}：插件开始执行了~`);
    shark.logger.log("家族：燎原之火 前100，收想玩魔法池的活跃玩家。家族号：17896，QQ群：871302673（进群请备注来源）");

    if (maxLayer <= 0) {
        return shark.logger.log(`目标层数必须大于0`);
    }

    await start();
};
