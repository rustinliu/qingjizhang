<template>
    <Layout>
        <Tab class-prefix="type" :data-source="typeList" :value.sync="type" />
        <!-- <Tab
            class-prefix="interval"
            :data-source="intervalList"
            :value.sync="interval"
            height="48px"
        /> -->
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart :options="chartOptions" class="chart" />
        </div>
        <ol v-if="groupList.length > 0">
            <li v-for="(group, index) in groupList" :key="index">
                <h3 class="title">
                    {{ beauify(group.title) }} <span>{{ group.total }}</span>
                </h3>
                <ol>
                    <li
                        class="record"
                        v-for="item in group.items"
                        :key="item.id"
                    >
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="notes">{{ item.notes }}</span>
                        <span>¥{{ item.amount }}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            <span>目前无记录</span>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Tab from "@/components/Tabs.vue";
import typeList from "@/constans/typeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
import _ from "lodash";

@Component({
    components: {
        Tab,
        Chart,
    },
})
export default class Statistics extends Vue {
    beauify(string: string) {
        const now = dayjs();
        const day = dayjs(string);
        if (dayjs(string).isSame(now, "day")) {
            return "今天";
        } else if (day.isSame(now.valueOf() - 86400 * 1000, "day")) {
            return "昨天";
        } else if (day.isSame(now.subtract(2, "day"), "day")) {
            return "前天";
        } else if (day.isSame(now, "year")) {
            return day.format("M月D日");
        } else return day.format("YYYY年M月D日");
    }
    tagString(tags: Tag[]) {
        return tags.length === 0 ? "无" : tags.map((t) => t.name).join(",");
    }
    get recordList() {
        return (this.$store.state as rootState).recordList; //使用as解决vueX与ts的问题，如不加就成了any
    }
    get groupList() {
        type Result = { title: string; total?: number; items: RecordItem[] }[];
        const { recordList } = this;

        const newList = clone(recordList)
            .filter((r) => r.type === this.type)
            .sort(
                (a, b) =>
                    dayjs(b.creatdAt).valueOf() - dayjs(a.creatdAt).valueOf()
            );

        if (newList.length === 0) {
            return [] as Result;
        }
        const result: Result = [
            {
                title: dayjs(newList[0].creatdAt).format("YYYY-MM-DD"),
                items: [newList[0]],
            },
        ];

        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.creatdAt), "day")) {
                last.items.push(current);
            } else {
                result.push({
                    title: dayjs(current.creatdAt).format("YYYY-MM-DD"),
                    items: [current],
                });
            }
        }
        result.map((group) => {
            group.total = group.items.reduce(
                (sum, item) => sum + item.amount,
                0
            );
        });
        return result;
    }
    beforeCreate() {
        this.$store.commit("fetchRecords");
    }
    //interval = "day";
    // intervalList = intervalList;
    type = "-";
    typeList = typeList;
    get keyvalueList() {
        let today = new Date();
        const array = [];
        for (let i = 0; i <= 29; i++) {
            const date = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
            const found = _.find(this.groupList, {
                title: date,
            });
            array.push({
                date: date,
                value: found ? found.total : 0,
            });
        }
        array.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        return array;
    }
    get chartOptions() {
            grid: {
                left: 0,
                right: 0,
            },
            xAxis: {
                type: "category",
                axisTick: { alignWithLabel: true },
                data: keys,
                axisLine: {
                    lineStyle: { coolr: "#666" },
                },
                axisLabel: {
                    formatter: function (value: string, index: number) {
                        return value.substr(5);
                    },
                },
            },
            yAxis: {
                type: "value",
                show: false,
            },
            series: [
                {
                    itemStyle: { borderWidth: 1, color: "#666" },
                    symbolSize: 20,
                    symbol: "circle",
                    data: values,
                    type: "line",
                },
            ],
            tooltip: {
                show: true,
                triggerOn: "click",
                formatter: "{c}",
                position: "top",
            },
        };
    }
    mounted() {
        const div = this.$refs.chartWrapper as HTMLDivElement;
        div.scrollLeft = div.scrollWidth;
    }
}
</script>

<style lang="scss" scoped>
%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
::v-deep {
    .type-tabs-item {
        background-color: white;
        &.selected {
            background: #c4c4c4;
            &::after {
                display: none;
            }
        }
    }
    // .interval-tabs-item {
    //      height: 48px;
    // }
}
.title {
    @extend %item;
}
.record {
    @extend %item;
    background: white;
    padding: 0 16px;
}
.notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
    //多余一行省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.noResult {
    padding: 16px;
    text-align: center;
}
.chart {
    width: 430%;
    &-wrapper {
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
