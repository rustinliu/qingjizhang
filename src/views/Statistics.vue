<template>
    <Layout>
        <Tab class-prefix="type" :data-source="typeList" :value.sync="type" />
        <Tab
            class-prefix="interval"
            :data-source="intervalList"
            :value.sync="interval"
            height="48px"
        />
        <ol>
            <li v-for="(group, index) in result" :key="index">
                <h3 class="title">{{ group.title }}</h3>
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
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Tab from "@/components/Tabs.vue";
import intervalList from "@/constans/intervalList";
import typeList from "@/constans/typeList";
@Component({
    components: {
        Tab,
    },
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        return tags.length === 0 ? "无" : tags.join(",");
    }
    get recordList() {
        return (this.$store.state as rootState).recordList; //使用as解决vueX与ts的问题，如不加就成了any
    }
    get result() {
        const { recordList } = this;
        type HashTableValue = { title: string; items: RecordItem[] };
        const hashTable: { [key: string]: HashTableValue } = {};
        for (let i = 0; i < recordList.length; i++) {
            const [date, time] = recordList[i].creatdAt?.split("T") as string[];
            hashTable[date] = hashTable[date] || { title: date, items: [] };
            hashTable[date].items.push(recordList[i]);
        }

        return hashTable;
    }
    beforeCreate() {
        this.$store.commit("fetchRecords");
    }
    interval = "day";
    type = "+";
    intervalList = intervalList;
    typeList = typeList;
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
</style>
