// @ts-check
/// <reference path="../plugin.d.ts" />

// 定义插件名字
pluginName = "家族战信息面板";
// 定义作者名称
pluginAuthor = "作者qq2205623938";
// 定义描述
pluginDescription = "可视化家族战、以及一些统计信息、注意留意消息面板，会输出统计信息";
// 插件版本
pluginVersion = "0.0.2";

pluginInputs = [
    {
        key: "A",
        title: "统计战力人数",
        placeholder: "请用英文逗号分隔（单位是万）, 例如: 130,150",
        type: "input"
    },
    {
        key: "B",
        title: "是否输出未参战人员的QQ号以及昵称",
        type: "select",
        placeholder: "否",
        selects: [
            { name: "否", value: 0 },
            { name: "是", value: 1 }
        ]
    },
    {
        key: "C",
        title: "分别统计积分人数",
        placeholder: "请用英文逗号分隔, 例如: 1000,1500",
        type: "input"
    }
];

const distributedMap = {
    "0": "朱雀",
    "1": "青龙",
    "2": "白虎",
    "3": "玄武",
}

onPanelShow = async function (refresh) {

    shark.logger.log("作者qq2205623938");

    const farm_family = await shark.reqest({
        name: "获取家族人员信息",
        url: "{!nc}cgi_farm_family?act=manager&manager_type=look",
    })

    const query_result = await shark.reqest({
        name: "获取家族人员详细信息",
        url: "{!nc}query?act=2010029",
        data: {
            uinlist: farm_family.member.map(item => item.uin).join(",")
        }
    });

    const query_info = {};
    query_result.name.forEach((item) => {
        query_info["uin" + item.uin] = item.nick;
    })

    const family_battle = await shark.reqest({
        name: "获取家族战的信息",
        url: "{!nc}cgi_farm_family_battle?act=index",
    })

    const columnData = [
        { name: "名称", key: "name" },
        { name: "战力", key: "power" },
        { name: "积分", key: "qscore" },
        { name: "战力排行", key: "powerrang" },
        { name: "积分排行", key: "qrang" },
    ];

    const tableData = [];

    const _统计战力人数 = [];
    const _统计积分人数 = [];
    const _统计未参战人数 = [];
    const _统计双队人数 = [];

    const _朱雀分数 = [];
    const _青龙分数 = [];
    const _白虎分数 = [];
    const _玄武分数 = [];

    let A = [], C = [];
    if (shark.rule.A) {
        A = shark.rule.A.split(",")
    }
    if (shark.rule.C) {
        C = shark.rule.C.split(",")
    }

    const memdata = family_battle.battledata.memdata;
    let _家族总战力 = 0;
    for (const key in memdata) {
        const data = {
            name: query_info[key],
            powerTotal: 0,
            qscoreTotal: 0,
            power: [],
            qscore: [],
            distributed: []
        };

        for (let index = 0; index < memdata[key].power.length; index++) {
            const power = memdata[key].power[index];
            const qscore = memdata[key].qscore[index];

            if (power) {
                data.powerTotal += power;
                data.qscoreTotal += qscore;

                // @ts-ignore
                data.power.push(power);
                // @ts-ignore
                data.qscore.push(qscore);
                // @ts-ignore
                data.distributed.push(index);
                switch (index) {
                    case 0:
                        _朱雀分数.push(qscore);
                        break;
                    case 1:
                        _青龙分数.push(qscore);
                        break;
                    case 2:
                        _白虎分数.push(qscore);
                        break;
                    case 3:
                        _玄武分数.push(qscore);
                        break;
                }
            }

            _家族总战力 += power;

            A.forEach((p, index) => {
                if (power > p * 10000) {
                    _统计战力人数[index] = (_统计战力人数[index] || 0) + 1;
                }
            })
        }

        // 统计未参战
        if (data.powerTotal === 0) {
            _统计未参战人数.push([query_info[key], key]);
        }

        C.forEach((s, index) => {
            if (data.qscoreTotal > +s) {
                _统计积分人数[index] = (_统计积分人数[index] || 0) + 1;
            }
        })

        if (memdata[key].power.filter(i => i > 0).length >= 2) {
            _统计双队人数.push([query_info[key], key])
        }

        tableData.push(data);
    }

    // 积分排行
    tableData
        .sort((a, b) => b.qscoreTotal - a.qscoreTotal)
        .forEach((item, index) => {
            tableData.find(t => t.name === item.name).qrang = index + 1;
        })

    // 战力排行
    tableData
        .sort((a, b) => b.powerTotal - a.powerTotal)
        .forEach((item, index) => {
            tableData.find(t => t.name === item.name).powerrang = index + 1;
        });

    // 格式化输出
    const formatTableData = tableData
        .sort((a, b) => b.powerTotal - a.powerTotal)
        .map(item => {
            let powerText = ""
            item.power.forEach((d, i) => {
                powerText += distributedMap[i] + "：" + (d / 10000).toFixed(1)
            });
            // @ts-ignore
            item.power = powerText + "总战：" + (item.powerTotal / 10000).toFixed(1)

            // let powerText = (item.power / 10000).toFixed(1) + "万";
            // if (powerText.length > 5) {
            //     powerText += "、 " + item.distributed;
            // } else {
            //     powerText += item.distributed;
            // }
            let qscoreText = ""
            item.qscore.filter(i => i).forEach((d, i) => {
                qscoreText += distributedMap[i] + d
            });
            // @ts-ignore
            item.qscore = qscoreText;

            return item;
        })

    shark.logger.log(`总人数：${Object.keys(memdata).length}、总战力：${(_家族总战力 / 100000000).toFixed(2)}亿、未参战人数：${_统计未参战人数.length}`);
    if (shark.rule.B && _统计未参战人数.length) {
        const text = _统计未参战人数.map(item => `${item[0]}（${item[1].replace("uin", "")}）`).join("、");
        shark.logger.log(text)
    }
    shark.logger.log("双队以上人数：", _统计双队人数.length);
    shark.logger.log(`朱雀总积分：`, _朱雀分数.reduce((a, b) => a + b, 0));
    shark.logger.log(`青龙总积分：`, _青龙分数.reduce((a, b) => a + b, 0));
    shark.logger.log(`白虎总积分：`, _白虎分数.reduce((a, b) => a + b, 0));
    shark.logger.log(`玄武总积分：`, _玄武分数.reduce((a, b) => a + b, 0));

    _统计战力人数.forEach((item, index) => {
        shark.logger.log(`战力超过${A[index]}万的人数：${item}人`);
    });

    _统计积分人数.forEach((item, index) => {
        shark.logger.log(`积分超过${C[index]}的人数：${item}人`);
    });

    // @ts-ignore
    refresh(formatTableData, columnData);
};